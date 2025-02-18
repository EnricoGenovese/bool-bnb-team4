import connection from "../connection.js";
import { RandomNum } from "../utilities/functions.js";
import { upload, formattingSlug } from "../utilities/functions.js";
import slugify from "slugify";

function index(req, res) {
    let { search, category, minRooms, minBeds } = req.query;

    console.log("Query parameters:", req.query);

    search = search ? `%${search.trim()}%` : '%';
    category = category ? category : '0';
    minRooms = minRooms ? minRooms : '0';
    minBeds = minBeds ? minBeds : '0';

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
    connection.query(sql, [search, search, minRooms, minBeds, category, category], (err, results) => {
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

function indexHomePage(req, res) {
    let { search } = req.query;
    search = search ? `%${search.trim()}%` : '%';

    const sql = `
    SELECT * FROM apartments
    WHERE
        (address LIKE ? OR city LIKE ?)
    ORDER BY apartments.likes DESC`;
    connection.query(sql, [search, search], (err, results) => {
        if (err) return res.status(500).json({ error: 'Errore del server', details: err });
        const response = {
            success: true,
            count: results.length,
            items: results
        }

        res.json(response);
    })

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
    const slug = req.params.slug

    const sql = `SELECT apartments.*, owners.email FROM apartments
    JOIN owners ON apartments.id_owner = owners.id
    WHERE apartments.slug = ?`
    connection.query(sql, [slug], (err, results) => {
        if (err) return res.status(500).json({ error: 'Errore del server', details: err });
        if (results.length == 0) return res.status(404).json({ error: 'Appartamento non trovato', err });
        const item = results[0];

        if (item.slug == null) return res.status(404).json({ error: 'Appartamento non trovato', err });
        const sqlreviews = "SELECT * FROM `reviews` WHERE `apartment_slug` = ? ORDER BY update_date DESC";
        connection.query(sqlreviews, [item.slug], (err, reviews) => {
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
    const errors = {};


    // Controllo se c'è un file
    if (!req.file) {
        errors.image = 'No file uploaded';
    } else {
        const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!validImageTypes.includes(req.file.mimetype)) {
            errors.image = 'The uploaded file must be an image (JPEG, PNG, JPG)';
        } else if (req.file.size > 10000000) { // 10 MB in bytes
            errors.image = 'The image file must not be larger than 10MB';
        }
    }

    // Validazione descrizione
    let { description, address, city, category, roomsNumber, bedsNumber, bathroomsNumber, squareMeters } = req.body;


    if (!description.trim()) {
        errors.description = "The `Summary Title` field cannot be empty";
    } else if (description.length < 5) {
        errors.description = "The `Summary Title` field must be at least 5 characters long";
    } else if (description.length > 100) {
        errors.description = "The `Summary Title` field must be at most 100 characters long";
    } else if (!/^[a-zA-Z0-9,.'\sàèéìòù]*$/.test(description)) {
        errors.description = "The `Summary Title` can only contain letters, numbers, commas, periods, and spaces.";
    }

    // Validazione indirizzo
    if (!address.trim()) {
        errors.address = "The `Full address` field cannot be empty";
    } else if (address.length < 5) {
        errors.address = "The `Full address` field must be at least 5 characters long";
    } else if (address.length > 100) {
        errors.address = "The `Full address` field must be at most 100 characters long";
    } else if (!/^[a-zA-Z0-9,.'\sàèéìòù]*$/.test(address)) {
        errors.address = "The `Address` can only contain letters, numbers, commas, periods, and spaces.";
    }

    // Validazione città
    if (!city.trim()) {
        errors.city = "The `City` field cannot be empty";
    } else if (city.length > 100) {
        errors.city = "The `City` field must be at most 100 characters long";
    } else if (!/^[a-zA-Z0-9,.'\sàèéìòù]*$/.test(city)) {
        errors.city = "The `City` can only contain letters, numbers, commas, periods, and spaces.";
    }

    // Validazione campi numerici
    const validateNumber = (field, value) => {
        if (value < 1 || !Number.isInteger(Number(value)) || value.startsWith("0") || value.includes('e') || value.includes('E')) {
            errors[field] = `The number of ${field} must be a positive integer and cannot start with 0 or contain "e".`;
        }
    };

    validateNumber("rooms", roomsNumber);
    validateNumber("beds", bedsNumber);
    validateNumber("bathrooms", bathroomsNumber);
    validateNumber("square meters", squareMeters);

    // Validazione categoria
    if (!category || category < 1 || !Number.isInteger(Number(category)) || category.startsWith("0") || category.includes('e') || category.includes('E') || category > 6) {
        errors.category = "Invalid category field";
    }

    // Se ci sono errori, restituisci la lista degli errori
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    // Se non ci sono errori, continua con l'inserimento nel database
    const { path } = req.file;
    const imageUrl = `${path.slice(11)}`;
    let likes = req.body.likes || 0;
    let slug = [
        formattingSlug(description),
        formattingSlug(city),
        formattingSlug(address),
        formattingSlug(category)
    ].join('-');

    console.log(slug)

    // function createSlug() {
    //     return description
    //         .toLowerCase()                // Trasforma in minuscolo
    //         .trim()                        // Rimuove gli spazi prima e dopo
    //         .replace(/[^\w\s-]/g, '')      // Rimuove caratteri speciali
    //         .replace(/[\s_-]+/g, '-')      // Sostituisce spazi e trattini con un singolo trattino
    //         .replace(/^-+|-+$/g, '');      // Rimuove eventuali trattini all'inizio e alla fine
    // }

    // Query per inserire nel database
    const sql = `INSERT INTO apartments (id_owner, id_category, description, address, city, rooms_number, beds_number, bathrooms_number, square_meters, img, likes, slug)
                VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
        slug

    ], (err, results) => {
        if (err) {
            console.error('Errore durante il salvataggio nel database:', err);
            return res.status(500).json({ error: 'Errore nel salvataggio nel database', err });
        }

        res.status(200).json({
            message: 'Apartment added successfully',
            id: results.insertId,
            file: req.file,
            imageUrl: imageUrl,
            slug
        });
    });
}


function storereviews(req, res) {
    const { slug } = req.params;
    console.log(slug)
    const { text, name, entryDate, daysOfStay, vote } = req.body;
    const errors = {};

    // Validazione name
    if (!name.trim()) {
        errors.name = 'Name required';
    } else if (name.length < 2) {
        errors.name = 'The name must contain at least 2 characters';
    } else if (name.length > 50) {
        errors.name = 'The name must contain at most 50 characters';
    }

    // Validazione text
    if (!text.trim()) {
        errors.text = 'Comments required';
    } else if (text.length > 255) {
        errors.text = 'The comment must contain at most 255 characters';
    }

    // Validazione vote
    if (!vote) {
        errors.vote = 'Vote required';
    } else if (!Number.isInteger(Number(vote)) || vote < 1 || vote > 5) {
        errors.text = 'Invalid field for vote (min 1 max 5)';
    }

    // Validazione entryDate
    const today = new Date();
    const minDate = new Date('2000-01-01'); // Esempio di data minima

    // Controlla se l'input è vuoto
    if (!entryDate) {
        errors.entryDate = 'Entry date required';
    } else {
        // Verifica che l'input sia nel formato YYYY-MM-DD
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(entryDate)) {
            errors.entryDate = 'The entry date must be in the format YYYY-MM-DD';
        } else {
            const enteredDate = new Date(entryDate);

            // Verifica se la data è valida
            if (isNaN(enteredDate.getTime()) || enteredDate.toString() === "Invalid Date") {
                errors.entryDate = 'The entry date must be a valid date';
            } else if (enteredDate > today) {
                errors.entryDate = 'entryDate You cannot enter a future date';
            } else if (enteredDate < minDate) {
                errors.entryDate = 'entryDate The date is too old';
            }
        }
    }



    // Validazione daysOfStay
    if (!daysOfStay) {
        errors.daysOfStay = 'Days of stay required';
    } else if (daysOfStay < 1) {
        errors.daysOfStay = 'Days of stay must be at least 1';
    } else if (daysOfStay > 365) {
        errors.daysOfStay = 'daysOfStay You cannot enter a number of days greater than 365';
    } else if (daysOfStay.toString().includes('e') || daysOfStay.toString().includes('E')) {
        errors.daysOfStay = 'daysOfStay You must enter a number';
    } else if (!Number.isInteger(Number(daysOfStay)) || daysOfStay.startsWith("0")) {
        errors.text = 'daysOfStay Only integer numbers are accepted ';
    }

    // Se ci sono errori, restituisci gli errori
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    // Se non ci sono errori, inserisci i dati nel database
    const sql = `INSERT INTO bool_bnb.reviews (apartment_slug, text, name, entry_date, days_of_stay, vote)
                 VALUES (?, ?, ?, ?, ?, ?)`;

    connection.query(sql, [slug, text, name, entryDate, daysOfStay, vote], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: "Review added", results });
    });
}


function modify(req, res) {
    const { slug } = req.params;
    const likeCountSql = `SELECT apartments.likes FROM apartments
    WHERE apartments.slug = ?`;

    connection.query(likeCountSql, [slug], (err, results) => {
        if (err) return results.status(500).json({ error: err });


        let like = results[0].likes;
        (like === 0 || like === "undefined" || like === null) ? 0 : like = +(like) + 1;

        const sql = `UPDATE bool_bnb.apartments SET likes = ? WHERE (apartments.slug = ?)`;
        connection.query(sql, [like, slug], (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({
                success: true,
                message: "Likes incrementato correttamente",
                result,
                likes: like
            });
        })
    })
}

export { index, indexCategories, indexHomePage, show, storereviews, store, upload, modify };
