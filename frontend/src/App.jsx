import { BrowserRouter, Routes, Route } from "react-router-dom"
import { GlobalProvider } from "./contexts/GlobalContext"

import DefaultLayout from "./layouts/DefaultLayout.jsx";
import AdvancedResearch from "./pages/AdvancedResearch.jsx";
import ApartmentDetails from "./pages/ApartmentDetails.jsx";
import ApartmentPostForm from "./pages/ApartmentPostForm.jsx";
import Homepage from "./pages/Homepage.jsx";
import NotFound from "./pages/NotFound.jsx";
import ContactForm from "./pages/ContactForm.jsx";



function App() {

  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route index Component={Homepage} />
            <Route path="/apartment">
              <Route path=":id">
                <Route index Component={ApartmentDetails} />
                <Route path="contact-form" Component={ContactForm} />
              </Route>
            </Route>
            <Route path="/advanced-research" Component={AdvancedResearch} />
            <Route path="/post-apartment" Component={ApartmentPostForm} />

            <Route path="*" Component={NotFound} />
          </Route>
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  )
}

export default App
