import { createContext, useState } from "react";

export const PrintContext = createContext({});

export const PrintContextProvider = ({ children }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [selectedBarcode, setSelectedBarcode] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setSelectedBarcode([]);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    setSelectedBarcode([]);
  };

  return (
    <PrintContext.Provider
      value={{
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        selectedBarcode,
        setSelectedBarcode,
        handleChangePage,
        handleChangeRowsPerPage,
      }}
    >
      {children}
    </PrintContext.Provider>
  );
};
