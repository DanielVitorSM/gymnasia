import { DatabaseConnection } from './../connection';
import { v4 as uidv4 } from 'uuid';
import firebase from 'firebase';
import "firebase/firestore";

const table = "trains";
const db = DatabaseConnection.getConnection();

export interface ITrainFull extends ITrainTiny {
    description: string;
    image: any;
}

export interface ITrainTiny {
    id: string;
    name: string;
    duration: string;
    difficulty: string;
    interval: number;
    exercises: ITrainExerciseItem[];
    isPublic: boolean;
}

export interface ITrainExerciseItem {
    order: number;
    uid: string;
    name: string;
    time: number;
}

export class TrainModel {
    public id?: string;
    public name?: string;
    public duration?: string;
    public difficulty?: string;
    public interval?: number;
    public exercises?: string;
    public isPublic?: boolean;
    public exercisesArray: Array<string>;

    constructor(name?: string, difficulty?: string, duration?: string, interval?: number, exercises?: string, isPublic?: boolean){
        this.id = uidv4();
        this.name = name;
        this.difficulty = difficulty;
        this.duration = duration;
        this.interval = interval;
        this.exercises = exercises;
        this.isPublic = isPublic;

        if(exercises)
            this.exercisesArray = JSON.parse(exercises);
    }

    public exercisesToArray(){
        if(this.exercises){
            let array = JSON.parse(this.exercises);
            this.exercisesArray = array
            return array;
        }
        return [];
    }

    public toObject() {
        return {
            id: this.id,
            name: this.name,
            difficulty: this.difficulty,
            duration: this.duration,
            interval: this.interval,
            exercises: this.exercisesToArray(),
            isPublic: this.isPublic
        } as ITrainTiny
    }

    static modelToObject(param: TrainModel) {
        return {
            id: param.id,
            name: param.name,
            difficulty: param.difficulty,
            duration: param.duration,
            interval: param.interval,
            exercises: JSON.parse(param.exercises || "[]"),
            isPublic: param.isPublic
        } as ITrainTiny
    }
}

export class TrainService{
    static add(param: TrainModel): Promise<number>{
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(
                    `INSERT INTO ${table}(id, name, difficulty, duration, interval, exercises, isPublic) VALUES(?, ?, ?, ?, ?, ?, ?)`,
                    [
                        param.id,
                        param.name,
                        param.difficulty,
                        param.duration,
                        param.interval,
                        param.exercises,
                        param.isPublic
                    ],
                    (_, { rowsAffected }) => {
                        firebase
                        .firestore()
                        .collection("trains")
                        .doc(param.id)
                        .set({
                            ...param.toObject(),
                            user: firebase.firestore().doc(`users/${firebase.auth().currentUser?.uid}`),
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                        .finally(() => {
                            resolve(rowsAffected);
                        })
                    },
                )
            },
            sqlError => {
                console.log(sqlError);
            }
        ));
    }

    static deleteById(id: string): Promise<number>{
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(
                    `DELETE FROM ${table} WHERE id = ?;`,
                    [id],
                    (_, { rowsAffected }) => {
                        firebase
                        .firestore()
                        .collection("trains")
                        .doc(id)
                        .delete()
                        .catch((error) => {
                            console.error(error)
                        })
                        .finally(() => {
                            resolve(rowsAffected);
                        })
                    }
                );
            },
            sqlError => {
                console.log(sqlError);
                resolve(0);
            }
        ));
    }

    // static updateById(param: Weight){
    //     return new Promise((resolve, reject) => db.transaction(
    //         tx => {
    //             tx.executeSql(
    //                 `UPDATE ${table} SET date = ?, weight = ? WHERE id = ?;`,
    //                 [param.date, param.weight, param.id],
    //                 (_, { rows }) => {
    //                     console.log("Rows affected update ", rows);
    //                 }
    //             );
    //         },
    //         sqlError => {
    //             console.log(sqlError);
    //         }
    //     ))
    // }

    // static findById(id: number){
    //     return new Promise((resolve, reject) => db.transaction(
    //         tx => {
    //             tx.executeSql(
    //                 `SELECT * FROM ${table} WHERE id = ?;`,
    //                 [id],
    //                 (_, { rows }) => {
    //                     resolve(rows);
    //                     console.log("Rows affected update ", rows);
    //                 }
    //             );
    //         },
    //         sqlError => {
    //             console.log(sqlError);
    //         }
    //     ))
    // }

    static find(limit: number = 10, sort: string = "ASC"): Promise<ITrainTiny[]>{
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(
                    `SELECT * FROM ${table} LIMIT ?;`,
                    [limit],
                    (_, { rows }) => {
                        if(rows.length > 0){
                            let data: ITrainTiny[] = [];
                            for(var x = 0; x < rows.length; x++){
                                data.push(TrainModel.modelToObject(rows.item(x)));
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
            }
        ))
    }
}