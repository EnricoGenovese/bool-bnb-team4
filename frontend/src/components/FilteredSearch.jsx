import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { motion } from "framer-motion";
import axios from "axios";


export default function FilteredSearch() {

    const [categories, setCategories] = useState([]);
    const categoriesAPI = "http://localhost:3000/api/apartments/categories";

    const { searchFormData, setSearchFormData } = useGlobalContext();

    //setSearchFormData(initialSearchFormData);

    const [tempFormData, setTempFormData] = useState({
        search: "",
        category: "",
        minRooms: "",
        minBeds: ""
    });

    useEffect(() => {
        console.log("updated searchFormData: ", searchFormData);
        getCategories();

    }, [searchFormData]);

    function getCategories() {
        axios
            .get(categoriesAPI)
            .then((res) => {
                setCategories(res.data.items);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                console.log("Chiamata alle categorie effettuata");
            });
    }


    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setTempFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        setSearchFormData(tempFormData);
    }

    return (
        <section style={{ marginTop: "50px" }}>
            <motion.form onSubmit={handleOnSubmit}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="container m-auto p-4 shadow-lg rounded bg-light">
                <h2 className="mb-4">Search for an accomodation</h2>
                <div className="form-group">
                    <label htmlFor="search">Search here city or address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="search"
                        name="search"
                        placeholder="Enter city or address"
                        value={tempFormData.search}
                        onChange={handleOnChange} />
                </div>
                <div className="row pb-3">
                    <div className="form-group col-12 col-lg-4">
                        <label htmlFor="category">Select a category</label>
                        <select
                            className="form-control"
                            id="category"
                            name="category"
                            value={tempFormData.category}
                            onChange={handleOnChange}
                        >
                            <option value={0}>Select apartment category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-6 col-lg-4">
                        <label htmlFor="minRooms">Choose min. number of rooms</label>
                        <input
                            type="number"
                            className="form-control"
                            id="minRooms"
                            name="minRooms"
                            placeholder="Enter min. number of rooms"
                            min="0"
                            value={tempFormData.minRooms}
                            onChange={handleOnChange} />
                    </div>
                    <div className="form-group col-6 col-lg-4">
                        <label htmlFor="minBeds">Choose min. number of beds</label>
                        <input
                            type="number"
                            className="form-control"
                            id="minBeds"
                            name="minBeds"
                            placeholder="Enter min. number of rooms"
                            min="0"
                            value={tempFormData.minBeds}
                            onChange={handleOnChange} />
                    </div>
                </div>
                <button type="submit" className="btn btn-send">Search</button>
            </motion.form>
        </section>
    );
}