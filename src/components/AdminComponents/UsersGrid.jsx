import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid, Typography, Box, Divider, Switch, Pagination, TextField, InputAdornment } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { changeUserStatus, getAllUsers, searchUsers } from "../../slices/userSlice";
import SearchIcon from "@mui/icons-material/Search";

const UsersGrid = () => {
  const [paginationDetails, setPaginationDetails] = useState({
    itemsPerPage: 5,
    totalItems: 0,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [query, setQuery] = useState("")
  const dispatch = useDispatch();
  const usersLoading = useSelector((state) => state.user.getAllUsers.loading);
  const users = useSelector((state) => state.user.getAllUsers.users);
  const loadingIDs = useSelector(
    (state) => state.user.changeUserStatus.loadingIDs
  );

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    if (users?.length > 0) {
      setPaginationDetails({
        ...paginationDetails,
        totalItems: users.length,
      });
      let count = Math.ceil(
        paginationDetails.totalItems / paginationDetails.itemsPerPage
      );
      setTotalPages(count);
      const indexOfLastItem = currentPage * paginationDetails.itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - paginationDetails.itemsPerPage;
      setCurrentUsers(users.slice(indexOfFirstItem, indexOfLastItem));
    }
  }, [users, currentPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if(query === "")
        dispatch(getAllUsers())
      if(query){
        setCurrentPage(1)
        dispatch(searchUsers(query))
      }
    }, 500)

    return () => clearTimeout(timer) 
  }, [query])

  return (
    <Grid container>
      <Grid container size={12}>
        <Grid size={12}>
          <Box display="flex">
            <Typography fontSize="25px" fontWeight="550">
              All Users
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid size={12} margin="17px 0">
        <Divider />
      </Grid>
      <Grid container size={12} margin="0 10px 17px 10px">
          <Grid size={3}>
            <Box>
              <TextField
                id="search"
                placeholder="Search User"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    style: {
                      borderRadius: "15px",
                    },
                  },
                }}
                fullWidth
              />
            </Box>
          </Grid>
          <Grid size={6}></Grid>
        </Grid>
      <Grid size={12} margin="0 10px">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>isUserEnabled</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersLoading && (
                <TableRow>
                  <TableCell align="center" colSpan={11}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}
              {users?.length !== 0 && currentUsers?.length !== 0 &&
                currentUsers.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{(index + 1) + paginationDetails.itemsPerPage * (currentPage - 1)}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <Box sx={{ minWidth: 120 }}>
                        {!loadingIDs.includes(user._id) ? (
                          <Switch
                            key={user._id}
                            checked={user.isUserEnabled}
                            onChange={() =>
                              dispatch(
                                changeUserStatus({
                                  id: user._id,
                                  status: !user.isUserEnabled,
                                })
                              )
                            }
                          />
                        ) : (
                          <CircularProgress />
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              {users?.length > paginationDetails.itemsPerPage && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Box display="flex" justifyContent="center">
                      <Pagination
                        size="large"
                        count={totalPages}
                        page={currentPage}
                        onChange={(e, page) => {
                          setCurrentPage(page);
                          window.tableContainer.scrollTo(0, 0);
                        }}
                        shape="rounded"
                        color="primary"
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              {!usersLoading && users.length === 0 && (
                <TableRow>
                  <TableCell align="center" colSpan={11}>
                    <Typography variant="h6">No Users Found...</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default UsersGrid;
