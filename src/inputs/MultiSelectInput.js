import React, {useState} from "react";
import classBuilder, {cond} from "../utils/ConditionalClassBuilder";

// FIXME call it differently maybe
function SelectButton({text, callable, selected}) {

	let classes = classBuilder(
		'h-7 min-w-[28px] px-2 rounded border flex justify-center items-center transition duration-100',
		cond(selected, 'border border-dp-14 bg-dp-00', 'border-transparent')
	);

	return (
		<button onClick={callable} type="button" className={classes}>
			{text}
		</button>
	)
}

export default function MultiSelectInput({name, items, primary = 0, label}) {

	const fill = (length, first) => {
		const a = new Array(length).fill(false);
		a[first] = true;
		return a;
	};

	const [selected, setSelected] = useState(fill(items.length, primary));

	const update = (index) => {
		return () => {
			const nextSelected = selected.map((c, i) => {
				return i === index ? !selected[index] : c;
			})

			if (!nextSelected.includes(true)) {
				nextSelected[primary] = true;
			}

			setSelected(nextSelected);
		}
	};

	const getItems = () => {
		return items.map(item => {
			return <SelectButton key={item.index} callable={update(item.index)} text={item.name} selected={selected[item.index]}/>
		})
	}

	const buildValue = () => {
		return items.filter(i => selected[i.index]).map(i => i.value).join(',');
	}

	return (
		<div className="w-full flex flex-col">
			{label && <div className="flex justify-between text-xs h-5 mb-1">
				<div className="flex items-end h-full pl-1">
					<div className="text-dp-24">{label}</div>
				</div>
			</div>}

			<div className="flex text-dp-24 text-xs gap-2">
				{getItems()}
			</div>

			<input type="text" name={name} value={buildValue()} onChange={() => {}} autoComplete="off" className="hidden"/>
		</div>
	);
}