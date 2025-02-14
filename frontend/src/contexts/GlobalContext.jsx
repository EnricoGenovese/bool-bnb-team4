import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const apiUrl = import.meta.env.VITE_APIURL;
const endpoint = "/apartments/";

const initialNewApartment = {
    category: 0,
    city: "",
    address: "",
    description: "",
    roomsNumber: 0,
    bedsNumber: 0,
    bathroomsNumber: 0,
    squareMeters: 0,
    imageUrl: "",
    likes: 0
}

const initialNewComment = {
    name: "",
    text: "",
    entryDate: "",
    daysOfStay: 0,
    vote: 0,
}

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

    const [apartments, setApartments] = useState([]);
    const [apartment, setApartment] = useState();
    const [apartmentData, setApartmentData] = useState(initialNewApartment);
    const [commentData, setCommentData] = useState(initialNewComment);
    const [likes, setLikes] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [numPages, setNumPages] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [numRooms, setNumRooms] = useState(0);
    const [numBeds, setNumBeds] = useState(0);
    const [category, setCategory] = useState(0);

    const navigate = useNavigate();
    // useEffect(() => {
    //     getApartments()
    // }, []);


    function getApartments() {
        axios.get(apiUrl + endpoint)
            .then((res) => {
                setIsLoading(true);
                setApartments(res.data.items);
            })
            .catch((err) => {
                console.log("Error: ", err);
            })
            .finally(() => {
                setIsLoading(false);
                console.log("Done");
            })
    }

    function getApartment(id) {
        axios.get(apiUrl + endpoint + id)
            .then((res) => {
                console.log(res.data)
                setApartment(res.data);
            })
            .catch((err) => {
                console.log(err);
                if (err.status === 404) {
                    console.log("error")
                    navigate("/notFound")
                }
            })
            .finally(() => {
                console.log("Single Done");
            })
    }

    function addApartement() {
        axios.post(apiUrl + endpoint, initialNewApartment)
            .then((res) => {
                console.log(initialNewApartment)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                console.log("Posted!")
            })
    }


    function addLike(id) {
        axios.patch(apiUrl + endpoint + id)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log("Error: ", err)
            })
    }


    const data = {
        apartments, setApartment, apartment, apartmentData, setApartmentData, initialNewApartment,
        search, setSearch, numRooms, setNumRooms, numBeds, setNumBeds, category, setCategory,
        initialNewComment, commentData, setCommentData, getApartments, addLike, likes, setLikes,
        isLoading
    }

    return <GlobalContext.Provider value={data}>
        {children}
    </GlobalContext.Provider>
}

function useGlobalContext() {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error("Use global context is not inside the context provider GlobalProvider");
    }
    return context;
}

export { GlobalProvider, useGlobalContext };