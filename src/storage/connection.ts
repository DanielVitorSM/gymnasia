import * as SQLite from 'expo-sqlite';
import { DATABASE_URI } from '../global/constants/storage';

export const DatabaseConnection = {
    getConnection: () => SQLite.openDatabase(DATABASE_URI)
}