import { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext"
import Card from "../components/Card"

export default function Homepage() {
    const { apartments, getApartments } = useGlobalContext();

    useEffect(() => {
        getApartments()
    }, [])

    return (
        <div>
            <div className="row">
                {apartments?.map((apartment) => (
                    <div className="col-12 col-md-6 col-lg-3 g-4" key={apartment.id} >
                        <Card apartment={apartment} />
                    </div>
                ))}
            </div>
        </div>
    )
}