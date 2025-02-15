import { useState } from "react"
import { NavLink } from "react-router"
import style from "../styles/Card.module.css"

const imgPath = import.meta.env.VITE_IMGPATH

export default function Card({ apartment, addLike }) {
    const id = apartment.id
    const [likes, setLikes] = useState(apartment.likes)


    return (
        <div className="card flex-grow-1 flex-shrink-0 h-100" key={id}>
            <NavLink to={`/apartment/${id}`} className="text-decoration-none text-dark">
                <img className="card-img-top" src={`${imgPath}${apartment.img}`} alt={apartment.description} />
                <div className="card-body">
                    <h5 className="card-title">{apartment.description}</h5>
                    <p className="card-text">{apartment.address}<span>, {apartment.city}</span></p>
                </div>
            </NavLink>
            <div className="d-flex flex-nowrap justify-content-between" >
                <button className="btn btn-danger text-light mx-4 my-2" id={style.likeButton}
                    onClick={() => {
                        addLike(id).then(() => {
                            setLikes(likes + 1);
                        });
                    }}>
                    <span className="d-inline-block me-2">&#9829;</span>
                    <span className="ml-3 d-inline-block align-self-center">{likes}</span>
                </button>
            </div>
        </div >
    )
}