import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";
import styles from '../styles/SearchHomePage.module.css';  // Usa CSS Modules, se preferisci

export default function SearchHomePage({ submit, change, temp }) {
    const isFormEmpty = Object.values(temp).every(value => value === "" || value == 0);

    const clearInput = () => {
        change({ target: { name: "searchParam", value: "" } });
    };

    return (
        <section style={{ marginTop: "50px" }}>
            <motion.form
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                onSubmit={submit} className="container m-auto p-4 shadow-lg rounded bg-light">

                <h2 className="mb-4">Search for an accomodation</h2>

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
                            value={temp.searchParam}
                            onChange={change} />
                        {/* La X appare solo se c'è qualcosa nell'input */}
                        {temp.searchParam && (
                            <span
                                className="input-group-text cursor-pointer rounded-start-0"
                                onClick={clearInput}
                            >
                                <FaTimes />
                            </span>
                        )}
                    </div>
                    <div className="col-12 col-md-2 mt-3 mt-md-0">
                        <button type="submit" className="btn btn-send w-100 w-md-0" disabled={isFormEmpty}>Search</button>
                    </div>
                </div>

            </motion.form>
        </section>
    );
}
