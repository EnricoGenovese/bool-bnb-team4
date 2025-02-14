
import emailjs from 'emailjs-com';
import { useState } from "react";
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
        <div>
            <h2>Contattaci</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div>
                    <label>Messaggio</label>
                    <textarea
                        value={message}
                        onChange={handleMessageChange}
                        required
                    />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Invio in corso...' : 'Invia'}
                </button>
            </form>
            {statusMessage && <p>{statusMessage}</p>}
        </div>
    );
};




