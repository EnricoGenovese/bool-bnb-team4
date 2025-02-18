import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function SearchHomePage() {
    const { search, setSearch } = useGlobalContext();

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

        <section className="pb-3" style={{ marginTop: "50px" }}>
            <form onSubmit={handleOnSubmit} className="container m-auto p-4 shadow-lg rounded bg-light">

                <h2 className="text-center mb-4">Search for an accomodation</h2>
                <label className="w-100" htmlFor="search">Search here city or address</label>
                <div className="form-group pb-3 d-flex gap-2 justify-content-center">

                    <input
                        type="text"
                        className="form-control w-100"
                        id="search"
                        name="search"
                        placeholder="Insert city or address"
                        value={tempFormData.search}
                        onChange={handleOnChange} />

                    <button type="submit" className="btn btn-send">Search</button>
                </div>
            </form>
        </section>
    );

}