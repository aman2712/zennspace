import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";

export default function Modal({ children, isOpen, setIsOpen, onSave, onReset }) {
    const [isVisible, setIsVisible] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            setTimeout(() => setIsVisible(false), 300); // Wait for animation to complete before hiding
        }
    }, [isOpen]);

    // Close modal if clicking outside the modal content
    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    return (
        isVisible && (
            <div
                className={`fixed inset-0 bg-gray-900/60 flex justify-center items-center z-50 transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0"
                }`}
                onClick={handleOutsideClick}
            >
                <div
                    ref={modalRef}
                    className={`bg-black/50 backdrop-blur-md p-10 rounded-xl w-[38rem] shadow-2xl relative transition-all duration-300 transform ${
                        isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-5"
                    }`}
                    onClick={(e) => e.stopPropagation()} // Prevent click inside modal from triggering close
                >
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-5 right-5 text-2xl"
                    >
                        <AiOutlineClose className="cursor-pointer" />
                    </button>
                    {children}
                    <div className="flex justify-between items-center mt-5">
                        <button
                            className="bg-transparent border border-red-500 text-red-500 px-5 py-2 rounded-full font-semibold cursor-pointer hover:bg-red-500 transition duration-300 hover:text-white"
                            onClick={onReset}
                        >
                            Reset all
                        </button>
                        <div className="flex items-center">
                            <button
                                className="bg-gray-400 border border-gray-400 text-white px-5 py-2 rounded-full font-semibold cursor-pointer hover:bg-gray-500 transition duration-300 hover:border-gray-500"
                                onClick={() => setIsOpen(false)}
                            >
                                Close
                            </button>
                            <button
                                className="bg-white border border-white text-black px-5 py-2 rounded-full font-semibold cursor-pointer hover:bg-transparent transition duration-300 hover:text-white ml-4"
                                onClick={onSave}
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
