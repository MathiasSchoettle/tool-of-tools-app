import {CalendarPlus, X} from "lucide-react";
import IconButton from "../inputs/button/IconButton";
import TextInput from "../inputs/TextInput";
import TextAreaInput from "../inputs/TextAreaInput";
import DefaultButton from "../inputs/button/DefaultButton";
import SuccessButton from "../inputs/button/SuccessButton";
import React, {useState} from "react";
import CheckBoxInput from "../inputs/CheckBoxInput";
import DatePickerInput from "../inputs/DatePickerInput";
import TimePickerInput from "../inputs/TimePickerInput";
import NumberInput from "../inputs/NumberInput";
import MultiSelectInput from "../inputs/MultiSelectInput";
import SelectInput from "../inputs/SelectInput";
import {useForm} from "../form/FormHook";
import {dateToIsoString, dateToShortIsoTime} from "../utils/DateUtils";

const items = [
	{
		name: "M",
		value: "MONDAY",
		index: 0
	},
	{
		name: "T",
		value: "TUESDAY",
		index: 1
	},
	{
		name: "W",
		value: "WEDNESDAY",
		index: 2
	},
	{
		name: "T",
		value: "THURSDAY",
		index: 3
	},
	{
		name: "F",
		value: "FRIDAY",
		index: 4
	},
	{
		name: "S",
		value: "SATURDAY",
		index: 5
	},
	{
		name: "S",
		value: "SUNDAY",
		index: 6
	}
];

function options() {
	let arr = [];

	let o = {};
	o.id = 1;
	o.value = (
		<div className="flex items-center gap-2">
			<div className="h-3 ml-1 rounded aspect-square bg-amber-500"></div>
			<div>Private Events</div>
		</div>
	);
	arr.push(o);

	o = {};
	o.id = 2;
	o.value = (
		<div className="flex items-center gap-2">
			<div className="h-3 ml-1 rounded aspect-square bg-red-500"></div>
			<div>Work Events</div>
		</div>
	);
	arr.push(o);

	o = {};
	o.id = 3;
	o.value = (
		<div className="flex items-center gap-2">
			<div className="h-3 ml-1 rounded aspect-square bg-green-500"></div>
			<div>Birthdays</div>
		</div>
	);
	arr.push(o);

	o = {};
	o.id = 4;
	o.value = (
		<div className="flex items-center gap-2">
			<div className="h-3 ml-1 rounded aspect-square bg-purple-500"></div>
			<div>Other Events</div>
		</div>
	);
	arr.push(o);

	return arr;
}

// FIXME move modal stuff out of here (title of modal and close buttons)
export default function EventForm({onSubmit, date}) {

	const [fullDay, setFullDay] = useState(false);
	const [recurring, setRecurring] = useState(false);
	const [recurrence, setRecurrence] = useState(0)
	const [recurrenceEndType, setRecurrenceEndType] = useState(0);
	const [register, submit] = useForm();

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		console.log(Object.fromEntries(formData));
		onSubmit();
	};

	const setRecurrenceEndId = (value) => {
		setRecurrenceEndType(value.id);
	};

	return (
		<form method="post" noValidate onSubmit={submit(handleSubmit)} spellCheck={false}>

			<div className="p-2 w-[700px] flex flex-col select-none gap-4">
				<div className="flex w-full items-center justify-between pl-1 text-dp-24 ">
					<div className="flex items-center gap-2">
						<CalendarPlus size={16}/>
						<div className="text-sm font-medium pt-0.5">New Event</div>
					</div>
					<IconButton onClick={onSubmit}>
						<X size={16}/>
					</IconButton>
				</div>

				<div className="flex gap-4">

					<div className="flex flex-col flex-1">
						<TextInput {...register("title")} label="Title" autofocus required/>
						<TextAreaInput {...register("description")} required label="Description"/>

						<div className="flex gap-2">
							<TextInput {...register("location")} label="Location"/>
							<TextInput {...register("link")} label="Link"/>
						</div>

						<SelectInput {...register("category_id")} label={"Category"} required options={options()}/>
					</div>

					<div className="flex flex-1 flex-col">
						<div className="flex gap-2 w-full">
							<DatePickerInput {...register("start_date")} label="Start Date" defaultValue={dateToIsoString(date)}/>
							<TimePickerInput {...register("start_time")} label="Start Time" disabled={fullDay} defaultValue={dateToShortIsoTime(new Date())}/>
						</div>

						<div className="flex gap-2 w-full">
							<DatePickerInput {...register("end_date")} label="End Date" defaultValue={dateToIsoString(date)}/>
							<TimePickerInput {...register("end_time")} label="End Time" disabled={fullDay} defaultValue={dateToShortIsoTime(new Date())}/>
						</div>

						<div className="flex gap-2 w-full">
							<CheckBoxInput title="Recurring" isChecked={recurring} setChecked={setRecurring}/>
							<CheckBoxInput title="Full Day" isChecked={fullDay} setChecked={setFullDay}/>
						</div>

						{recurring && <div className="w-full flex flex-col text-xs text-dp-24 gap-2">

							<div className="flex w-full gap-2 items-center">
								<div className="pl-1">Repeat every</div>
								<div className="w-16">
									<NumberInput {...register("offset")} defaultValue={1}/>
								</div>

								<div className="w-20">
									<SelectInput {...register("recurrence_type", setRecurrence)} initial={0} options={[{id: 0, value: "Day"}, {id: 1, value: "Week"}, {id: 2, value: "Month"}, {id: 3, value: "Year"}]}/>
								</div>
							</div>

							{/*FIXME make this nicer*/}
							{recurrence === "1" && <MultiSelectInput {...register("week_days")} items={items}/>}

							<div className="flex gap-2">
								{/*FIXME make this nicer*/}
								<SelectInput listener={setRecurrenceEndId} label="Recurrence end" initial={0} options={[{id: 0, value: "After"}, {id: 1, value: "On"}, {id: 2, value: "Never"}]}/>
								{recurrenceEndType === 0 && <NumberInput {...register("occurrences")} required min={1} initial={1} label="Repetition count"/>}
								{recurrenceEndType === 1 && <DatePickerInput {...register("recurrence_end_date")} required label="Until"/>}
								{recurrenceEndType === 2 && <div className="w-full"/>}
							</div>
						</div>}
					</div>
				</div>


				<div className="flex justify-end gap-2">
					<DefaultButton onClick={onSubmit}>Cancel</DefaultButton>
					<SuccessButton type={"submit"}>
						Save
					</SuccessButton>
				</div>
			</div>
		</form>
	);
}
