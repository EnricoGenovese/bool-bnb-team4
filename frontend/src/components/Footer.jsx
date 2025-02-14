import { NavLink } from "react-router"

export default function Footer() {
    return (
        <footer className="bg-dark text-center text-center mt-3 w-100 p-3">
            <div className="w-100 d-flex justify-content-around">
                <NavLink to="/" className="text-body">
                    <div className="text-center p-3 bg-dark text-light">
                        Home
                    </div>
                </NavLink>
                <NavLink to="/advanced-research" className="text-body">
                    <div className="text-center p-3 bg-dark text-light">
                        Search an apartment
                    </div>
                </NavLink>
                <NavLink to="/apartment-post" className="text-body">
                    <div className="text-center p-3 bg-dark text-light ">
                        Post your announcement
                    </div>
                </NavLink>
                <div className="p-3 bg-dark text-light">
                    © 2025 Copyright: Bool B&amp;B
                </div>
            </div>
        </footer>
    )
}