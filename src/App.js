import {useState} from "react";

import TopBar from "./TobBar";
import Modal from "./modal/Modal"
import Button from "./inputs/Button";

import moment from 'moment'
import {PlusCircle} from "phosphor-react";
import DateHelper from "./helpers/DateHelper";
import Clock from "./misc/Clock";
import Flashcards from "./flashcard/Flashcards";
import Sidebar from "./Sidebar";
import Minesweeper from "./game/Minesweeper";
import Pomodoro from "./pomodoro/Pomodoro";

function Appointment({start_date, duration, title, description, bg_color}) {

    const [is_open = false, set_open] = useState(false)

    let close = () => set_open(false);

    function get_date_text(start) {
        let current = moment();

        if( start.isSame(current, 'day') )
            return "Heute";

        current.add(1, 'd');
        if( start.isSame(current, 'day') )
            return "Morgen";

        if( start.diff(current, 'd') < 6 )
            return DateHelper.getWeekOfDayName(start);

        return start.format('DD.MM.YYYY');
    }

    let start = new moment(start_date, 'YYYY-MM-DD hh:mm:ss');
    if(!start.isValid()) return null;

    let date_text = get_date_text(start);
    let time_text = start.format('hh:mm') + (duration > 0 ? "-" + start.add(duration, 's').format('hh:mm') : "");

    return (
        <>
            <div onClick={set_open} className="group text-white hover:bg-gray-800 w-full h-12 rounded flex justify-start items-center overflow-hidden cursor-pointer">
                <div className="w-[10%] p-2.5 h-full relative flex justify-center items-center">
                    <div className="bg-gray-300 rounded h-full w-full" style={{backgroundColor: bg_color}}></div>
                </div>
                <div className="flex flex-col w-[30%] p-1 px-2 rounded">
                    <div className="h-1/2 flex text-sm text-gray-200 group-hover:underline">{date_text}</div>
                    <div className="h-1/2 flex text-xs text-gray-400">{time_text}</div>
                </div>
                <div className="flex flex-col w-[60%] p-1 px-2">
                    <div className="h-1/2 max-w-sm flex text-sm text-gray-200 group-hover:underline truncate">{title}</div>
                    <div className="h-1/2 flex text-xs text-gray-400 truncate">{description.length ? description : "-"}</div>
                </div>
            </div>
            <Modal title={title} open={is_open} do_close={() => set_open(false)} bottom_content={
                <>
                    <Button on_click={close}>Close</Button>
                    <Button on_click={close} type='success' >Success</Button>
                </>
            }>
                {description}
            </Modal>
        </>
    );
}

