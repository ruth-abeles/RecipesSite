import React, {  useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useLocation,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AllLinks from "./allLinks";
import { useDispatch } from "react-redux";


const DeleteRecipe =()=> {

  const navigate =useNavigate();
  
  const { state } = useLocation();

  console.log("id: delete",state)

  const deleteThisRecipe = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`http://localhost:8080/api/recipe/delete/${state}`)
          .then((response) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            navigate("/recipes");
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <div>
      <AllLinks />
      <Link className="rey" to="/recipes">
        Back to Recipes
      </Link>
      <button onClick={deleteThisRecipe}>למחיקה</button>
    </div>
  );
};

export default DeleteRecipe;
