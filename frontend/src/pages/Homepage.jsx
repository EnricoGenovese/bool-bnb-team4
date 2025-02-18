import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import Card from "../components/Card.jsx";
import { Link, NavLink } from "react-router-dom";
import LoaderCard from "../components/LoaderCard.jsx";
import axios from "axios";
import SearchHomePage from "../components/SearchHomePage.jsx";
import { motion } from "framer-motion";

export default function Homepage() {

    const [homeApartments, setHomeApartments] = useState([]);
    const { addLike, isLoading, setIsLoading, search, setSearch } = useGlobalContext();
    const apiURL = `http://localhost:3000/api`;
    const endpoint = `/apartments/`;

    function getHomeApartments() {
        const searchValue = typeof search?.search === "string" ? search.search.trim() : "";

        axios.get(`${apiURL}${endpoint}homepage`, {
            params: searchValue ? { search: searchValue } : {}
        })
            .then((res) => {
                console.log(res.data);
                setHomeApartments(res.data.items);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);                
                }, 1000);
            });
    }
    

    useEffect(() => {
        const params = {};

        // Verifica se il search esiste e se contiene una stringa di ricerca valida
        if (search?.search && typeof search.search === "string" && search.search.trim() !== "") {
            params.search = search.search.trim();
        }

        const queryParams = new URLSearchParams(params).toString();

        // Se ci sono parametri di ricerca, aggiungili nell'URL
        if (queryParams) {
            window.history.pushState({}, '', `?${queryParams}`);
        } else {
            window.history.pushState({}, '', '/');
        }

        getHomeApartments();
        setIsLoading(true);
    }, [search]); // Si attiva quando la ricerca cambia

    return (
        <div className="mb-3">
            <div className="container-fluid jumbotron p-5 mb-4 bg-light text-center">
                {/* Testo animato da destra */}
                <motion.p
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-white"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", padding: "20px", borderRadius: "5px" }}
                >
                    <h1 className="display-4 jumbo-text">Bool B&B</h1>
                    <p className="lead jumbo-text">
                        Find the perfect apartment for you with just one click.
                    </p>
                </motion.p>

                {/* Pulsante animato da destra con ritardo */}
                <motion.div
                    initial={{ x: -180, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                >
                    <Link className="btn custom-button mt-5 link-btn" to={"/advanced-research"}>
                        Find out more
                    </Link>
                </motion.div>
            </div>

            <SearchHomePage />
            <div className="row container m-auto">
                {homeApartments.length >= 1 ? (
                    <>
                        <h3 className="py-2">Our most {homeApartments.length} loved apartments: </h3>
                        {homeApartments.map((apartment, index) => (
                            <div className="col-12 col-md-6 col-lg-3 g-4" key={apartment.id}>
                                {isLoading ? (
                                    <LoaderCard />
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: index * 0.2 }} // Ritardo progressivo
                                    >
                                        <Card apartment={apartment} addLike={addLike} />
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </>
                ) : (
                    <h3 className="display-5">No results found for this research</h3>
                )}
            </div>
        </div>
    );
}
