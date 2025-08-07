import React from "react";

const SucessModal = ({ isOpen, onClose, title = "Sucesso", message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 relative animate-fade-in">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-green-500 transition"
                    aria-label="Fechar"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <div className="flex flex-col items-center">
                    <div className="bg-green-100 rounded-full p-3 mb-4">
                        <svg
                            className="w-8 h-8 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <circle cx="12" cy="12" r="10" stroke="currentColor" />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12l2 2 4-4"
                            />
                        </svg>
                    </div>

                    <h2 className="text-xl font-bold text-green-700 mb-2">{title}</h2>
                    <p className="text-gray-700 text-center mb-6">{message}</p>
                    <button
                        onClick={onClose}
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition font-semibold"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SucessModal;