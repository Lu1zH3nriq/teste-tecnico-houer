import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";
import { getSchools } from '../../../services/schoolService';
import { useListContext } from "../../../context/listContext";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

import ConfirmationDeleteModal from "./ConfirmationDeleteModal";
import EditModal from "./EditModal";
import ErrorModal from "../ConfirmationModal/ErrorModal";
import SucessModal from "../ConfirmationModal/SucessModal";

function TableList() {

    const { refreshKey } = useListContext();

    const [data, setData] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [pendingPageSize, setPendingPageSize] = useState(20);

    const [confirmatioDeleteModal, setConfirmationDeleteModal] = useState({
        state: false,
        data: null
    });

    const [editRegistro, setEditRegistro] = useState({
        state: false,
        data: null
    });

    const [errorModal, setErrorModal] = useState({
        show: false,
        message: ''
    });

    const [sucessModal, setSucessModal] = useState({
        show: false,
        message: ''
    });



    const fetchData = async (page) => {
        setLoading(true);
        try {
            const res = await getSchools(page + 1, pageSize);
            setData(res.data || []);
            setPageCount(res.pagination?.totalPages || 20);
        } catch (err) {
            setData([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData(pageIndex);
    }, [pageIndex, pageSize, refreshKey]);

    const columns = useMemo(() => [
        { Header: "ID", accessor: "id" },
        { Header: "Dependência", accessor: "NOMEDEP" },
        { Header: "DE", accessor: "DE" },
        { Header: "Município", accessor: "MUN" },
        { Header: "Distrito", accessor: "DISTR" },
        { Header: "Código Escola", accessor: "CODESC" },
        { Header: "Nome Escola", accessor: "NOMESC" },
        { Header: "Tipo Escola", accessor: "TIPOESC" },
        { Header: "Descrição Tipo Escola", accessor: "TIPOESC_DESC" },
        {
            Header: "Ações",
            id: "acoes",
            Cell: ({ row }) => (
                <div className="flex gap-2 justify-center">
                    <button
                        title="Editar"
                        className="p-1 rounded hover:bg-indigo-100 text-indigo-600"
                        onClick={() => {
                            setEditRegistro({
                                state: true,
                                data: row.original
                            });
                        }}
                    >
                        <FaEdit size={15} />
                    </button>
                    <button
                        title="Excluir"
                        className="p-1 rounded hover:bg-red-100 text-red-600"
                        onClick={() => {
                            setConfirmationDeleteModal({
                                state: true,
                                data: row.original
                            });
                        }}
                    >
                        <FaRegTrashAlt size={15} />
                    </button>
                </div>
            ),
        },
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex: tablePageIndex },
    } = useTable(
        {
            columns,
            data,
            manualPagination: true,
            pageCount,
            initialState: { pageIndex },
        },
        usePagination
    );

    useEffect(() => {
        if (tablePageIndex !== pageIndex) setPageIndex(tablePageIndex);

    }, [tablePageIndex]);

    return (
        <>
            <div className="w-full max-w-7xl mx-auto mt-8 p-4 bg-white rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">Lista de Escolas</h2>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div></div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="pageSize" className="text-sm text-gray-700 font-medium">Registros por página:</label>
                        <input
                            id="pageSize"
                            type="number"
                            min={1}
                            max={100}
                            value={pendingPageSize}
                            onChange={e => setPendingPageSize(Number(e.target.value) || 1)}
                            className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setPageSize(pendingPageSize);
                                setPageIndex(0);
                            }}
                            className="px-4 py-1 bg-indigo-500 text-white rounded font-semibold hover:bg-indigo-600 transition-colors"
                        >
                            Buscar
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gradient-to-r from-indigo-500 to-purple-700 text-white">
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => {
                                        const headerProps = column.getHeaderProps();
                                        const { key, ...rest } = headerProps;
                                        return (
                                            <th key={key} {...rest} className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider">
                                                {column.render('Header')}
                                            </th>
                                        );
                                    })}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {loading ? (
                                <tr><td colSpan={columns.length} className="text-center py-8">Carregando...</td></tr>
                            ) : data.length === 0 ? (
                                <tr><td colSpan={columns.length} className="text-center py-8 text-gray-500">Nenhum registro encontrado no banco de dados.</td></tr>
                            ) : page.length === 0 ? (
                                <tr><td colSpan={columns.length} className="text-center py-8">Nenhum registro encontrado.</td></tr>
                            ) : (
                                page.map(row => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()} className="hover:bg-indigo-50">
                                            {row.cells.map(cell => (
                                                <td {...cell.getCellProps()} className="px-4 py-2 border-b border-gray-100 text-sm text-gray-700">
                                                    {cell.render('Cell')}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="px-3 py-1 rounded bg-indigo-500 text-white font-semibold disabled:opacity-50">{'<<'}</button>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage} className="px-3 py-1 rounded bg-indigo-500 text-white font-semibold disabled:opacity-50">Anterior</button>
                    <span className="text-gray-700">Página <strong>{pageIndex + 1}</strong> de <strong>{pageOptions.length}</strong></span>
                    <button onClick={() => nextPage()} disabled={!canNextPage} className="px-3 py-1 rounded bg-indigo-500 text-white font-semibold disabled:opacity-50">Próxima</button>
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="px-3 py-1 rounded bg-indigo-500 text-white font-semibold disabled:opacity-50">{'>>'}</button>
                </div>
            </div>


            <ConfirmationDeleteModal
                isOpen={confirmatioDeleteModal.state}
                onClose={() => {
                    setConfirmationDeleteModal({
                        state: false,
                        data: null
                    })
                }}
                registro={confirmatioDeleteModal.data}

                sucessOrError={(obj) => {
                    if (obj.sucess) {
                        setSucessModal({
                            show: true,
                            message: obj.message
                        })
                    }
                    else {
                        setErrorModal({
                            show: true,
                            message: obj.message
                        })
                    }
                }}
            />

            <ErrorModal
                isOpen={errorModal.show}
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
                isOpen={sucessModal.show}
                onClose={() => {
                    setSucessModal({
                        state: false,
                        message: ''
                    })
                }}
                title='Sucesso'
                message={sucessModal.message}
            />

            <EditModal 
                isOpen={editRegistro.state}
                onClose={()=>{
                    setEditRegistro({
                        state: false,
                        data: null
                    });
                }}
                registro={editRegistro.data}
                onSubmit={(obj)=>{
                    if(obj.sucess){
                        setSucessModal({
                            show: true,
                            message: obj.message
                        });
                    }
                    else{
                        setErrorModal({
                            show: true,
                            message: obj.message
                        })
                    }
                }}
            />
        </>
    );
}

export default TableList;
