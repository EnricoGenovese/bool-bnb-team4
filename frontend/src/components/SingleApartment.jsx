import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import React from "react";
import { Card } from "react-bootstrap";
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaHome, FaDoorOpen, FaEnvelope } from "react-icons/fa";
import ReviewForm from "./ReviewForm";
import ContactForm from "./ContactForm";
import Star from "./Star";
import style from "../styles/SingleApartment.module.css";
import MapComponent from "./MapComponent";
import { motion } from "framer-motion";

export default function SingleApartment({ apartment, categories, ownerMail, submit, formData, onHandleInput, onHandleStarHover, onHandleStarClick, hoverVote, setHoverVote, validateForm, errors }) {
    const { addLike } = useGlobalContext();
    const { slug } = useParams();
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [likes, setLikes] = useState(apartment.item.likes);

    const imgPath = import.meta.env.VITE_IMGPATH;

    let category = categories.find(element => element.id == apartment.item["id_category"]);

    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);

    useEffect(() => {
        async function fetchCoordinates() {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${apartment.item.address}, ${apartment.item.city}`);
                const data = await response.json();
                if (data.length > 0) {
                    setLatitude(parseFloat(data[0].lat));
                    setLongitude(parseFloat(data[0].lon));
                } else {
                    console.error("Indirizzo non trovato");
                }
            } catch (error) {
                console.error("Errore nel recupero delle coordinate:", error);
            }
        }
        fetchCoordinates();
    }, [apartment.item.address, apartment.item.city]);

    return (
        <>
            <div className="pt-5 container m-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-3"
                >
                    {apartment.item.description}
                </motion.h2>
                <Card className="d-flex flex-column flex-md-row p-3 w-100" style={{ maxWidth: "100%" }} key={apartment.item.id}>
                    <Card.Img
                        variant="top"
                        src={imgPath + apartment.item.img}
                        alt={apartment.item.description}
                        className="w-100 d-md-none mb-3"
                        style={{ height: "250px", objectFit: "cover" }}
                    />

                    <div className="w-100 d-md-flex gap-3">
                        <motion.div
                            initial={{ x: -180, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                        >
                            <Card.Img
                                variant="top"
                                src={imgPath + apartment.item.img}
                                alt={apartment.item.description}
                                className="w-100 d-md-none mb-3"
                                style={{ height: "250px", objectFit: "cover" }}
                            />
                            <Card.Body className="w-100" style={{ width: "33.33%" }}>
                                <Card.Title>{apartment.item.description}</Card.Title>
                                <Card.Text as="div">
                                    <p><FaDoorOpen fill="#8B2635" size="20" className="me-3" /> {apartment.item["rooms_number"]} Rooms</p>
                                    <p><FaBed fill="#8B2635" size="20" className="me-3" /> {apartment.item["beds_number"]} Beds</p>
                                    <p><FaBath fill="#8B2635" size="20" className="me-3" /> {apartment.item["bathrooms_number"]} Bathrooms</p>
                                    <p><FaRulerCombined fill="#8B2635" size="20" className="me-3" /> {apartment.item["square_meters"]} m²</p>
                                    <p><FaMapMarkerAlt fill="#8B2635" size="20" className="me-3" /> {apartment.item.address}, {apartment.item.city}</p>
                                    <p><FaHome fill="#8B2635" size="20" className="me-3" /> {category?.name}</p>

                                    <MapComponent latitude={latitude} longitude={longitude} />

                                    <div className="d-flex gap-2 pt-3">
                                        <button className="btn btn-danger text-light btn-sm d-flex align-items-center justify-content-center align-self-center" id={style.likeButton}
                                            onClick={() => {
                                                addLike(slug).then(() => setLikes(likes + 1));
                                            }}>
                                            <span className="d-inline-block me-2">&#9829;</span>
                                            <span className="ml-3 d-inline-block align-self-center">{likes}</span>
                                        </button>

                                        <button className="btn btn-send text-light btn-sm d-flex justify-content-around align-content-between align-self-center px-3"
                                            onClick={() => setIsOverlayOpen(true)}>
                                            <span><FaEnvelope className="mx-auto d-inline-block me-md-2" /></span>
                                            <span className="d-none d-md-inline-block">Send Email</span>
                                        </button>
                                    </div>
                                </Card.Text>
                            </Card.Body>

                        </motion.div>
                        </div>
                        <div className="w-100 d-md-flex gap-3">
                            <div style={{ width: "66.67%", height: "100%" }}>
                                <Card.Img
                                    variant="left"
                                    src={imgPath + apartment.item.img}
                                    alt={apartment.item.description}
                                    className="d-none d-md-block me-3"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <div style={{ width: "33.33%", height: "100%" }}>
                                <Card.Body className="w-100" style={{ width: "33.33%" }}>
                                    <Card.Text as="div">
                                        <motion.div
                                            initial={{ x: 100, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                        >
                                            <p className="d-flex flex-nowrap align-items-center"><FaDoorOpen fill="#8B2635" size="20" className="me-3" /> {apartment.item["rooms_number"]} Rooms</p>
                                            <p className="d-flex flex-nowrap align-items-center"><FaBed fill="#8B2635" size="20" className="me-3" /> {apartment.item["beds_number"]} Beds</p>
                                            <p className="d-flex flex-nowrap align-items-center"><FaBath fill="#8B2635" size="20" className="me-3" /> {apartment.item["bathrooms_number"]} Bathrooms</p>
                                            <p className="d-flex flex-nowrap align-items-center"><FaRulerCombined fill="#8B2635" size="20" className="me-3" /> {apartment.item["square_meters"]} m²</p>
                                            <p className="d-flex flex-nowrap align-items-center"><FaMapMarkerAlt fill="#8B2635" size="20" className="me-3" /> {apartment.item.address}, {apartment.item.city}</p>
                                            <p className="d-flex flex-nowrap align-items-center"><FaHome fill="#8B2635" size="20" className="me-3" /> {category?.name}</p>
                                            <div className="d-flex gap-2">
                                                <button className="btn btn-danger text-light btn-sm d-flex align-items-center justify-content-center align-self-center" id={style.likeButton}
                                                    onClick={() => {
                                                        addLike(slug).then(() => {
                                                            setLikes(likes + 1);
                                                        });
                                                    }}>
                                                    <span className="d-inline-block me-2">&#9829;</span>
                                                    <span className="ml-3 d-inline-block align-self-center">{likes}</span>
                                                </button>
                                                <button className="btn btn-send text-light btn-sm d-flex justify-content-around align-content-between align-self-center px-3"
                                                    onClick={() => setIsOverlayOpen(true)}>
                                                    <span><FaEnvelope className="mx-auto d-inline-block me-md-2" /></span>
                                                    <span className="d-none d-md-inline-block">Send Email</span>
                                                </button>
                                            </div>
                                        </motion.div>
                                    </Card.Text>
                                </Card.Body>

                            </div>
                        </div>
                </Card>
            </div>

            {isOverlayOpen && (
                <div className={`card-text ${style.overlay}`}>
                    <div className={`${style["overlay-content"]} d-flex flex-column `}>
                        <button className="btn-close align-self-end" onClick={() => setIsOverlayOpen(false)} />
                        <button className="btn-close align-self-end" onClick={() => setIsOverlayOpen(false)}>
                        </button>
                        <ContactForm ownerMail={ownerMail} />
                    </div>
                </div>
            )}

            <section className="container m-auto pt-5">
                {apartment.item.reviews.length > 0 ? (
                    apartment.item.reviews.map((review, index) => (
                        <div key={review.id} className={`card d-flex flex-column mb-3 ${index % 2 === 0 && "bg-secondary-subtle"}`}>
                            <div className="card-body">
                                <p className="card-text">{review.text}</p>
                                <p className="card-text"><span className="fw-semibold">Entry date:</span> {review.entry_date}</p>
                                <p className="card-text"><span className="fw-semibold">Days of stay:</span> {review.days_of_stay}</p>
                                <h5 className="card-title">
                                    Vote: <Star num={review.vote} />
                                </h5>
                                <p className={`card-text ${style["text-name"]}`}>By {review.name}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <h4 className="py-5 text-center fw-bold">There are no reviews for this apartment: add yours!</h4>
                )}
            </section>

            <section>
                <ReviewForm
                    apartment_slug={slug}
                    singleApartment={apartment}
                    submit={submit}
                    formData={formData}
                    onHandleStarHover={onHandleStarHover}
                    onHandleStarClick={onHandleStarClick}
                    onHandleInput={onHandleInput}
                    hoverVote={hoverVote}
                    setHoverVote={setHoverVote}
                    validateForm={validateForm}
                    errors={errors}
                />
=======
                <motion.h3
                    initial={{ x: -180, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    className="pb-5">List of reviews:
                </motion.h3>

                {apartment.item.reviews.length > 0 ? apartment.item.reviews.map((review, index) => (
                    <div key={review.id}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className={`card d-flex flex-column mb-3 ${index % 2 === 0 && "bg-secondary-subtle"}`}>
                            <div className="card-body">
                                <p className="card-text">{review.text}</p>
                                <h5 className="card-title">Vote: <Star num={review.vote} /></h5>
                                <p className={`card-text ${style["text-name"]}`}>By {review.name}</p>
                            </div>
                        </motion.div>
                    </div>
                ))
                    : <motion.h4
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}

                        className="py-5 text-center fw-bold">There are no reviews for this apartment: add yours!</motion.h4>}
            </section>

            <section>
                <motion.h3
                    initial={{ x: -180, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}

                    className="py-5">Add your review:
                </motion.h3>

                <ReviewForm apartment_slug={slug} singleApartment={apartment} submit={submit} formData={formData} onHandleStarHover={onHandleStarHover} onHandleStarClick={onHandleStarClick} onHandleInput={onHandleInput} hoverVote={hoverVote} setHoverVote={setHoverVote} validateForm={validateForm} errors={errors} />
            </section>
        </>
    );
}
