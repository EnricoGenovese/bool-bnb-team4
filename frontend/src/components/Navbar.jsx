import { useState } from "react";
import { NavLink } from "react-router";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = (e) => {
        e.preventDefault()
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-100 text-uppercase" id="id-navbar">
            <nav className="container-fluid navbar navbar-expand-lg d-navbar-dark h-100 p-0">
                <div className="w-100 g-0">
                    <button
                        className="navbar-toggler mx-3"
                        type="button"
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation"
                        onClick={handleToggle}
                    >
                        <span className="navbar-toggler-icon" style={{ backgroudColor: 'red' }}></span>
                    </button>
                    <div
                        className={`w-100 collapse navbar-collapse my-2  ${isOpen ? "show" : ""}`}
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-bold text-shadow-1">
                            <li className="nav-item ms-3">
                                <NavLink
                                    to="/"
                                    className="nav-link text-decoration-none navlink-hover custom-link"
                                    style={({ isActive }) => (isActive ? { color: "#8B2635" } : { color: "white" })}
                                    end
                                >
                                    Homepage
                                </NavLink>
                            </li>
                            <li className="nav-item ms-3">
                                <NavLink
                                    to="/advanced-research"
                                    className="nav-link text-decoration-none navlink-hover custom-link"
                                    style={({ isActive }) => (isActive ? { color: "#8B2635" } : { color: "white" })}
                                    end
                                >
                                    Search an apartment
                                </NavLink>
                            </li>
                            <li className="nav-item ms-3">
                                <NavLink
                                    to="/post-apartment"
                                    className="nav-link text-decoration-none navlink-hover custom-link"
                                    style={({ isActive }) => (isActive ? { color: "#8B2635" } : { color: "white" })}
                                    end
                                >
                                    Post your announcement
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}