

import React from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
   

    axios.post('http://localhost:8080/api/user/login', data)
    .then(x => {
        dispatch({ type: "SET_USER", data: x.data })

      
          Swal.fire("מוזמנים לטעום ולהנות... ");
        
        axios.get("http://localhost:8080/api/recipe")
            .then(res => {
                console.log(res.data)
                dispatch({ type: "GET_CATEGORY", data: res.data })
                navigate("/homepage")
            }).catch(error => {
                console.log(error)
            })
        axios.get("http://localhost:8080/api/recipe")
            .then(res => {
                dispatch({ type: "GET_RECIPIES", data: res.data })
                navigate("/homepage")
            }).catch(error => {
                console.log(error)
            })
        // navigate("/homepage")
    })
    .catch(x => console.log(x))
  };

  return (
    <>
          
      <style>
        {`
          body {
            font-family: 'Arial', sans-serif;
            background-color: ;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            color:#dfd9d964;
            background-image:require('../src/images/image7.jpg');
          }

          .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 300px;
            color:#dfd9d964
          }

          h4 {
            text-align: center;
            margin-bottom: 20px;
            color: white;
          }

          form {
            display: flex;
            flex-direction: column;
          }

          .textField {
            margin-bottom: 16px;
          }

          .button {
            background-color: black;
            color: white;
          }

          .maybe {
            text-align: center;
            margin-top: 20px;
          }

          a {
            color: #007bff;
          }
        `}
      </style>
   
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.Username}
          helperText={errors.Username && "This field is required"}
          {...register("Username", { required: true })}
          className="textField"
        />

        <TextField
          
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("Password")}
          className="textField"
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          className="button"
        >
    
          Login 
        </Button>
        
      </form>
      

      <Typography variant="body2" className="maybe" align="center" color="wheat">
        You don't have an account yet? <Link to="/signin" color="wheat">Sign up</Link>
      </Typography>
   
    </>
  );
}

export default Login;

