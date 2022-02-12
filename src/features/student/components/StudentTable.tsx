import { Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteStudent } from '../../../api/studentApi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import AlertDialog, {
    AlertDialogProps,
} from '../../../components/common/AlertDialog';
import { Pagination, Student } from '../../../models';
import { cityObjectList } from '../../city/citySlice';
import { studentActions, studentFilter } from '../studentSlice';
import StudentTableHead from './StudentTableHead';
import StudentTablePagination from './StudentTablePagination';
import StudentTableToolbar from './StudentTableToolbar';

const getMarkColor = (mark: number) => {
    if (mark >= 8) return 'green';
    if (mark >= 4) return 'goldenrod';
    return 'red';
};

interface StudentTableProps {
    studentList: Student[];
    pagination: Pagination;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
    })
);

const initalModalState = {
    open: false,
    title: '',
    content: '',
    submitDialog: () => null,
    loading: false,
};

const StudentTable: React.FC<StudentTableProps> = ({
    studentList,
    pagination,
}) => {
    const classes = useStyles();
    const filter = useAppSelector(studentFilter);
    const { _page, _limit, _order, _sort } = filter;
    const [selected, setSelected] = useState<string[]>([]);
    const dispatch = useAppDispatch();
    const cityObj = useAppSelector(cityObjectList);
    const [modal, setModal] = useState<AlertDialogProps>(initalModalState);

    const handleRequestSort = (
        _event: React.MouseEvent<unknown>,
        property: keyof Student
    ) => {
        const isAsc = _sort === property && _order === 'asc';

        dispatch(
            studentActions.setFilter({
                ...filter,
                _order: isAsc ? 'desc' : 'asc',
                _sort: property,
            })
        );
    };

    const handleSelectAllClick = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.checked) {
            const newSelecteds = studentList.map(el => el.id!);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (id: string) => {
        setSelected(prevSelected => {
            const selectedIndex = prevSelected.indexOf(id);
            let newSelected: string[] = [];

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(prevSelected, id);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(prevSelected.slice(1));
            } else if (selectedIndex === prevSelected.length - 1) {
                newSelected = newSelected.concat(prevSelected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    prevSelected.slice(0, selectedIndex),
                    prevSelected.slice(selectedIndex + 1)
                );
            }
            return newSelected;
        });
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        dispatch(
            studentActions.setFilter({
                ...filter,
                _page: newPage + 1,
            })
        );
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(
            studentActions.setFilter({
                ...filter,
                _page: 1,
                _limit: parseInt(event.target.value, 10),
            })
        );
    };

    const handleRemoveStudent = (studentIds: string[]) => {
        return async (value: boolean) => {
            if (!value) setModal(initalModalState);
            else {
                try {
                    setModal(prevState => ({ ...prevState, loading: true }));
                    await Promise.all(studentIds.map(id => deleteStudent(id)));

                    toast.success('Remove student successfully!');

                    dispatch(
                        studentActions.setFilter({
                            ...filter,
                        })
                    );

                    if (
                        studentIds.length === 1 &&
                        !selected.includes(studentIds[0])
                    )
                        return;

                    studentIds.forEach(el => handleClick(el));
                } catch (err: any) {
                    console.log(err);
                    toast.error(err.message);
                } finally {
                    setModal(initalModalState);
                }
            }
        };
    };

    const openRemoveStudentModal = (student: Student) => {
        setModal({
            open: true,
            title: 'Remove a student!',
            content: `Are you sure to remove student name "${student.name}". This action can't be undo.`,
            submitDialog: handleRemoveStudent([student.id!]),
            loading: false,
        });
    };

    const openRemoveMultipleStudentModal = () => {
        setModal({
            open: true,
            title: 'Remove a student!',
            content: `Are you sure to remove these students. This action can't be undo.`,
            submitDialog: handleRemoveStudent(selected),
            loading: false,
        });
    };

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    return (
        <div className={classes.root}>
            <AlertDialog
                open={modal.open}
                title={modal.title}
                content={modal.content}
                submitDialog={modal.submitDialog}
                loading={modal.loading}
            />
            <Paper className={classes.paper}>
                <StudentTableToolbar
                    numSelected={selected.length}
                    openRemoveMultipleStudent={openRemoveMultipleStudentModal}
                />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size="medium"
                        aria-label="enhanced table"
                    >
                        <StudentTableHead
                            numSelected={selected.length}
                            order={_order!}
                            orderBy={_sort}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={studentList.length}
                        />
                        <TableBody>
                            {studentList.map((row, index) => {
                                const isItemSelected = isSelected(row.id!);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id!}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                                onClick={() =>
                                                    handleClick(row.id!)
                                                }
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.name}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            style={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {row.gender}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            style={{
                                                color: getMarkColor(row.mark),
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {row.mark}
                                        </TableCell>
                                        <TableCell align="right">
                                            {cityObj[row.city]?.name}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Link
                                                to={`edit/${row.id}`}
                                                style={{
                                                    textDecoration: 'none',
                                                }}
                                            >
                                                <Button
                                                    size="small"
                                                    color="primary"
                                                    style={{
                                                        marginRight: '10px',
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                            </Link>

                                            <Button
                                                size="small"
                                                color="secondary"
                                                onClick={() =>
                                                    openRemoveStudentModal(row)
                                                }
                                            >
                                                Remove
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <StudentTablePagination
                    count={pagination._totalRows}
                    page={_page}
                    limit={_limit}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
};

export default StudentTable;
