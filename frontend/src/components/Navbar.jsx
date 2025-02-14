import { useState } from "react";
import { NavLink } from "react-router";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-100 bg-dark text-uppercase" id="id-navbar">
            <nav className="container navbar navbar-expand-lg d-navbar-dark bg-dark h-100 p-0">
                <div className="container-fluid g-0 ">
                    <button
                        className="navbar-toggler bg-light"
                        type="button"
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation"
                        onClick={handleToggle}
                    >
                        <span className="navbar-toggler-icon bg-light" style={{ backgroudColor: 'red' }}></span>
                    </button>
                    <div
                        className={`bg-dark w-100 collapse navbar-collapse ${isOpen ? "show" : ""}`}
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink
                                    to="/"
                                    className="nav-link text-decoration-none navlink-hover"
                                    style={({ isActive }) => (isActive ? { color: "red" } : { color: "white" })}
                                    end
                                >
                                    Homepage
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/advanced-research"
                                    className="nav-link text-decoration-none navlink-hover"
                                    style={({ isActive }) => (isActive ? { color: "red" } : { color: "white" })}
                                    end
                                >
                                    Search an apartment
                                </NavLink>
                            </li>
                            <li className="nav-item ">
                                <NavLink
                                    to="/post-apartment"
                                    className="nav-link text-decoration-none navlink-hover"
                                    style={({ isActive }) => (isActive ? { color: "red" } : { color: "white" })}
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