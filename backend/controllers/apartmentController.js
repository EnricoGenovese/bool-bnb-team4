import connection from "../connection.js";
import { RandomNum } from "../utilities/functions.js";
import { upload } from "../utilities/functions.js"

function index(req, res) {
    let { search, category, minRooms, minBed } = req.query;

    search = search ? `%${search.trim()}%` : '%';
    category = category ? category : '0';
    minRooms = minRooms ? minRooms : '0';
    minBed = minBed ? minBed : '0';

    const sql = `
        SELECT apartments.*, categories.name AS category_name
        FROM apartments
        JOIN categories ON apartments.id_category = categories.id
    WHERE
        (address LIKE ? OR city LIKE ?)
    AND(rooms_number >= ?)
    AND(beds_number >= ?)
    AND(id_category = ? OR ? = '0')
    
        `
    console.log("Query eseguita:", sql); // Per debug
    connection.query(sql, [search, search, minRooms, minBed, category, category], (err, results) => {
        if (err) return res.status(500).json({ error: 'Errore del server', details: err });
        const response = {
            status: "success",
            count: results.length,
            item: results
        }
        console.log(response)
        res.json(response);
    });
}

function show(req, res) {

    const id = +(req.params.id);

    const sql = `SELECT * FROM apartments WHERE id = ?`
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Errore del server', details: err });
        const item = results[0];

        if (item.id == null) return res.status(404).json({ error: 'Appartamento non trovato' });
        const sqlComments = "SELECT * FROM `comments` WHERE `id_apartment` = ?";
        connection.query(sqlComments, [id], (err, comments) => {
            if (err) return res.status(500).json({ error: "Error server" });

            item.comments = comments;

            const response = {
                status: "success",
                commentsCount: comments.length,
                item
            }
            res.json(response)
        });
    })
};

function store(req, res) {

    if (!req.file) {
        return res.status(400).send({ error: 'No file uploaded' });
    }

    // Ottieni i dettagli del file
    const { path } = req.file;
    console.log(path)

    // Costruisci l'URL dell'immagine (presupponendo che i file siano serviti dalla cartella "uploads")
    const imageUrl = `${path.slice(11)}`;

    // I dati da inserire nella query

    const { category, description, address, city, roomsNumber, bedsNumber, bathroomsNumber, squareMeters } = req.body;

    if (!squareMeters || !bedsNumber || !roomsNumber || !bathroomsNumber ||
        !city || !address || !description || !category) {
        return res.status(400).json({ success: false, message: "Uno o più campi risultano vuoti" })
    }
    // Prepara la query per inserire i dati dell'appartamento con l'URL dell'immagine
    const sql = `INSERT INTO apartments (id_owner, id_category, description, address, city, rooms_number, beds_number, bathrooms_number, square_meters, img)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Inserisci i dati nel database, incluso l'URL dell'immagine
    connection.query(sql, [
        RandomNum(),
        category,
        description,
        address,
        city,
        roomsNumber,
        bedsNumber,
        bathroomsNumber,
        squareMeters,
        imageUrl
    ], (err, results) => {
        if (err) {
            console.error('Errore durante il salvataggio nel database:', err);
            return res.status(500).json({ error: 'Errore nel salvataggio nel database' });
        }

        res.status(200).json({
            message: 'Apartment added successfully',
            file: req.file,
            imageUrl: imageUrl
        });
    });
}

function storeComments(req, res) {
    const { id } = req.params
    const { text, name, entryDate, daysOfStay } = req.body;

    const sql = `INSERT INTO bool_bnb.comments
 (id_apartment, text, name, entry_date, days_of_stay)
 VALUES (?, ?, ?, ?, ?)`

    connection.query(sql, [id, text, name, entryDate, daysOfStay], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: "Comment added", results });
    })
}

function modify(req, res) {
    const { id } = req.params;
    const likeCountSql = `SELECT apartments.likes FROM apartments
    WHERE apartments.id = ?`

    connection.query(likeCountSql, [id], (err, results) => {
        if (err) return results.status(500).json({ error: err });
        console.log(results[0].likes);

        let like = results[0].likes;
        (like === 0 || like === "undefined" || like === null) ? 0 : like = +(like) + 1;

        const sql = `UPDATE bool_bnb.apartments SET likes = ? WHERE (apartments.id = ?);`
        connection.query(sql, [like, id], (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ success: true, message: "Likes incrementato correttamente", result });
        })
    })
}

export { index, show, storeComments, store, upload, modify, };
