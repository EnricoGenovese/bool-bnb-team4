import styles from '../styles/NotFound.module.css'; // Modulo CSS personalizzato
import { Link } from "react-router-dom";

export default function NotFound() {
    return (



        <div>
            <div className={`container-fluid  p-5 mb-4 bg-light text-center ${styles.jumbotron}`}>
                <div className="text-white" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", padding: "20px", borderRadius: "10px" }}>
                    <h1 className="display-4">Oops! Something went wrong.</h1>
                    <p className="lead">We couldn't find the page you're looking for. Please try again later or return to the homepage.</p>
                </div>
                <Link className="btn custum-button mt-5 link-btn" to={"/"}>Back to Homepage</Link>
            </div>

            {/* <div className="row container m-auto">
                <div className={`col-12 col-md-6 col-lg-4 g-4 ${styles.errorImageContainer}`}>
                    <img
                        src="https://via.placeholder.com/400x400?text=404+Error"
                        alt="Error 404"
                        className="img-fluid"
                    />
                </div>
            </div> */}
        </div>

    )
}




