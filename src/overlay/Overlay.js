import ReactDom from "react-dom";

export default function Overlay() {

    return ReactDom.createPortal(
        <div className="bg-black bg-opacity w-full h-full fixed h-content left-0 bottom-0 text-white">
            Test
        </div>,
        document.getElementById('overlay-container')
    );
}