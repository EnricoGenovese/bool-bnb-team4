import { Outlet } from "react-router";
import { useGlobalContext } from "../contexts/GlobalContext";

import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"


export default function DefaultLayout() {

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}