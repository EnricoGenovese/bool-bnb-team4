import { Outlet } from "react-router";
import { useGlobalContext } from "../contexts/GlobalContext";
import Alert from "../components/Alert.jsx";
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"


export default function DefaultLayout() {

    return (
        <>
            <Header />
            <Alert />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}