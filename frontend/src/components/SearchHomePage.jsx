import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";
import { NavLink,Link, useNavigate } from "react-router-dom"; // Assicurati che sia 'react-router-dom'
import styles from '../styles/SearchHomePage.module.css';  // Usa CSS Modules, se preferisci

export default function SearchHomePage() {
    const [temp, setTemp] = useState(""); // Usa una stringa per 'searchParam'
    const isFormEmpty = temp === "" || temp == 0; // Verifica se il campo è vuoto o uguale a 0

    const clearInput = () => {
        setTemp(""); // Svuota il campo di input
    };
    const navigate = useNavigate();
    
    const formattingSlug = (string) => {
        // Prendi solo la parte prima della virgola
        const cityName = string.split(',')[0];

        return cityName
            .toLowerCase()
            .trim()
            .normalize("NFD")
            .replace(/[^\w\s-]/g, '') // Rimuove caratteri non alfanumerici tranne spazi e trattini
            .replace(/[\s_-]+/g, '+') // Sostituisce spazi, trattini e underscore con '+'
            .replace(/^-+|-+$/g, '') // Rimuove trattini iniziali e finali
            .replace(/\.\s/g, '.'); // Mantiene il punto seguito da spazio
    };

    const handleChange = (e) => {
        setTemp(e.target.value); // Aggiorna lo stato con il nuovo valore dell'input
    };

    return (
        <section style={{ marginTop: "50px" }}>
            <motion.form
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="container m-auto p-4 shadow-lg rounded bg-light"
            >
                <h2 className="mb-4">Search for an accommodation</h2>

                <div className="form-group row mt-3">
                    <label htmlFor="searchParam">Search here city or address</label>
                    <div className={`col-12 col-md-10 d-flex`}>
                        <span className="input-group-text rounded-end-0"><FaSearch /></span>
                        <input
                            type="text"
                            className="form-control w-100 rounded-start-0 rounded-end-0"
                            id="searchParam"
                            name="searchParam"
                            placeholder="Insert city or address"
                            value={temp}
                            onChange={handleChange} // Usa onChange per aggiornare lo stato
                        />
                        {/* La X appare solo se c'è qualcosa nell'input */}
                        {temp && (
                            <span
                                className="input-group-text cursor-pointer rounded-start-0"
                                onClick={clearInput}
                            >
                                <FaTimes />
                            </span>
                        )}
                    </div>
                    <div className="col-12 col-md-2 mt-3 mt-md-0">
                        <Link 
                        className="btn btn-send w-100 w-md-0" 
                        to={temp !== "" ? `/advanced-research?search=${formattingSlug(temp)}` : "#"} 
                        disabled={isFormEmpty}                    
                        >
                        Search
                        </Link>
                    </div>
                </div>

            </motion.form>
        </section>
    );
}
