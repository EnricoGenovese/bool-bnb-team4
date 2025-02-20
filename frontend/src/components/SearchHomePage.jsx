import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

export default function SearchHomePage({ submit, change, temp }) {
    const { search, setSearch } = useGlobalContext();

    //setSearchFormData(initialSearchFormData);

    // useEffect(() => {
    //     console.log("updated searchFormData: ", search);
    // }, [search]);


    return (

        <section style={{ marginTop: "50px" }}>
            <motion.form
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}

                onSubmit={submit} className="container m-auto p-4 shadow-lg rounded bg-light">

                <h2 className="mb-4">Search for an accomodation</h2>

                <div className="form-group row mt-3">
                    <label htmlFor="searchParam">Search here city or address</label>
                    <div className="col-12 col-md-10 d-flex">
                        <span className="input-group-text rounded-end-0"><FaSearch /></span>
                        <input
                            type="text"
                            className="form-control w-100 rounded-start-0"
                            id="searchParam"
                            name="searchParam"
                            placeholder="Insert city or address"
                            value={temp.searchParam}
                            onChange={change} />
                    </div>
                    <div className="col-12 col-md-2 mt-3 mt-md-0">
                        <button type="submit" className="btn btn-send w-100 w-md-0">Search

                        </button>
                    </div>

                    {/* <div className="form-group">
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
                    </div> */}


                </div>

            </motion.form>
        </section>
    );

}