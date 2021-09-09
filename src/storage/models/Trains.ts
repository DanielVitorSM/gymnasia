import { DatabaseConnection } from './../connection';

const table = "trains";
const db = DatabaseConnection.getConnection();

export class Train {
    public id?: number;
    public name?: string;
    public difficulty?: string;
    public interval?: number;
    public exercises?: string;
    public isPublic?: boolean;
    public exercisesArray: Array<string>;

    constructor(id?: number, name?: string, difficulty?: string, interval?: number, exercises?: string,isPublic?: boolean){
        this.id = id;
        this.name = name;
        this.difficulty = difficulty;
        this.interval = interval;
        this.exercises = exercises;
        this.isPublic = isPublic;

        if(exercises)
            this.exercisesArray = JSON.parse(exercises);
    }
}

export class TrainService{
    // static addData(param: Train): Promise<number>{
    //     return new Promise((resolve, reject) => db.transaction(
    //         tx => {
    //             tx.executeSql(
    //                 `INSERT INTO ${table}(date, weight) VALUES(?, ?)`,
    //                 [param.date, param.weight],
    //                 (_, { insertId, rows }) => {
    //                     console.log("ID Insert: ", insertId);
    //                     resolve(insertId);
    //                 },
    //             )
    //         },
    //         sqlError => {
    //             console.log(sqlError);
    //         }
    //     ));
    // }

    static deleteById(id: number){
        db.transaction(
            tx => {
                tx.executeSql(
                    `DELETE FROM ${table} WHERE id = ?;`,
                    [id],
                    (_, { rows }) => {
                        console.log("Rows affected delete ", rows);
                    }
                );
            },
            sqlError => {
                console.log(sqlError);
            }
        )
    }

    static updateById(param: Weight){
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(
                    `UPDATE ${table} SET date = ?, weight = ? WHERE id = ?;`,
                    [param.date, param.weight, param.id],
                    (_, { rows }) => {
                        console.log("Rows affected update ", rows);
                    }
                );
            },
            sqlError => {
                console.log(sqlError);
            }
        ))
    }

    static findById(id: number){
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(
                    `SELECT * FROM ${table} WHERE id = ?;`,
                    [id],
                    (_, { rows }) => {
                        resolve(rows);
                        console.log("Rows affected update ", rows);
                    }
                );
            },
            sqlError => {
                console.log(sqlError);
            }
        ))
    }

    static findAll(limit: number = 10, sort: string = "ASC"){
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(
                    `SELECT * FROM ${table} LIMIT ? ORDER BY date ?;`,
                    [limit, sort],
                    (_, { rows }) => {
                        resolve(rows);
                        console.log("Rows affected update ", rows);
                    }
                );
            },
            sqlError => {
                console.log(sqlError);
            }
        ))
    }
}