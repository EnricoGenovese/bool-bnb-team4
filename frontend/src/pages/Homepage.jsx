// import { useEffect, useState } from "react";
// import { useGlobalContext } from "../contexts/GlobalContext";
// import Card from "../components/Card.jsx";
// import { Link, NavLink } from "react-router-dom";
// import LoaderCard from "../components/LoaderCard.jsx";
// import axios from "axios";
// import SearchHomePage from "../components/SearchHomePage.jsx";
// import { motion } from "framer-motion";
// import PaginationHome from "../components/PaginationHome.jsx"


// export default function Homepage() {

//     const [homeApartments, setHomeApartments] = useState([]);
//     const [apartmentsCount, setApartmentsCount] = useState(0)
//     const [isPaginationFlag, setIsPaginationFlag] = useState(false)
//     const { addLike, isLoading, setIsLoading, isHomePage } = useGlobalContext();
//     const [page, setPage] = useState(1);
//     const [numPages, setNumPages] = useState(0);
//     const apiURL = `http://localhost:3000/api`;
//     const endpoint = `/apartments/`;
//     const [search, setSearch] = useState("")
//     const [tempFormData, setTempFormData] = useState({
//         searchParam: "",
//     });
//     const delayAnim = 0.05;
//     function getHomeApartments() {
//         const searchValue = typeof search?.searchParam === "string" ? search.searchParam.trim() : "";

//         // Crea un oggetto params che contiene sia la ricerca che la pagina
//         const params = {
//             page,
//             ...(searchValue && { searchParam: searchValue }), // Aggiungi il parametro 'searchParam dubai' solo se ha un valore
//         };

//         axios.get(`${apiURL}${endpoint}homepage`, { params })
//             .then((res) => {
//                 console.log(res.data);
//                 setNumPages(Math.ceil(res.data.count / res.data.limit));
//                 setHomeApartments(res.data.items);
//                 setApartmentsCount(res.data.count);
//                 res?.data?.count <= 20 ? setIsPaginationFlag(true) : setIsPaginationFlag(false);

//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//             .finally(() => {
//                 setTimeout(() => {
//                     setIsLoading(false);
//                 }, 1000);
//             });
//     }

//     const handleOnChange = (e) => {
//         const { name, value } = e.target;
//         setTempFormData((prevData) => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleOnSubmit = (e) => {
//         e.preventDefault();
//         setSearch(tempFormData);
//         setPage(1);
//     }
//     function handlePageChange(page) {
//         setPage(page);
//         isHomePage ? 500 : 0;

//     }

//     useEffect(() => {
//         const params = {};
//         console.log(page)
//         console.log(search.searchParam)

//         // Verifica se il searchParam dubai esiste e se contiene una stringa di ricerca valida
//         if (search?.searchParam && typeof search.searchParam === "string" && search.searchParam.trim() !== "") {
//             params.searchParam = search.searchParam.trim();
//         }
//         if (page?.page && typeof page === 'number') {
//             params.page = page;
//         }

//         const queryParams = new URLSearchParams(params).toString();

//         // Se ci sono parametri di ricerca, aggiungili nell'URL
//         if (queryParams) {
//             window.history.pushState({}, '', `?${queryParams}`);
//         } else {
//             window.history.pushState({}, '', '/');
//         }

//         getHomeApartments();
//         setIsLoading(true);
//         return () => {
//         }
//     }, [search, page]); // Si attiva quando la ricerca cambia

//     return (
//         <div className="mb-3">
//             <div className="container-fluid jumbotron p-5 mb-4 bg-light text-center">
//                 {/* Testo animato da destra */}
//                 <motion.div
//                     initial={{ x: 100, opacity: 0 }}
//                     animate={{ x: 0, opacity: 1 }}
//                     transition={{ duration: 0.8, ease: "easeOut" }}
//                     className="text-white"
//                     style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", padding: "20px", borderRadius: "5px" }}
//                 >
//                     <h1 className="display-4 jumbo-text">Bool B&B</h1>
//                     <p className="lead jumbo-text">
//                         Find the perfect apartment for you with just one click.
//                     </p>
//                 </motion.div>

//                 {/* Pulsante animato da destra con ritardo */}
//                 <motion.div
//                     initial={{ x: -180, opacity: 0 }}
//                     animate={{ x: 0, opacity: 1 }}
//                     transition={{ duration: 0.8, delay: delayAnim, ease: "easeOut" }}
//                 >
//                     <Link className="btn custom-button mt-5 link-btn" to={"/advanced-research"}>
//                         Find out more
//                     </Link>
//                 </motion.div>
//             </div>

