import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAppSelector } from '../../../app/hooks';
import InputField from '../../../components/formField/InputField';
import RadioField from '../../../components/formField/RadioField';
import SelectField from '../../../components/formField/SelectField';
import { Student } from '../../../models';
import { citySelectList } from '../../city/citySlice';

interface StudentFormProps {
    initalFormState: Student;
    onSubmitStudent: (data: Student) => Promise<void>;
}

const schema = yup.object({
    name: yup
        .string()
        .required('Please enter name!')
        .test('valid name', 'Please enter at least 2 words', value => {
            if (!value) return true;

            const valueArr = value.split(' ');
            return !!(valueArr[0] && valueArr[1]);
        }),
    age: yup
        .number()
        .required('Please enter age!')
        .positive('Please enter a positive number!')
        .min(10, 'Min is 10')
        .max(60, 'Max is 60')
        .integer('Please enter an integer!')
        .typeError('Please enter a valid number.'),
    mark: yup
        .number()
        .required('Please enter mark!')
        .positive('Please enter a positive number!')
        .min(0, 'Min is 0')
        .max(10, 'Max is 10')
        .typeError('Please enter a valid number.'),
    gender: yup
        .string()
        .required('Please select gender!')
        .oneOf(['male', 'female'], 'Please select either male or female!'),
    city: yup.string().required('Please select city!'),
});

const StudentForm: React.FC<StudentFormProps> = ({
    initalFormState,
    onSubmitStudent,
}) => {
    const {
        handleSubmit,
        control,
        reset,
        formState: { isValid, isSubmitting },
    } = useForm({
        defaultValues: initalFormState,
        resolver: yupResolver(schema),
        mode: 'all',
    });
    const cityOptions = useAppSelector(citySelectList);

    const onSubmit: SubmitHandler<Student> = async data => {
        await onSubmitStudent(data);
    };

    const onReset = () => {
        reset(initalFormState);
    };

    return (
        <Box maxWidth={400}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField name="name" control={control} label="Full Name" />

                <RadioField
                    name="gender"
                    control={control}
                    label="Gender"
                    options={[
                        { label: 'Male', value: 'male' },
                        { label: 'Female', value: 'female' },
                    ]}
                />

                <SelectField
                    name="city"
                    control={control}
                    label="Select a city"
                    options={cityOptions || []}
                />

                <InputField
                    name="age"
                    control={control}
                    label="Age"
                    type="number"
                />

                <InputField
                    name="mark"
                    control={control}
                    label="Mark"
                    type="number"
                />

                <Box mt={3} display="flex" alignItems="center">
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        onClick={onReset}
                    >
                        Reset
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting || !isValid}
                    >
                        Save
                    </Button>
                    &nbsp;&nbsp;
                    {isSubmitting && (
                        <CircularProgress size={20} color="primary" />
                    )}
                </Box>
            </form>
        </Box>
    );
};

export default StudentForm;
