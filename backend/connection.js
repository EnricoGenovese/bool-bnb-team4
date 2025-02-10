import mysql from "mysql2";

/* Creo la connessione al database a cui passo i dati del mio host, la porta, l'user e la password del database e il nome del database */
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
});
// Mi connetto al database
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database');

})

export default connection;