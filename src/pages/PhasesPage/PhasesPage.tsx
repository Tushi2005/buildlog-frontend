import NavBar from "../../components/NavBar"
import type { Project } from "../../models/project";
import ProjectElement from "./Project";

export default function ({projects,onAddProject}:{projects:Project[],onAddProject:(project:Project) => void}) {
    return <>
        {displayProjects()}
        <NavBar onAddProject={onAddProject}></NavBar>
    </>

    function displayProjects() {
        return projects.map((project,index )=> <ProjectElement project={project} key={index}></ProjectElement>)
    }
}

