import connection from "../connection.js";
import CustomError from "../classes/CustomError.js";

function index(req, res) {
    let { search, category, minRooms, minBed } = req.query;
    // Se un valore non è stato passato, lo settiamo a una condizione "sempre vera"
    search = search ? `%${search.trim()}%` : '%';   // Se non c'è search, cerca tutto
    category = category ? category : '0';    // Se category è assente, metti 0 (cioè ignora il filtro)
    minRooms = minRooms ? minRooms : '0';     // Se minRooms è assente, metti 0 (nessun limite minimo)
    minBed = minBed ? minBed : '0';        // Se minBath è assente, metti 0 (nessun limite minimo)
    const sql = `
        SELECT *
        FROM apartments
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
