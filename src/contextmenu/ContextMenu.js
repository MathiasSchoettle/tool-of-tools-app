import ContextMenuInternal from "./ContextMenuInternal";

export const initialContextMenu = {
	open: false,
	x: 0,
	y: 0,
}

export default function ContextMenu({content, closeMenu, children}) {
	return (
		<>
			{content.open &&
				<ContextMenuInternal x={content.x} y={content.y} closeMenu={closeMenu}>
					{children}
				</ContextMenuInternal>
			}
		</>
	);
}