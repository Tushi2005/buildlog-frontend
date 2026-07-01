import { useState } from "react"
import PhaseElement from "./Phase";
import type { Phase } from "../../models/phaseModel";


export default function Project({ projectName, projectType }: { projectName: string, projectType: string }) {
    const [isOpened, setOpen] = useState<boolean>(false);
    const [isDialogOpened, setDialogOpen] = useState<boolean>(false);
    const [isProjectFinishing, setProjectFinished] = useState<boolean>(false);
    const [phases, setPhases] = useState<Phase[]>([]);


    function handleOpening() {
        setOpen(!isOpened);
    }
    function openProject() {
        return phases.map(phase => <PhaseElement key={phase.id} phaseName={phase.name} phaseType={phase.type} time={phase.time} desc={phase.description}></PhaseElement>)
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
            materials: []
        };

        setPhases([...phases, newPhase]);
        handleAddPhase();
    }


    function addPhase() {
        return <>
            <dialog open={isDialogOpened}>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="phaseName">Name</label>
                        <input type="text" name="phaseName" id="phaseName" />
                    </div>
                    <div>
                        <select name="phaseType">Type
                            <option value="Material 1">Material 1</option>
                            <option value="Material 2">material 2</option>
                        </select>
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
        <ProjectHeader></ProjectHeader>
        {isOpened && openProject()}
        {isDialogOpened && addPhase()}
        {isProjectFinishing && finishingProject()}
    </>
}

