import { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext"
import Card from "../components/Card.jsx"
import Loader from "../components/Loader.jsx"

export default function Homepage() {
    const { apartments, getApartments, addLike, isLoading } = useGlobalContext();

    useEffect(() => {
        getApartments()
    }, [])

    return (
        <div>
            {isLoading && <Loader />}
            <div className="row">
                {apartments?.map((apartment) => (
                    <div className="col-12 col-md-6 col-lg-3 g-4" key={apartment.id} >
                        <Card apartment={apartment} addLike={addLike} />
                    </div>
                ))}
            </div>
        </div>
    )
}	