import { createTheme } from "@mui/material/styles";

const AppTheme = createTheme({
    palette: {
        primary: {
            main: "#F4C430",
            dark: "#D9A514",
            contrastText: "#111827",
        },
        secondary: {
            main: "#111827",
            contrastText: "#FFFFFF",
        },
        background: {
            default: "#F8FAFC",
            paper: "#FFFFFF",
        },
        text: {
            primary: "#111827",
            secondary: "#64748B",
        },
        success: {
            main: "#16A34A",
        },
        error: {
            main: "#DC2626",
        },
    },

    typography: {
        fontFamily: "Inter, Arial, sans-serif",
        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },

    shape: {
        borderRadius: 12,
    },

    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow:
                        "0px 3px 10px rgba(15, 23, 42, 0.06)",
                },
            },
        },

        MuiTextField: {
            defaultProps: {
                size: "small",
            },
        },
    },
});

export default AppTheme;
