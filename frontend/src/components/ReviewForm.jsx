import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdContact } from "react-icons/io";
import { MdRateReview } from "react-icons/md";
import { BsCalendarDateFill } from "react-icons/bs";
import { PiListNumbersFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import FormStyle from "../styles/ReviewForm.module.css";



function ReviewForm({ submit, formData, onHandleStarHover, onHandleStarClick, onHandleInput, setHoverVote, hoverVote, errors }) {

    return (
        <form id="reviewForm" className="container m-auto" onSubmit={submit} noValidate>
            <label htmlFor="name">Name *</label>
            <div className="input-group">
                <span className="input-group-text"><IoMdContact /></span>
                <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" value={formData.name} onChange={onHandleInput} />
            </div>
            <p>{errors.name && <span className={`error-message  mb-3 ${FormStyle.errorMessage}`}>{errors.name}</span>}</p>

            <label htmlFor="text">Comment *</label>
            <div className="input-group">
                <span className="input-group-text"><MdRateReview /></span>
                <textarea className="form-control" id="text" name="text" rows="3" placeholder="Enter your comment" value={formData.text} onChange={onHandleInput}></textarea>
            </div>
            <p>{errors.text && <span className={`error-message ${FormStyle.errorMessage}`}>{errors.text}</span>}</p>

            <label htmlFor="entryDate">Entry date *</label>
            <div className="input-group">
                <span className="input-group-text"><BsCalendarDateFill /></span>
                <input type="date" className="form-control" id="entryDate" name="entryDate" value={formData.entryDate} onChange={onHandleInput} />
            </div>
            <p>{errors.entryDate && <span className={`error-message ${FormStyle.errorMessage}`}>{errors.entryDate}</span>}</p>

            <label htmlFor="daysOfStay">Days of stay... *</label>
            <div className="input-group">
                <span className="input-group-text"><PiListNumbersFill /></span>
                <input type="number" className="form-control" id="daysOfStay" name="daysOfStay" placeholder="Insert days of stay" value={formData.daysOfStay} onChange={onHandleInput} />
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

            <button type="submit" className="btn btn-send">Add comment</button>
            <p className="mt-3">* Fields marked with * are required</p>
        </form>
    );
}

export default ReviewForm;