import {sameDay} from "../utils/DateUtils";
import {item_height} from "./Calendar";
import CalendarColumn from "./CalendarColumn";
import {useEffect, useState} from "react";
import {animated, useTransition} from "react-spring";
import {Pencil, Trash, X} from "lucide-react";

function CalendarHeader({week_start, today}) {

    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let items = [];

    for (let i = 0; i < 7; ++i) {
        let date = new Date(week_start);
        date.setDate(week_start.getDate() + i);
        items.push(<CalendarHeaderItem key={days[i]} text={days[i]} date={date} is_selected={sameDay(date, today)}/>);
    }

    return (
        <div className="w-full h-20 min-h-[5rem]  max-h-20 flex shadow-bg to-blue-700">
            <div className="h-full w-14 border-b border-neutral-700"></div>
            {items}
        </div>
    );
}
function CalendarHeaderItem({text, date, is_selected}) {
    return (
        <div className="h-full grow flex flex-col items-center justify-center text-xs text-neutral-500 gap-1 relative pt-2 border-b border-neutral-700">
            <div>{text}</div>

            <div className= {"w-8 rounded-full flex justify-center items-center aspect-square pt " + (is_selected ? " bg-neutral-200 text-black" : "")}>
                <div className="flex justify-center text-xl ">{date.getDate()}</div>
            </div>

            <div className="h-6 w-[1px] bg-neutral-700 absolute bottom-0 left-0"></div>
        </div>
    );
}
function CalendarTimeColumn() {
    let array = [];

    for (let i = 1; i < 25; ++i) {
        let text = i < 10 ? '0' : '';
        text += i + ':00';
        text = i === 24 ? '' : text;

        array.push(
            <div key={i} className="h-[50px] relative" style={{height: item_height}}>
                <div className="absolute h-[1px] w-3 right-0 bg-neutral-700 bottom-0"></div>
                <div className="absolute text-xs -bottom-2  right-4 text-neutral-500">{text}</div>
            </div>
        );
    }

    array.push(
        <div key={25} className="h-5"></div>
    );

    return (
        <div className="w-14">
            {array}
        </div>
    );
}

function CalendarEventPopup({event, visible, set_visible}) {

    const transition = useTransition(visible, {
        from: {
            top: event.top + 'px',
            left: event.right + 'px',
            boxShadow: '0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12),0 11px 15px -7px rgba(0,0,0,.2)',
            opacity: 0,
        },
        enter: {
            width: '350px',
            height: '150px',
            opacity: 1,
        },
        leave: {
            opacity: 0,
        },
        update: {
            top: event.top + 'px',
            left: event.right + 'px',
        },
        config: {
            tension: 278,
            friction: 30,
            precision: 0.005
        }
    });

    return (
        <>
        {transition((style, item) =>
           item ?
               <animated.div className="rounded-md shadow-bg bg-dp-06 absolute flex flex-col p-3 border border-dp-12" style={style}>
                   <div className="gap-3 w-full flex justify-end items-center text-neutral-400">
                       <div className="hover:text-neutral-300 cursor-pointer transition duration-200">
                           <Pencil size={20} />
                       </div>
                       <div className="hover:text-neutral-300 cursor-pointer transition duration-200">
                           <Trash size={20} />
                       </div>
                       <div className="hover:text-neutral-300 cursor-pointer transition duration-200" onClick={() => set_visible(false)}>
                           <X size={20} />
                       </div>
                   </div>

                   <div className="flex items px-3 gap-5">
                       <div className="w-4 h-4 rounded mt-1" style={{backgroundColor: event.event.color}}></div>
                       <div className="grow flex flex-col">
                           <div className="text-lg text-neutral-300">Title</div>
                           <div className="text-neutral-300">Description</div>
                           <div className="text-neutral-400 text-xs py-2">
                               {event.event.start.toLocaleString() + ' - ' + event.event.end.toLocaleTimeString()}
                           </div>
                       </div>
                   </div>
               </animated.div>
               : ''
        )}
        </>
    );
}

export default function CalendarView({week_start, today}) {

    const [visible, set_visible] = useState(false);
    const [pos, set_pos] = useState({
        top: 0,
        left: 0,
        right: 0,
        color: '',
    });

    useEffect(() => {
        set_visible(false);
    }, [week_start]);

    function update_pos(new_pos) {
        set_pos(new_pos);
        set_visible(true);
    }

    return (
        <div className="bg-dp-02 shadow-bg w-full rounded flex flex-col">
            <CalendarHeader week_start={week_start} today={today}/>
            <div className="w-full flex overflow-y-scroll no-scrollbar relative" onClick={() => set_visible(false)} onScroll={() => set_visible(false)}>
                <CalendarTimeColumn/>
                <CalendarColumn update_pos={update_pos} set_visible={set_visible}/>
                <CalendarColumn update_pos={update_pos} set_visible={set_visible}/>
                <CalendarColumn update_pos={update_pos} set_visible={set_visible}/>
                <CalendarColumn update_pos={update_pos} set_visible={set_visible}/>
                <CalendarColumn update_pos={update_pos} set_visible={set_visible}/>
                <CalendarColumn update_pos={update_pos} set_visible={set_visible}/>
                <CalendarColumn update_pos={update_pos} set_visible={set_visible}/>
            </div>
            <CalendarEventPopup event={pos} visible={visible} set_visible={set_visible} week_start={week_start}/>
        </div>
    );
}