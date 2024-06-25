

import React from "react";
import RecipesPage from "./components/RecipesPage";
import HomePage from "./components/HomePage";
import { Routes, Route } from 'react-router-dom';
import Login from "./components/login";
import   AllLinks from "./components/allLinks"
import RecipeDetails from "./components/RecipeDetails";
import SignIn from "./components/signUp"
import AddRecipe from "./components/add";
import DeleteRecipe from "./components/deleteRecipe";
import GetAllCategory from "./components/GetAllCategory";
import ShoppingList from "./components/shoppingList"
import AboutUs from "./components/aboutus";
import EditRecipe from './components/editandadd'
import RecipeSharing from "./components/share";
import RecipeGallery from "./components/galleryOfRecipes";






function App() {
  return (
    <>
 
    <Routes>

       <Route path="/" element={<Login />} />
        <Route path="/about" element={<AboutUs/>} /> 
         <Route path="/addRecipe" element={<AddRecipe/>} /> 
        <Route path="/signin" element={<  SignIn/>} /> 
       <Route path="/details" element={<RecipeDetails/>} />
       <Route path="/login" element={<Login />} />
       <Route path="/homepage" element={<HomePage />} />
      <Route path="/links" element={<   AllLinks/>} />
      <Route path="/recipes" element={<RecipesPage />} />
      <Route path="/deleteRecipe" element={<DeleteRecipe/>}/>
      <Route path="/allCategory" element={<GetAllCategory/>}/>
      <Route path="/edit" element={<EditRecipe/>}/>
      <Route path="/listOfShopping" element={<ShoppingList/>}/>   
      <Route path="/sharing" element={<RecipeSharing/>}/>     
      <Route path="/gallery" element={<RecipeGallery/>}/>   




    </Routes>
</>
    
  );
}

export default App;
