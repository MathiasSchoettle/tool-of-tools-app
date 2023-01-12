import ReactDom from 'react-dom'
import {useSpring, animated} from "react-spring";

import {TrashSimple} from "phosphor-react";

export default function Modal({open, do_close, title, children, bottom_content}) {

    const modal_props = useSpring({
        to: { opacity: 1, transform: 'translate(-50%, -50%)' },
        from: { opacity: 0.25, transform: 'translate(-50%, -55%)' },
        reset: true,
        config: { duration: "200" },
    })

    const backdrop_props = useSpring({
        to: { opacity: 1 },
        from: { opacity: 0 },
        reset: true,
        config: { duration: "200" },
    })

    let close_listener = function(e) { if(e.key === 'Escape') do_close() };

    if (!open) {
        document.removeEventListener('keydown', close_listener);
        return null;
    }

    document.addEventListener('keydown', close_listener);

    return ReactDom.createPortal(
        <>
            <animated.div onClick={do_close} style={backdrop_props}
                 className="fixed h-content left-0 right-0 bottom-0 bg-neutral-700 bg-opacity-60 z-50"></animated.div>
            <animated.div style={modal_props} className="fixed text-gray-200 bg-main-dark z-50 flex flex-col gap-4 justify-center overflow-hidden max-w-2xl shadow-lg top-1/2 left-1/2 rounded-md p-4">
                <div className="flex gap-4 items-center">
                    <div className="ml-1 p-2 bg-neutral-700 rounded-full border border-neutral-600">
                        <TrashSimple size={20} weight="fill" />
                    </div>
                    <div className="text-xl">{title}</div>
                </div>
                <div>
                    {children}
                </div>
                <div className="w-full flex justify-end gap-2">
                    {bottom_content}
                </div>
            </animated.div>
        </>,
        document.getElementById('modal-container')
    );
}
