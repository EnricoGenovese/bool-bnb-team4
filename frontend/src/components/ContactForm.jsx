import emailjs from 'emailjs-com';
import { useState } from "react";
import styles from '../styles/ContactForm.module.css';

export default function ContactForm() {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    // Gestori per i cambiamenti nei campi del form
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleMessageChange = (e) => setMessage(e.target.value);

    // Funzione per inviare la mail
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Inviare la mail tramite EmailJS
        const templateParams = {
            from_email: email,
            message: message,
        };

        emailjs
            .send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
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
    };

    return (
        <div className={`container ${styles.contactFormContainer}`}>
            <h2 className="text-center mb-4">Contact Us</h2>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
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
