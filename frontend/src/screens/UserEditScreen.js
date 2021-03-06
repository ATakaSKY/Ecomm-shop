import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUserProfileAdmin } from "../actions/authActions";
import FormContainer from "../components/FormContainer";
import { UPDATE_USER_RESET } from "../constants/authConstants";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.userDetails);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: updateSuccess,
  } = useSelector((state) => state.updateUserProfile);

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: UPDATE_USER_RESET });
      history.push("/admin/userList");
    } else {
      if (!user?.name || user?._id !== userId) {
        dispatch(getUserDetails(`users/${userId}`));
      } else {
        setName(user?.name);
        setEmail(user?.email);
        setIsAdmin(user?.isAdmin);
      }
    }
  }, [user, userId, dispatch, updateSuccess, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateUserProfileAdmin(userId, name, email, isAdmin));
  };

  return (
    <>
      <Link to="/admin/userList" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
