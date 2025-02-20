import axios from "axios"
import FilteredSearch from "../components/FilteredSearch";
import Card from "../components/Card";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useEffect, useState } from "react";
import LoaderCard from "../components/LoaderCard";
import { motion } from "framer-motion";
import Pagination from "../components/Pagination"

export default function AdevancedResearch() {

    const { addLike, isLoading, setIsLoading, searchFormData, setSearchFormData, isHomePage
    } = useGlobalContext();

    const delayAnim = 0.05;
    const apiURL = `http://localhost:3000/api`;
    const endpoint = `/apartments/`
    const [isPaginationFlag, setIsPaginationFlag] = useState(false);
    const [filteredApi, setFilteredApi] = useState([]);
    const [apartmentsCount, setApartmentsCount] = useState(0);
    const [page, setPage] = useState(1);
    const [numPages, setNumPages] = useState(0);
    const [tempFormData, setTempFormData] = useState({
        search: "",
        category: "",
        minRooms: "",
        minBeds: ""
    });



    useEffect(() => {

        setIsLoading(true);
        const params = {};

        if (searchFormData.search) {
            params.search = searchFormData.search;
        }
        if (searchFormData.minRooms > 0) {
            params.minRooms = searchFormData.minRooms;
        }
        if (searchFormData.minBeds > 0) {
            params.minBeds = searchFormData.minBeds;
        }
        if (searchFormData.category > 0) {
            params.category = searchFormData.category;
        }

        const queryParams = new URLSearchParams(params).toString();

        if (queryParams) {
            window.history.pushState({}, '', `?${queryParams}`);
        } else {
            window.history.pushState({}, '', '/advanced-research');
        }

        fetchApi();

    }, [searchFormData, page]);

    const params = {
        page,
        search: searchFormData.search || undefined,
        minRooms: searchFormData.minRooms > 0 ? searchFormData.minRooms : undefined,
        minBeds: searchFormData.minBeds > 0 ? searchFormData.minBeds : undefined,
        category: searchFormData.category > 0 ? searchFormData.category : undefined,

    }

    function handleFilteredPageChange(page) {
        setPage(page);
        isHomePage ? 500 : 0;
        window.scrollTo(
            {
                top: isHomePage,
                behavior: "smooth"
            }
        )
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
        setSearchFormData(tempFormData);
        setPage(1);
    }



    const fetchApi = () => {
        axios.get(`${apiURL}${endpoint}`, { params }

        )
            .then((res) => {

                setFilteredApi(res.data.items);
                console.log(res.data);
                setNumPages(Math.ceil(res.data.count / res.data.limit));
                setApartmentsCount(res.data.count);
                res?.data?.count <= 20 ? setIsPaginationFlag(true) : setIsPaginationFlag(false);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);

                }, 1000)
            });
    };

    return (
        <>
            <FilteredSearch submit={handleOnSubmit} onChange={handleOnChange} tempFormData={tempFormData} />
            <div className="container m-auto row mb-3">
                <h3 className="pt-5">Results for your research: {apartmentsCount} {searchFormData?.search ?
                    <>for <strong>{searchFormData.search}</strong></>
                    : ""}
                </h3>

                {filteredApi.length >= 1 ?
                    filteredApi?.map((apartment, index) => (
                        <div className="col-12 col-md-6 col-lg-3 g-4" key={apartment.id} >
                            {
                                isLoading ? <LoaderCard />
                                    :
                                    (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5, delay: index * delayAnim }} // Ritardo progressivo
                                        >
                                            <Card apartment={apartment} addLike={addLike} />
                                        </motion.div>
                                    )
                            }
                        </div>
                    ))
                    :
                    <div className="text-center py-5 no-query">
                        <h3 className="display-5">No results found for this research</h3>
                    </div>}
                {!isPaginationFlag &&
                    <div>
                        <Pagination filteredPage={page} handleFilteredPageChange={handleFilteredPageChange} numFilteredPages={numPages} />
                    </div>}
            </div>
        </>
    )
}