import React, { useState } from "react";
import Swal from "sweetalert2";
import "../styles/share.css";

const RecipeSharing = () => {
  const [recipes, setRecipes] = useState([]);

  const handleImageUpload = async () => {
    const { value: file } = await Swal.fire({
      title: "Select image",
      input: "file",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your recipe picture",
      },
    });

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const uploadedImage = e.target.result;

        Swal.fire({
          title: "Your uploaded recipe",
          text: "How delicious was the recipe?",
          input: "textarea",
          inputAttributes: {
            placeholder: "Enter your feedback",
            "aria-label": "Feedback",
          },
          showCancelButton: true,
          confirmButtonText: "Submit",
        }).then((result) => {
          if (result.isConfirmed) {
            const recipeFeedback = result.value;
            const newRecipe = { image: uploadedImage, text: recipeFeedback };

            setRecipes([...recipes, newRecipe]);

            Swal.fire({
              title: "Recipe shared!",
              text: "Thank you for sharing your recipe!",
              icon: "success",
            });
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <button onClick={handleImageUpload}>Recipe Sharing</button>
      {recipes.map((recipe, index) => (
        <div key={index}>
          {recipe.image && <img src={recipe.image} alt={`Recipe ${index + 1}`} />}
          {recipe.text && <p>{recipe.text}</p>}
        </div>
      ))}
    </div>
  );
};

export default RecipeSharing;
