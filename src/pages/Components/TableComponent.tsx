import { DataTable } from 'mantine-datatable';
import React, { useEffect, useState } from 'react';

const TableComponent = ({
    getAreaData,
    initialRecords,
    search,
    setSearch,
    columns,
    actions 
}: any) => {
    const PAGE_SIZES = [5, 10, 20, 30, 50, 100];
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [recordsData, setRecordsData] = useState<any[]>([]);

    useEffect(() => {
        if (getAreaData.length > 0) {
            const from = (page - 1) * pageSize;
            const to = from + pageSize;
            setRecordsData([...getAreaData.slice(from, to)]);
        }
    }, [page, pageSize, getAreaData]);

    useEffect(() => {
        if (search) {
            const filteredData = initialRecords.filter((item: any) => {
                return columns.some((column: any) =>
                    item[column.accessor]?.toString().toLowerCase().includes(search.toLowerCase())
                );
            });
            setRecordsData(filteredData.slice(0, pageSize));
        } else {
            setRecordsData(initialRecords.slice(0, pageSize));
        }
    }, [search, initialRecords, pageSize, columns]);

   
    const mergedColumns = [
        ...columns,
        ...(actions ? [{
            accessor: 'actions',
            title: 'Actions',
            render: (row: any) => actions(row)
        }] : [])
    ];

    return (
        <div className="space-y-6">
            <div className="panel">
                <div className="flex items-center justify-between mb-5">
                    <input
                        type="text"
                        className="form-input w-auto"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="datatables">
                    <DataTable
                        striped
                        className="whitespace-nowrap table-striped"
                        records={recordsData}
                        columns={mergedColumns} 
                        totalRecords={getAreaData.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={setPage}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default TableComponent;
