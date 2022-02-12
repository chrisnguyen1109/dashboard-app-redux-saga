import { TextField } from '@material-ui/core';
import { InputHTMLAttributes } from 'react';
import { Control, Controller } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    control: Control<any>;
    label: string;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    name,
    control,
    ...rest
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value, onBlur, ref },
                fieldState: { error },
            }) => {
                return (
                    <TextField
                        fullWidth
                        autoComplete="new-password"
                        label={label}
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        inputRef={ref}
                        error={!!error}
                        helperText={error?.message}
                        inputProps={rest}
                        style={{ margin: '10px 0 10px 0' }}
                    />
                );
            }}
        />
    );
};

export default InputField;
