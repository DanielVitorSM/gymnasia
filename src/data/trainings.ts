export interface ITrainingObject {
    uid: string;
    name: string;
    extra?: string;
    duration: string;
    difficulty: "Iniciante" | "Intermediário" | "Avançado";
    interval: number;
    image: any;
    exercises: ITrainingExerciseItem[]
}

export interface ITrainingExerciseItem {
    order: number;
    uid: string;
    time: number;
}

/**
 * Find an training element on the list with an uid
 * @param uid A parameter relative to training identification
 * @returns Return an training object or undefined 
 */

 export function getTrainingByUid(uid: string){
    return trainings.find((value, index) => value.uid === uid);
}

export const trainings: ITrainingObject[] = [
    {
        "uid": "sefesfesiy7h897hy3rfd",
        "name": "Corpo todo em 5 minutos",
        "extra": "Corpo Todo",
        "difficulty": "Iniciante",
        "duration": "4 mins",
        "interval": 10,
        "image": require("../assets/trains/all-body.jpg"),
        "exercises": [
            {
                "order": 1,
                "uid": "dae302aa-36d9-4c08-bd92-69be6c47d877",
                "time": 20
            },
            {
                "order": 2,
                "uid": "258008ba-d567-403c-af10-b19e41791f4b",
                "time": 30
            },
            {
                "order": 3,
                "uid": "475918d8-9ca5-4992-a886-a33b08633613",
                "time": 20
            },
            {
                "order": 4,
                "uid": "dae302aa-36d9-4c08-bd92-69be6c47d877",
                "time": 20
            },
            {
                "order": 5,
                "uid": "258008ba-d567-403c-af10-b19e41791f4b",
                "time": 40
            },
            {
                "order": 6,
                "uid": "d70894a5-527e-493a-9ff5-6c74b6fc8445",
                "time": 30
            },
            {
                "order": 7,
                "uid": "e73cb9a1-7cff-43a9-8c85-366d36989d38",
                "time": 20
            }
    
        ]
    },
]