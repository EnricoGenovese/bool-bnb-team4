import connection from "../connection.js";
import CustomError from "../classes/CustomError.js";

// function index(req, res) {
//     const { search, category, minRooms, minBath } = req.query;
//     if (!search) {
//         const sql = "SELECT *  FROM `apartments` ORDER BY `likes` DESC;";
//         connection.query(sql, (err, results) => {
//             if (err) res.status(500).json({ error: 'Errore del server' })
//             res.json(results)
//         })
//     } else {

//         const searchSql = `SELECT * FROM apartments
//         JOIN categories ON apartments.id_category = categories.id
//         WHERE (address LIKE '%${search}%' OR city LIKE '%${search}%')
//         OR('${category}'IS NULL OR categories.name ='${category}')`

//         connection.query(searchSql, (err, results) => {

//             if (err) res.status(500).json({ error: 'Errore del server' });
//             res.json(results)
//         })
//     }
//     // const response = {
//     //     status: "success",
//     //     count: results.length,
//     //     items: results
//     // }



// }

function index(req, res) {
    let { search, category, minRooms, minBed } = req.query;

    // Se un valore non è stato passato, lo settiamo a una condizione "sempre vera"
    search = search ? `%${search}%` : '%';   // Se non c'è search, cerca tutto
    category = category ? category : '0';    // Se category è assente, metti 0 (cioè ignora il filtro)
    minRooms = minRooms ? minRooms : '0';     // Se minRooms è assente, metti 0 (nessun limite minimo)
    minBed = minBed ? minBed : '0';        // Se minBath è assente, metti 0 (nessun limite minimo)

    const searchSql = `
        SELECT *
        FROM apartments
    WHERE
        (address LIKE '${search}' OR city LIKE '${search}')
    AND(rooms_number >= ${minRooms})
    AND(beds_number >= ${minBed})
    AND(id_category = ${category} OR ${category} = '0')
        `

    console.log("Query eseguita:", searchSql); // Per debug

    connection.query(searchSql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Errore del server', details: err });
        res.json(results);
    });
}

function show(req, res) {
    const id = parseInt(req.params.id);
    // Recupero tutti i libri e per ciascun libro il numero delle recensioni e la media voto totale:
    const sql = `SELECT apartments.*, AVG(reviews.vote) AS vote_average, COUNT(reviews.text) AS commenti
                FROM reviews
                RIGHT JOIN apartments 
                ON apartments.id = reviews.apartment_id
                WHERE apartments.id = ? `;
    // Uso il metodo query() per passargli la query SQL e una funzione di callback:
    connection.query(sql, [id], (err, results) => {
        // Se rilevo un errore nella chiamata al database, restituisco l'errore HTTP 500 Internal Server Error” e un messaggio personalizzato:
        if (err) return res.status(500).json({
            error: 'Errore del server'
        });
        // Assegno alla costante item i dati ritornati dalla query:
        const item = results[0];
        if (item.id == null) return res.status(404).json({ error: 'Libro non trovato' });
        // Creo la query SQL con le Prepared statements (? al posto di id) per evitare le SQL Injections:
        const sqlReviews = "SELECT * FROM `reviews` WHERE `apartment_id` = ?";
        // Uso il metodo query() per passargli la query SQL, il valore di di id nel segnaposto "?", e una funzione di callback:
        connection.query(sqlReviews, [id], (err, reviews) => {
            if (err) return res.status(500).json({ error: "Error server" });
            // Aggiungo all'oggetto item una chiave/proprietà che conterrà i commenti associati:
            item.reviews = reviews;
            // Ritorno l'oggetto (item)
            res.json(item);
        });
    });
}

function store(req, res) {
}

// Agiunta dei commenti al singolo libro
function storeReview(req, res) {
    // Recuperiamo l'id:
    const { id } = req.params
    // Recuperiamo il body:
    const { text, name, vote } = req.body
    // Prepariamo la query:
    const sql = "INSERT INTO reviews (text, name, vote, apartment_id) VALUES (?, ?, ?, ?)"

    // Eseguo la query:
    connection.query(sql, [text, name, vote, id], (err, results) => {
        if (err) return res.status(500).json({ error: "Query non trovata nel database" });
        res.status(201).json({ message: "Review added", id: results.insertId });
    })
}

function update(req, res) {
}
function destroy(req, res) {
    const id = parseInt(req.params.id);
    // Uso il metodo query() per passargli la query SQL, il valore di "?", e una funzione di callback:
    connection.query("DELETE FROM `apartments` WHERE `id` = ?", [id], (err) => {
        // Se rilevo un errore restituisco l'errore HTTP 500 Internal Server Error” e un messaggio personalizzato:
        if (err) return res.status(500).json({ error: 'Errore del server! Cancellazione fallita' });
        // Invio lo status 204: il server ha completato con successo la richiesta, ma restituisco alcun contenuto
        res.sendStatus(204);
    });
}

export { index, show, store, storeReview, update, destroy };
