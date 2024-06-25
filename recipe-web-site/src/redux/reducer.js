

import axios from "axios"
import * as actionNames from "./action"

const initialState = {
    recipes: [],
    categories: [],
    user: null,
    buys: [],
    UserId: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionNames.GET_RECIPIES: {
            return { ...state, recipes: action.data }
        }

        case actionNames.ADD_RECIPIE: {
            return { ...state, recipes: [...state.recipes, action.data] }
        }

        case actionNames.EDIT_RECIPIE: {
            const updatedRecipe = action.data;
            const recipeIndex = state.recipes.findIndex(recipe => recipe.Id === updatedRecipe.Id);

            if (recipeIndex !== -1) {
                const updatedRecipes = [...state.recipes];
                updatedRecipes[recipeIndex] = {
                    ...updatedRecipes[recipeIndex],
                    Name: updatedRecipe.Name,
                    Description: updatedRecipe.Description,
                    Img: updatedRecipe.Img,
                    Ingrident: updatedRecipe.Ingrident,
                    Instructions: updatedRecipe.Instructions,
                };

                return {
                    ...state,
                    recipes: updatedRecipes,
                };
            }
            return state;

        }

        // case actionNames.DELETE_RECIPIES: {
        //     const recipeIdToDelete = action.recipeId;
        //     const updatedRecipes = state.recipes.filter(
        //         recipe => recipe.Id !== recipeIdToDelete
        //     );
        //     return {
        //         ...state,
        //         recipes: updatedRecipes,
        //     };
        // }

        case actionNames.GET_CATEGORY: {

            const categories = action.data;
            state.categories =categories;
            return {
                ...state,
                categories: categories
            }
        }
        // case actionNames.ADD_CATEGORY: {
        //     const category = [...state.categories]
        //     category.push(action.data)
        //     return {
        //         ...state,
        //         category
        //     }
        // }
        case actionNames.ADD_CATEGORY: {
            const updatedCategory = action.data;
            return { ...state, category: [...state.category, updatedCategory] }
        }
        //         case actionNames.ADD_CATEGORY:
        //         return {
        //                     ...state,
        //         categories: [...state.categories, action.data],
        //   };


        case actionNames.SET_USER: {
            const user=action.data;
            state.user=user;
            return { ...state, user}
             
        }

        case actionNames.ADD_TO_LIST: {
            const buy = action.data;
            return { ...state, buys: [...state.buys, buy] }
        }

        case actionNames.GET_LIST: {
            return { ...state, buys: action.data }
        }

        case actionNames.GET_BUYIES: {
            return { ...state, recipes: action.data }
        }

        case actionNames.DELETE_LIST: {
            const buyId = action.data;
            const filteredBuys = state.buys.filter((buy) => buy.Id !== buyId);
            return { ...state, buys: filteredBuys }
        }


        case actionNames.GET_BUYIES:
            {
                return { ...state, buys: action.data }
            }

        default:
            return state;
    }
}

export default reducer;