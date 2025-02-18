import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { motion } from "framer-motion";

export default function SearchHomePage() {
    const { search,setSearch } = useGlobalContext();

    //setSearchFormData(initialSearchFormData);

    const [tempFormData, setTempFormData] = useState({
        search: "",
    });



    useEffect(() => {
        console.log("updated searchFormData: ", search);
    }, [search]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setTempFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        setSearch(tempFormData);
    }
    return (

        <section style={{ marginTop: "50px" }}>
            <motion.form 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                
            onSubmit={handleOnSubmit} className="container m-auto p-4 shadow-lg rounded bg-light">
                <h2 className="mb-4">Search for an accomodation</h2>
                <div className="form-group">
                    <label htmlFor="search">Search here city or address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="search"
                        name="search"
                        placeholder="Search.."
                        value={tempFormData.search}
                        onChange={handleOnChange} />
                </div>
                <button type="submit" className="btn btn-send">Search</button>
            </motion.form>
        </section>
    );

}