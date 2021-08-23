import React, { createContext, useState, ReactNode, SetStateAction, Dispatch, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDatabaseConnection } from '../storage/connection';
import { UserModel, IUser } from '../storage/UserRepository';
import { ISignupData } from './signup-context';
import { GYMNASIA_SESSION } from '../global/constants/asyncStorage';

export interface IUserSession {
    uuid: string;
    token: string;
    createdAt: Date;
}

interface IAuthContextData {
    user: IUser | UserModel;
    setUser: Dispatch<SetStateAction<IUser>>;
    newUser: (userData: ISignupData) => Promise<void>;
    updateUser: (newData: IUser | Object) => Promise<void>;
    signIn?: () => Promise<void>;
    signOut?: () => Promise<void>;
    loading: boolean;
    session: IUserSession;
}

interface IAuthProviderProps {
    children: ReactNode,
    hasSession?: IUserSession
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export function AuthProvider({ children, hasSession }: IAuthProviderProps){
    const { usersRepository } = useDatabaseConnection();
    const [user, setUser] = useState<IUser>({} as IUser);
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(hasSession || {} as IUserSession)

    async function newUser(userData: ISignupData){
        try{
            setLoading(true);

            let userCreated = await usersRepository.create(userData);

            let newUserSession = {
                uuid: userCreated.uuid,
                createdAt: new Date()
            } as IUserSession;

            await AsyncStorage.setItem(GYMNASIA_SESSION, JSON.stringify(newUserSession));

            setUser(userCreated);
            setSession(newUserSession);
        }catch(err){
            throw new Error(err);
        }finally{
            setLoading(false);
        }
    }

    async function updateUser(newData: IUser | Object): Promise<void>{
        let newUser = Object.assign(user, newData);

        const result = await usersRepository.update(newUser);
        
        setUser(result);
    }

    async function loadStorageData(): Promise<any> {
        if(session.uuid){
            let userData = await usersRepository.getData(session.uuid);
    
            if(userData){
                userData.birth_date = new Date(userData.birth_date);
                setUser(userData);
            }
        }

        setLoading(false);
    }

    async function prepare(): Promise<void>{
        if(!session.uuid)
            setSession(await loadStorageSession());
        await loadStorageData();
    }

    useEffect(() => {
        prepare();
    }, [])

    return(
        <AuthContext.Provider value={{
                user,
                setUser,
                loading,
                newUser,
                updateUser,
                session
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

export async function loadStorageSession(): Promise<IUserSession> {
    let rawData = await AsyncStorage.getItem(GYMNASIA_SESSION);
    if(rawData)
        return JSON.parse(rawData) as IUserSession;

    return {} as IUserSession;
}

/**
 * Verifica se há uma sessão no dispositivo e retorna ela ou um objeto vazio
 * @returns [sessionLoaded: boolean, session: IUserSession] 
 */

export function  loadSession(): [boolean, IUserSession] {
    let [loaded, setLoaded] = useState(false);
    let [session, setSession] = useState({} as IUserSession);

    useEffect(() => {
        (async() => {
            let rawData = await AsyncStorage.getItem(GYMNASIA_SESSION);
            if(rawData)
                setSession(JSON.parse(rawData) as IUserSession);
            setLoaded(true);
        })()
    }, [])

    return [loaded, session];
};