function Appointments() {
    return (
            <div className="h-full w-full flex flex-col gap-2">

                <Clock></Clock>

                <div className="flex flex-col h-full">
                    <div className="flex items-center p-1 justify-between text-white bg-gray-900 bg-opacity-50 border border-gray-600 rounded-t">
                        <div className="text-md font-bold px-2">Termine</div>
                        <Button><PlusCircle size={20}/></Button>
                    </div>

                    <div className="relative flex-grow">
                        <div className="bg-gray-900 rounded-b border-t-0 w-full flex flex-col border border-gray-600 p-1 gap-1 absolute top-0 bottom-0">
                            <div className="overflow-y-scroll overflow-x-hidden no-scrollbar">
                                <Appointment start_date={"2022-09-11 12:00:00"} duration={30*60} bg_color={"#FCBA03"} title="Meeting Maja" description="Höhö"></Appointment>
                                <Appointment start_date={"2022-09-12 18:25:00"} bg_color={"#E94F37"} title="Toast essen ohne descr" description=""></Appointment>
                                <Appointment start_date={"2022-09-13 12:00:00"} bg_color={"#3891A6"} duration={30*60} title="A very long Title oh no this will never fit asldjlkasjd ölkjasödlk jaölsdkj ölkajskldj lak ösljöl" description="A short on of what this is."></Appointment>
                                <Appointment start_date={"2022-09-25 12:00:00"} bg_color={"#AE76A6"} duration={30*60} title="A very long Title oh no this will never fit asldjlkasjd ölkjasödlk jaölsdkj ölkajskldj lak ösljöl" description="A short on of what this is."></Appointment>
                                <Appointment start_date={"2022-09-11 12:00:00"} duration={30*60} bg_color={"#FCBA03"} title="Meeting Maja" description="Höhö"></Appointment>
                                <Appointment start_date={"2022-09-12 18:25:00"} bg_color={"#E94F37"} title="Toast essen ohne descr" description=""></Appointment>
                                <Appointment start_date={"2022-09-13 12:00:00"} bg_color={"#3891A6"} duration={30*60} title="A very long Title oh no this will never fit asldjlkasjd ölkjasödlk jaölsdkj ölkajskldj lak ösljöl" description="A short on of what this is."></Appointment>
                                <Appointment start_date={"2022-09-25 12:00:00"} bg_color={"#AE76A6"} duration={30*60} title="A very long Title oh no this will never fit asldjlkasjd ölkjasödlk jaölsdkj ölkajskldj lak ösljöl" description="A short on of what this is."></Appointment>
                                <Appointment start_date={"2022-09-11 12:00:00"} duration={30*60} bg_color={"#FCBA03"} title="Meeting Maja" description="Höhö"></Appointment>
                                <Appointment start_date={"2022-09-12 18:25:00"} bg_color={"#E94F37"} title="Toast essen ohne descr" description=""></Appointment>
                                <Appointment start_date={"2022-09-13 12:00:00"} bg_color={"#3891A6"} duration={30*60} title="A very long Title oh no this will never fit asldjlkasjd ölkjasödlk jaölsdkj ölkajskldj lak ösljöl" description="A short on of what this is."></Appointment>
                                <Appointment start_date={"2022-09-25 12:00:00"} bg_color={"#AE76A6"} duration={30*60} title="A very long Title oh no this will never fit asldjlkasjd ölkjasödlk jaölsdkj ölkajskldj lak ösljöl" description="A short on of what this is."></Appointment>
                                <Appointment start_date={"2022-09-11 12:00:00"} duration={30*60} bg_color={"#FCBA03"} title="Meeting Maja" description="Höhö"></Appointment>
                                <Appointment start_date={"2022-09-12 18:25:00"} bg_color={"#E94F37"} title="Toast essen ohne descr" description=""></Appointment>
                                <Appointment start_date={"2022-09-13 12:00:00"} bg_color={"#3891A6"} duration={30*60} title="A very long Title oh no this will never fit asldjlkasjd ölkjasödlk jaölsdkj ölkajskldj lak ösljöl" description="A short on of what this is."></Appointment>
                                <Appointment start_date={"2022-09-25 12:00:00"} bg_color={"#AE76A6"} duration={30*60} title="A very long Title oh no this will never fit asldjlkasjd ölkjasödlk jaölsdkj ölkajskldj lak ösljöl" description="A short on of what this is."></Appointment>
                                <Appointment start_date={"2022-09-11 12:00:00"} duration={30*60} bg_color={"#FCBA03"} title="Meeting Maja" description="Höhö"></Appointment>
                                <Appointment start_date={"2022-09-12 18:25:00"} bg_color={"#E94F37"} title="Toast essen ohne descr" description=""></Appointment>
                                <Appointment start_date={"2022-09-13 12:00:00"} bg_color={"#3891A6"} duration={30*60} title="A very long Title oh no this will never fit asldjlkasjd ölkjasödlk jaölsdkj ölkajskldj lak ösljöl" description="A short on of what this is."></Appointment>
                                <Appointment start_date={"2022-09-25 12:00:00"} bg_color={"#AE76A6"} duration={30*60} title="A very long Title oh no this will never fit asldjlkasjd ölkjasödlk jaölsdkj ölkajskldj lak ösljöl" description="A short on of what this is."></Appointment>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default function App() {

    let [current, set_current] = useState(3);

    function get_content() {
        switch (current) {
            case 1: return <Flashcards/>;
            case 2: return <Minesweeper/>;
            case 3: return <Pomodoro/>;
            case 4: return <Appointments/>;
            default: return <div className="h-content w-full flex justify-center items-center text-neutral-400">Empty</div>;
        }
    }

    return (
        <div className="w-screen h-screen overflow-hidden flex flex-col justify-between items-center bg-main-dark">
            <TopBar/>
            <div className="flex-grow w-full overflow-hidden flex">
                <Sidebar current={current} set_current={set_current}/>
                {get_content()}
            </div>
        </div>
    );
}
