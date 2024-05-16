const pool = require('../models/db.js');
const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);

const provitional = async () => {
    const client = await pool.connect();
    try {
        const image = await readFileAsync('C:/Users/PD/Desktop/Biblioteca/backend/src/assets/carallo.jpg');
        const consult = 'INSERT INTO "book" ("name", "avance", "state", "type", "portrait", "user_id") VALUES ';
        const letras = [
            "('Libro 1', 50, 'Finalizado', 'Libro', $1, 1)",
            "('Libro 2', 30, 'Leyendo', 'Manhwa', $1, 1)",
            "('Libro 3', 10, 'Sin iniciar', 'Manga', $1, 1)",
            "('Libro 4', 80, 'Finalizado', 'Novela web', $1, 1)",
            "('Libro 5', 60, 'Leyendo', 'Manhua', $1, 1)",
            "('Libro 6', 20, 'Descartado', 'Manhwa', $1, 1)",
            "('Libro 7', 40, 'Sin iniciar', 'Manga', $1, 2)",
            "('Libro 8', 70, 'Finalizado', 'Manhua', $1, 2)",
            "('Libro 9', 90, 'Leyendo', 'Libro', $1, 2)",
            "('Libro 10', 25, 'Descartado', 'Manga', $1, 2)"
        ];
        for (let libro of letras) {
            const queryy = consult + libro;
            console.log(queryy);
            await client.query(queryy, [image]);
        }
    } catch (error) {
        console.log(error.message);
    } finally {
        console.log('vali monda');
        client.release();
    }
}

provitional();
