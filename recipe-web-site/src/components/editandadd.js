import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Button, Input } from "@mui/material";
import { useEffect } from "react";
import '../styles/style.css'
import AllLinks from "./allLinks";


export default function EditRecipe() {
    const { state } = useLocation();
    const selectRecipe = useSelector((x) => x.recipes?.find((x) => x?.Id == state?.Id));
    const user = useSelector(s=>s.user);
    useEffect(()=>{console.log("user in edit",user)},[])
    const dispatch = useDispatch();
    const {
      register,
      handleSubmit,
      formState: { errors },
      control,
      setValue,
    } = useForm({
      defaultValues: selectRecipe,
    });
  
    const { fields: InstructionsFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({
      control,
      Name: "Instructions",
    });
  
    const { fields: IngredientsFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
      control,
      Name: "Ingrident",
    });
  
    const onSubmit = (data) => {
      console.log(data);
      if (selectRecipe) {
        axios
          .post("http://localhost:8080/api/recipe/edit", data)
          .then((x) => {
            dispatch({ type: "EDIT_RECIPIE", recipeObj: x.data });
            alert("Recipe edited successfully!");
          })
          .catch((err) => {
            console.log(err);
            alert("Failed to edit recipe. Check the console for details.");
          });
      } else {
        axios
          .post("http://localhost:8080/api/recipe", data)
          .then((x) => {
            dispatch({ type: "ADD_RECIPIE", recipe: x.data });
            alert("Recipe added successfully!");
          })
          .catch((err) => console.log(err));
          
      }
    };
  
    useEffect(() => {
      if (selectRecipe) {
        const {
          Name,
          Difficulty,
          Duration,
          Description,
          UserId,
          CategoryId,
          Img,
          Instructions,
          Ingrident,
        } = selectRecipe;
  
        setValue("FirstName", FirstName);
        setValue("LastName", LastName);
        setValue("Password", Password);
        setValue("Description", Description);
        setValue("UserId", UserId);
        setValue("CategoryId", CategoryId);
        setValue("Img", Img);
  
        Instructions.forEach((instruction, index) => {
          setValue(`Instructions.${index}`, instruction);
          if (index === Instructions.length - 1) appendInstruction();
        });
  
        Ingrident.forEach((ingredient, index) => {
          setValue(`Ingrident.${index}.Name`, ingredient.Name);
          setValue(`Ingrident.${index}.Count`, ingredient.Count);
          setValue(`Ingrident.${index}.Type`, ingredient.Type);
          if (index === Ingrident.length - 1) appendIngredient();
        });
      }
    }, [selectRecipe, appendInstruction, appendIngredient, setValue]);
  
    return (
        <>
        <AllLinks/>
        <div className="recipe">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input {...register("Name")} placeholder="Name" />
                <p>{errors.Name?.message}</p>

                <Input {...register("Difficulty")} placeholder="Difficulty" />
                <p>{errors.Difficulty?.message}</p>

                <Input {...register("Duration")} placeholder="Duration" />
                <p>{errors.Duration?.message}</p>

                <Input {...register("Description")} placeholder="Description" />
                <p>{errors.Description?.message}</p>

                <Input {...register("UserId")} placeholder="UserId" />
                <p>{errors.UerId?.message}</p>

                <Input {...register("CategoryId")} placeholder="CategoryId" />
                <p>{errors.CategoryId?.message}</p>

                <Input {...register("Img")} placeholder="Img" />
                <p>{errors.Img?.message}</p>

                <label>תוכן עניין</label>
                {InstructionsFields?.map((field, index) => (
                    <div key={index}>
                        <Input {...register(`Instructions.${index}`)} placeholder="Instruction" /><br/>
                        <Button type="button" onClick={() => removeInstruction(index)}>Remove</Button>
                    </div>
                ))}
                <Button type="button" onClick={() => appendInstruction()}>הוספת תוכן עניין</Button><br/>

                <label>מרכיבים</label>
                {IngredientsFields?.map((field, index) => (
                    <div key={field.id}>
                        <Input {...register(`Ingrident.${index}.Name`)} placeholder="שם המרכיב" /><br/>
                        <Input {...register(`Ingrident.${index}.Count`)} placeholder="כמות" /><br/>
                        <Input {...register(`Ingrident.${index}.Type`)} placeholder="סוג" /><br/>
                        <Button type="button" onClick={() => removeIngredient(index)}>הסר מרכיב</Button>
                    </div>
                ))}
                <Button type="button" onClick={() => appendIngredient()}>הוסף מרכיב</Button><br/>

                <Input type="submit"value={selectRecipe ? "Edit Recipe" : "Add Recipe"} />
            </form>
            </div>
        </>
    );
}
