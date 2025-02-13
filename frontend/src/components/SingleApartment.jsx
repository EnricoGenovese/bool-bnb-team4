import { useParams, Link } from "react-router";
import { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import React from "react";
import { Card } from "react-bootstrap";
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaHome, FaDoorOpen } from "react-icons/fa";
import ReviewForm from "./ReviewForm"

export default function SingleApartment({ apartment, categories }) {
    const { id } = useParams();
    let category = "";
    const imgPath = import.meta.env.VITE_IMGPATH;
    console.log("Tutte le categorie: ", categories);
    console.log("Id delle categorie: ", categories[0].id);

    function findCategory() {
        return category = categories.find(element => element.id == apartment["id_category"])

    }
    findCategory();

    return (
        <>
            <Card className="d-flex flex-column flex-md-row p-3 w-100" style={{ maxWidth: "100%" }} key={apartment.id}>
                {/* Mobile: Immagine sopra */}
                <Card.Img
                    variant="top"
                    src={imgPath + apartment.img}
                    alt={apartment.description}
                    className="w-100 d-md-none mb-3"
                    style={{ height: "150px", objectFit: "cover" }}
                />

                <div className="w-100 d-md-flex gap-3">
                    {/* Desktop: Immagine a sinistra */}
                    <Card.Img
                        variant="left"
                        src={imgPath + apartment.img}
                        alt={apartment.description}
                        className="d-none d-md-block me-3"
                        style={{ width: "33.33%", height: "100%", objectFit: "cover" }}
                    />
                    <Card.Body className="w-100" style={{ width: "66.67%" }}>
                        <Card.Title>{apartment.description}</Card.Title>
                        <Card.Text as="div">
                            <p><FaDoorOpen fill="#BB2D3B" size="20" className="me-3" /> {apartment["rooms_number"]} Rooms</p>
                            <p><FaBed size="20" className="me-3" /> {apartment["beds_number"]} Beds</p>
                            <p><FaBath size="20" className="me-3" /> {apartment["bathrooms_number"]} Bathrooms</p>
                            <p><FaRulerCombined size="20" className="me-3" /> {apartment["square_meters"]} m²</p>
                            <p><FaMapMarkerAlt size="20" className="me-3" /> {apartment.address}</p>
                            <p><FaHome size="20" className="me-3" /> {category?.name}</p>
                            <button className="btn btn-danger text-light btn-sm"
                                onClick={() => {
                                    addLike(id)
                                }}>
                                <span className="d-inline-block me-2">&#9829;</span>
                                <span className="ml-3 d-inline-block align-self-center">{apartment.likes}</span>
                            </button>
                        </Card.Text>
                    </Card.Body>
                </div>
            </Card>

            <section>
                <ReviewForm></ReviewForm>
            </section>
        </>
    );
}