import TextField, { type TextFieldProps } from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import type { ChangeEventHandler } from "react";

interface AppNumberFieldProps extends Omit<TextFieldProps, "type"> {
    prefix?: string;
    suffix?: string;
    min?: number;
    max?: number;
    step?: number;
}

const AppNumberField = ({
    prefix,
    suffix,
    min = 0,
    max,
    step = 1,
    onChange,
    ...props
}: AppNumberFieldProps) => {
    const handleChange: ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (event) => {
        const currentValue = event.target.value;
        const normalizedValue = currentValue.replace(/^0+(?=\d)/, "");

        if (currentValue !== normalizedValue) {
            event.target.value = normalizedValue;
        }

        onChange?.(event);
    };

    return (
        <TextField
            {...props}
            onChange={handleChange}
            type="number"
            fullWidth
            size="small"
            slotProps={{
                inputLabel: {
                    shrink: props.value !== undefined && props.value !== "",
                },
                htmlInput: {
                    min,
                    max,
                    step,
                },
                input: {
                    startAdornment: prefix ? (
                        <InputAdornment position="start">
                            {prefix}
                        </InputAdornment>
                    ) : undefined,
                    endAdornment: suffix ? (
                        <InputAdornment position="end">
                            {suffix}
                        </InputAdornment>
                    ) : undefined,
                },
            }}
        />
    );
};

export default AppNumberField;