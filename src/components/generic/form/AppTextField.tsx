import TextField from "@mui/material/TextField";
import type { TextFieldProps } from "@mui/material/TextField";

interface AppTextFieldProps extends Omit<TextFieldProps, "label"> {
  label?: string;
}

const AppTextField = ({
  label,
  ...props
}: AppTextFieldProps) => {
  return (
    <TextField
      label={label}
      fullWidth
      variant="outlined"
      size="small"
      {...props}
    />
  );
};

export default AppTextField;