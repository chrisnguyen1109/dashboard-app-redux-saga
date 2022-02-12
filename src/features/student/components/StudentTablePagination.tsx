import { TablePagination } from '@material-ui/core';

interface StudentTablePaginationProps {
    count: number;
    page: number;
    limit: number;
    onPageChange: (event: unknown, newPage: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StudentTablePagination: React.FC<StudentTablePaginationProps> = ({
    count,
    page,
    limit,
    onPageChange,
    onRowsPerPageChange,
}) => {
    return (
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={count}
            rowsPerPage={limit}
            page={page - 1}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
        />
    );
};

export default StudentTablePagination;
