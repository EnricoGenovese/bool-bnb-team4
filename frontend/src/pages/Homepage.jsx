import { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext"
import Card from "../components/Card.jsx"
import { Link, NavLink } from "react-router-dom"
import Loader from "../components/Loader.jsx"
export default function Homepage() {
    const { apartments, getApartments, addLike, isLoading } = useGlobalContext();

    useEffect(() => {
        getApartments()
    }, [])

    return (
        <div>
            <div className="container-fluid jumbotron p-5 mb-4 bg-light text-center">
                <div className="text-white" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", padding: "20px", borderRadius: "10px" }}>
                    <h1 className="display-4">Vattelo a pija nder culo!!!</h1>
                    <p className="lead">Trova l'appartamento perfetto per te con un solo click.</p>
                </div>
                <Link className="btn custum-button mt-5 link-btn" to={"/advanced-research"} >Scopri di più </Link>
            </div>
            {isLoading && <Loader />}
            <div className="row container m-auto">
                {apartments?.map((apartment) => (
                    <div className="col-12 col-md-6 col-lg-3 g-4" key={apartment.id} >
                        <Card apartment={apartment} addLike={addLike} />
                    </div>
                ))}
            </div>
        </div>
    )
}	