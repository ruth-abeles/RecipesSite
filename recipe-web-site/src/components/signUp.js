import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
  Paper,
} from "@mui/material";
import AllLinks from "./allLinks";

const schema = yup.object({
  Username: yup.string().required(),
  Password: yup.string().required(),
  Phone: yup.string().required(),
  Tz: yup.string().required(),
  Name: yup.string().required(),
  Email: yup
    .string()
    .matches(/^[a-zA-Z0-9]+@gmail\.com$/, "Invalid email format")
    .required(),
}).required();

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/sighin",
        data
      );
      dispatch({ type: "SET_USER", data: response.data });

      const recipesResponse = await axios.get("http://localhost:8080/api/recipe");
      dispatch({ type: "GET_RECIPIES", data: recipesResponse.data });

      navigate("/homepage");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data;
        alert(errorMessage);
      }
    }
  };

  return (
    <>
      <AllLinks />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "2rem",
          }}
        >
          <Typography component="h1" variant="h5">
            התחברות
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <TextField
              {...register("Username")}
              variant="outlined"
              margin="normal"
              fullWidth
              id="Username"
              label="שם משתמש"
              error={!!errors.Username}
              helperText={errors.Username?.message}
            />
            <TextField
              {...register("Password")}
              variant="outlined"
              margin="normal"
              fullWidth
              id="Password"
              label="סיסמה"
              type="password"
              error={!!errors.Password}
              helperText={errors.Password?.message}
            />
            <TextField
              {...register("Phone")}
              variant="outlined"
              margin="normal"
              fullWidth
              id="Phone"
              label="פלאפון"
              error={!!errors.Phone}
              helperText={errors.Phone?.message}
            />
            <TextField
              {...register("Tz")}
              variant="outlined"
              margin="normal"
              fullWidth
              id="Tz"
              label="תעודת זהות"
              error={!!errors.Tz}
              helperText={errors.Tz?.message}
            />
            <TextField
              {...register("Email")}
              variant="outlined"
              margin="normal"
              fullWidth
              id="Email"
              label="מייל"
              error={!!errors.Email}
              helperText={errors.Email?.message}
            />
            <TextField
              {...register("Name")}
              variant="outlined"
              margin="normal"
              fullWidth
              id="Name"
              label="שם"
              error={!!errors.Name}
              helperText={errors.Name?.message}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              התחברות
            </Button>
            <Typography variant="body2" align="center">
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </form>
        </Paper>
      </Container>
    </>
  );
}
