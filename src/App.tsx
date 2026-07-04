import { useState } from "react"
import PhasesPage from "./pages/PhasesPage/PhasesPage"
import type { Project } from "./models/project"
import StorePage from "./pages/StorePage/StorePage";

export default function App(){
  const[projects, setProject] = useState<Project[]>([]);
  return<>
    <StorePage></StorePage>
  </>

  function addProject(project:Project){
    setProject([...projects,project]);
  }
}



