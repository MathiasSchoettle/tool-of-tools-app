import { useState } from 'react'

import TopBar from './TobBar'
import Flashcards from './flashcard/Flashcards'
import Pomodoro from './pomodoro/Pomodoro'
import Sidebar from './Sidebar'
import Calendar from './newcalendar/Calendar'
import {default as Old} from './calendar/Calendar'
import Test from "./Test";
import SuccessButton from "./inputs/button/SuccessButton";

export default function App() {
    let [current, set_current] = useState(5)
    let [sidebar_opened, set_sidebar_opened] = useState(false)

    const [show, setShow] = useState(false);

    function get_content() {
        switch (current) {
            case 1:
                return <Flashcards />
            case 2:
                return <Old />
            case 3:
                return <Calendar />
            case 4:
                return <Pomodoro />
            default:
                return (
                    <div className="h-full w-full flex flex-col gap-2">
                        <SuccessButton content="Toggle" onClick={() => setShow(!show)}/>
                        <Test name={"first"}/>
                        {show && <Test name={"second"}/>}
                    </div>
                )
        }
    }

    return (
        <div className="w-screen h-screen overflow-hidden flex flex-col justify-between items-center bg-dp-01">
            <TopBar toggle_sidebar={() => set_sidebar_opened(!sidebar_opened)}/>

            <div className="h-content w-full overflow-hidden flex">
                <Sidebar set_panel={set_current} opened={sidebar_opened} />
                <div className="grow h-full w-full">{get_content()}</div>
            </div>
        </div>
    )
}
