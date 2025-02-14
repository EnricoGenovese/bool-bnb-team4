import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdContact } from "react-icons/io";
import { MdRateReview } from "react-icons/md";
import { BsCalendarDateFill } from "react-icons/bs";
import { PiListNumbersFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import FormStyle from "../styles/ReviewForm.module.css";

const apiUrl = import.meta.env.VITE_APIURL;
const endpoint = "/apartments/";

function ReviewForm({ apartment_id }) {
    const initialForm = {
        text: "",
        name: "",
        entryDate: "",
        daysOfStay: "",
        vote: 0
    };
    
    const today = new Date().toISOString().split("T")[0];
    const minDate = new Date("2010-01-01").toISOString().split("T")[0];
    // const navigate = useNavigate();
    const [formData, setFormData] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [hoverVote, setHoverVote] = useState(0);
    // const [commentId, setCommentId] = useState("");
    
    // useEffect(() => {
    //     navigate("/apartment/" + apartment_id);
    // }, [commentId])
    
    function postReview(formData, apartment_id) {
        axios.post(`${apiUrl}${endpoint}${apartment_id}/reviews`, formData)
            .then((res) => {
                console.log("Recensione inviata con successo!");
                // setCommentId(res.data.results.insertId);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                console.log("Finally");
            })
    }

    const onHandleInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onHandleStarClick = (starValue) => {
        setFormData({ ...formData, vote: starValue });
    };

    const onHandleStarHover = (starValue) => {
        setHoverVote(starValue);
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm(formData);
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            postReview(formData, apartment_id);
            setFormData(initialForm);
        }
    };

    const validateForm = (formData) => {
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = 'Name required';
        } else if (formData.name.length < 2) {
            errors.name = 'The name must contain at least 2 characters';
        }
        else if (formData.name.length > 50) {
            errors.name = 'The name must contain at most 50 characters';
        }

        if (!formData.text.trim()) {
            errors.text = 'Comments required';
        }
        else if (formData.text.length > 255) {
            errors.text = 'The comment must contain at most 255 characters';
        }

        if (!formData.vote) {
            errors.vote = 'Vote required';
        }

        if (!formData.entryDate) {
            errors.entryDate = 'Entry date required';
        }
        else if (formData.entryDate > today ) {
            errors.entryDate = 'You cannot enter a future date';
        }
        else if (formData.entryDate < minDate) {
            errors.entryDate = 'The date is too old';
        }

        if (!formData.daysOfStay) {
            errors.daysOfStay = 'Days of stay required';
        }
        else if (formData.daysOfStay < 1) {
            errors.daysOfStay = 'Days of stay must be at least 1';
        }
        else if (formData.daysOfStay > 365) {
            errors.daysOfStay = 'You cannot enter a number of days greater than 365';
        }
        else if (formData.daysOfStay.includes('e') || formData.daysOfStay.includes('E')) {
            errors.daysOfStay = 'You must enter a number';
        }

        return errors;
    };

    return (
        <form className="container m-auto" onSubmit={onHandleSubmit} noValidate>
            <label htmlFor="name">Name *</label>
            <div className="input-group">
                <span className="input-group-text"><IoMdContact /></span>
                <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name..." value={formData.name} onChange={onHandleInput} /> 
            </div>
            <p>{errors.name && <span className={`error-message  mb-3 ${FormStyle.errorMessage}`}>{errors.name}</span>}</p>
            
            <label htmlFor="text">Write your comment... *</label>
            <div className="input-group">
                <span className="input-group-text"><MdRateReview /></span>
                <textarea className="form-control" id="text" name="text" rows="3" placeholder="Write review..." value={formData.text} onChange={onHandleInput}></textarea>
            </div>
            <p>{errors.text && <span className={`error-message ${FormStyle.errorMessage}`}>{errors.text}</span>}</p>

            <label htmlFor="entryDate">Entry date... *</label>
            <div className="input-group">
                <span className="input-group-text"><BsCalendarDateFill /></span>
                <input type="date" className="form-control" id="entryDate" name="entryDate" value={formData.entryDate} onChange={onHandleInput} />
            </div>
            <p>{errors.entryDate && <span className={`error-message ${FormStyle.errorMessage}`}>{errors.entryDate}</span>}</p>

            <label htmlFor="daysOfStay">Days of stay... *</label>
            <div className="input-group">
                <span className="input-group-text"><PiListNumbersFill /></span>
                <input type="number" className="form-control" id="daysOfStay" name="daysOfStay" placeholder="Insert days of stay..." value={formData.daysOfStay} onChange={onHandleInput} />
            </div>
            <p>{errors.daysOfStay && <span className={`error-message ${FormStyle.errorMessage}`}>{errors.daysOfStay}</span>}</p>

            <label>Vote *</label>
            <div className="input-group">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                        key={star}
                        size={30}
                        onClick={() => onHandleStarClick(star)}
                        onMouseEnter={() => onHandleStarHover(star)}
                        onMouseLeave={() => setHoverVote(0)}
                        color={star <= (hoverVote || formData.vote) ? "#C6A664" : "gray"}
                        style={{ cursor: "pointer", marginRight: "5px" }}
                    />
                ))}
            </div>
            <p>{errors.vote && <span className={`error-message ${FormStyle.errorMessage}`}>{errors.vote}</span>}</p>
            
            <button type="submit" className="btn btn-primary">Add comment</button>
            <p className="mt-3">* Fields marked with * are mandatory</p>
        </form>
    );
}

export default ReviewForm;