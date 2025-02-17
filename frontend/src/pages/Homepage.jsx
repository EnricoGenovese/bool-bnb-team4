import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext"
import Card from "../components/Card.jsx"
import { Link, NavLink } from "react-router-dom"
import Loader from "../components/Loader.jsx"
import axios from "axios";
export default function Homepage() {

    const [homeApartments, setHomeApartments] = useState([]);
    const { addLike, isLoading } = useGlobalContext();
    const apiURL = `http://localhost:3000/api`;
    const endpoint = `/apartments/`
    function getHomeApartments() {
        axios.get(`${apiURL}${endpoint}homepage`).then((res) => {
            console.log(res.data);
            setHomeApartments(res.data.items);
        })
    }
    useEffect(() => {
        getHomeApartments();
    }, [])

    return (
        <div className="mb-3">
            <div className="container-fluid jumbotron p-5 mb-4 bg-light text-center">
                <div className="text-white" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", padding: "20px", borderRadius: "5px" }}>
                    <h1 className="display-4 jumbo-text">Bool B&B</h1>
                    <p className="lead jumbo-text">
                        Find the perfect apartment for you with just one click.</p>
                </div>
                <Link className="btn custom-button mt-5 link-btn" to={"/advanced-research"} >Find out more </Link>
            </div>
            {isLoading && <Loader />}
            <div className="row container m-auto">
                {homeApartments?.map((apartment) => (
                    <div className="col-12 col-md-6 col-lg-3 g-4" key={apartment.id} >
                        <Card apartment={apartment} addLike={addLike} />
                    </div>
                ))}
            </div>
        </div>
    )
}	