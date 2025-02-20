import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { motion } from "framer-motion";
import axios from "axios";
import { FaSearch, FaHome, FaBed, FaDoorClosed } from "react-icons/fa";


export default function FilteredSearch({ submit, onChange, tempFormData }) {

    const [categories, setCategories] = useState([]);
    const categoriesAPI = "http://localhost:3000/api/apartments/categories";

    const { searchFormData, setSearchFormData } = useGlobalContext();

    //setSearchFormData(initialSearchFormData);



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





    return (
        <section style={{ marginTop: "50px" }}>
            <motion.form onSubmit={submit}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="container m-auto p-4 shadow-lg rounded bg-light">
                <h2 className="mb-4">Search for an accomodation</h2>
                <div className="form-group">
                    <label htmlFor="search">Search here city or address</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text"><FaSearch /></span>
                        <input
                            type="text"
                            className="form-control"
                            id="search"
                            name="search"
                            placeholder="Enter city or address"
                            value={tempFormData.search}
                            onChange={onChange} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="form-group col-12 col-lg-4">
                        <label htmlFor="category">Select a category</label>
                        <div className="form-group"> <div className=" input-group">
                            <span className="input-group-text"><FaHome /></span>
                            <select
                                className="form-control"
                                id="category"
                                name="category"
                                value={tempFormData.category}
                                onChange={onChange}
                            >
                                <option value={0}>Select apartment category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        </div>
                    </div>
                    <div className="form-group col-6 col-lg-4">
                        <label htmlFor="minRooms">Choose min. number of rooms</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaDoorClosed /></span>
                            <input
                                type="number"
                                className="form-control"
                                id="minRooms"
                                name="minRooms"
                                placeholder="Enter min. number of rooms"
                                min="0"
                                value={tempFormData.minRooms}
                                onChange={onChange} />
                        </div></div>
                    <div className="form-group col-6 col-lg-4">
                        <label htmlFor="minBeds">Choose min. number of beds</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaBed /></span>
                            <input
                                type="number"
                                className="form-control"
                                id="minBeds"
                                name="minBeds"
                                placeholder="Enter min. number of rooms"
                                min="0"
                                value={tempFormData.minBeds}
                                onChange={onChange} />
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-send"> Search </button>
            </motion.form>
        </section>
    );
}