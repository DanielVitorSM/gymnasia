import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase';
import Constants from 'expo-constants';
import * as Google from 'expo-google-app-auth';
import "firebase/firestore";

import { GYMNASIA_USER } from '../global/constants/asyncStorage';
import { deleteAllNotifications } from '../utils/notification';
import { Alert } from 'react-native';
import DatabaseInit from '../storage/init';

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
    user: IUserObject;
    session: ISessionObject;
    updateUserData: (change: Object) => Promise<void>;
    signInGoogle: () => Promise<void>;
    signInAnonymous: () => void;
    signInEmailAndPassword: (email: string, password: string) => Promise<void>;
    signUpEmailAndPassword: (email: string, password: string) => Promise<void>;
    signOut: () => void;
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
                isDataColected: userIn.data !== undefined ,
                isLogged: userIn.uid !== undefined
            });
            setLoading(false);
        })
    }, []);

    function signInAnonymous(){
        firebase
        .auth()
        .signInAnonymously()
        .catch(error => {
            switch (error.code) {
                case "operation-not-allowed":
                    Alert.alert("Método não permitido", "Esse método de login está desabilitado no momento.");
                    break;
                default:
                    Alert.alert("Houve um problema", "Não foi possível entrar anonimamente, tente novamente em instantes.");
                    break;
            }
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
                .catch(error => {
                    switch(error.code) {
                        case "auth/invalid-credential":
                            Alert.alert("Credenciais inválidas", "As credenciais recebidas são inválidas e não permitem o login.");
                            break;
                        case "auth/account-exists-with-different-credential":
                            Alert.alert("Conta já existe", "Essa conta já existe em outro método, tente entrar usando o método correto.");
                            break;
                        default:
                            Alert.alert("Houve um problema", "Não foi possível realizar login, verifique a conexão com a internet e tente novamente.");
                    }
                });
            }else
                Alert.alert("Houve um problema", "Houve um erro ao contatar o servidor do google, verifique sua conexão com internet.");
        }catch(error){
            Alert.alert("Houve um problema", "Não foi possível realizar o login com Google, tente novamente mais tarde.");
        }
    }


    async function signUpEmailAndPassword(email: string, password: string){
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(error => {
            switch(error.code) {
                case "auth/email-already-in-use":
                    Alert.alert("Email em uso", "Esse email já está sendo usado, tente entrar com outro ou logue.");
                    break;
                case "auth/invalid-email":
                    Alert.alert("Email inválido", "Insira um email válido.");
                    break;
                case "auth/weak-password":
                    Alert.alert("Senha fraca", "Insira uma senha fraca, com mais do que 6 caracteres.");
                    break;
                default:
                    Alert.alert("Houve um problema", "Não foi possível criar uma nova conta, verifique a conexão com a internet e tente novamente.");
            }
        })
    }

    async function signInEmailAndPassword(email: string, password: string){
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => {
            switch(error.code) {
                case "auth/auth/user-disabled":
                    Alert.alert("Desabilitado", "Esse email foi desabilitado.");
                    break;
                case "auth/invalid-email":
                    Alert.alert("Email inválido", "Insira um email válido.");
                    break;
                case "auth/user-not-found":
                    Alert.alert("Email ou senha inválidos", "Os dados de login não coincidem, insira dados válidos.");
                    break;
                case "auth/wrong-password":
                    Alert.alert("Email ou senha inválidos", "Os dados de login não coincidem, insira dados válidos.");
                    break;
                default:
                    Alert.alert("Houve um problema", "Não foi possível realizar login, verifique a conexão com a internet e tente novamente.");
            }
        })
    }

    async function uploadBackup(){
        if(user.data !== undefined){
            await firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .set(user.data)
            .catch(error => console.log(error))
        }
    }
    
    async function signOut(){
        await uploadBackup()
        await deleteLocalData();
        firebase
        .auth()
        .signOut()
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
            user,
            userData: user.data || {} as IUserDataObject,
            updateUserData,
            signInAnonymous,
            signInGoogle,
            signInEmailAndPassword,
            signUpEmailAndPassword,
            signOut
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

async function deleteLocalData(){
    try {
        await deleteAllNotifications();
        await AsyncStorage.removeItem(GYMNASIA_USER);
        DatabaseInit.DropTables()
    }catch(error){
        console.log(error);
        return undefined;
    }
}