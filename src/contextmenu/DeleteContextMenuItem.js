import React from 'react';
import ContextMenuItem from "./ContextMenuItem";
import {Trash2} from "lucide-react";

function DeleteContextMenuItem({text, enabled = true}) {
    return (
        <ContextMenuItem enabled={enabled}>
            <Trash2 className="group-hover:text-red-500" size={16}/>
            <div className="group-hover:text-red-500">{text}</div>
        </ContextMenuItem>
    );
}

export default DeleteContextMenuItem;