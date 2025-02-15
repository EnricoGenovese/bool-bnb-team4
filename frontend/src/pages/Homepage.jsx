import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext"
import Card from "../components/Card.jsx"
import { Link, NavLink } from "react-router-dom"
import Loader from "../components/Loader.jsx"
import axios from "axios";
export default function Homepage() {
    const { addLike, isLoading, search, category, numRooms, numBeds } = useGlobalContext();

    const [filteredApi, setFilteredApi] = useState([]);

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


    useEffect(() => {
        boh();
    }, [search, category, numRooms, numBeds])

    return (
        <div>
            <div className="container-fluid jumbotron p-5 mb-4 bg-light text-center">
                <div className="text-white" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", padding: "20px", borderRadius: "10px" }}>
                    <h1 className="display-4">Bool B&B</h1>
                    <p className="lead">Trova l'appartamento perfetto per te con un solo click.</p>
                </div>
                <Link className="btn custum-button mt-5 link-btn" to={"/advanced-research"} >Scopri di più </Link>
            </div>
            {isLoading && <Loader />}
            <div className="row container m-auto">
                {filteredApi?.map((apartment) => (
                    <div className="col-12 col-md-6 col-lg-3 g-4" key={apartment.id} >
                        <Card apartment={apartment} addLike={addLike} />
                    </div>
                ))}
            </div>
        </div>
    )
}	