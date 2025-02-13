import axios from "axios"
import FilteredSearch from "../components/FilteredSearch";
import Card from "../components/Card";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useEffect, useState } from "react";

export default function AdevancedResearch() {

    const { search, category, numRooms, numBeds } = useGlobalContext();
    const [filteredApi, setFilteredApi] = useState([]);

    const apiURL = `http://localhost:3000/api`;
    const endpoint = `/apartments/`

    useEffect(() => {
        boh();
    }, [search, numBeds, numRooms, category])

    const filteredResearch = (obj) => {
        let filteredObj = obj;

        if (search !== "") {
            const cleanSearch = search.replace(/\s+/g, '').toLowerCase();
            filteredObj = filteredObj.filter((ele) =>
                ele.address.replace(/\s+/g, '').toLowerCase().includes(cleanSearch) ||
                ele.city.replace(/\s+/g, '').toLowerCase().includes(cleanSearch)
            );
        }

        if (numRooms > 0) {
            filteredObj = filteredObj.filter((ele) => ele.rooms_number >= numRooms);
        }

        if (numBeds > 0) {
            filteredObj = filteredObj.filter((ele) => ele.beds_number >= numBeds);
        }

        if (category > 0) {
            filteredObj = filteredObj.filter((ele) => ele.id_category == category);
        }

        return filteredObj;
    };
    const boh = () => {
        axios.get(`${apiURL}${endpoint}`)
            .then((res) => {
                const filtered = filteredResearch(res.data.items);
                setFilteredApi(filtered);
                console.log("Filtrato: " + JSON.stringify(filteredApi, null, 2));
                return;
            })
            .catch((err) => {
                //console.log(err);
            })
    }

    // if(search!="" || numBeds>0 || numRooms > 0 || category != 0)
    //     boh();

    return (
        <>
            <FilteredSearch />
            <div className="row">
                {filteredApi?.map((apartment) => (
                    <div className="col-12 col-md-6 col-lg-3 g-4" key={apartment.id} >
                        <Card apartment={apartment} />
                    </div>
                ))}
            </div>
        </>
    )
}