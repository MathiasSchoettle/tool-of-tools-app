import React, {useEffect, useState} from 'react';
import moment from "moment";
import DateHelper from "../helpers/DateHelper";

export default function () {

    const [sec, set_sec] = useState("");
    const [min, set_min] = useState("");
    const [hour, set_hour] = useState("");
    const [day, set_day] = useState(0);

    useEffect(() => {
       setInterval(() => {
           let time = moment();
           set_hour(DateHelper.appendZero(time.hour()));
           set_min(DateHelper.appendZero(time.minute()));
           set_sec(DateHelper.appendZero(time.second()));
           set_day(time.weekday());
       }, 1000);
    });

    let digit = (digits) => {
        return (
            <div className="bg-gray-700 rounded flex justify-center items-center text-xl w-10">
                {digits}
            </div>
        );
    };

    return (
        <div className="text-white w-full p-2 flex flex justify-between rounded bg-gray-900 border border-gray-600">
            <div className="gap-1.5 h-8 flex justify-center">
                {digit(hour)}
                <div className="text-white text-2xl flex items-center">
                    :
                </div>
                {digit(min)}
                <div className="text-white text-2xl flex items-center">
                    :
                </div>
                {digit(sec)}
            </div>

            {digit(DateHelper.WEEKDAY_NAMES[day])}
        </div>
    );
}