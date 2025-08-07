import Header from '../../components/common/Header/Header';
import UploadCsvMainCard from '../../components/common/CsvPage/uploadCsvMainCard';

import { uploadCsvFile } from '../../services/dataCsvService';
import { useState } from 'react';




import ErrorModal from '../../components/common/ConfirmationModal/ErrorModal';
import SucessModal from '../../components/common/ConfirmationModal/SucessModal';

function CSVPage() {

  const [errorModal, setErrorModal] = useState({
    state: false,
    message: ''
  });
  const [sucessModal, setSucessModal] = useState({
    state: false,
    message: ''
  });

  const uploadCsv = async (csvFile) => {
    try {
      const resp = await uploadCsvFile(csvFile);
      setSucessModal({
        state: true,
        message: `${resp.message} -> ${resp.totalRegistros} registros importados.`
      })
      


    } catch (err) {
      console.log('ERRO AO MANDAR O ARQUVO: ',err)
      setErrorModal({
        state: true,
        message: 'Erro ao importar aquivo!'
      })
    }
  };

  return (
    <>
      <div className="dashboard-container min-h-screen flex flex-col bg-indigo-950">
        <Header />
        <section className="flex-1 flex items-center justify-center">
          <UploadCsvMainCard onUpload={uploadCsv} />
        </section>
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

      <SucessModal 
        isOpen={sucessModal.state}
        onClose={()=>{
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

export default CSVPage;
