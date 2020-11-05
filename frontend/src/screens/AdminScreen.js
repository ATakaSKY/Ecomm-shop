import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/Message";
import { getAllUsersDetails, deleteUser } from "../actions/authActions";

const AdminScreen = ({ history }) => {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.allUsers);
  const { userInfo } = useSelector((state) => state.userLogin);

  const { success } = useSelector((state) => state.deleteUser);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllUsersDetails());
    } else {
      history.push("/login");
    }
  }, [dispatch, success, history, userInfo]);

  const userDeleteHandler = (id) => {
    if (window.confirm("Do you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <Row>
      <Col>
        <h2>Users</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="error">{error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>IS ADMIN</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td align="center">
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button className="btn-sm" variant="light">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      className="btn-sm"
                      variant="danger"
                      onClick={() => userDeleteHandler(user._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default AdminScreen;
