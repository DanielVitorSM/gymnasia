import { DatabaseConnection } from './../connection';

const table = "weight";
const db = DatabaseConnection.getConnection();

export class Weight {
    public id?: number;
    public weight?: number;
    public date?: Date;

    constructor(id?: number, date?: Date, weight?: number){
        this.id = id;
        this.date = date;
        this.weight = weight;
    }
}

export class WeightService{
    static addData(param: Weight): Promise<number>{
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(
                    `INSERT INTO ${table}(date, weight) VALUES(?, ?)`,
                    [param.date, param.weight],
                    (_, { insertId, rows }) => {
                        console.log("ID Insert: ", insertId);
                        resolve(insertId);
                    },
                )
            },
            sqlError => {
                console.log(sqlError);
            }
        ));
    }

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