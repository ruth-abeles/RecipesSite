
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import AllLinks from "./allLinks";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import '../styles/style.css';


const RecipesPage = () => {
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPrepTime, setFilterPrepTime] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const recipes = useSelector((state) => state?.recipes);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("http://localhost:8080/api/recipe") .then((response) => 
      {
        dispatch({ type: "GET_RECIPIES", data: response.data });
        
      })
      .catch((error) => {
        console.error(error);
      });

    axios.get("http://localhost:8080/api/category").then((response) => {
      setCategories(response.data);
    });
  }, []);

  const user=useSelector(s=>s.user);
  useEffect(()=>{console.log("RECIPE page---",user)},[])

  useEffect(() => {
    const filtered = recipes.filter((recipe) => {
      return (
        (!filterCategory ||
          recipe.CategoryId === parseInt(filterCategory)) &&
        (!filterPrepTime ||
          recipe.Duration <= parseInt(filterPrepTime)) &&
        (!filterDifficulty ||
          recipe.Difficulty === parseInt(filterDifficulty))
      );
    });

    setFilteredRecipes(filtered);
  }, [filterCategory, filterPrepTime, filterDifficulty, recipes]);


  const handleDisplay = () => {
    navigate("/addRecipe");
  };

  return (
    
    <>
 {<AllLinks />}
       
      

 <div className="add-recipe-button">
        <Button
          variant="outlined"
          color="primary"
          onClick={handleDisplay}
        >
          Add Recipe
        </Button>
      </div>
    <div className="container">
        <div className="row">
        <div className="col-md-4">
      <FormControl fullWidth variant="outlined" margin="normal" >
        <InputLabel style={{color:"white"}} id="category-label">סינון על פי קטגוריה</InputLabel>
        <Select
          labelId="category-label"
          id="category-select"
          value={filterCategory}
          label="Category"
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <MenuItem value="" >All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.Id} value={category.Id}>
              {category.Name} 
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel style={{color:"white"}} id="prep-time-label">סינון על פי זמן הכנה</InputLabel>
        <Select
          labelId="prep-time-label"
          id="prep-time-select"
          value={filterPrepTime}
          label="Prep Time"
          onChange={(e) => setFilterPrepTime(e.target.value)}
        >
          <MenuItem value="">All Times of duration</MenuItem>
          {recipes.map((recipe) => (
            <MenuItem key={recipe.Id} value={recipe.Duration}>
              {recipe.Duration} minutes
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel style={{color:"white"}} id="difficulty-label">סינון על פי דרגת קושי</InputLabel>
        <Select
          labelId="difficulty-label"
          id="difficulty-select"
          value={filterDifficulty}
          label="Difficulty"
          onChange={(e) => setFilterDifficulty(e.target.value)}
        >
          <MenuItem value="" >All Difficulties</MenuItem>
          {Array.from(new Set(recipes.map((recipe) => recipe.Difficulty))).map(
      (difficulty, index) => (
        <MenuItem key={index} value={difficulty}>
          {difficulty}
        </MenuItem>))}
        </Select>
      </FormControl>
      </div>
      <div className="col-md-8 div_img" style={{width:"98vw"}}>
          
      {filteredRecipes.map((recipe) => (
        <div key={recipe.Id} className="col-md-4" style={{  marginBottom:"2vw"}}>
          <form className="form" style={{height:"35vw", width:"20vw"}}>
            <Typography variant="h6">{recipe.Name}</Typography>
            <Typography variant="body2">{recipe.Type}</Typography>
            <img
              className="recipeImg"
              src={recipe.Img}
              alt={`Image of ${recipe.Name}`}
            />
            <div>
            
          
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                navigate("/details", { state: recipe })
              }
              type="button"
            >
              Show details
            </Button>
     </form>
                </div>
              ))}
            </div>
          </div>
        </div>

    </>
  );
};

export default RecipesPage;



