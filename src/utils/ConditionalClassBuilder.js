export default function classBuilder(...args) {
	return args.join(' ');
}

export function cond(condition, classesFirst, classesSecond = '') {
	return condition ? classesFirst : classesSecond;
}