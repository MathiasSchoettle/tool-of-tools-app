import {useEffect, useState} from "react";
import {monthName, sameDay} from "../utils/DateUtils";
import {ChevronLeft, ChevronRight} from "lucide-react";

function DaySelectorsHeader() {
    return (
        <>
            <div className="text-neutral-400 py-1.5 flex justify-center">Mon</div>
            <div className="text-neutral-400 py-1.5 flex justify-center">Tue</div>
            <div className="text-neutral-400 py-1.5 flex justify-center">Wed</div>
            <div className="text-neutral-400 py-1.5 flex justify-center">Thu</div>
            <div className="text-neutral-400 py-1.5 flex justify-center">Fri</div>
            <div className="text-neutral-400 py-1.5 flex justify-center">Sat</div>
            <div className="text-neutral-400 py-1.5 flex justify-center">Sun</div>
        </>
    );
}


function DaySelector({date, in_month, is_today, is_selected, set_selected_date}) {

    if (is_today) {
        return (
            <div className="flex justify-center items-center relative cursor-pointer group" onClick={() => set_selected_date(date)}>
                <div className="absolute h-6 aspect-square rounded-full bg-neutral-200 text-black flex justify-center items-center transition duration-200">{date.getDate()}</div>
            </div>
        );
    }

    let additional_classes = in_month ? "" : " text-neutral-400";

    if (is_selected) {
        return (
            <div className="flex justify-center items-center relative cursor-pointer group" onClick={() => set_selected_date(date)}>
                <div className={"absolute h-6 aspect-square rounded-full bg-neutral-500 bg-opacity-30 group-hover:bg-opacity-50 flex justify-center transition duration-200 items-center" + additional_classes}>{date.getDate()}</div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center relative cursor-pointer group" onClick={() => set_selected_date(date)}>
            <div className={"absolute h-6 aspect-square rounded-full group-hover:bg-neutral-400 group-hover:bg-opacity-30 flex justify-center transition duration-200 items-center" + additional_classes}>{date.getDate()}</div>
        </div>
    );
}


function DaySelectors({month, year, today, selected_date, set_selected_date}) {
    let start = new Date(year, month, 1);

    let daysToSubtract = (start.getDay() + 6) % 7;
    start.setDate(start.getDate() - daysToSubtract);

    let array = [];

    for (let i = 0; i < 42; ++i) {
        let current = new Date(start);
        current.setDate(start.getDate() + i);
        array.push(<DaySelector key={i} date={current} in_month={current.getMonth() === month} is_today={sameDay(current, today)} is_selected={sameDay(current, selected_date)} set_selected_date={set_selected_date}/>)
    }

    return (
        <>
            {array}
        </>
    );
}

export default function MonthSelector({today, selected_date, set_selected_date}) {
    const [year, set_year] = useState(2023);
    const [month, set_month] = useState(2);

    useEffect(() => {
        set_year(selected_date.getFullYear());
        set_month(selected_date.getMonth());
    }, [selected_date]);

    function next_month() {
        let new_month = month + 1;
        let new_year = year;

        if (new_month > 11) {
            new_month = 0;
            new_year += 1;
        }

        set_month(new_month);
        set_year(new_year);
    }
    function previous_month() {
        let new_month = month - 1;
        let new_year = year;

        if (new_month < 0) {
            new_month = 11;
            new_year -= 1;
        }

        set_month(new_month);
        set_year(new_year);
    }

    return (
        <div className="w-full bg-dp-02 p-3 text-neutral-200 drop-shadow-bg flex flex-col gap-2 rounded overflow-hidden">
            <div className="w-full flex font-bold justify-between items-center">
                <div className="pl-2 text-lg flex justify-center items-center gap-2">
                    <div>{monthName(month)}</div>
                    <div>{year}</div>
                </div>
                <div className="flex text-neutral-500">
                    <div className="cursor-pointer" onClick={previous_month}>
                        <ChevronLeft size={24}/>
                    </div>
                    <div className="cursor-pointer" onClick={next_month}>
                        <ChevronRight size={24} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-7 text-[10px]" style={{gridTemplateRows: "repeat(7, minmax(0, 1fr))"}}>
                <DaySelectorsHeader/>
                <DaySelectors month={month} year={year} today={today} selected_date={selected_date} set_selected_date={set_selected_date}/>
            </div>
        </div>
    );
}