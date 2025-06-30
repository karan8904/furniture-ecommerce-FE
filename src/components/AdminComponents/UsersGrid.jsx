import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Grid,
  Typography,
  Box,
  Divider,
  Switch,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import CircularProgress from "@mui/material/CircularProgress";
import { changeUserStatus, getAllUsers } from "../../slices/userSlice";

const UsersGrid = () => {
  const dispatch = useDispatch();
  const usersLoading = useSelector((state) => state.user.getAllUsers.loading);
  const users = useSelector((state) => state.user.getAllUsers.users);
  const loadingIDs = useSelector((state) => state.user.changeUserStatus.loadingIDs)

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

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
              {users &&
                users.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>
                      {user.lastName}
                    </TableCell>
                    <TableCell>
                      {user.email}
                    </TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <Box sx={{ minWidth: 120 }}>
                        {!loadingIDs.includes(user._id)? (  
                          <Switch
                            key={user._id}
                            checked={user.isUserEnabled}
                            onChange={() => dispatch(changeUserStatus({id: user._id, status: !user.isUserEnabled}))}
                          />
                    
                        ) : (
                          <CircularProgress />
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
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
