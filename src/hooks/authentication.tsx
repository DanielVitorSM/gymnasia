import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase';
import Constants from 'expo-constants';
import * as Google from 'expo-google-app-auth';
import { v4 as uidv4 } from 'uuid';
import "firebase/firestore";

import { GYMNASIA_SESSION, GYMNASIA_USER } from '../global/constants/asyncStorage';

export interface IUserObject{
    uid: string;
    isAnonymous: boolean;
    email: string | null;
    data?: IUserDataObject;
}

export interface IUserDataObject{
    weight: number;
    height: number;
    birth: Date;
    sex: string;
    neck?: number;
    hip?: number;
    waist?: number;
}

export interface ISessionObject{
    isLogged: boolean;
    isDataColected: boolean;
}

interface IAuthContextData {
    loading: boolean;
    userData: IUserDataObject;
    session: ISessionObject;
    updateUserData: (change: Object) => Promise<void>;
    signInGoogle: () => Promise<void>;
    signInAnonymous: () => void;
    signInEmailAndPassword: (email: string, password: string) => Promise<void>;
    signUpEmailAndPassword: (email: string, password: string) => Promise<void>;
}

interface IAuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export function AuthProvider({ children }: IAuthProviderProps){
    const [user, setUser] = useState({} as IUserObject);
    const [session, setSession] = useState({ isLogged: false, isDataColected: false } as ISessionObject);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        firebase
        .auth()
        .onAuthStateChanged(async user => {
            setLoading(true);
            let userIn = {} as IUserObject;
            if(user){
                userIn = {
                    uid: user.uid,
                    email: user.email,
                    isAnonymous: user.isAnonymous,
                    data: await getUserData()
                }
            }
            setUser(state => userIn);
            setSession({
                isDataColected: userIn !== undefined ,
                isLogged: userIn.uid !== undefined
            });
            setLoading(false);
        })
    }, []);

    function signInAnonymous(){
        firebase
        .auth()
        .signInAnonymously()
        .catch(res => {
            throw new Error("Entrar anonimamente não está disponível no momento");
        })
    }

    async function signInGoogle(){
        try{
            const result = await Google.logInAsync({
                iosClientId: Constants.manifest?.extra?.IOS_KEY_DEVELOPMENT,
                androidClientId: Constants.manifest?.extra?.ANDROID_KEY_DEVELOPMENT,
                scopes: ['profile', 'email'],
            });

            if(result.type === "success"){
                const credential = firebase.auth.GoogleAuthProvider.credential(
                    result.idToken,
                    result.accessToken
                );

                firebase
                .auth()
                .signInWithCredential(credential)
                .catch(res => { throw res });
            }else
                throw new Error("Houve um erro ao contatar o servidor do google, verifique sua conexão com internet.");
        }catch(error){
            throw new Error("Não foi possível realizar o login com Google, tente novamente mais tarde.");
        }
    }


    async function signUpEmailAndPassword(email: string, password: string){
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(error => {
            throw error;
        })
    }

    async function signInEmailAndPassword(email: string, password: string){
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => {
            throw error;
        })
    }

    async function updateUserData(change: Object){
        try{
            var newData = Object.assign(user.data || {}, change) as IUserDataObject;
            if(!user.isAnonymous){
                await firebase
                .firestore()
                .collection("users")
                .doc(user.uid)
                .set(newData)
            }
            await AsyncStorage.setItem(GYMNASIA_USER, JSON.stringify(newData));
            setUser(state => {return { ...state, data: newData }});
            setSession(state => {return { ...state, isDataColected: true }})
        }catch(error){
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{
            session,
            loading,
            userData: user.data || {} as IUserDataObject,
            updateUserData,
            signInAnonymous,
            signInGoogle,
            signInEmailAndPassword,
            signUpEmailAndPassword
        }}>
            { children }
        </AuthContext.Provider>
    )
}

/**
 * Retorna um novo contexto de autenticação
 */

export function useAuth(): IAuthContextData{
    const context = useContext(AuthContext);
    return context;
}

type FirebaseUserDataType = IUserDataObject & {
    birth: {
        nanoseconds: number;
        seconds: number;
    }
}

export async function getUserData(){
    const { uid } = firebase.auth().currentUser as firebase.User;
    try {
        const snapshot = await firebase.firestore().collection("users").doc(uid).get();
        const data = snapshot.data();
        if(data){
            let userData = data as FirebaseUserDataType;
            return { ...userData, birth: new Date(userData.birth.seconds * 1000) } as IUserDataObject;
        }else{
            const userRaw = await AsyncStorage.getItem(GYMNASIA_USER);
            if(userRaw)
                return JSON.parse(userRaw) as IUserDataObject;
        }
        return undefined;
    }catch(error){
        console.log(error);
        return undefined;
    }
}