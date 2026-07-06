import { useState } from "react";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage/HomePage";
import PhasesPage from "./pages/PhasesPage/PhasesPage";
import StorePage from "./pages/StorePage/StorePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";


export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("Home");

  let pageContent;
  switch (currentPage) {
    case "Home": pageContent = <HomePage />; break;
    case "Projects": pageContent = <PhasesPage />; break;
    case "Store": pageContent = <StorePage />; break;
    case "Profile": pageContent = <ProfilePage />; break;
  }

  return <>
    {pageContent}
    <hr />
    <NavBar onNavigate={setCurrentPage} />
  </>
}



