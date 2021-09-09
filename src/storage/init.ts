import { WebSQLDatabase } from 'expo-sqlite';
import { DatabaseConnection } from './connection';

var db: WebSQLDatabase;

export default class DatabaseInit {
    constructor() {
        db = DatabaseConnection.getConnection();
    }

    private InitDb() {
        var sql: string[] = [
            `CREATE TABLE IF NOT EXISTS weights(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                weight FLOAT,
                date DATE
            );`,
            `CREATE TABLE IF NOT EXISTS trains(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(255),
                difficulty VARCHAR(255),
                interval INTEGER,
                isPublic BOOLEAN,
                exercises TEXT
            );`,
        ];

        db.transaction(
            tx => {
                for(var i = 0; i < sql.length; i++){
                    tx.executeSql(sql[i]);
                }
            }, 
            error => {
                console.log("Error callback: " + JSON.stringify(error));
            },
            () => {
                console.log("DbInited with success");
            }
        );
    }
}