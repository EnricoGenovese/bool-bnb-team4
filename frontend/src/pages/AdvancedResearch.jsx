import axios from "axios"
import FilteredSearch from "../components/FilteredSearch";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function AdevancedResearch() {

    const { search, category, numRooms, numBeds } = useGlobalContext();

    const apiURL = `http://localhost:3000/api`;
    const endpoint = `/apartments/`

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

    axios.get(`${apiURL}${endpoint}`)
        .then((res) => {
            //console.log(res.data.items);
            const filter = filteredResearch(res.data.items);
            console.log("Filtrato: " + JSON.stringify(filter, null, 2));
        })
        .catch((err) => {
            //console.log(err);
        })

    return (
        <>
            <FilteredSearch />

        </>
    )
}