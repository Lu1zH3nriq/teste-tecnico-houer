
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createSchool } from '../../../services/schoolService';

import { useListContext } from "../../../context/listContext";

import ErrorModal from '../ConfirmationModal/ErrorModal';
import SucessModal from '../ConfirmationModal/SucessModal';


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

function CreateMainCard({ loading }) {

    const { refreshList } = useListContext();


    const [errorModal, setErrorModal] = useState({
        state: false,
        message: ''
    });
    const [sucessModal, setSucessModal] = useState({
        state: false,
        message: ''
    });



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

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onFormSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const payload = { ...data, TIPOESC: Number(data.TIPOESC) };
            const resp = await createSchool(payload);
            setSucessModal({
                state: true,
                message: resp.message
            })
            refreshList();
            reset();
        } catch (err) {
            console.log('Erro ao criar registro: ', err);
            setErrorModal({
                state: true,
                message: 'Erro ao cadastrar registro!'
            })
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="w-full max-w-6xl mx-auto mt-8 p-6 rounded-xl shadow-lg flex flex-col items-center gap-6 border border-white bg-gradient-to-br from-indigo-500 to-purple-700 ">
                <h2 className="text-2xl font-bold text-white mb-2 text-center">Cadastrar Nova Escola</h2>
                <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* ...campos do formulário... */}
                        <div>
                            <label className="block text-white font-medium mb-1">Dependência</label>
                            <input
                                type="text"
                                {...register("NOMEDEP")}
                                className={`w-full rounded-md px-3 py-2 border ${errors.NOMEDEP ? 'border-red-500' : 'border-white'} bg-white bg-opacity-10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                                placeholder="Ex: ESTADUAL - SE"
                            />
                            {errors.NOMEDEP && <span className="text-red-300 text-xs">{errors.NOMEDEP.message}</span>}
                        </div>
                        <div>
                            <label className="block text-white font-medium mb-1">DE</label>
                            <input
                                type="text"
                                {...register("DE")}
                                className={`w-full rounded-md px-3 py-2 border ${errors.DE ? 'border-red-500' : 'border-white'} bg-white bg-opacity-10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                                placeholder="Ex: ADAMANTINA"
                            />
                            {errors.DE && <span className="text-red-300 text-xs">{errors.DE.message}</span>}
                        </div>
                        <div>
                            <label className="block text-white font-medium mb-1">Município</label>
                            <input
                                type="text"
                                {...register("MUN")}
                                className={`w-full rounded-md px-3 py-2 border ${errors.MUN ? 'border-red-500' : 'border-white'} bg-white bg-opacity-10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                                placeholder="Ex: ADAMANTINA"
                            />
                            {errors.MUN && <span className="text-red-300 text-xs">{errors.MUN.message}</span>}
                        </div>
                        <div>
                            <label className="block text-white font-medium mb-1">Distrito</label>
                            <input
                                type="text"
                                {...register("DISTR")}
                                className={`w-full rounded-md px-3 py-2 border ${errors.DISTR ? 'border-red-500' : 'border-white'} bg-white bg-opacity-10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                                placeholder="Ex: ADAMANTINA"
                            />
                            {errors.DISTR && <span className="text-red-300 text-xs">{errors.DISTR.message}</span>}
                        </div>
                        <div>
                            <label className="block text-white font-medium mb-1">Código Escola</label>
                            <input
                                type="text"
                                {...register("CODESC")}
                                className={`w-full rounded-md px-3 py-2 border ${errors.CODESC ? 'border-red-500' : 'border-white'} bg-white bg-opacity-10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                                placeholder="Ex: 31045"
                            />
                            {errors.CODESC && <span className="text-red-300 text-xs">{errors.CODESC.message}</span>}
                        </div>
                        <div>
                            <label className="block text-white font-medium mb-1">Nome Escola</label>
                            <input
                                type="text"
                                {...register("NOMESC")}
                                className={`w-full rounded-md px-3 py-2 border ${errors.NOMESC ? 'border-red-500' : 'border-white'} bg-white bg-opacity-10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                                placeholder="Ex: DURVALINO GRION PROF"
                            />
                            {errors.NOMESC && <span className="text-red-300 text-xs">{errors.NOMESC.message}</span>}
                        </div>
                        <div>
                            <label className="block text-white font-medium mb-1">Tipo Escola (número)</label>
                            <input
                                type="number"
                                {...register("TIPOESC")}
                                className={`w-full rounded-md px-3 py-2 border ${errors.TIPOESC ? 'border-red-500' : 'border-white'} bg-white bg-opacity-10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                                placeholder="Ex: 8"
                            />
                            {errors.TIPOESC && <span className="text-red-300 text-xs">{errors.TIPOESC.message}</span>}
                        </div>
                        <div>
                            <label className="block text-white font-medium mb-1">Descrição Tipo Escola</label>
                            <input
                                type="text"
                                {...register("TIPOESC_DESC")}
                                className={`w-full rounded-md px-3 py-2 border ${errors.TIPOESC_DESC ? 'border-red-500' : 'border-white'} bg-white bg-opacity-10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                                placeholder="Ex: EE"
                            />
                            {errors.TIPOESC_DESC && <span className="text-red-300 text-xs">{errors.TIPOESC_DESC.message}</span>}
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading || isSubmitting}
                        className="mt-4 px-6 py-2 bg-white text-indigo-600 font-semibold rounded-md shadow hover:bg-indigo-100 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <span className="inline-block w-5 h-5 border-2 border-indigo-500 border-t-transparent border-solid rounded-full animate-spin"></span>
                        ) : null}
                        {isSubmitting ? 'Salvando...' : 'Cadastrar'}
                    </button>
                </form>
            </div>

            <ErrorModal
                isOpen={errorModal.state}
                onClose={() => {
                    setErrorModal({
                        state: false,
                        message: ''
                    })
                }}
                title='Erro'
                message={errorModal.message}
            />

            <SucessModal
                isOpen={sucessModal.state}
                onClose={() => {
                    setSucessModal({
                        state: false,
                        message: ''
                    })
                }}
                title='Sucesso'
                message={sucessModal.message}
            />
        </>
    );
}

export default CreateMainCard;
