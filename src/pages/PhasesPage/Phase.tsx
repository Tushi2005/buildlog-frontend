import { useState } from "react"

export default function PhaseElement({ phaseName, phaseType, time, desc }: { phaseName: string, phaseType: string, time:number, desc:string }) {
    const [isOpened, setOpen] = useState<boolean>(false);

    if (isOpened) {
        return <>
            <PhaseHeader></PhaseHeader>
            <article>
                <p>Time: {time} hours</p>
                <button>Pause Phase</button>
                <button>Finish Phase</button>
                <button>Add image</button>
                <p>{desc}</p>
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
            <h3>{phaseName}</h3>
            <p>{phaseType}</p>
            <button onClick={handleOpening}>{state}</button>
        </>
    }
}