import { useState } from "react"
import { NavLink } from "react-router"
import { FaMapMarkerAlt, FaCity } from "react-icons/fa";
import style from "../styles/Card.module.css"

const imgPath = import.meta.env.VITE_IMGPATH

export default function CardMostVisitCity({ apartment }) {
    const slug = apartment.slug


    return (
        <div className={`card d-flex flex-column h-100 justify-content-between ${style["card-background"]}`} key={slug}>
            <NavLink to={`/advanced-research?search=${apartment.city}`} className="stretched-link">
                <img className={`${style.picture} card-img-top`} src={`${imgPath}${apartment.img}`} alt={apartment.description} />
            </NavLink>
            <p className="m-2 fw-bold text-break d-flex flex-nowrap align-items-center bg-white text-dark rounded-pill py-2 px-3 position-absolute">
                <FaCity fill="#8B2635" size="20" className="me-3" />&nbsp;{apartment.city}
            </p>
        </div >
    )
}