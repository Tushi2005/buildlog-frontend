import { useState } from "react"
import PhaseElement from "./Phase";
import type { Phase } from "../../models/phase";


export default function Project({ projectName, projectType }: { projectName: string, projectType: string }) {
    const [isOpened, setOpen] = useState<boolean>(false);
    const [isDialogOpened, setDialogOpen] = useState<boolean>(false);
    const [isProjectFinishing, setProjectFinished] = useState<boolean>(false);
    const [phases, setPhases] = useState<Phase[]>([]);
    const [materialCount, setMaterialCount] = useState<number[]>([]);
    const [deletedIndexes, setDeletedIndexes] = useState<number[]>([]);


    function handleOpening() {
        setOpen(!isOpened);
    }
    function openProject() {
        return phases.map(phase => <PhaseElement key={phase.id} phase={phase}></PhaseElement>)
    }

    function handleAddPhase() {
        setDialogOpen(!isDialogOpened);
    }

    function handleSubmit(e: any) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        const newPhase: Phase = {
            id: phases.length,
            name: formJson.phaseName as string,
            type: formJson.phaseType as string,
            time: 5,
            description: formJson.description as string,
            materials: formData.getAll("materials") as string[]
        };

        setPhases([...phases, newPhase]);
        setMaterialCount([]);
        setDeletedIndexes([]);
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
            <select name="phaseType" id="phaseType">
                <option value="type 1">Type 1</option>
                <option value="type 2">Type 2</option>
            </select>
        </label>
    }


    function addPhase() {
        function addMaterial() {
            setMaterialCount([...materialCount, materialCount[materialCount.length - 1] + 1]);
        }

        return <>
            <dialog open={isDialogOpened}>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="phaseName">Name</label>
                        <input type="text" name="phaseName" id="phaseName" />
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
                        <textarea name="description"></textarea>
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
        let status = isOpened ? "Close" : "Open";
        return <>
            <label htmlFor="">{projectName}</label>
            <p>{projectType}</p>
            <button onClick={handleAddPhase}>Add phase</button>
            <button onClick={handleFinishingProject}>Finishing Project</button>
            <button onClick={handleOpening}>{status}</button>
        </>
    }


    return <>
        {ProjectHeader()}
        {isOpened && openProject()}
        {isDialogOpened && addPhase()}
        {isProjectFinishing && finishingProject()}
    </>
}

