import React, { useState } from "react";

import { useListContext } from "../../../context/listContext";
import { deleteSchool } from "../../../services/schoolService";



function ConfirmationDeleteModal({ isOpen, onClose, registro, sucessOrError }) {
    const { refreshList } = useListContext();
    const [isLoading, setIsLoading] = useState(false);

    const onConfirm = async () => {
        setIsLoading(true);
        try {
            const resp = await deleteSchool(registro?.id);
            sucessOrError({
                sucess: true,
                message: resp.message
            })
            refreshList();
            onClose();
        } catch (error) {
            console.log("erro eu deletar registro: ", error)
            sucessOrError({
                sucess: false,
                message: 'Erro ao excluir registro!'
            })
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative animate-fade-in border border-indigo-200">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                        aria-label="Fechar"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="flex flex-col items-center">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-700 rounded-full p-3 mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-indigo-700 mb-2 text-center">Deseja realmente excluir este registro?</h2>
                        <div className="bg-indigo-50 rounded p-3 w-full mb-4 text-left">
                            <div className="text-indigo-900 font-semibold mb-1">{registro?.NOMESC || 'Registro selecionado'}</div>

                            <div className="grid grid-cols-1 gap-1 text-sm">
                                <div><span className="font-medium text-gray-700">Dependência:</span> {registro?.NOMEDEP}</div>
                                <div><span className="font-medium text-gray-700">DE:</span> {registro?.DE}</div>
                                <div><span className="font-medium text-gray-700">Município:</span> {registro?.MUN}</div>
                                <div><span className="font-medium text-gray-700">Distrito:</span> {registro?.DISTR}</div>
                                <div><span className="font-medium text-gray-700">Código Escola:</span> {registro?.CODESC}</div>
                                <div><span className="font-medium text-gray-700">Nome Escola:</span> {registro?.NOMESC}</div>
                                <div><span className="font-medium text-gray-700">Tipo Escola:</span> {registro?.TIPOESC}</div>
                                <div><span className="font-medium text-gray-700">Descrição Tipo Escola:</span> {registro?.TIPOESC_DESC}</div>
                            </div>
                        </div>
                        <div className="flex gap-4 mt-2">
                            <button
                                onClick={onClose}
                                className="px-5 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
                                disabled={isLoading}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-5 py-2 rounded bg-gradient-to-r from-indigo-500 to-purple-700 text-white font-semibold hover:from-indigo-600 hover:to-purple-800 transition-colors flex items-center gap-2"
                                disabled={isLoading}
                            >
                                {isLoading && (
                                    <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent border-solid rounded-full animate-spin"></span>
                                )}
                                {isLoading ? 'Excluindo...' : 'Excluir'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default ConfirmationDeleteModal;
