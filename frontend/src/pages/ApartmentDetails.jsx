import { useGlobalContext } from "../contexts/GlobalContext";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleApartment from "../components/SingleApartment";
import axios from "axios";
// Api url ed endpoint per axiox
const apiUrl = import.meta.env.VITE_APIURL;
const endpoint = "/apartments/";
export default function ApartmentDetails() {

    const initialForm = {
        text: "",
        name: "",
        entryDate: "",
        daysOfStay: "",
        vote: 0
    };

    const { id } = useParams();     // Destrutturo useParames e ricavo l'id
    const [apartment, setApartment] = useState("");
    const [categories, setCategory] = useState([]);
    const [formData, setFormData] = useState(initialForm);
    const [mail, setMail] = useState("");
    const [hoverVote, setHoverVote] = useState(0);
    const [errors, setErrors] = useState({});
    const today = new Date().toISOString().split("T")[0];
    const minDate = new Date("2010-01-01").toISOString().split("T")[0];

    const validateForm = (formData) => {
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = 'Name required';
        } else if (formData.name.length < 2) {
            errors.name = 'The name must contain at least 2 characters';
        }
        else if (formData.name.length > 50) {
            errors.name = 'The name must contain at most 50 characters';
        }

        if (!formData.text.trim()) {
            errors.text = 'Comments required';
        }
        else if (formData.text.length > 255) {
            errors.text = 'The comment must contain at most 255 characters';
        }

        if (!formData.vote) {
            errors.vote = 'Vote required';
        }

        if (!formData.entryDate) {
            errors.entryDate = 'Entry date required';
        }
        else if (formData.entryDate > today) {
            errors.entryDate = 'You cannot enter a future date';
        }
        else if (formData.entryDate < minDate) {
            errors.entryDate = 'The date is too old';
        }

        if (!formData.daysOfStay) {
            errors.daysOfStay = 'Days of stay required';
        }
        else if (formData.daysOfStay < 1) {
            errors.daysOfStay = 'Days of stay must be at least 1';
        }
        else if (formData.daysOfStay > 365) {
            errors.daysOfStay = 'You cannot enter a number of days greater than 365';
        }
        else if (formData.daysOfStay.includes('e') || formData.daysOfStay.includes('E')) {
            errors.daysOfStay = 'You must enter a number';
        }

        return errors;
    };


    function getApartment() {
        console.log("id: ", id);        // prova funzionamento
        // console.log(apiUrl + "/apartments/" + id);

        axios.get(apiUrl + endpoint + id)
            .then((res) => {
                console.log(res.data, "ciaooooooooooooo")
                setApartment(res.data);
                setMail(res.data.item.email)
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

    const onHandleInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onHandleStarClick = (starValue) => {
        setFormData({ ...formData, vote: starValue });
    };

    const onHandleStarHover = (starValue) => {
        setHoverVote(starValue);
    };

    function getCategories() {
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

    const onHandleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm(formData);
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {

            axios.post(`${apiUrl}${endpoint}${id}/reviews`, formData)
                .then((res) => {
                    console.log("Recensione inviata con successo!");
                    // setCommentId(res.data.results.insertId);
                    setFormData(initialForm);
                    getApartment();
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    console.log("Finally");
                })
        }
    };

    function addLike() {
        axios.patch(apiUrl + endpoint + id)
            .then((res) => {
                console.log(res.data);
                getApartment();
            })
            .catch((err) => {
                console.log("Error: ", err)
            })
    }

    useEffect(() => {
        getApartment();
        getCategories();
    }, [id]);

    return (
        <section className="container m-auto">
            {apartment && categories ? (
                <>
                    <SingleApartment apartment={apartment} categories={categories} ownerMail={mail} submit={onHandleSubmit} formData={formData} onHandleStarHover={onHandleStarHover} onHandleStarClick={onHandleStarClick} onHandleInput={onHandleInput} hoverVote={hoverVote} setHoverVote={setHoverVote} errors={errors} updateLikes={addLike} />
                </>
            )
                : "Non trovata"}
        </section>
    )
}