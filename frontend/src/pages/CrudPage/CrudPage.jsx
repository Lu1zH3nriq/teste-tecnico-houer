import Header from '../../components/common/Header/Header';

import { useState } from 'react';


import ErrorModal from '../../components/common/ConfirmationModal/ErrorModal';
import SucessModal from '../../components/common/ConfirmationModal/SucessModal';


function CrudPage() {

  const [errorModal, setErrorModal] = useState({
    state: false,
    message: ''
  });
  const [sucessModal, setSucessModal] = useState({
    state: false,
    message: ''
  });


  return (
    <>
      <div className="dashboard-container min-h-screen flex flex-col bg-indigo-950">
        <Header />
        <section className="flex-1 flex items-center justify-center">
          
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

export default CrudPage;