//             <SearchHomePage submit={handleOnSubmit} change={handleOnChange} temp={tempFormData} />
//             <div className="row container m-auto">
//                 {homeApartments.length >= 1 ? (
//                     <>
//                         <h3 className="py-2 my-5">Our most {apartmentsCount} loved apartments
//                             {search?.searchParam ?
//                                 <>
//                                     &nbsp;for: <strong>{search?.searchParam}</strong>
//                                 </>
//                                 :
//                                 ''}</h3>
//                         {homeApartments?.map((apartment, index) => (
//                             <div className="col-12 col-md-6 col-lg-3 g-4" key={apartment.id}>
//                                 {isLoading ? (
//                                     <LoaderCard />
//                                 ) : (
//                                     <motion.div
//                                         initial={{ opacity: 0 }}
//                                         animate={{ opacity: 1 }}
//                                         transition={{ duration: 0.5, delay: index * delayAnim }} // Ritardo progressivo
//                                     >
//                                         <Card apartment={apartment} addLike={addLike} />
//                                     </motion.div>
//                                 )}
//                             </div>
//                         ))}

//                         {!isPaginationFlag &&
//                             <div>
//                                 <PaginationHome page={page} handlePageChange={handlePageChange} numPages={numPages} />
//                             </div>}
//                     </>

//                 ) : (
//                     <h3 className="my-5">No results found for this research</h3>
//                 )}
//             </div>
//         </div>
//     );
// }


import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import Card from "../components/Card.jsx";
import CardMostVisitedCity from "../components/CardMostVisitedCity.jsx";
import { Link, NavLink } from "react-router-dom";
import LoaderCard from "../components/LoaderCard.jsx";
import axios from "axios";
import SearchHomePage from "../components/SearchHomePage.jsx";
import { motion } from "framer-motion";
import PaginationHome from "../components/PaginationHome.jsx"
import Carousel from "../components/Carousel.jsx";

export default function Homepage() {
    // MOST LOVED
    const [mostLovedApartments, setMostLovedApartments] = useState([]);
    const [mostLovedApartmentsCount, setMostLovedApartmentsCount] = useState(0);
    // MOST VISITED CITY
    const [mostVisitedCity, setMostVisitedCity] = useState([]);
    const [mostVisitedCityCount, setMostVisitedCityCount] = useState(0);

    const { addLike, isLoading, setIsLoading, isHomePage } = useGlobalContext();
    const [page, setPage] = useState(1);
    const apiURL = `http://localhost:3000/api`;
    const endpoint = `/apartments/`;
    const [search, setSearch] = useState("")
    const [tempFormData, setTempFormData] = useState({
        searchParam: "",
    });
    const delayAnim = 0.05;

    function getHomeApartments() {
        const searchValue = typeof search?.searchParam === "string" ? search.searchParam.trim() : "";


    function getMostLovedApartments() {

        axios.get(`${apiURL}${endpoint}mostlovedhomepage`)
            .then((res) => {
                setMostLovedApartments(res.data.items);
                setMostLovedApartmentsCount(res.data.count);

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
    function getMostVisitedCity() {

        axios.get(`${apiURL}${endpoint}mostvisitedcityhomepage`)
            .then((res) => {
                console.log(res.data);
                setMostVisitedCity(res.data.items);
                setMostVisitedCityCount(res.data.count);

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

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setTempFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setSearch(tempFormData);
    }

    useEffect(() => {
        setIsLoading(true);

        getMostLovedApartments();
        getMostVisitedCity();
    }, []);

    return (
        // JUMBOTRON
        <div className="mb-3">
            <div className="container-fluid jumbotron p-5 mb-4 bg-light text-center">
                {/* Testo animato da destra */}
                <motion.div
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
                </motion.div>

                {/* Pulsante animato da destra con ritardo */}
                <motion.div
                    initial={{ x: -180, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: delayAnim, ease: "easeOut" }}
                >
                    <Link className="btn custom-button mt-5 link-btn" to={"/advanced-research"}>
                        Find out more
                    </Link>
                </motion.div>
            </div>

            {/* SEARCH */}

            <SearchHomePage submit={handleOnSubmit} change={handleOnChange} temp={tempFormData} />

            {/* MOST LOVED */}

            <div className="row container m-auto">
                <>
                    <h3 className="py-2 mt-5 fw-bold">Our most {mostLovedApartmentsCount} loved apartments</h3>

                    {mostLovedApartments?.map((apartment, index) => (
                        <div className={`col-12 col-md-6 ${index < 2 ? "col-lg-6" : "col-lg-4"} g-4`} key={apartment.id}>
                            {isLoading ? (
                                <LoaderCard />
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: index * delayAnim }} // Ritardo progressivo
                                >
                                    <Card apartment={apartment} addLike={addLike} />
                                </motion.div>
                            )}
                        </div>
                    ))}
                </>
            </div>
            {/* MOST VISITED CITY */}
            <div className="row container m-auto">
                <>
                    <h3 className="py-2 mt-5 fw-bold">Our most {mostVisitedCityCount} visited city</h3>
                    <div className="col-12">
                        {isLoading ? (
                            <LoaderCard />
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: delayAnim }} // Ritardo progressivo
                            >
                                <Carousel cardShow={4} data={mostVisitedCity} CardComponent={CardMostVisitedCity} cardProps={{ addLike }} />
                            </motion.div>
                        )}
                    </div>
                </>
            </div>
        </div>
    );
}
