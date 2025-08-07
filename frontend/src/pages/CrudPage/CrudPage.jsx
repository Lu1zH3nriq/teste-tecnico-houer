import Header from '../../components/common/Header/Header';

import { useState } from 'react';

import CreateMainCard from '../../components/common/CrudPage/CreateMainCard';
import TableList from '../../components/common/CrudPage/TableList';

import { ListProvider } from '../../context/listContext';

function CrudPage() {


  return (
    <>
      <ListProvider>
        <div className="dashboard-container min-h-screen flex flex-col bg-indigo-950">
          <Header />
          <section className="flex-1 flex items-center justify-center">
            <CreateMainCard />
          </section>
          <section className="flex-1 flex items-center justify-center">
            <TableList />
          </section>
        </div>
      </ListProvider>

    </>
  );
}

export default CrudPage;
