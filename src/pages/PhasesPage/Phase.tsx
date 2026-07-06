import { useState } from "react"
import type { Phase } from "../../models/phase";
import Timer from "../../components/Timer";

export default function PhaseElement({ phase, readOnly = false }: { phase: Phase, readOnly: boolean }) {
    const [isOpened, setOpen] = useState<boolean>(false);

    if (isOpened) {
        return <>
            <PhaseHeader></PhaseHeader>
            <article>
                {readOnly ? (
                    <p>Duration: {phase.time} hours</p>
                ) : (
                    <Timer></Timer>
                )}
                {!readOnly && <button>Add image</button>}
                <p>{phase.description}</p>
                <ul>
                    {phase.materials.map((material, index) => material === "" ? "" : <li key={index}> {material}</li>)}
                </ul>
            </article>
        </>
    } else {
        return <>
            <PhaseHeader></PhaseHeader>
        </>
    }

    function handleOpening() {
        setOpen(!isOpened)
    }

    function PhaseHeader() {
        let state = isOpened ? "Close" : "Open";

        return <>
            <h3>{phase.name}</h3>
            <p>{phase.type}</p>
            <button onClick={handleOpening}>{state}</button>
            <br />
        </>
    }

}