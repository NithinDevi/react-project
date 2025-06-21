import React, { createContext, useContext, useState } from "react";
import SnackBarComp from "../components/snackBar";

export const Context = createContext(null);

const ContextProvider = ({ children }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState(null);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    // setShowButtons(true);
    setSnackBarMessage(null);
  };

  const showSnackBarMessage = (message, severity) => {
    setSnackBarMessage({ message, severity });
    setOpenSnackbar(true);
  };

  return (
    <Context.Provider value={{ showSnackBarMessage }}>
      <SnackBarComp
        message={snackBarMessage?.message}
        isOpen={openSnackbar}
        onClose={handleCloseSnackbar}
        severity={snackBarMessage?.severity}
      />
      {children}
    </Context.Provider>
  );
};

export const useContextProvider = () => useContext(Context);

export default ContextProvider;
