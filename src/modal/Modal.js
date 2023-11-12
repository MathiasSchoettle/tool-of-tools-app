import ReactDom from 'react-dom'
import {animated, useTransition} from "react-spring";
import {useRef} from "react";

export default function Modal({open, doClose, children}) {

    const renderCounter  = useRef(0);
    renderCounter.current = renderCounter.current + 1;

    const transition = useTransition(open, {
        from: {
            opacity: 0,
        },
        enter: {
            opacity: 1,
        },
        leave: {
            opacity: 0,
        },
        config: {
            clamp: true,
            tension: 210,
            friction: 10,
            precision: 0.001
        }
    });

    let handleContext = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    let handleScroll = (e) => {
        e.stopPropagation();
    };
    let handleClose = (e) => {
        e.preventDefault();
        e.stopPropagation();
        doClose();
    };
    let closeListener = function(e) {
        if(e.key === 'Escape') doClose();
    };

    if (!open) {
        document.removeEventListener('keydown', closeListener);
    } else {
        document.addEventListener('keydown', closeListener);
    }

    return ReactDom.createPortal(
        <>
            {transition((style, item) =>
                item &&
                    <>
                        <animated.div style={style} onWheel={handleScroll} onContextMenu={handleContext} onClick={handleClose} className="absolute h-content left-0 right-0 bottom-0 z-50 bg-black bg-opacity-80"/>
                        <animated.div style={style} onWheel={handleScroll} onContextMenu={handleContext} className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-dp-12 bg-dp-02 rounded">
                            {children}

                            {/*FIXME render count so high*/}
                            {/*<div className="flex items-center justify-center font-bold text-dp-32">Render count: {renderCounter.current}</div>*/}
                        </animated.div>
                    </>
            )}
        </>,
        document.getElementById('modal-container')
    );
}
