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
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [recordsData, setRecordsData] = useState<any[]>([]);
    const [totalRecords, setTotalRecords] = useState<number>(0);

    useEffect(() => {
        // Filter records based on search term
        const filteredData = search
            ? initialRecords.filter((item: any) =>
                columns.some((column: any) =>
                    item[column.accessor]?.toString().toLowerCase().includes(search.toLowerCase())
                )
            )
            : initialRecords;

        setTotalRecords(filteredData.length);

        // Paginate filtered data
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData(filteredData.slice(from, to));
    }, [search, initialRecords, pageSize, page, columns]);

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
                        columns={[
                            ...columns,
                            ...(actions ? [{
                                accessor: 'actions',
                                title: 'Actions',
                                render: (row: any) => actions(row)
                            }] : [])
                        ]}
                        totalRecords={totalRecords}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={(size) => setPageSize(size)}
                        minHeight={100}
                        paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default TableComponent;
