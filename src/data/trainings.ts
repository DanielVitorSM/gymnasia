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
    return trainings.find(value => value.uid === uid);
}

export const trainings: ITrainingObject[] = [
    {
        "uid": "9cada27a-dff0-4514-b99a-c684ef336e63",
        "name": "Aquecimento em 3 minutos",
        "extra": "Aquecimento",
        "difficulty": "Iniciante",
        "duration": "3 mins",
        "interval": 10,
        "image": require("../assets/trains/aquecimento-3-mins.jpg"),
        "exercises": [
            {
                "order": 1,
                "uid": "152c9700-e42a-42f7-a96d-2308c69baaa7",
                "time": 30
            },
            {
                "order": 2,
                "uid": "c15632b3-2b2f-4973-a55d-edc8172401a2",
                "time": 40
            },
            {
                "order": 3,
                "uid": "94c9a43a-ee71-4eae-86c6-35ba714ae0af",
                "time": 30
            },
            {
                "order": 4,
                "uid": "66b23842-e5e2-4c3d-affb-464d09ec8d78",
                "time": 40
            },
        ]
    },
    {
        "uid": "bd46c674-24eb-4be6-a8e2-dcbc4a3d1ee4",
        "name": "Treino de Cardio",
        "extra": "Corpo Todo",
        "difficulty": "Avançado",
        "duration": "12 mins",
        "interval": 60,
        "image": require("../assets/trains/cardiorespiratorio.jpg"),
        "exercises": [
            {
                "order": 1,
                "uid": "90a5952d-dd54-4cf7-b020-787e5187d20d",
                "time": 60
            },
            {
                "order": 2,
                "uid": "152c9700-e42a-42f7-a96d-2308c69baaa7",
                "time": 40
            },
            {
                "order": 3,
                "uid": "94c9a43a-ee71-4eae-86c6-35ba714ae0af",
                "time": 60
            },
            {
                "order": 4,
                "uid": "90a5952d-dd54-4cf7-b020-787e5187d20d",
                "time": 60
            },
            {
                "order": 5,
                "uid": "152c9700-e42a-42f7-a96d-2308c69baaa7",
                "time": 40
            },
            {
                "order": 6,
                "uid": "94c9a43a-ee71-4eae-86c6-35ba714ae0af",
                "time": 60
            },
        ]
    },
    {
        "uid": "72eebaa0-9a02-4a04-85db-442ef3466ce2",
        "name": "Treino para Coxas",
        "extra": "Pernas",
        "difficulty": "Intermediário",
        "duration": "5 mins",
        "interval": 15,
        "image": require("../assets/trains/treino-para-coxas.jpg"),
        "exercises": [
            {
                "order": 1,
                "uid": "152c9700-e42a-42f7-a96d-2308c69baaa7",
                "time": 40
            },
            {
                "order": 2,
                "uid": "9f1574a0-d94c-43c6-90c6-19a889d71199",
                "time": 30
            },
            {
                "order": 3,
                "uid": "94c9a43a-ee71-4eae-86c6-35ba714ae0af",
                "time": 40
            },
            {
                "order": 4,
                "uid": "4cba3657-233e-4d6a-825d-165fe380f00d",
                "time": 30
            },
            {
                "order": 5,
                "uid": "90a5952d-dd54-4cf7-b020-787e5187d20d",
                "time": 40
            },
        ]
    },
]