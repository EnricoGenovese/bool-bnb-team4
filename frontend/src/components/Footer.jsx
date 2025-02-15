import { NavLink } from "react-router"
import { FaFacebook, FaTwitter, FaInstagram, FaGlobe, FaYoutube, FaLinkedin } from "react-icons/fa"
export default function Footer() {
    return (
        <footer className="bg-dark text-light text-center text-lg-start mt-3">
            <div className="container p-4 d-flex flex-column">
                <div className="row text-center">
                    <div className="col-6 col-lg-3 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Contacts</h5>
                        <ul className="list-unstyled mb-0">
                            <li>
                                <a href="#" className="text-light">Link 1</a>
                            </li>
                            <a href="#" className="text-light">Link 1</a>
                            <li>
                                <a href="#" className="text-light">Link 2</a>
                            </li>
                            <li>
                                <a href="#" className="text-light">Link 3</a>
                            </li>
                            <li>
                                <a href="#" className="text-light">Link 4</a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-6 col-lg-3 mb-4 mb-md-0">
                        <h5 className="text-uppercase mb-0">Links</h5>

                        <ul className="list-unstyled">
                            <li>
                                <NavLink to={"/"} className="text-light">Homepage</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/advanced-research"} className="text-light">Search an apartment</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/post-apartment"} className="text-light">Post your announcement</NavLink>
                            </li>
                            <li>
                                <NavLink to={"#"} className="text-light">Homepage</NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className="col-6 col-lg-3 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Links</h5>

                        <ul className="list-unstyled mb-0">
                            <li>
                                <a href="#" className="text-light">Link 1</a>
                            </li>
                            <li>
                                <a href="#" className="text-light">Link 2</a>
                            </li>
                            <li>
                                <a href="#" className="text-light">Link 3</a>
                            </li>
                            <li>
                                <a href="#" className="text-light">Link 4</a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-6 col-lg-3 mb-4 mb-md-0">
                        <h5 className="text-uppercase mb-0">Links</h5>

                        <ul className="list-unstyled">
                            <li>
                                <a href="#" className="text-light">Link 1</a>
                            </li>
                            <li>
                                <a href="#" className="text-light">Link 2</a>
                            </li>
                            <li>
                                <a href="#" className="text-light">Link 3</a>
                            </li>
                            <li>
                                <a href="#" className="text-light">Link 4</a>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="text-center p-3 d-flex justify-content-center mt-4">
                    <p>© 2025 Copyright:&nbsp;</p>
                    <NavLink className="text-light" to={"/"}><p>Bool B&amp;B</p></NavLink>
                </div>
                <div className="w-50 align-self-center">
                    <ul className="nav col-md-4 justify-content-around list-unstyled d-flex py-3 w-100">
                        <li className="ms-3"><a href="#" ><FaFacebook style={{ width: "25px", height: "25px", fill: "white" }} /></a></li>
                        <li className="ms-3"><a href="#"><FaInstagram style={{ width: "25px", height: "25px", fill: "white" }} /></a></li>
                        <li className="ms-3"><a href="#"><FaTwitter style={{ width: "25px", height: "25px", fill: "white" }} /></a></li>
                        <li className="ms-3"><a href="#"><FaGlobe style={{ width: "25px", height: "25px", fill: "white" }} /></a></li>
                        <li className="ms-3"><a href="#"><FaYoutube style={{ width: "25px", height: "25px", fill: "white" }} /></a></li>
                        <li className="ms-3"><a href="#"><FaLinkedin style={{ width: "25px", height: "25px", fill: "white" }} /></a></li>
                    </ul>
                </div>
            </div>

        </footer>
    )
}