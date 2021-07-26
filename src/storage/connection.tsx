import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Connection, createConnection, getConnection, AlreadyHasActiveConnectionError } from "typeorm";
import AppLoading from 'expo-app-loading';

import { ExerciseModel, ExerciseRepository } from "./ExercisesRepository";
import { UserModel, UserRepository } from './UserRepository';
import { SplashScreen } from '../screens/SplashScreen';
import { ActivityIndicator, View } from "react-native";

interface DatabaseConnectionContextData{
    exercisesRepository: ExerciseRepository;
    usersRepository: UserRepository;
}

const DatabaseConnectionContext = createContext<DatabaseConnectionContextData>(
    {} as DatabaseConnectionContextData,
);

/**
 * Função que cria uma conexão com o banco de dados de forma assíncrona.
 * @returns Retorna uma conexão;
 */

async function createDatabaseConnectionAsync(): Promise<Connection | null>{
    try{
        const createdConnection = await createConnection({
            type: 'expo',
            database: 'teste.db',
            driver: require('expo-sqlite'),
            entities: [ExerciseModel, UserModel],
            synchronize: true,
            cache: true
        });
        return createdConnection;
    }catch(error){
        if(error.name === "AlreadyHasActiveConnectionError")
            return getConnection();
        return null;
    }
}

/**
 * Função assíncrona usando estados para conectar ao banco de dados.
 * @returns Retorna um array contendo um booleano que indica se foi criado a conexão, e a conexão em si
 */

export function createDatabaseConnectionSync(): [boolean] {
    let [connectionCreated, setConnectionCreated] = useState(false);
    
    useEffect(() => {
        (async() => {
            const createdConnection = await createDatabaseConnectionAsync();
            setConnectionCreated(true);
        })();
    }, []);

    return [connectionCreated];
}

export const DatabaseConnectionProvider: React.FC = ({ children }) => {
    const [connection, setConnection] = useState<Connection | null>(null);

    const connect = useCallback(async () => {
        const createdConnection = await createDatabaseConnectionAsync();
        setConnection(createdConnection);
    }, []);

    useEffect(() => {
        if(!connection){
            connect();
        }
    }, [connect, connection]);

    if(!connection)
        return (
            <View>
                <ActivityIndicator/>
            </View>
        )

    return (
        <DatabaseConnectionContext.Provider
            value={{
                exercisesRepository: new ExerciseRepository(connection),
                usersRepository: new UserRepository(connection)
            }}
        >
            { children }
        </DatabaseConnectionContext.Provider>
    );
};

export function useDatabaseConnection(){
    const context = useContext(DatabaseConnectionContext);

    return context;
}