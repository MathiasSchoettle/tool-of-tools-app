import {CalendarPlus, X} from "lucide-react";
import IconButton from "../inputs/IconButton";
import TextInput from "../inputs/TextInput";
import TextAreaInput from "../inputs/TextAreaInput";
import DefaultButton from "../inputs/DefaultButton";
import SuccessButton from "../inputs/SuccessButton";
import React, {useState} from "react";
import CheckBoxInput from "../inputs/CheckBoxInput";
import DatePickerInput from "../inputs/DatePickerInput";
import TimePickerInput from "../inputs/TimePickerInput";
import NumberInput from "../inputs/NumberInput";
import MultiSelectInput from "../inputs/MultiSelectInput";
import NewSelectInput from "../inputs/NewSelectInput";


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

function RecurrencePart() {

	const options = [
		{
			id: 0,
			value: "After"
		},
		{
			id: 1,
			value: "On"
		},
		{
			id: 2,
			value: "Never"
		}
	]

	return (
		<div className="flex gap-2">
			<NewSelectInput name="Recurrence end" initial={0} options={options}/>
			<NumberInput name="Number of repetitions"></NumberInput>
		</div>
	);
}

export default function EventForm({register, onSubmit, closeModal}) {

	const [fullDay, setFullDay] = useState(false);
	const [recurring, setRecurring] = useState(false);
	const [recurrence, setRecurrence] = useState("")

	return (
		<form method="post" noValidate onSubmit={onSubmit} spellCheck={false}>

			<div className="p-2 w-[700px] flex flex-col select-none gap-4">
				<div className="flex w-full items-center justify-between pl-1 text-dp-24 ">
					<div className="flex items-center gap-2">
						<CalendarPlus size={16}/>
						<div className="text-sm font-medium pt-0.5">New Event</div>
					</div>
					<IconButton onClick={closeModal}>
						<X size={16}/>
					</IconButton>
				</div>

				<div className="flex gap-4">

					<div className="flex flex-col flex-1">
						<TextInput {...register("Title")} autofocus required />
						<TextAreaInput {...register("Description")} rows={3}/>

						<div className="flex gap-2">
							<TextInput {...register("Location")}/>
							<TextInput {...register("Link")}/>
						</div>

						<NewSelectInput {...register("Category")} required options={options()}/>
					</div>

					<div className="flex flex-1 flex-col">
						<div className="flex gap-2">
							<DatePickerInput {...register("Start Date")} required/>
							{!fullDay && <TimePickerInput {...register("Start Time")} required/>}
						</div>

						<div className="flex gap-2">
							<DatePickerInput {...register("End Date")} required/>
							{!fullDay && <TimePickerInput {...register("End Time")} required/>}
						</div>

						<div className="flex gap-2 w-full">
							<CheckBoxInput title="Recurring" isChecked={recurring} setChecked={setRecurring}/>
							<CheckBoxInput title="Full Day" isChecked={fullDay} setChecked={setFullDay}/>
						</div>

						{recurring && <div className="w-full flex flex-col text-xs text-dp-24 gap-2">

							<div className="flex w-full gap-2 items-center">
								<div className="pl-1">Repeat every</div>
								<div className="w-16">
									<NumberInput initial={1} min={1}/>
								</div>

								<div className="w-20">
									<NewSelectInput initial={0} options={[{id: 0, value: "Daily"}, {id: 1, value: "Weekly"}, {id: 2, value: "Monthly"}, {id: 3, value: "Yearly"}]}/>
								</div>
							</div>

							<MultiSelectInput name={"Selected Days"} items={items}/>

							<RecurrencePart/>
						</div>}
					</div>
				</div>


				<div className="flex justify-end gap-2">
					<DefaultButton onClick={closeModal}>Cancel</DefaultButton>
					<SuccessButton type={"submit"}>
						Save
					</SuccessButton>
				</div>
			</div>
		</form>
	);
}
