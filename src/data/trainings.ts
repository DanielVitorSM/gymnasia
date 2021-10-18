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
]