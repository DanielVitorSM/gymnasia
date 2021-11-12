import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase';
import "firebase/firestore";
import Constants from 'expo-constants';
import { v4 as uuidv4 } from 'uuid';
import * as Google from 'expo-google-app-auth';

import { GYMNASIA_SESSION, GYMNASIA_USER } from '../global/constants/asyncStorage';
import { deleteAllNotifications } from '../utils/notification';
import DatabaseInit from '../storage/init';

const GoogleConfigOptions: Google.GoogleLogInConfig = {
    iosClientId: Constants.manifest?.extra?.GOOGLE_IOS_CLIENT_ID_DEVELOPMENT,
    iosStandaloneAppClientId: Constants.manifest?.extra?.GOOGLE_IOS_CLIENT_ID_PRODUCTION,
    androidClientId: Constants.manifest?.extra?.GOOGLE_ANDROID_CLIENT_ID_DEVELOPMENT,
    androidStandaloneAppClientId: Constants.manifest?.extra?.GOOGLE_ANDROID_CLIENT_ID_PRODUCTION,
    language: "pt-BR",
    scopes: ['profile', 'email'],
}

export interface IUserObject{
    uid: string;
    isOffline: boolean;
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
    updateUserData: (change: Object) => Promise<boolean>;
    signInGoogle: () => Promise<boolean>;
    signInAnonymous: () => Promise<boolean>;
    signInEmailAndPassword: (email: string, password: string) => Promise<boolean>;
    signUpEmailAndPassword: (email: string, password: string) => Promise<boolean>;
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
    
    /**
     * Verify if have an offline session and get it or set firebase onAuthStateChanged
     */
    useEffect(() => {
        async function verifyOfflineSession(){
            setLoading(true);
            const sessionSaved = await getItemStorage(GYMNASIA_SESSION);
            
            if(sessionSaved === null){
                return firebase
                .auth()
                .onAuthStateChanged(async user => {
                    setLoading(true);
                    let userIn = {} as IUserObject;
                    if(user){
                        userIn = {
                            uid: user.uid,
                            email: user.email,
                            isOffline: false,
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
            }

            const userData = await getItemStorage(GYMNASIA_USER);

            if(userData === null){
                setSession({
                    isLogged: true,
                    isDataColected: false
                })
                setUser(_ => sessionSaved as IUserObject);
                return setLoading(false);
            }

            setUser(_ => {
                return {
                    ...sessionSaved,
                    data: userData
                } as IUserObject
            })
            setSession({
                isLogged: true,
                isDataColected: true
            })
            setLoading(false);
        }

        verifyOfflineSession();
    }, []);

    function signInAnonymous(){
        return new Promise<boolean>(async resolve => {
            try{
                const newOffilineUser: IUserObject = {
                    email: null,
                    uid: uuidv4(),
                    isOffline: true
                }
        
                firebase.auth().onAuthStateChanged(() => {});
                await AsyncStorage.setItem(GYMNASIA_SESSION, JSON.stringify(newOffilineUser));
                setUser(_ => newOffilineUser);
                setSession(_ => {
                    return {
                        isDataColected: false,
                        isLogged: true
                    };
                })
                resolve(true)
            }catch(error){
                Alert.alert("Houve um erro", "Erro encontrado ao entrar offline, tente novamente.");
                resolve(false)
            }
        })
    }

    function signInGoogle(){
        return new Promise<boolean>(async resolve => {
            try{
                const result = await Google.logInAsync(GoogleConfigOptions);
    
                if(result.type === "success"){
                    const credential = firebase.auth.GoogleAuthProvider.credential(
                        result.idToken
                    );
    
                    firebase
                    .auth()
                    .signInWithCredential(credential)
                    .then(() => resolve(true))
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
                        resolve(false)
                    });
                }else
                    Alert.alert("Houve um problema", "Houve um erro ao contatar o servidor do google, verifique sua conexão com internet.");
                    resolve(false)
            }catch(error){
                Alert.alert("Houve um problema", "Não foi possível realizar o login com Google, tente novamente mais tarde.");
                resolve(false)
            }
        })
    }
    
    function signUpEmailAndPassword(email: string, password: string){
        return new Promise<boolean>(resolve => {
            firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => resolve(true))
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
                resolve(false)
            })
        })
    }

    function signInEmailAndPassword(email: string, password: string){
        return new Promise<boolean>(resolve => {
            firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => resolve(true))
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
                resolve(false)
            })
        });
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
        if(!user.isOffline){
            await uploadBackup()
            firebase
            .auth()
            .signOut()
        }else{
            setUser({} as IUserObject);
            setSession({ isLogged: false, isDataColected: false });
        }
        await deleteLocalData();
    }

    function updateUserData(change: Object){
        return new Promise<boolean>(async resolve => {
            try{
                var newData = Object.assign(user.data || {}, change) as IUserDataObject;
                if(!user.isOffline){
                    await firebase
                    .firestore()
                    .collection("users")
                    .doc(user.uid)
                    .set(newData)
                }
                await AsyncStorage.setItem(GYMNASIA_USER, JSON.stringify(newData));
                setUser(state => {return { ...state, data: newData }});
                setSession(state => {return { ...state, isDataColected: true }});
                resolve(true)
            }catch(error){
                throw error;
                resolve(false)
            }
        })
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
 * Get the auth context
 * @returns An Auth Context
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

/**
 * Get the User data saved on local or online
 * @returns The armazened data or undefined
 */

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

/**
 * Delete local data from AsyncStorage and Database
 */

async function deleteLocalData(){
    try {
        await deleteAllNotifications();
        await AsyncStorage.multiRemove([GYMNASIA_SESSION, GYMNASIA_USER])
        DatabaseInit.DropTables()
    }catch(error){
        console.log(error);
    }
}


/**
 * Returns a parsed json from AsyncStorage
 */

async function getItemStorage(key: string): Promise<any | null>{
    const rawStorageData = await AsyncStorage.getItem(key);
    const storageData = JSON.parse(rawStorageData || "[]");

    if(storageData.length !== undefined)
        return null;
    return storageData;
}