import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-google-app-auth';
import Constants from 'expo-constants';
import firebase from 'firebase';
import { v4 as uidv4 } from 'uuid';
import "firebase/firestore";

import { ISignupData } from './signup-context';
import { GYMNASIA_SESSION, GYMNASIA_USER } from '../global/constants/asyncStorage';
import { createNotifications } from '../utils/notification';

export interface ISession {
    uid: string;
    isAnonymous: boolean;
    email: string;
}

export interface IUser {
    uid: string;
    name?: string;
    weight: number;
    height: number;
    birth_date: Date;
    sex: string;
    neck?: number;
    hip?: number;
    waist?: number;
}

interface IAuthContextData {
    session: ISession;
    user: IUser;
    newUser: (userData: ISignupData) => void;
    updateUser: (newData: IUser) => Promise<void>;
    signIn?: () => Promise<void>;
    signOut: () => Promise<void>;
    signInGoogle: () => Promise<void>;
    loading: ILoading;
}

interface ILoading {
    type: "change" | "google" | "start" | "email" | "guest";
    loaded: boolean;
}

interface IAuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export function AuthProvider({ children }: IAuthProviderProps){
    const [user, setUser] = useState({} as IUser);
    const [session, setSession] = useState({} as ISession);
    const [loading, setLoading] = useState({ type: "start", loaded: false } as ILoading);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async user => {
            let newSession = {} as ISession;
            let newUser = {} as IUser;
            if(user){
                newSession = {
                    email: user.email || "",
                    uid: user.uid,
                    isAnonymous: user.isAnonymous
                };
                newUser = await getFirebaseUserData();
            }
            setUser(newUser);
            setSession(newSession);
            setLoading({ ...loading, loaded: true});
        })
      }, []);

    async function signInGoogle(): Promise<void>{
        setLoading({ type: "google", loaded: false } as ILoading);
        try {
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
                .catch(error => {
                    throw error;
                })
            }else{
                throw new Error("Houve um erro ao contatar o servidor do google, verifique sua conexão com internet.");
            }
        }catch(error){
            throw new Error("Não foi possível realizar o login com Google, tente novamente mais tarde.");
        }
    }

    function newUser(userData: ISignupData){
        try {
            const { displayName, uid } = firebase.auth().currentUser as firebase.User;
            const newUserData = {
                uid: uid || uidv4(),
                name: displayName || "",
                birth_date: userData.birth_date,
                weight: userData.weight,
                height: userData.height,
                sex: userData.sex,
            } as IUser;
            firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .set(newUserData)
            .catch(({message}) => {
                console.log(message);
            })
            .finally(async () => {
                await AsyncStorage.setItem(GYMNASIA_USER, JSON.stringify(newUserData));
                await createNotifications(userData.reminder, null);
                setUser(newUserData);
            })
        }catch(error){
            throw new Error("Houve um erro ao salvar os dados, tente novamente.");
        }
    }

    async function signOut(){
        try {
            setSession({} as ISession);
            setUser({} as IUser);
            await firebase.auth().signOut();
            await AsyncStorage.removeItem(GYMNASIA_USER);
            await AsyncStorage.removeItem(GYMNASIA_SESSION);
        } catch (error) {
            throw new Error("Houve um erro ao encerrar a sessão, tente novamente.");
        }
    }

    async function updateUser(newData: IUser): Promise<void>{
        try{
            if(!session.isAnonymous){
                await firebase
                .firestore()
                .collection("users")
                .doc(user.uid)
                .set(newData)
            }
            await AsyncStorage.setItem(GYMNASIA_USER, JSON.stringify(newData));
            setUser(newData);
        }catch{
            console.log("Erro bonito")
        }
    }

    return(
        <AuthContext.Provider value={{
            session,
            user,
            loading,
            newUser,
            signOut,
            updateUser,
            signInGoogle
        }}>
            { children }
        </AuthContext.Provider>
    );
};

/**
 * Retorna um novo contexto de autenticação
 */

export function useAuth(): IAuthContextData{
    const context = useContext(AuthContext);
    return context;
}

type DataType = {
    uid: string;
    name?: string;
    weight: number;
    height: number;
    birth_date: firebase.firestore.Timestamp;
    sex: string;
}

export async function getFirebaseUserData(){
    const { uid } = firebase.auth().currentUser as firebase.User;
    let userData = {} as IUser;
    try {
        const snapshot = await firebase.firestore().collection("users").doc(uid).get();
        const data = snapshot.data() as DataType;
        if(data){
            userData = {
                ...data,
                birth_date: data.birth_date.toDate()
            }
        }else{
            const userRaw = await AsyncStorage.getItem(GYMNASIA_USER);
            if(userRaw)
                userData = JSON.parse(userRaw) as IUser;
        }
    }catch(error){
        console.log(error);
    }finally{
        return userData;
    }
}