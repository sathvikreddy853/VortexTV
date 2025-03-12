import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
/*

using env file was causing some error as of now wlets hard code this part


*/



const pool = mysql.createPool({
    host: 'localhost',
    user: 'aditya',
    password: 'your_new_password',
    database: 'vortexTv',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();

export default pool;
