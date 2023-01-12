import {Alarm, CalendarBlank, Cardholder, GameController, Skull} from "phosphor-react";

function Entry({children, id, current_id, set}) {

    let selected = id === current_id;
    let style = selected ? "text-emerald-400" : "text-neutral-400 ";

    return (
        <div className="w-full aspect-square flex justify-center items-center cursor-pointer">
            <div className="w-full h-full bg-main-dark hover:bg-main rounded-md flex justify-center items-center" onClick={() => set(id)}>
                <div className={style}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default function Sidebar({current, set_current}) {

    const icon_size = 25;

    return (
        <div className="h-full w-20 bg-main-darkest flex flex-col p-3 gap-3">
            <Entry id={1} current_id={current} selected={true} set={set_current}>
                <Cardholder size={icon_size} weight="fill"/>
            </Entry>

            <Entry id={2} current_id={current} set={set_current}>
                <GameController size={icon_size} weight="fill"/>
            </Entry>

            <Entry id={3} current_id={current} set={set_current}>
                <Alarm size={icon_size} weight="fill" />
            </Entry>

            <Entry id={4} current_id={current} set={set_current}>
                <CalendarBlank size={icon_size} weight="fill" />
            </Entry>

            <Entry id={5} current_id={current} set={set_current}>
                <Skull size={icon_size} weight="fill" />
            </Entry>
        </div>
    );
}