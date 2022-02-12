import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    addStudent,
    getStudentById,
    updateStudent,
} from '../../../api/studentApi';
import { useAppDispatch } from '../../../app/hooks';
import { Student } from '../../../models';
import { cityActions } from '../../city/citySlice';
import StudentForm from '../components/StudentForm';

const AddEditStudent: React.FC = () => {
    const { studentId } = useParams<{ studentId: string }>();
    const isEditMode = studentId ? true : false;
    const [studentData, setStudentData] = useState<Student>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(cityActions.fetchCity());
    }, []);

    useEffect(() => {
        if (!isEditMode) return;

        (async () => {
            try {
                const response = await getStudentById(studentId!);

                setStudentData(response);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [studentId]);

    const submitHandler = async (data: Student) => {
        try {
            if (isEditMode) {
                await updateStudent(data);

                toast.success('Update student successfully!');
            } else {
                await addStudent(data);

                toast.success('Create student successfully!');
            }
        } catch (err: any) {
            console.log(err);
            toast.error(err.message);
        } finally {
            navigate(`../student?name=${data.name}`, { replace: true });
        }
    };

    const initialValues: Student = {
        name: '',
        age: '',
        mark: '',
        gender: '',
        city: '',
        ...studentData,
    } as Student;

    return (
        <Box>
            <Link to="../student" style={{ textDecoration: 'none' }}>
                <Typography
                    variant="caption"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '20px',
                        justifyContent: 'end',
                    }}
                    color={'primary'}
                >
                    <ChevronLeft /> Back to student list
                </Typography>
            </Link>

            <Typography variant="h4" style={{ marginTop: '20px' }}>
                {isEditMode ? 'Update student info' : 'Add new student'}
            </Typography>

            <Box mt={3}>
                {(!isEditMode || studentData) && (
                    <StudentForm
                        initalFormState={initialValues}
                        onSubmitStudent={submitHandler}
                    />
                )}
            </Box>
        </Box>
    );
};

export default AddEditStudent;
