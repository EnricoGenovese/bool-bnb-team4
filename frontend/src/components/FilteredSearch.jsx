import { useGlobalContext } from "../contexts/GlobalContext";



export default function FilteredSearch() {

    const { search, setSearch, category, setCategory, numRooms, setNumRooms, numBeds, setNumBeds } = useGlobalContext();

    return (

        <form className="container m-auto">
            <div className="form-group">
                <label htmlFor="searchBar">Search here city or address</label>
                <input 
                type="text" 
                className="form-control" 
                id="searchBar" 
                name="searchBar"
                placeholder="Search.." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="category">Select a category</label>
                <select 
                className="form-control" 
                id="category" 
                name="category"
                value={category}
                onChange={(e)=> setCategory(e.target.value)}
                >
                    <option value={"0"}>No category</option>
                    <option value={"1"}>Chalet</option>
                    <option value={"2"}>Apartment</option>
                    <option value={"3"}>Villa</option>
                    <option value={"4"}>Loft</option>
                    <option value={"5"}>Studio</option>
                    <option value={"6"}>Penthouse</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="numRooms">Choose min number of rooms</label>
                <input 
                type="number" 
                className="form-control" 
                id="numRooms" 
                name="numRooms"
                placeholder="0" 
                value={numRooms} 
                onChange={(e) => setNumRooms(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="numBeds">Choose min number of beds</label>
                <input 
                type="number" 
                className="form-control" 
                id="numBeds" 
                name="numBeds"
                placeholder="0" 
                value={numBeds} 
                onChange={(e) => setNumBeds(e.target.value)} />
            </div>
        </form>
    );
}