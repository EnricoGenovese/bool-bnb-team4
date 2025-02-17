import axios from "axios"
import FilteredSearch from "../components/FilteredSearch";
import Card from "../components/Card";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useEffect, useState } from "react";
import LoaderCard from "../components/LoaderCard";

export default function AdevancedResearch() {

    const { search, category, minRooms, minBeds, addLike, searchFormData, isLoading, setIsLoading } = useGlobalContext();
    const [filteredApi, setFilteredApi] = useState([]);

    const apiURL = `http://localhost:3000/api`;
    const endpoint = `/apartments/`

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

        boh();
    }, [searchFormData]);


    const boh = () => {
        axios.get(`${apiURL}${endpoint}`, {
            params: {
                search: searchFormData.search || undefined,
                minRooms: searchFormData.minRooms > 0 ? searchFormData.minRooms : undefined,
                minBeds: searchFormData.minBeds > 0 ? searchFormData.minBeds : undefined,
                category: searchFormData.category > 0 ? searchFormData.category : undefined
            }
        })
            .then((res) => {

                setFilteredApi(res.data.items);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setTimeout(()=>{
                    setIsLoading(false);

                }, 1000)
            });
    };

    return (
        <>
            <FilteredSearch />
            <div className="container m-auto row mb-3">
                <h3 className="pt-5">Results for your research: {filteredApi.length}</h3>
                {filteredApi.length >= 1 ?
                    filteredApi?.map((apartment) => (
                        <div className="col-12 col-md-6 col-lg-3 g-4" key={apartment.id} >
                            {
                                isLoading ? <LoaderCard />
                                    : <Card apartment={apartment} addLike={addLike} />
                            }
                        </div>
                    )) :
                    <div className="text-center py-5 no-query">
                        <h3 className="display-5">No results found for this research</h3>
                    </div>}
            </div>
        </>
    )
}