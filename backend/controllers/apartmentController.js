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
        SELECT apartments.*, categories.name AS category_name, owners.email
        FROM apartments
        JOIN categories ON apartments.id_category = categories.id
        JOIN owners ON apartments.id_owner = owners.id 

    WHERE
        (address LIKE ? OR city LIKE ?)
    AND(rooms_number >= ?)
    AND(beds_number >= ?)
    AND(id_category = ? OR ? = '0')
    ORDER BY apartments.likes DESC
        `
    // console.log("Query eseguita:", sql); // Per debug
    connection.query(sql, [search, search, minRooms, minBed, category, category], (err, results) => {
        if (err) return res.status(500).json({ error: 'Errore del server', details: err });
        const response = {
            status: "success",
            count: results.length,
            items: results
        }
        // console.log(response)
        res.json(response);
    });
}

function indexCategories(req, res) {
    const sql = `SELECT * FROM categories;`

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Errore del server', details: err });
        const response = {
            success: true,
            count: results.length,
            items: results
        }

        res.json(response);
    })
}

function show(req, res) {

    const id = +(req.params.id);

    const sql = `SELECT apartments.*, owners.email FROM apartments
    JOIN owners ON apartments.id_owner = owners.id
    WHERE apartments.id = ?`
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Errore del server', details: err });
        const item = results[0];

        if (item.id == null) return res.status(404).json({ error: 'Appartamento non trovato', err });
        const sqlreviews = "SELECT * FROM `reviews` WHERE `id_apartment` = ?";
        connection.query(sqlreviews, [id], (err, reviews) => {
            if (err) return res.status(500).json({ error: "Error server", err });

            item.reviews = reviews;

            reviews.forEach((review) => {
                const tempString = JSON.stringify(review.entry_date);
                review.entry_date = tempString.slice(1, 11);
            });

            const response = {
                status: "success",
                reviewsCount: reviews.length,
                item
            }
            res.json(response)
        });
    })
};

function store(req, res) {

    console.log(req.file)

    if (!req.file) {
        return res.status(400).send({ error: 'No file uploaded' });
    }

    // Ottieni i dettagli del file
    const { path } = req.file;
    // console.log(path)

    // Costruisci l'URL dell'immagine (presupponendo che i file siano serviti dalla cartella "uploads")
    const imageUrl = `${path.slice(11)}`;

    // I dati da inserire nella query



    let { category, description, address, city, roomsNumber, bedsNumber, bathroomsNumber, squareMeters, likes } = req.body;
    // console.log(likes)
    if (!likes) {
        likes = 0
    }
    if (!squareMeters || !bedsNumber || !roomsNumber || !bathroomsNumber ||
        !city || !address || !description || !category) {


        return res.status(400).json({ success: false, message: "Uno o più campi risultano vuoti", err })
    }
    // Prepara la query per inserire i dati dell'appartamento con l'URL dell'immagine
    const sql = `INSERT INTO apartments (id_owner, id_category, description, address, city, rooms_number, beds_number, bathrooms_number, square_meters, img, likes)
               VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
        imageUrl,
        likes,
    ], (err, results) => {
        if (err) {
            console.error('Errore durante il salvataggio nel database:', err);
            return res.status(500).json({ error: 'Errore nel salvataggio nel database', err });
        }

        // console.log(results)

        res.status(200).json({
            message: 'Apartment added successfully',
            id: results.insertId,
            file: req.file,
            imageUrl: imageUrl,
        });
    });
}

function storereviews(req, res) {
    const { id } = req.params
    const { text, name, entryDate, daysOfStay, vote } = req.body;

    if (!text || !name || !entryDate || !daysOfStay) {

        return res.status(400).json({ success: false, message: "Uno o più campi risultano vuoti", err })
    }

    const sql = `INSERT INTO bool_bnb.reviews
 (id_apartment, text, name, entry_date, days_of_stay, vote)
 VALUES (?, ?, ?, ?, ?, ?)`

    connection.query(sql, [id, text, name, entryDate, daysOfStay, vote], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: "review added", results });
    })
}

function modify(req, res) {
    const { id } = req.params;
    const likeCountSql = `SELECT apartments.likes FROM apartments
    WHERE apartments.id = ?`;

    connection.query(likeCountSql, [id], (err, results) => {
        if (err) return results.status(500).json({ error: err });
        // console.log(results[0].likes);

        let like = results[0].likes;
        (like === 0 || like === "undefined" || like === null) ? 0 : like = +(like) + 1;

        const sql = `UPDATE bool_bnb.apartments SET likes = ? WHERE (apartments.id = ?)`;
        connection.query(sql, [like, id], (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ success: true, 
                message: "Likes incrementato correttamente", 
                result,
                likes:like
            });
        })
    })
}

export { index, indexCategories, show, storereviews, store, upload, modify };
