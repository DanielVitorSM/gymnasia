import React, { createContext, useState, ReactNode, SetStateAction, Dispatch, useContext } from 'react';

interface ISignupProviderProps {
    children: ReactNode
}

export interface ISignupData{
    weight: number;
    height: number;
    birth_date: Date;
    sex: string;
}

interface ISignupContextData {
    state: ISignupData;
    setState: Dispatch<SetStateAction<ISignupData>>
}

const SignupContext = createContext<ISignupContextData>({} as ISignupContextData);

export function SignupContextProvider({ children }: ISignupProviderProps){
    const [state, setState] = useState({} as ISignupData);

    return(
        <SignupContext.Provider
            value={{
                state,
                setState
            }}
        >
            { children }
        </SignupContext.Provider>
    );
};

/**
 * Cria um novo contexto de registro para armazenar os valores do formulário de cadastro
 */

export function useSignupContext(){
    const context = useContext(SignupContext);

    return context;
}