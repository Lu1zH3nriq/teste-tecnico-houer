import React, { useRef, useState } from 'react';
import ErrorModal from '../ConfirmationModal/ErrorModal';




function UploadCsvMainCard({ onUpload }) {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const [errorModal, setErrorModal] = useState({
        state: false,
        message: ''
    })

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setFileName(file ? file.name : '');
    };

    const handleUpload = (e) => {
        e.preventDefault();

        //validar tipo de arquivo
        if (!selectedFile || selectedFile.type !== 'text/csv' && !selectedFile.name.toLowerCase().endsWith('.csv')) {
            setSelectedFile(null);
            setFileName('');

            setErrorModal({
                state: true,
                message: 'O arquivo deve ser .CSV !'
            });

            

        }


        if (selectedFile && onUpload) {
            onUpload(selectedFile);
        }
    };

    return (
        <>
            <div className="w-full max-w-xl mx-auto mt-8 p-6 rounded-xl shadow-lg flex flex-col items-center gap-6 border border-white bg-gradient-to-br from-indigo-500 to-purple-700">
                <h2 className="text-2xl font-bold text-white mb-2 text-center">Importar Arquivo CSV</h2>
                <form className="w-full flex flex-col sm:flex-row items-center gap-4" onSubmit={handleUpload}>
                    <label className="flex-1 w-full">
                        <input
                            type="file"
                            accept=".csv"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-white file:text-indigo-600 hover:file:bg-indigo-100 file:transition-colors file:duration-200 cursor-pointer bg-transparent border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </label>
                    <button
                        type="submit"
                        disabled={!selectedFile}
                        className="px-6 py-2 bg-white text-indigo-600 font-semibold rounded-md shadow hover:bg-indigo-100 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        Enviar
                    </button>
                </form>
                {fileName && (
                    <div className="w-full text-center text-white text-sm mt-2 truncate">
                        Arquivo selecionado: <span className="font-medium text-indigo-200">{fileName}</span>
                    </div>
                )}
            </div>

            <ErrorModal 
                isOpen={errorModal.state}
                onClose={()=>{
                    setErrorModal({
                        state: false,
                        message: ''
                    })

                }}
                title='Erro'
                message={errorModal.message}
            />
        </>
    );
}

export default UploadCsvMainCard;
