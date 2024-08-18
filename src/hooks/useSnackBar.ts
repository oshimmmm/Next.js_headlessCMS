import { useState } from "react";

interface UseSnackbarReturn {
  openSnackbar: boolean;
  snackbarMessage: string;
  snackbarSeverity: "success" | "error";
  setSnackbar: (message: string, severity: "success" | "error") => void;
  resetSnackbar: () => void;
}

export function useSnackbar(): UseSnackbarReturn {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const setSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const resetSnackbar = () => {
    setOpenSnackbar(false);
  };

  return {
    openSnackbar,
    snackbarMessage,
    snackbarSeverity,
    setSnackbar,
    resetSnackbar,
  };
};
