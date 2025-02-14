import { Outlet } from "react-router";
import { useGlobalContext } from "../contexts/GlobalContext";
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import Alert from "../components/Alert.jsx";


export default function DefaultLayout() {

    return (
        <>
            <Header />
            <Alert />
            <main className="container">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}