import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import axios from "axios";
import { FaMapMarkerAlt, FaCity, FaBed, FaBath, FaRulerCombined, FaHome, FaDoorOpen } from "react-icons/fa";
import style from "../styles/CardAdvResearch.module.css";

const imgPath = import.meta.env.VITE_IMGPATH;
const apiUrl = import.meta.env.VITE_APIURL;
const endpoint = "/apartments/";

export default function CardAdvResearch({ apartment, addLike }) {
    const slug = apartment.slug;
    const [likes, setLikes] = useState(apartment.likes);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);

    // Funzione per ottenere le categorie
    useEffect(() => {
        axios.get(apiUrl + endpoint + "/categories")
            .then((res) => {
                setCategories(res.data.items);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Trova la categoria dell'appartamento
    useEffect(() => {
        if (categories.length > 0) {
            const foundCategory = categories.find(cat => cat.id == apartment.id_category);
            setCategory(foundCategory);
        }
    }, [categories, apartment.id_category]);

    // Componente riutilizzabile per ogni riga di informazioni
    const InfoRow = ({ icon: Icon, text }) => (
        <div className="d-flex align-items-center">
            <p className={`text-break d-flex flex-nowrap align-items-center ${style.infoText} fw-normal`}>
                &nbsp;&nbsp;&nbsp;<Icon fill="#8B2635" size="20" className="me-3" />&nbsp;{text}
            </p>
        </div>
    );

    return (
        <div className="position-relative">
            <div className={`card d-flex flex-column h-100 justify-content-between ${style["card-background"]}`} key={slug}>
                <NavLink to={`/apartment/${slug}`} className="text-decoration-none text-dark">
                    <img className={`${style.picture} card-img-top`} src={`${imgPath}${apartment.img}`} alt={apartment.description} />
                    <div className={`card-body ${style["card-header"]}`}>
                        <h5 className="card-title pb-4">{apartment.description.length > 50 ?
                            apartment.description.substring(0, 50) + "..."
                            :
                            apartment.description}
                        </h5>

                        {/* Grid con due colonne su desktop, una su mobile */}
                        <div className={style.infoGrid}>
                            <InfoRow icon={FaMapMarkerAlt} text={apartment.address} />
                            <InfoRow icon={FaCity} text={apartment.city} />
                            <InfoRow icon={FaDoorOpen} text={`${apartment.rooms_number} Rooms`} />
                            <InfoRow icon={FaBed} text={`${apartment.beds_number} Beds`} />
                            <InfoRow icon={FaBath} text={`${apartment.bathrooms_number} Bathrooms`} />
                            <InfoRow icon={FaRulerCombined} text={`${apartment.square_meters} m²`} />
                            <InfoRow icon={FaHome} text={category?.name || "N/A"} />
                        </div>
                    </div>
                </NavLink>

                <div className={`${style.cardFooter}`}>
                    <button
                        className="btn btn-danger text-light d-flex align-items-center justify-content-center"
                        id={style.likeButton}
                        onClick={() => {
                            addLike(slug).then(() => {
                                setLikes(likes + 1);
                            });
                        }}
                    >
                        <span className="d-inline-block me-2">&#9829;</span>
                        <span className="ml-3 d-inline-block align-self-center">{likes}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}