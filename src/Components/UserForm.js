import { Button, Grid, Input, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const UserForm = ({ addUser, updateUser, submitted, data, isEdit }) => {
  // id (variable) setId (function to handle variable change)
  const [id, setId] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!submitted) {
      setId(0);
      setName("");
    }
  }, [submitted]);

  useEffect(() => {
    if (data?.id && data.id !== 0) {
      setId(data.id);
      setName(data.name);
    }
  }, [data]);

  return (
    <Grid
      container
      spacing={2}
      sx={{ backgroundColor: "white", marginBottom: "30px", display: "block" }}
    >
      <Grid item xs={12}>
        <Typography component={"h1"} sx={{ color: "black" }}>
          User Form
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
        <Typography
          component={"label"}
          sx={{
            color: "black",
            marginRight: "20px",
            fontSize: "16px",
            width: "100px",
            display: "block",
          }}
          htmlFor="id"
        >
          ID
        </Typography>
        <Input
          type="number"
          id="id"
          name="id"
          sx={{ width: "400px" }}
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
        <Typography
          component={"label"}
          sx={{
            color: "black",
            marginRight: "20px",
            fontSize: "16px",
            width: "100px",
            display: "block",
          }}
          htmlFor="id"
        >
          Name
        </Typography>
        <Input
          type="text"
          id="name"
          name="name"
          sx={{ width: "400px" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Grid>
      <Button
        sx={{
          margin: "auto",
          marginBottom: "20px",
          backgroundColor: "#00c6e6",
          color: "black",
          marginLeft: "15px",
          marginTop: "20px",
          "&:hover": {
            opacity: "0.5",
            backgroundColor: "00c6e6",
          },
        }}
        onClick={() =>
          !isEdit ? addUser({ id, name }) : updateUser({ id, name })
        }
      >
        {isEdit ? "Update" : "Add"}
      </Button>
    </Grid>
  );
};

export default UserForm;
