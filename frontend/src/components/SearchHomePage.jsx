import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

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
            <form onSubmit={handleOnSubmit} className="container m-auto p-4 shadow-lg rounded bg-light">
                <h2 className="text-center mb-4">Search for an accomodation</h2>
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
            </form>
        </section>
    );

}