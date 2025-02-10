import express from "express";

// Other imports
import errorsHandler from "./middlewares/errorsHandler.js";
import notFound from "./middlewares/notFound.js";
import corsPolicy from "./middlewares/corsPolicy.js";
// Routing 
import booksRouter from "./routes/books.js";

// create a server instance
const app = express();

// set costant to port
const port = process.env.PORT || 3000;

// Gestione asset statici
app.use(express.static("public"));

// Abilita corsPolicy
app.use(corsPolicy);

// registro il body-parser per "application/json"
app.use(express.json());

// rotta per home page (http://localhost:3000)
app.get("/", (req, res) => {
  res.send("Home Page");
});

//other routes
app.use("/api/books", booksRouter);


// index leggi lista /books metodo get R
// show leggo un solo libro /books/:id metodo get R
// store salvo un libro /books metodo post C
// update aggiorno un libro /books/:id metodo put U
// destroy elimino un libro /books/:id metodo delete D

// gestione errori applicazione
app.use(errorsHandler);

// gestione not found url
app.use(notFound);

//server must listen on your host and your port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}}`);
});
