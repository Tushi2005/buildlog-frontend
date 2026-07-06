import { useState } from "react"
import PhaseElement from "./Phase";
import type { Phase } from "../../models/phase";
import type { Project } from "../../models/project";
import { useCrudList } from "../../hooks/useCrudList";


export default function ProjectElement({ project, readOnly = false, initialPhases }: { project: Project, readOnly?: boolean, initialPhases: Phase[] }) {
    const [isProjectOpened, setIsProjectOpened] = useState<boolean>(false);
    const [isAddingPhaseOpened, setIsAddingPhaseOpened] = useState<boolean>(false);
    const [isProjectFinishing, setProjectFinished] = useState<boolean>(false);
    const [materialCount, setMaterialCount] = useState<number[]>([]);
    const [deletedIndexes, setDeletedIndexes] = useState<number[]>([]);
    const [editPhase, setEditPhase] = useState<null | Phase>(null);
    const { items: phases, add: addPhase, remove: removePhase, update: updatePhase } = useCrudList<Phase>(initialPhases);


    return <>
        {ProjectHeader()}
        {isProjectOpened && openProject()}
        {isAddingPhaseOpened && onAddPhase()}
        {isProjectFinishing && finishingProject()}
    </>

    function handleOpening() {
        setIsProjectOpened(!isProjectOpened);
    }

    function openProject() {
        return phases.map((phase, index) => {
            return <div key={index}>
                <PhaseElement phase={phase} readOnly={readOnly}></PhaseElement>
                {!readOnly && <button onClick={() => removePhase(phase.id)}>Remove</button>}
                {!readOnly && <button onClick={() => {
                    setEditPhase(phase)
                    setIsAddingPhaseOpened(true);
                }}>Edit</button>}
            </div>
        }
        )
    }

    function handleAddPhase() {
        setIsAddingPhaseOpened(!isAddingPhaseOpened);
    }

    function handleSubmit(e: any) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());

        if (editPhase) {
            updatePhase({
                ...editPhase,
                name: formJson.phaseName as string,
                type: formJson.phaseType as string,
                time: 5,
                description: formJson.description as string,
                materials: formData.getAll("materials") as string[]
            })
            setEditPhase(null)
        } else {
            addPhase({
                name: formJson.phaseName as string,
                type: formJson.phaseType as string,
                time: 5,
                description: formJson.description as string,
                materials: formData.getAll("materials") as string[]
            });
        }
        handleAddPhase();
    }

    function handleMaterialDelete(index: number) {
        setDeletedIndexes([...deletedIndexes, index]);
    }

    function materialDisplay(length: number) {
        return Array.from({ length })
            .map((_, index) => index)
            .filter((index) => !deletedIndexes.includes(index))
            .map((index) => (
                <li key={index}>
                    <label htmlFor="">Material Name
                        <input type="text" name="materials" />
                    </label>
                    <button type="button" onClick={() => handleMaterialDelete(index)}>delete</button>
                </li>
            ));
    }

    function typeSection() {
        return <label htmlFor="phaseType">Type
            <select name="phaseType" id="phaseType" defaultValue={editPhase?.type}>
                <option value="type 1">Type 1</option>
                <option value="type 2">Type 2</option>
            </select>
        </label>
    }


    function onAddPhase() {
        function addMaterial() {
            setMaterialCount([...materialCount, materialCount[materialCount.length - 1] + 1]);
        }

        return <>
            <dialog open={isAddingPhaseOpened}>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="phaseName">Name</label>
                        <input type="text" name="phaseName" id="phaseName" defaultValue={editPhase?.name} />
                    </div>
                    <div>
                        {typeSection()}
                    </div>
                    <div>
                        <label htmlFor="">Add material</label>
                        <button onClick={addMaterial} type="button">Add</button>
                        <ul>
                            {materialDisplay(materialCount.length)}
                        </ul>
                    </div>

                    <div>
                        <label htmlFor="">Description</label>
                        <textarea name="description" defaultValue={editPhase?.description}></textarea>
                    </div>
                    <div>
                        <button type="submit">Ok</button>
                        <button onClick={handleAddPhase} type="button">Cancel</button>
                    </div>
                </form>
            </dialog>
        </>
    }

    function handleFinishingProject() {
        setProjectFinished(!isProjectFinishing);
    }

    function finishingProject() {
        return <>
            <dialog open={isProjectFinishing}>
                <label htmlFor="">Used material
                    <input type="text" />
                </label>
                <button>Ok</button>
                <button onClick={handleFinishingProject}>Cancel</button>
            </dialog>
        </>
    }

    function ProjectHeader() {
        let status = isProjectOpened ? "Close" : "Open";
        return <>
            <h2>{project.name}</h2>
            <p>{project.type}</p>
            {!readOnly && <button onClick={handleAddPhase}>Add phase</button>}
            {!readOnly && <button onClick={handleFinishingProject}>Finishing Project</button>}
            <button onClick={handleOpening}>{status}</button>
        </>
    }

}

