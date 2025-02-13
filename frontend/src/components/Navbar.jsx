import { NavLink } from "react-router";

export default function Navbar() {
    return (
        <nav className="navbar sticky-top navbar-dark bg-dark mb-5">
            <div className="d-flex justify-content-between align-items-center px-3">
                <NavLink to={`/`} className="navbar-brand" href="#">Homepage</NavLink>
                <NavLink to={`/advanced-research`} className="navbar-brand" href="#">Search an apartment</NavLink>
                <NavLink to={`/post-apartment`} className="navbar-brand" href="#">Post your apartment</NavLink>
            </div>
        </nav>
    )
}