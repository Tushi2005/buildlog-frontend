import { useState } from "react"
import PhasesPage from "./pages/PhasesPage/PhasesPage"
import type { Project } from "./models/project"

export default function App(){
  const[projects, setProject] = useState<Project[]>([]);
  return<>
  <PhasesPage projects={projects} onAddProject={addProject}></PhasesPage>
  </>

  function addProject(project:Project){
    setProject([...projects,project]);
  }
}



