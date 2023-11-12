import {useRef, useState} from "react";
import {Play, X} from "lucide-react";

export default function Pomodoro() {

    const test = true;
    const short_break_duration = test ? 2000: 5 * 60 * 1000;
    const long_break_duration = test ? 5000 : 30 * 60 * 1000;
    const work_duration = test ? 2000 : 25 * 60 * 1000;

    let [percent, set_percent] = useState(0);
    let [duration, set_duration] = useState(work_duration);
    const duration_ref = useRef(duration);
    duration_ref.current = duration;

    let [is_break, set_is_break] = useState(false);
    const is_break_ref = useRef(is_break);
    is_break_ref.current = is_break;

    let [running, set_running] = useState(false);
    let [session_count, set_session_count] = useState(0);
    const session_count_ref = useRef(session_count);
    session_count_ref.current = session_count;

    let [abort, set_abort] = useState(false);
    const abort_ref = useRef(abort);
    abort_ref.current = abort;

    let interval = 0;
    let start;

    function add() {
        set_session_count(session_count_ref.current + 1);
    }

    function stop(interval) {
        clearInterval(interval);
        set_percent(0);
        set_running(false);
    }

    function start_work() {

        set_abort(false);

        if (running) {
            return;
        }

        start = Date.now();
        set_running(true);
        set_duration(work_duration);

        interval = setInterval(() => {
            let elapsed_time = Date.now() - start;
            set_percent(Math.min((elapsed_time / duration_ref.current) * 100, 100));

            if (abort_ref.current) {
                stop(interval);
                set_is_break(false);
                set_abort(false);
                set_session_count(0);
                set_duration(work_duration);
            }

            if (elapsed_time >= duration_ref.current) {
                if (is_break_ref.current) {
                    new Audio("/media/break_end.wav").play();
                    stop(interval);
                    set_is_break(false);
                    set_duration(work_duration);

                    if (session_count_ref.current === 8) {
                        set_session_count(0);
                    }
                } else {
                    start = Date.now();
                    new Audio("/media/break_start.wav").play();
                    set_percent(0);
                    set_is_break(true);
                    add();
                    set_duration(((session_count_ref.current + 1) % 4) === 0 ? long_break_duration : short_break_duration);
                }
            }
        }, 100);
    }

    let bar_style = {
        width: percent + "%"
    };
    let progress_bar_classes = "h-1 rounded transition duration-100 " + (is_break ? "bg-orange-500" : "bg-emerald-500");

    return (
        <div className="w-full h-full flex justify-center items-center bg-main">

            <div className="bg-main-dark rounded-md p-3 flex flex-col items-center gap-3">
                <div className="w-96 flex flex-col gap-3">
                    <div className="w-full p-2 bg-main rounded border border-main-light">
                        <div className="w-full h-1 bg-main-darkest rounded relative">
                            <div style={bar_style} className={progress_bar_classes}></div>
                        </div>
                    </div>
                    <div className="flex justify-center p-1 gap-8">
                        <div className="flex gap-2 justify-center">
                            <Ploeppsi selected={session_count > 0}/>
                            <Ploeppsi selected={session_count > 1}/>
                            <Ploeppsi selected={session_count > 2}/>
                            <Ploeppsi selected={session_count > 3}/>
                        </div>
                        <div className="flex gap-2 justify-center">
                            <Ploeppsi selected={session_count > 4}/>
                            <Ploeppsi selected={session_count > 5}/>
                            <Ploeppsi selected={session_count > 6}/>
                            <Ploeppsi selected={session_count > 7}/>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button onClick={() => running ? set_abort(true) : start_work()} className="rounded-full border border-main-light aspect-square w-8 flex items-center justify-center bg-main text-neutral-400 hover:bg-main-light">
                        {running ? <X weight="fill" size={16}></X> : <Play weight="fill" size={16}></Play>}
                    </button>
                </div>

            </div>

        </div>
    );
}

function Ploeppsi({selected}) {

    if (selected) {
        return (
            <div className="h-2 aspect-square bg-emerald-500 rounded-full"></div>
        );
    }

    return (
        <div className="h-2 aspect-square bg-main-darkest border border-main-light rounded-full"></div>
    );
}