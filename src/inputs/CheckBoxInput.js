import classBuilder, {cond} from "../utils/ConditionalClassBuilder";
import { Check } from 'lucide-react'

export default function CheckBoxInput({title, isChecked, setChecked}) {
	const handleClick = () => {
		setChecked(prev => !prev);
	};

	let inputClasses = classBuilder(
		'bg-mn-700 rounded-sm w-full h-full transition duration-75 font-bold',
		cond(isChecked, 'scale-100', 'scale-0')
	);

	return (
		<div className="w-full flex h-8">
			<div className="gap-2 flex items-center cursor-pointer" onClick={handleClick}>
				<div className="flex h-full items-center">
					<div className="h-4 aspect-square bg-dp-00 border border-dp-14 rounded-sm text-white">
						<Check size={16} strokeWidth={2}  className={inputClasses} />
					</div>
				</div>

				<div className="text-xs text-dp-24">
					{title}
				</div>

				<input type="checkbox" hidden defaultChecked={isChecked}/>
			</div>
		</div>
	);
}
