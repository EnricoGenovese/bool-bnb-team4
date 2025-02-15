import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import React from "react";
import { Card } from "react-bootstrap";
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaHome, FaDoorOpen, FaEnvelope, FaTimes } from "react-icons/fa";
import ReviewForm from "./ReviewForm";
import ContactForm from "./ContactForm";     // componente di prova dell'overlay
import Star from "./Star";
// Importo lo style del module.css SingleApartment.module.css
import style from "../styles/SingleApartment.module.css";


export default function SingleApartment({ apartment, categories, ownerMail, addLike }) {
    const { id } = useParams();
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);  //useState dell'overlay
    let category = "";
    const [likes, setLikes] = useState(apartment.likes);
    const imgPath = import.meta.env.VITE_IMGPATH;


    function findCategory() {
        return category = categories.find(element => element.id == apartment.item["id_category"])

    }
    findCategory();

    return (
        <>
            <div className="pt-5 container m-auto">
                <Card className="d-flex flex-column flex-md-row p-3 w-100" style={{ maxWidth: "100%" }} key={apartment.item.id}>
                    {/* Mobile: Immagine sopra */}
                    <Card.Img
                        variant="top"
                        src={imgPath + apartment.item.img}
                        alt={apartment.item.description}
                        className="w-100 d-md-none mb-3"
                        style={{ height: "150px", objectFit: "cover" }}
                    />

                    <div className="w-100 d-md-flex gap-3">
                        {/* Desktop: Immagine a sinistra */}
                        <Card.Img
                            variant="left"
                            src={imgPath + apartment.item.img}
                            alt={apartment.item.description}
                            className="d-none d-md-block me-3"
                            style={{ width: "33.33%", height: "100%", objectFit: "cover" }}
                        />
                        <Card.Body className="w-100" style={{ width: "66.67%" }}>
                            <Card.Title>{apartment.item.description}</Card.Title>
                            <Card.Text as="div">
                                <p><FaDoorOpen fill="#8B2635" size="20" className="me-3" /> {apartment.item["rooms_number"]} Rooms</p>
                                <p><FaBed fill="#8B2635" size="20" className="me-3" /> {apartment.item["beds_number"]} Beds</p>
                                <p><FaBath fill="#8B2635" size="20" className="me-3" /> {apartment.item["bathrooms_number"]} Bathrooms</p>
                                <p><FaRulerCombined fill="#8B2635" size="20" className="me-3" /> {apartment.item["square_meters"]} m²</p>
                                <p><FaMapMarkerAlt fill="#8B2635" size="20" className="me-3" /> {apartment.item.address}</p>
                                <p><FaHome fill="#8B2635" size="20" className="me-3" /> {category?.name}</p>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-danger text-light btn-sm"
                                        onClick={() => {
                                            addLike(id).then((newLikes)=>{
                                                setLikes(newLikes);
                                            });
                                        }}>
                                        <span className="d-inline-block me-2">&#9829;</span>
                                        <span className="ml-3 d-inline-block align-self-center">{apartment.item.likes}</span>
                                    </button>

                                    <button className="btn btn-primary text-light btn-sm"
                                        onClick={() => setIsOverlayOpen(true)}>
                                        <FaEnvelope className="me-2" />
                                        Send Email
                                    </button>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </div>
                </Card >
            </div >

            {/* Overlay che compare quando si clicca sul pulsante "Send Email */}
            {isOverlayOpen && (
                <div className={`card-text ${style.overlay}`}>
                    <div className={`${style["overlay-content"]}`}>
                        <button className={`${style["overlay-close"]}`} onClick={() => setIsOverlayOpen(false)}>
                            <FaTimes size={20} />
                        </button>
                        <ContactForm ownerMail={ownerMail} />
                    </div>
                </div>
            )}

            <section className="container m-auto pt-5">
                {apartment.item.reviews.length > 0 ? apartment.item.reviews.map((review, index) => (
                    <div key={review.id}>
                        <div className={`card d-flex flex-column mb-3 ${index % 2 === 0 && "bg-secondary-subtle"}`}>
                            <div className="card-body">
                                <p className="card-text">{review.text}</p>
                                <p className="card-text"><span className="fw-semibold">Entry date:</span> {review.entry_date}</p>
                                <p className="card-text"><span className="fw-semibold">Days of state:</span> {review.days_of_stay
                                }</p>
                                <h5 className="card-title">
                                    Vote: <Star num={review.vote} />
                                </h5>
                                <p className={`card-text ${style["text-name"]}`}>By {review.name}</p>
                            </div>
                        </div>
                    </div>
                ))
                    : <h4 className="py-5 text-center fw-bold">There are no reviews for this apartment: add yours!</h4>}
            </section>

            <section>
                <ReviewForm apartment_id={id} singleApartment={apartment} />
            </section>
        </>
    );
}