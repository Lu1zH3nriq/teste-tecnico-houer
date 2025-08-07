import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useListContext } from "../../../context/listContext";

import { updateSchool } from "../../../services/schoolService";



const schema = yup.object().shape({
    NOMEDEP: yup.string().required("Campo obrigatório"),
    DE: yup.string().required("Campo obrigatório"),
    MUN: yup.string().required("Campo obrigatório"),
    DISTR: yup.string().required("Campo obrigatório"),
    CODESC: yup.string().required("Campo obrigatório"),
    NOMESC: yup.string().required("Campo obrigatório"),
    TIPOESC: yup
        .number()
        .typeError("Campo obrigatório")
        .required("Campo obrigatório"),
    TIPOESC_DESC: yup.string().required("Campo obrigatório"),
});




function EditModal({ isOpen, onClose, onSubmit, registro }) {
    const { refreshList } = useListContext();
    const [isLoading, setIsLoading] = React.useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            NOMEDEP: "",
            DE: "",
            MUN: "",
            DISTR: "",
            CODESC: "",
            NOMESC: "",
            TIPOESC: "",
            TIPOESC_DESC: "",
        },
    });

    useEffect(() => {
        if (registro) {
            reset({
                NOMEDEP: registro.NOMEDEP || "",
                DE: registro.DE || "",
                MUN: registro.MUN || "",
                DISTR: registro.DISTR || "",
                CODESC: registro.CODESC || "",
                NOMESC: registro.NOMESC || "",
                TIPOESC: registro.TIPOESC || "",
                TIPOESC_DESC: registro.TIPOESC_DESC || "",
            });
        }
    }, [registro, reset]);

    if (!isOpen) return null;

    const onFormSubmit = async (data) => {
        setIsLoading(true);
        try {
            const payload = { ...data, TIPOESC: Number(data.TIPOESC) };
            const resp = await updateSchool(registro?.id, payload);
            onSubmit({
                sucess: true,
                message: resp.message
            });
            refreshList();
            onClose();
            reset();
        } catch (err) {
            console.log('Erro ao atualizar registro: ', err);
            onClose();
            reset();
            onSubmit({
                sucess: false,
                message: 'Erro ao atualizar registro!'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in border border-indigo-200">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                    aria-label="Fechar"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Editar Escola</h2>


                <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onFormSubmit)}>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-indigo-700 font-medium mb-1">Dependência</label>
                            <input
                                type="text"
                                {...register("NOMEDEP")}
                                className={`w-full rounded-md px-3 py-2 border ${errors.NOMEDEP ? 'border-red-500' : 'border-indigo-200'} bg-indigo-50 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                                placeholder="Ex: ESTADUAL - SE"
                            />
                            {errors.NOMEDEP && <span className="text-red-500 text-xs">{errors.NOMEDEP.message}</span>}
                        </div>
                        <div>
                            <label className="block text-indigo-700 font-medium mb-1">DE</label>
                            <input
                                type="text"
                                {...register("DE")}
                                className={`w-full rounded-md px-3 py-2 border ${errors.DE ? 'border-red-500' : 'border-indigo-200'} bg-indigo-50 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                                placeholder="Ex: ADAMANTINA"
                            />
                            {errors.DE && <span className="text-red-500 text-xs">{errors.DE.message}</span>}
                        </div>
                        <div>
                            <label className="block text-indigo-700 font-medium mb-1">Município</label>
                            <input
                                type="text"
                                {...register("MUN")}
                                className={`w-full rounded-md px-3 py-2 border ${errors.MUN ? 'border-red-500' : 'border-indigo-200'} bg-indigo-50 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                                placeholder="Ex: ADAMANTINA"
                            />
                            {errors.MUN && <span className="text-red-500 text-xs">{errors.MUN.message}</span>}
                        </div>
                        <div>
                            <label className="block text-indigo-700 font-medium mb-1">Distrito</label>
                            <input
                                type="text"
                                {...register("DISTR")}
                                className={`w-full rounded-md px-3 py-2 border ${errors.DISTR ? 'border-red-500' : 'border-indigo-200'} bg-indigo-50 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                                placeholder="Ex: ADAMANTINA"
                            />
                            {errors.DISTR && <span className="text-red-500 text-xs">{errors.DISTR.message}</span>}
                        </div>
                        <div>
                            <label className="block text-indigo-700 font-medium mb-1">Código Escola</label>
                            <input
                                type="text"
                                {...register("CODESC")}
                                className={`w-full rounded-md px-3 py-2 border ${errors.CODESC ? 'border-red-500' : 'border-indigo-200'} bg-indigo-50 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                                placeholder="Ex: 31045"
                            />
                            {errors.CODESC && <span className="text-red-500 text-xs">{errors.CODESC.message}</span>}
                        </div>
                        <div>
                            <label className="block text-indigo-700 font-medium mb-1">Nome Escola</label>
                            <input
                                type="text"
                                {...register("NOMESC")}
                                className={`w-full rounded-md px-3 py-2 border ${errors.NOMESC ? 'border-red-500' : 'border-indigo-200'} bg-indigo-50 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                                placeholder="Ex: DURVALINO GRION PROF"
                            />
                            {errors.NOMESC && <span className="text-red-500 text-xs">{errors.NOMESC.message}</span>}
                        </div>
                        <div>
                            <label className="block text-indigo-700 font-medium mb-1">Tipo Escola (número)</label>
                            <input
                                type="number"
                                {...register("TIPOESC")}
                                className={`w-full rounded-md px-3 py-2 border ${errors.TIPOESC ? 'border-red-500' : 'border-indigo-200'} bg-indigo-50 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                                placeholder="Ex: 8"
                            />
                            {errors.TIPOESC && <span className="text-red-500 text-xs">{errors.TIPOESC.message}</span>}
                        </div>
                        <div>
                            <label className="block text-indigo-700 font-medium mb-1">Descrição Tipo Escola</label>
                            <input
                                type="text"
                                {...register("TIPOESC_DESC")}
                                className={`w-full rounded-md px-3 py-2 border ${errors.TIPOESC_DESC ? 'border-red-500' : 'border-indigo-200'} bg-indigo-50 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                                placeholder="Ex: EE"
                            />
                            {errors.TIPOESC_DESC && <span className="text-red-500 text-xs">{errors.TIPOESC_DESC.message}</span>}
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-700 text-white font-semibold rounded-md shadow hover:from-indigo-600 hover:to-purple-800 transition-colors duration-200 flex items-center gap-2"
                            disabled={isLoading}
                        >
                            {isLoading && (
                                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent border-solid rounded-full animate-spin"></span>
                            )}
                            {isLoading ? 'Salvando...' : 'Salvar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditModal;
