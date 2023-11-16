import React from 'react'
import classBuilder, {cond} from "../../utils/ConditionalClassBuilder";
import {InternalButton} from "./InternalButton";

export default function SuccessButton({type, disabled, onClick, content}) {

	const classes = classBuilder(
		'text-white bg-mn-700 shadow-md',
		cond(!disabled, 'hover:bg-mn-600 hover:border-mn-500 focus:bg-mn-600 focus:border-mn-500 ')
	);

	return (
		<InternalButton type={type} disabled={disabled} onClick={onClick} content={content} className={classes}/>
	);
}
