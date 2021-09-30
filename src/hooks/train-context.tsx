import React, { createContext, useState, ReactNode, SetStateAction, Dispatch, useContext } from 'react';

import { ITrainExerciseItem, ITrainFull } from '../storage/models/Trains';
import { exercises as exercisesListData } from '../utils/exercises';

export interface ITrainContextData {
    train: ITrainFull;
    startedAt: number;
    finishedAt: number;
    setFinishedAt: Dispatch<SetStateAction<number>>;
    exerciseActive: IPraticExerciseActive;
    nextExercise: () => boolean;
    previousExercise: () => boolean;
}

interface ITrainProviderProps {
    children: ReactNode;
    train: ITrainFull;
    startedAt: number;
}

interface IPraticExerciseActive extends ITrainExerciseItem {
    image: any
}

const TrainContext = createContext<ITrainContextData>({} as ITrainContextData);

export function TrainContextProvider({ children, train, startedAt }: ITrainProviderProps){
    const [exerciseActive, setExerciseActive] = useState(getExerciseByOrder(train.exercises, 1));
    const [finishedAt, setFinishedAt] = useState(0);

    function getExerciseByOrder(exercises: ITrainExerciseItem[], order: number): IPraticExerciseActive{
        let result = exercises.find((value) => value.order === order);
        if(result){
            let exerciseCompleteData = exercisesListData.find(value => value.uid == result?.uid);
            return {
                ...result,
                image: exerciseCompleteData?.image
            } as IPraticExerciseActive;
        }
        return {} as IPraticExerciseActive;
    }

    function nextExercise(){
        let result = getExerciseByOrder(train.exercises, exerciseActive.order + 1);
        setExerciseActive(result);
        if(result.uid === undefined)
            return false;
        return true;
    }

    function previousExercise(){
        if(exerciseActive.order == 1)
            return false;

        let result = getExerciseByOrder(train.exercises, exerciseActive.order - 1);
        setExerciseActive(result);
        if(result.uid === undefined)
            return false;
        return true;
    }

    return(
        <TrainContext.Provider
            value={{
                train,
                startedAt,
                exerciseActive,
                nextExercise,
                previousExercise,
                finishedAt,
                setFinishedAt
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