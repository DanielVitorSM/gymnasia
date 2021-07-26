import React, { createContext, useState, ReactNode, SetStateAction, Dispatch, useContext, useEffect } from 'react';

import { ITrain, IExerciseTrain } from '../screens/Trains';

export interface ITrainContextData {
    train: ITrain;
    startedAt: number;
    exerciseActive: IExerciseTrain;
    nextExercise: () => boolean;
}

interface ITrainProviderProps {
    children: ReactNode;
    train: ITrain;
    firstExercise: IExerciseTrain;
}

const TrainContext = createContext<ITrainContextData>({} as ITrainContextData);

export function TrainContextProvider({ children, train }: ITrainProviderProps){
    const [exerciseActive, setExerciseActive] = useState(getExerciseByOrder(train.exercises, 1));
    let startedAt = Date.now();

    function getExerciseByOrder(exercises: IExerciseTrain[], order: number): IExerciseTrain{
        let result = exercises.find((value) => value.order === order);
        return result || {} as IExerciseTrain;
    }

    function nextExercise(){
        let result = getExerciseByOrder(train.exercises, exerciseActive.order + 1);
        setExerciseActive(result);
        if(result.uuid === undefined)
            return false;
        return true;
    }

    return(
        <TrainContext.Provider
            value={{
                train,
                startedAt,
                exerciseActive,
                nextExercise
            }}
        >
            { children }
        </TrainContext.Provider>
    );
};

/**
 * Cria um novo contexto de treino para controlar os estados durante o treino
 */

export function useTrainContext(){
    const context = useContext(TrainContext);

    return context;
}