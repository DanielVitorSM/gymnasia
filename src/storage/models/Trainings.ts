import { ITrainingExerciseItem, ITrainingObject } from './../../data/trainings';
import { DatabaseConnection } from '../connection';
import { v4 as uidv4 } from 'uuid';
import firebase from 'firebase';
import "firebase/firestore";

const table = "trainings";
const db = DatabaseConnection.getConnection();

export class TrainingModel {
    public uid?: string;
    public name?: string;
    public duration?: string;
    public difficulty?: string;
    public interval?: number;
    public exercises?: string;
    public exercisesArray: ITrainingExerciseItem[];

    constructor(name?: string, difficulty?: string, duration?: string, interval?: number, exercises?: string){
        this.uid = uidv4();
        this.name = name;
        this.difficulty = difficulty;
        this.duration = duration;
        this.interval = interval;
        this.exercises = exercises;

        if(exercises)
            this.exercisesArray = JSON.parse(exercises);
    }

    public exercisesToArray(){
        if(this.exercises){
            let array = JSON.parse(this.exercises);
            this.exercisesArray = array
            return array as ITrainingExerciseItem[];
        }
        return [] as ITrainingExerciseItem[];
    }

    public toObject() {
        return {
            uid: this.uid,
            name: this.name,
            difficulty: this.difficulty,
            duration: this.duration,
            interval: this.interval,
            exercises: this.exercisesToArray()
        } as ITrainingObject
    }

    static modelToObject(param: TrainingModel) {
        return {
            uid: param.uid,
            name: param.name,
            difficulty: param.difficulty,
            duration: param.duration,
            interval: param.interval,
            exercises: JSON.parse(param.exercises || "[]"),
        } as ITrainingObject
    }
}

export class TrainingService{
    static add(param: TrainingModel): Promise<number>{
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(
                    `INSERT INTO ${table}(uid, name, difficulty, duration, interval, exercises) VALUES(?, ?, ?, ?, ?, ?)`,
                    [
                        param.uid,
                        param.name,
                        param.difficulty,
                        param.duration,
                        param.interval,
                        param.exercises,
                    ],
                    (_, { rowsAffected }) => {
                        resolve(rowsAffected);
                    },
                )
            },
            sqlError => {
                console.log(sqlError);
                resolve(0);
            }
        ));
    }

    static deleteById(uid: string): Promise<number>{
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(
                    `DELETE FROM ${table} WHERE uid = ?;`,
                    [uid],
                    (_, { rowsAffected }) => {
                        resolve(rowsAffected);
                    }
                );
            },
            sqlError => {
                console.log(sqlError);
                resolve(0);
            }
        ));
    }

    static find(limit: number = 10, sort: string = "ASC"): Promise<ITrainingObject[]>{
        return new Promise((resolve) => db.transaction(
            tx => {
                tx.executeSql(
                    `SELECT * FROM ${table} ORDER BY name ${sort} LIMIT ? ;`,
                    [limit],
                    (_, { rows }) => {
                        if(rows.length > 0){
                            let data: ITrainingObject[] = [];
                            for(var x = 0; x < rows.length; x++){
                                data.push(TrainingModel.modelToObject(rows.item(x)));
                            }
                            resolve(data);
                        }else{
                            resolve([]);
                        }
                    }
                );
            },
            sqlError => {
                console.log(sqlError);
                resolve([]);
            }
        ))
    }
}