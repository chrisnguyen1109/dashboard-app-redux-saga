import { FormHelperText } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Control, Controller } from 'react-hook-form';

export interface RadioFieldProps {
    name: string;
    control: Control<any>;
    label: string;
    options: { label: string; value: string | number }[];
}

const RadioField: React.FC<RadioFieldProps> = ({
    label,
    name,
    control,
    options,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormControl
                    component="fieldset"
                    error={!!error}
                    style={{ margin: '10px 0 10px 0' }}
                >
                    <FormLabel component="legend">{label}</FormLabel>
                    <RadioGroup
                        aria-label={label}
                        name={name}
                        value={value}
                        onChange={onChange}
                    >
                        {options.map(opt => (
                            <FormControlLabel
                                key={opt.value}
                                value={opt.value}
                                control={<Radio />}
                                label={opt.label}
                            />
                        ))}
                    </RadioGroup>
                    <FormHelperText>{error?.message}</FormHelperText>
                </FormControl>
            )}
        />
    );
};

export default RadioField;
