import { useState } from "react";
import type { Project } from "../models/project";

export default function NavBar({onAddProject}:{onAddProject:(project:Project) => void}) {
  const [isAddingOpen, setIsAddingOpen] = useState<boolean>(false);
  return <>
    <nav>
      <a href="">Home</a>
      <a href="">Phases</a>
      <button onClick={handleIsAddingOpen}>Add Project (+)</button>
      <a href="">Store</a>
      <a href="">Profile</a>
    </nav>
    {isAddingOpen && addProject()}
  </>

  function addProject() {
    return <dialog open={isAddingOpen}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Project name:</label>
          <input type="text" name="projectName"/>
        </div>
        <div>
          <label htmlFor="">Project type:</label>
          <input type="text" name="projectType"/>
        </div>
        <div>
          <button type="submit">Ok</button>
          <button type="button" onClick={handleIsAddingOpen}>Cancel</button>
        </div>
      </form>
    </dialog>
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    const newProject: Project = {
      id: 1,
      name: formJson.projectName as string,
      type: formJson.projectType as string,
    }
    onAddProject(newProject);
    handleIsAddingOpen();
  }

  function handleIsAddingOpen() {
    setIsAddingOpen(!isAddingOpen);
  }
}



