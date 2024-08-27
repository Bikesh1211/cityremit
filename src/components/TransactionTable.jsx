import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  TablePagination,
  Alert,
  styled,
  Chip,
} from "@mui/material";

const StyledTableCell = styled(TableCell)`
  font-weight: bold;
  background-color: #f5f5f5;
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #fafafa;
  }
  &:hover {
    background-color: #e0e0e0;
  }
`;
const ResponsiveTableContainer = styled(TableContainer)`
  overflow-x: auto;
  max-width: 100%;
`;

export default function TransactionTable({ searchText }) {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction["Sender Full Name"]
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      transaction["Receiver Full Name"]
        .toLowerCase()
        .includes(searchText.toLowerCase())
  );
  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("jwt_token");
      const response = await axios.post(
        "https://jp-dev.cityremit.global/web-api/report-manager/v1/admin/dashboard/search",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTransactions(response.data.data);
    } catch (error) {
      setError("Failed to fetch transactions.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return (
      <TableContainer
        component={Paper}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </TableContainer>
    );
  }

  if (error) {
    return (
      <TableContainer component={Paper} sx={{ padding: 2 }}>
        <Alert severity="error">{error}</Alert>
      </TableContainer>
    );
  }
  const StatusChip = styled(Chip)(({ status, theme }) => ({
    // borderColor: status === 'Authorized' ? 'green': 'orange',
    color: status === "Authorized" ? "green" : "#FF8225",
    backgroundColor: "transparent",
    // borderWidth: 1,
    // borderStyle: 'solid',
    textTransform: "capitalize",
  }));
  return (
    <ResponsiveTableContainer component={Paper} elevation={3}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Sender Full Name</StyledTableCell>
            <StyledTableCell>Receiver Full Name</StyledTableCell>
            <StyledTableCell>Current Status</StyledTableCell>
            <StyledTableCell>Send Amount</StyledTableCell>
            <StyledTableCell>Send Country</StyledTableCell>
            <StyledTableCell>Receive Amount</StyledTableCell>
            <StyledTableCell>Receive Country</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTransactions
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((transaction) => (
              <StyledTableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction["Sender Full Name"]}</TableCell>
                <TableCell>{transaction["Receiver Full Name"]}</TableCell>
                {/* <TableCell>{transaction["Current Status"]}</TableCell> */}
                <TableCell>
                  <StatusChip
                    label={transaction["Current Status"]}
                    status={transaction["Current Status"]}
                  />
                </TableCell>
                <TableCell>{transaction["Send Amount"]}</TableCell>
                <TableCell>{transaction["Send Country"]}</TableCell>
                <TableCell>{transaction["Receive Amount"]}</TableCell>
                <TableCell>{transaction["Receive Country"]}</TableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </ResponsiveTableContainer>
  );
}
