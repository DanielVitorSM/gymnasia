import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

import { ITrainingExerciseItem, ITrainingObject } from '../data/trainings';

export interface ITrainingContextData {
    training: ITrainingObject;
    activeExercise: ITrainingExerciseItem;
    totalDuration: number;
    nextExercise: () => boolean;
}

interface ITrainProviderProps {
    children: ReactNode;
    training: ITrainingObject;
}

const TrainingContext = createContext<ITrainingContextData>({} as ITrainingContextData);

export function TrainingContextProvider({ children, training }: ITrainProviderProps){
    const [activeExercise, setActiveExercise] = useState(training.exercises[0]);
    const [totalDuration, setTotalDuration] = useState(0);
    const [startedAt, setStartedAt] = useState(0);

    useEffect(() => {
        setStartedAt(Date.now())
    }, [])

    function getExercise(order: number) {
        let result = training.exercises.find(item => item.order === order);
        return result || undefined;
    }

    function nextExercise(){
        let next = getExercise(activeExercise.order + 1);
        if(next){
            setActiveExercise(next);
            return true;
        }
        setTotalDuration(Date.now() - startedAt)
        return false;
    }

    return(
        <TrainingContext.Provider
            value={{
                training,
                activeExercise,
                nextExercise,
                totalDuration
            }}
        >
            { children }
        </TrainingContext.Provider>
    );
};

/**
 * Cria um novo contexto de treino para controlar os estados durante o treino
 */

export function useTrainingContext(){
    return useContext(TrainingContext);
}