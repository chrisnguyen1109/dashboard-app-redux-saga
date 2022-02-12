import {
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { Control, Controller } from 'react-hook-form';

export interface SelectFieldProps {
    name: string;
    control: Control<any>;
    label: string;
    options: { key: string; value: string | number }[];
}

const SelectField: React.FC<SelectFieldProps> = ({
    label,
    name,
    control,
    options,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value, onBlur, ref },
                fieldState: { error },
            }) => (
                <FormControl
                    variant="outlined"
                    size="small"
                    error={!!error}
                    fullWidth
                    style={{ margin: '10px 0 10px 0' }}
                >
                    <InputLabel id={name}>{label}</InputLabel>
                    <Select
                        labelId={name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        label={label}
                    >
                        {options.map(opt => (
                            <MenuItem key={opt.key} value={opt.key}>
                                {opt.value}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{error?.message}</FormHelperText>
                </FormControl>
            )}
        />
    );
};

export default SelectField;
