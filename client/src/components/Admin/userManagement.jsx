import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Button, CircularProgress } from "@mui/material";
import { getAdminusers } from "../../services/adminService";


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
          try {
            const data = await getAdminusers();
            setUsers(data);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching admin stats:", error);
          }
        };
    
        fetchStats();
  }, []);
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="container mt-4">
      <h2>User List</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <Button variant="contained" color="primary" size="small">
                  Edit
                </Button>
                &nbsp;
                <Button variant="contained" color="error" size="small">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
