import { NavLink } from "react-router"

const imgPath = import.meta.env.VITE_IMGPATH

export default function Card({ apartment }) {
    return (
        <div className="card">
            <NavLink to={`/apartment/:id`} className="text-decoration-none text-dark">
                <img className="card-img-top" src={`${imgPath}${apartment.img}`} alt={apartment.description} />
                <div className="card-body">
                    <h5 className="card-title">{apartment.description}</h5>
                    <p className="card-text">{apartment.address}<span>, {apartment.city}</span></p>
                </div>
            </NavLink>
            <div className="d-flex flex-nowrap justify-content-between">
                <button className="btn btn-danger text-light m-3"><span className="d-inline-block me-2">&#9829;</span><span className="ml-3 d-inline-block align-self-center">{apartment.likes}</span></button>

            </div>
        </div>
    )
}