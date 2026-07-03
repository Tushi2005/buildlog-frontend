import { useEffect, useState } from "react";
import type { Timer } from "../models/timer";

export default function Timer() {
    const [timer, setTimer] = useState<Timer>({ hour: 0, min: 0, sec: 0 });
    const [timerMs, setTimerMs] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [isTimerStarted, setIsTimerStarted] = useState<boolean>(false);

    useEffect(() => {
        if (!isTimerStarted) return;

        const startTime = Date.now();
        const intervalId = setInterval(() => {
            const time = Date.now() - startTime + duration;
            setTimer(timerCalc(time));
            setTimerMs(time);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isTimerStarted]);

    return <>
        {startPause_btn()}
        {timerDisplay()}
    </>


    function startPause_btn() {
        let state;
        isTimerStarted ? state = "Pause" : state = "Start";
        return <button onClick={handleIsTimerStarted}>{state}</button>
    }

    function handleIsTimerStarted() {
        setIsTimerStarted(!isTimerStarted);
        if (!isTimerStarted)
            setDuration(timerMs);
    }

    function timerDisplay() {
        return <div>
            {timer.hour >= 10 ? timer.hour : "0" + timer.hour}:
            {timer.min >= 10 ? timer.min : "0" + timer.min}:
            {timer.sec >= 10 ? timer.sec : "0" + timer.sec}
       </div>
    }
}

function timerCalc(timeMs: number): Timer {
    const totalSec = Math.floor(timeMs / 1000);
    const hour = Math.floor(totalSec / 3600);
    const min = Math.floor((totalSec % 3600) / 60);
    const sec = totalSec % 60;
    return { hour, min, sec };
}

