import { BrowserRouter, Routes, Route } from "react-router-dom"
import { GlobalProvider } from "./contexts/GlobalContext"

import DefaultLayout from "./layouts/DefaultLayout.jsx";
import AdvancedResearch from "./pages/AdvancedResearch.jsx";
import ApartmentDetails from "./pages/ApartmentDetails.jsx";
import ApartmentPostForm from "./pages/ApartmentPostForm.jsx";
import Homepage from "./pages/Homepage.jsx";
import NotFound from "./pages/NotFound.jsx";



function App() {

  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path="/">
              <Route index Component={Homepage} />
              <Route path="/advanced-research" Component={AdvancedResearch} />
              <Route path=":id" Component={ApartmentDetails} />
              <Route path="/apartment-post-form" Component={ApartmentPostForm} />
            </Route>
          </Route>
          <Route path="*" Component={NotFound} />
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  )
}

export default App
