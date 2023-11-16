import {InternalButton} from "./InternalButton";
import classBuilder, {cond} from "../../utils/ConditionalClassBuilder";

export default function DangerButton({type, disabled, onClick, content}) {

	const classes = classBuilder(
		'text-white bg-red-800 shadow-md',
		cond(!disabled, 'hover:bg-red-700 hover:border-red-600 focus:bg-red-700 focus:border-red-600')
	);

	return <InternalButton type={type} disabled={disabled} onClick={onClick} content={content} className={classes}/>
}