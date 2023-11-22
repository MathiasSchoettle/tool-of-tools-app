import MonthSelector from "./MonthSelector";
import CalendarView from "./CalendarView";
import React, {useState} from "react";
import {monthName, sameDay} from "../utils/DateUtils";
import {ChevronLeft, ChevronRight} from "lucide-react";

export const item_height = 50;
export const calendar_height = 24 * item_height;

export default function Calendar() {

    const [today] = useState(new Date());
    const [week_start, set_week_start] = useState(new Date(2023, 2, 20));
    const [selected_date, set_selected_date] = useState(today);

    function set_new_selected_date(date) {
        set_selected_date(date);

        let new_week_start = new Date(date);
        new_week_start.setDate(new_week_start.getDate() - (date.getDay() || 7) + 1);

        if (!sameDay(new_week_start, week_start)) {
            set_week_start(new_week_start);
        }
    }

    function previous_week() {
        let next_week = new Date(week_start);
        next_week.setDate(next_week.getDate() - 7);
        set_week_start(next_week);

        let next_selected = new Date(selected_date);
        next_selected.setDate(selected_date.getDate() - 7);
        set_selected_date(next_selected);
    }

    function next_week() {
        let next_week = new Date(week_start);
        next_week.setDate(next_week.getDate() + 7);
        set_week_start(next_week);

        let next_selected = new Date(selected_date);
        next_selected.setDate(selected_date.getDate() + 7);
        set_selected_date(next_selected);
    }

    return (
        <div className="h-full grow flex bg-dp-01 darke p-5 gap-5 select-none">

            <div className="w-64 max-w-md h-full flex flex-col gap-5">
                <MonthSelector today={today} selected_date={selected_date} set_selected_date={set_new_selected_date}/>
                <div className="bg-dp-02 drop-shadow-bg flex-grow w-full rounded flex flex-col p-3 gap-4">
                </div>
            </div>

            <div className="grow h-full rounded flex flex-col gap-3">
                <div className="flex w-full items-center">

                    <div className="grow flex flex-col items-center">
                        <div className="flex items-center gap-2 text-neutral-600">
                            <div className="cursor-pointer" onClick={previous_week}>
                                <ChevronLeft size={32}/>
                            </div>
                            <div
                                className="w-28 flex justify-center text-sm text-neutral-600 pt-0.5">{monthName(week_start.getMonth())} {week_start.getFullYear()}</div>
                            <div className="cursor-pointer" onClick={next_week}>
                                <ChevronRight size={32}/>
                            </div>
                        </div>
                    </div>

                    <div className="p-2 text-neutral-300 rounded text-sm cursor-pointer bg-dp-03 shadow-lg hover:bg-dp-06 transition duration-200"
                         onClick={() => set_new_selected_date(today)}>
                        Today
                    </div>
                </div>

                <CalendarView week_start={week_start} today={today}/>
            </div>
        </div>
    );
}