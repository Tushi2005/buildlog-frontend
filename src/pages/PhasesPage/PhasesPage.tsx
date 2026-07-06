import { useState } from "react";
import { useCrudList } from "../../hooks/useCrudList";
import type { Project } from "../../models/project";
import ProjectElement from "./Project";

export default function PhasesPage() {
    const { items: projects, add: addProject, remove: removeProject, update: updateProject } = useCrudList<Project>();
    const [isAddingOpen, setIsAddingOpen] = useState<boolean>(false);
    const [editProject, setEditProject] = useState<null | Project>(null);

    return <>
        <h1>Projects</h1>
        <button onClick={handleIsAddingOpen}>Add new project</button>
        {displayProjects()}
        {isAddingOpen && onAddProject()}
    </>

    function displayProjects() {

        return projects.map((project, index) => {
            return <div key={index}>
                <button onClick={() => removeProject(project.id)}>Remove</button>
                <button onClick={() => {
                    setEditProject(project);
                    setIsAddingOpen(true);
                }
                }>Edit</button>
                <ProjectElement project={project} key={index}></ProjectElement>
            </div>
        })
    }

    function onAddProject() {
        return <dialog open={isAddingOpen}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">{editProject ? "Edit project name" : "New project name"}</label>
                    <input type="text" name="projectName" defaultValue={editProject?.name} />
                </div>
                <div>
                    <label htmlFor="">{editProject ? "Edit project type" : "project type"}</label>
                    <input type="text" name="projectType" defaultValue={editProject?.type} />
                </div>
                <div>
                    <button type="submit">Ok</button>
                    <button type="button" onClick={() => {
                        handleIsAddingOpen();
                        setEditProject(null);
                    }}>Cancel</button>
                </div>
            </form>
        </dialog>
    }

    function handleSubmit(e: any) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());

        if (editProject) {
            updateProject({
                ...editProject,
                name: formJson.projectName as string,
                type: formJson.projectType as string,
            })
        }
        else {
            addProject({
                name: formJson.projectName as string,
                type: formJson.projectType as string,
            })
        }
        handleIsAddingOpen();
    }

    function handleIsAddingOpen() {
        setIsAddingOpen(!isAddingOpen);
    }
}

