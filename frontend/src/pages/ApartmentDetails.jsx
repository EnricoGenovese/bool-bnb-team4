import { useGlobalContext } from "../contexts/GlobalContext";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleApartment from "../components/SingleApartment";
import axios from "axios";
// Api url ed endpoint per axiox
const apiUrl = import.meta.env.VITE_APIURL;
const endpoint = "/apartments/";




export default function ApartmentDetails() {
    const { id } = useParams();     // Destrutturo useParames e ricavo l'id
    const [apartment, setApartment] = useState("");
    const [categories, setCategory] = useState([]);

    function getApartment(id) {
        console.log("id: ", id);        // prova funzionamento
        // console.log(apiUrl + "/apartments/" + id);

        axios.get(apiUrl + endpoint + id)
            .then((res) => {
                console.log(res.data)
                setApartment(res.data);
            })
            .catch((err) => {
                console.log(err);
                if (err.status === 404) {
                    console.log("error")
                    navigate("/NotFound")
                }
            })
            .finally(() => {
                console.log("Single Done");
                console.log(apartment);
            })
    }

    function getCategories(){
        axios.get(apiUrl + endpoint + "/categories")
        .then((res) => {
            setCategory(res.data.items);
        })
            .catch((err) => {
                console.log(err);
                if (err.status === 404) {
                    console.log("error")
                    navigate("/NotFound")
                }
            })
            .finally(() => {
                console.log("Finally");
            })
    }

    useEffect(() => {
        getApartment(id);
        getCategories();
    }, [id]);

    return (
        <section>
            {apartment && categories ? (
                <>   
                    <SingleApartment apartment={apartment} categories={categories} />
                </>
            )
                : "Non trovata"}
        </section>
    )
}