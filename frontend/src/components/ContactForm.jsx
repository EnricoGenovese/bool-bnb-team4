import emailjs from 'emailjs-com';
import { useState } from "react";
import styles from '../styles/ContactForm.module.css';

export default function ContactForm({ ownerMail }) {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [errors, setErrors] = useState({});
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Gestori per i cambiamenti nei campi del form
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleMessageChange = (e) => setMessage(e.target.value);

    const validateForm = (formData) => {
        const errors = {};

        if (!formData.user_email.trim()) {
            errors.user_email = 'Email required';
        } else if (!emailPattern.test(formData.user_email)) {
            errors.user_email = 'Please enter a valid email address';
        } else if (formData.user_email.length > 255) {
            errors.user_email = 'Email must be at most 255 characters long';
        }

        if (!formData.message.trim()) {
            errors.message = 'Comments required';
        }
        else if (formData.message.length > 255) {
            errors.message = 'The comment must contain at most 255 characters';
        }

        return errors;
    }

    // Funzione per inviare la mail
    const handleSubmit = (e) => {
        e.preventDefault();
        const templateParams = {
            user_email: email,
            message: message,
            to_email: ownerMail
        };
        const newErrors = validateForm(templateParams);
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {

            setIsSubmitting(true);
            // Inviare la mail tramite EmailJS
            emailjs
                .send('service_8ildxuc', 'template_0lntz26', templateParams, 'WYoHdRceyJKxA4E26')
                .then(
                    (result) => {
                        console.log(result.text);
                        setStatusMessage('Email inviata con successo!');
                        setEmail('');
                        setMessage('');
                    },
                    (error) => {
                        console.log(error.text);
                        setStatusMessage('Si è verificato un errore. Riprova.');
                    }
                )
                .finally(() => {
                    setIsSubmitting(false);
                });
            console.log("Il form è stato inviato con successo!");
        } else {
            console.log("L'invio del modulo non è riuscito a causa di errori di convalida");
        }

    };

    return (
        <div className={`container ${styles.contactFormContainer}`}>
            <h2 className="text-center mb-4">Contact Us</h2>
            <form onSubmit={handleSubmit} className={styles.contactForm} noValidate>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Your Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    {errors.user_email && (
                        <span className={`error-message ${styles.errorMessage}`}>
                            {errors.user_email}
                        </span>
                    )}

                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Your message</label>
                    <textarea
                        id="message"
                        className="form-control"
                        rows="4"
                        value={message}
                        onChange={handleMessageChange}
                        required
                    />
                    {errors.message && (
                        <span className={`error-message ${styles.errorMessage}`}>
                            {errors.message}
                        </span>
                    )}




                </div>
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </form>
            {statusMessage && <p className={`mt-3 text-center ${styles.statusMessage}`}>{statusMessage}</p>}
        </div>
    );
}
