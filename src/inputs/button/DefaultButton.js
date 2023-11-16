import React from 'react'
import classBuilder, {cond} from "../../utils/ConditionalClassBuilder";
import {InternalButton} from "./InternalButton";

export default function DefaultButton({type, disabled, onClick, content}) {

	const classes = classBuilder(
		'text-dp-32',
		cond(!disabled, 'hover:bg-dp-12 focus:bg-dp-12 hover:border-dp-14 focus:border-dp-14')
	);

	return (
		<InternalButton type={type} disabled={disabled} onClick={onClick} content={content} className={classes}/>
	);
}
