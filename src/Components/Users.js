import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import { Box } from "@mui/material";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  // when the page loads we have to use "component did mount lifecycle method"
  // for that we use useEffect in functional components
  useEffect(() => {
    getUsers();
  }, []);
  // this is called the dependancy array
  // if this is empty, it means this will execute whwn the component loads

  const getUsers = () => {
    // retrive the users
    axios
      .get(process.env.REACT_APP_ENDPOINT + "/getusers")
      .then((response) => {
        // console.log(response.data.response);
        setUsers(response.data || []);
      })
      .catch((error) => {
        console.error("axios error : ", error);
      });
  };

  const addUser = (data) => {
    setSubmitted(true);
    const payload = {
      id: data.id,
      name: data.name,
    };
    axios
      .post(process.env.REACT_APP_ENDPOINT + "/adduser", payload)
      .then(() => {
        getUsers();
        setSubmitted(false);
        setIsEdit(false);
      })
      .catch((error) => {
        console.error("axios error : ", error);
      });
  };

  const updateUser = (data) => {
    setSubmitted(true);
    const payload = {
      id: data.id,
      name: data.name,
    };
    axios
      .put(process.env.REACT_APP_ENDPOINT + "/updateuser", payload)
      .then(() => {
        getUsers();
        setSubmitted(false);
        setIsEdit(false);
      })
      .catch((error) => {
        console.error("axios error : ", error);
      });
  };

  const deleteUser = (data) => {
    // console.log(data);
    setSubmitted(true);

    axios
      .delete(`${process.env.REACT_APP_ENDPOINT}/deleteuser/${data.id}`)
      .then(() => {
        getUsers();
      })
      .catch((error) => {
        console.error("axios error : ", error);
      });
  };

  return (
    <Box
      sx={{
        width: "calc(100% - 100px)",
        margin: "auto",
        marginTop: "100px",
      }}
    >
      <UserForm
        addUser={addUser}
        submitted={submitted}
        data={selectedUser}
        isEdit={isEdit}
        updateUser={updateUser}
      />
      <UsersTable
        rows={users}
        selectedUser={(data) => {
          setSelectedUser(data);
          setIsEdit(true);
        }}
        deleteUser={(data) =>
          window.confirm("Are you sure? you want to delete this...") &&
          deleteUser(data)
        }
      />
    </Box>
  );
};

export default Users;

// const users = [
//   {
//     id: 1,
//     name: "Supun",
//   },
//   {
//     id: 2,
//     name: "Thiwanka",
//   },
//   {
//     id: 3,
//     name: "Jayaweera",
//   },
// ];
