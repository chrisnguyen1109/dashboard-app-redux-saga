import {
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';
import { FetchStatus, Student } from '../../../models';

interface StudentProps {
    studentList: Student[];
    status: FetchStatus;
}

const StudentList: React.FC<StudentProps> = ({ studentList, status }) => {
    return (
        <TableContainer>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">#</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="right">Mark</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {status === 'fetch_request' && (
                        <TableRow>
                            <TableCell colSpan={3}>
                                <LinearProgress />
                            </TableCell>
                        </TableRow>
                    )}
                    {status === 'fetch_success' &&
                        studentList.map((student, i) => (
                            <TableRow key={student.id}>
                                <TableCell
                                    align="center"
                                    component="th"
                                    scope="row"
                                >
                                    {i + 1}
                                </TableCell>
                                <TableCell align="left">
                                    {student.name}
                                </TableCell>
                                <TableCell align="right">
                                    {student.mark}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StudentList;
