import { useParams } from "react-router";
import { useState, useEffect, useRef } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import React from "react";
import { Card } from "react-bootstrap";
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaHome, FaDoorOpen, FaEnvelope, FaTimes } from "react-icons/fa";
import ReviewForm from "./ReviewForm";
import ContactForm from "./ContactForm";
import Star from "./Star";
import style from "../styles/SingleApartment.module.css";
import { motion } from "framer-motion";
import MapComponent from "./MapComponent";


export default function SingleApartment({ apartment, categories, city, ownerMail, info, name, submit, formData, onHandleInput, onHandleStarHover, onHandleStarClick, hoverVote, setHoverVote, validateForm, errors }) {
    const { addLike } = useGlobalContext();
    const { slug } = useParams();
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [limitReviews, setLimitReviews] = useState(2); // useState per il limite di recensioni visualizzate
    const reviewRef = useRef(null);

    let category = "";
    const [likes, setLikes] = useState(apartment.item.likes);
    const imgPath = import.meta.env.VITE_IMGPATH;
    const apiUrl = import.meta.env.VITE_APIURL;
    const endpoint = "/apartments/";

    const delayAnim = 0.05;
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

    function findCategory() {
        return category = categories.find(element => element.id == apartment.item["id_category"])
    }
    findCategory();

    function clickedShowMoreRewiews() {
        setLimitReviews(limitReviews + 3);
    }

    function clickedCollapseRewiews() {
        setLimitReviews(2);


    }
    // visualizzo le recensioni a 3 a 3
    function showReviews() {
        return apartment.item.reviews.map((review, index) => (
            index <= limitReviews && (
                <div key={review.id}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * delayAnim }}
                        // Alterno i colori del container delle recensioni in base al pari o dispari
                        className={`card d-flex flex-column mb-3 ${index % 2 === 0 && `${style["review-alternate-color"]}`}`}>
                        <div className="card-body">
                            {/* Inserisco la data con il formato americano: mese/giorno/anno ora:minuti:secondi */}
                            <p className="card-text">
                                {new Date(review.create_date).toLocaleString("en-US", {
                                    month: "2-digit",
                                    day: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                    hour12: false, // Assicura il formato 24h
                                }).replace(",", "")} {/* Rimuove la virgola tra data e ora */}
                            </p>
                            <p className="card-text">{review.text}</p>
                            <h5 className="card-title">Vote: <Star num={review.vote} /></h5>
                            <p className={`card-text ${style["text-name"]}`}>By {review.name}</p>
                        </div>
                    </motion.div>
                </div>)
        ))
    }

    function scrollToReview() {
        if (reviewRef.current) {
            const reviewTop = reviewRef.current.offsetTop;
            window.scrollTo({
                top: reviewTop - 95,
                behavior: "smooth"
            });
        }
    }

    function showHideButton() {


        if (apartment.item.reviews.length > 3) {
            if (apartment.item.reviews.length - 1 >= limitReviews) {
                if (limitReviews > 3) {
                    return (
                        <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-send my-3 d-flex align-self-start" onClick={clickedShowMoreRewiews}>Show other comments</button>
                            <button type="button" className="btn btn-send my-3 d-flex align-self-end" onClick={clickedCollapseRewiews}><a href="#reviewsCollapse" className="text-decoration-none btn-send">Hide other comments</a></button>

                        </div>
                    )

                } else {
                    return <button type="button" className="btn btn-send my-3 d-flex align-self-start" onClick={clickedShowMoreRewiews}>Show other comments</button>
                }
            }
            else if (apartment.item.reviews.length >= 3) {
                return (
                    <div className="d-flex justify-content-end w-100">
                        <button type="button" className="btn btn-send my-3 d-flex align-self-end" onClick={clickedCollapseRewiews}><a href="#reviewsCollapse" className="text-decoration-none btn-send">Hide other comments</a></button>
                    </div>
                )
            }
            else {
                "";
            }
        } else { ""; }
    }

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
                    <motion.div
                        initial={{ x: -180, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: delayAnim, ease: "easeOut" }}
                    >
                        <Card.Img
                            variant="top"
                            src={imgPath + apartment.item.img}
                            alt={apartment.item.description}
                            className="w-100 d-md-none mb-3"
                            style={{ height: "250px", objectFit: "cover" }}
                        />
                    </motion.div>
                    <div className="w-100 d-md-flex gap-3">
                        <div style={{ width: "66.67%", height: "100%" }} className="d-none d-md-block ">
                            <Card.Img
                                variant="left"
                                src={imgPath + apartment.item.img}
                                alt={apartment.item.description}
                                className="me-3"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </div>
                        <div style={{ height: "100%" }} className="flex-grow-1">
                            <Card.Body className="w-100">
                                <Card.Text as="div" className="d-flex">
                                    <motion.div
                                        initial={{ x: 100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                    >
                                        <p className="d-flex flex-nowrap"><FaDoorOpen fill="#8B2635" size="20" className="me-3" /> {apartment.item["rooms_number"]} Rooms</p>
                                        <p className="d-flex flex-nowrap"><FaBed fill="#8B2635" size="20" className="me-3" /> {apartment.item["beds_number"]} Beds</p>
                                        <p className="d-flex flex-nowrap"><FaBath fill="#8B2635" size="20" className="me-3" /> {apartment.item["bathrooms_number"]} Bathrooms</p>
                                        <p className="d-flex flex-nowrap"><FaRulerCombined fill="#8B2635" size="20" className="me-3" /> {apartment.item["square_meters"]} m²</p>
                                        <p className="d-flex flex-nowrap"><FaMapMarkerAlt fill="#8B2635" size="20" className="me-3" /> {apartment.item.address}, {apartment.item.city}</p>
                                        <p className="d-flex flex-nowrap"><FaHome fill="#8B2635" size="20" className="me-3" /> {category?.name}</p>


                                        <div className="d-flex gap-2 pt-3">
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
                                <div id="reviewsCollapse" className="w-100 d-flex justify-content-center align-content-center mt-3" style={{ border: "1px solid  #2E3532", borderRadius: "10px", overflow: "hidden" }}>
                                    <MapComponent longitude={longitude} latitude={latitude} />
                                </div>
                            </Card.Body>
                        </div>
                    </div>
                </Card>
            </div>

            {isOverlayOpen && (
                <div className={`card-text ${style.overlay}`}>
                    <div className={`${style["overlay-content"]} d-flex flex-column `}>
                        <button className="btn-close align-self-end" onClick={() => setIsOverlayOpen(false)}>
                        </button>
                        <ContactForm ownerMail={ownerMail} city={city} category={category} info={info} name={name} />
                    </div>
                </div>
            )}

            <section className="container m-auto pt-5 my-5" >

                <button type="button" className="btn btn-send my-3" onClick={scrollToReview}
                >Add your review
                </button>


                <motion.h3
                    initial={{ x: -180, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: delayAnim, ease: "easeOut" }}
                    className="pb-2 mt-3"
                >List of reviews:
                </motion.h3>

                {apartment.item.reviews.length > 0 ? showReviews()
                    : <motion.h4
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: delayAnim, ease: "easeOut" }}
                        className="py-5 text-center fw-bold">There are no reviews for this apartment: add yours!</motion.h4>}
                {showHideButton()}
            </section >

            <section ref={reviewRef}>

                <motion.h3
                    initial={{ x: -180, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: delayAnim, ease: "easeOut" }}

                >Add your review:
                </motion.h3>

                <ReviewForm apartment_slug={slug} singleApartment={apartment} submit={submit} formData={formData} onHandleStarHover={onHandleStarHover} onHandleStarClick={onHandleStarClick} onHandleInput={onHandleInput} hoverVote={hoverVote} setHoverVote={setHoverVote} validateForm={validateForm} errors={errors} />


            </section>

        </>
    );


}