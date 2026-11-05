import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

interface AppDropDownOption {
    value: string | number;
    label: string;
}

interface AppDropDownProps {
    label?: string;
    options: AppDropDownOption[];
    value: string | number;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    placeholder?: string;
    error?: boolean;
    helperText?: string;
}

const AppDropDown = ({
    label,
    options,
    value,
    onChange,
    placeholder,
    error,
    helperText,
    ...props
}: AppDropDownProps) => {
    return (
        <TextField
            select
            {...props}
            label={label}
            value={value}
            error={error}
            helperText={helperText}
            onChange={onChange}
            fullWidth
            size="small"
            sx={{
                "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                },
            }}   
            
        >
            {placeholder && (
                <MenuItem value="" disabled>
                    {placeholder}
                </MenuItem>
            )}

            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default AppDropDown;