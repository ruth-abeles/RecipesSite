import { useForm, useFieldArray } from "react-hook-form";
import { Link } from "react-router-dom";    
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "axios";
import { useSelector ,useDispatch} from "react-redux";
import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom"
import AllLinks from "./allLinks";



const AddRecipe = () => {
    const dispatch=useDispatch();
    const schema = yup.object({
        Name: yup.string().required(),
        CategoryId: yup.number().required(),
        //להוסיף את סוג URL
        Img: yup.string().required(),
        UserId: yup.string().required(),
        Duration: yup.number().required(),
        Difficulty: yup.number().required(),
        Description: yup.string().required(),
        Instructions: yup.array().of(yup.string()).required(),
        Ingrident: yup.array().of(yup.object({
            Name: yup.string().required(),
            Count: yup.number().required(),
            Type: yup.string().required(),
        })).required(),

    }).required();



    const UserId = useSelector(state => state.user?.Id)


    const navigate=useNavigate()
    const { state } = useLocation()
    const selectRecipe = state;
    

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        values: { UserId}
    });

    const { fields: Instructions, append: appendInstructions } = useFieldArray({
        control,
        name: "Instructions"
    });
    const { fields: Ingrident, append: appendIngrident } = useFieldArray({
        control,
        name: "Ingrident"
    });

    const onSubmit = (data) => {
        if (selectRecipe) {
            axios.post(`http://localhost:8080/api/recipe/edit`, selectRecipe)
            .then(response => {
                dispatch({ type: 'EDIT_RECIPIE', data: response.data });
                console.log(response)
                navigate('/home')
            })
                .catch(error => {
                    console.error(error);
                });
        }
        else {
            axios.post(`http://localhost:8080/api/recipe`, data)
            .then(response => {
                console.log(response.data)
            })
                .catch(error => {
                    console.error(error);
                });
        }


    }
    return (
<>
<AllLinks/>
        <form  className="addrecipe" onSubmit={handleSubmit(onSubmit)}>
            {Object.entries(errors).map(([fieldName, error]) => (
                <p key={fieldName}>{error.message}</p>
            ))}
            <input {...register("Name")} placeholder="הכנס שם מתכון" /*value ={selectRecipe?.Name}*//>
            <p>{errors.title?.message}</p>
            <input {...register("CategoryId")} placeholder="הכנס קטגוריה" />
            <p>{errors.body?.message}</p>
            <input {...register("Img")} placeholder="הכנס תמונה" /*value={selectRecipe?.Img}*//>
            <p>{errors.body?.message}</p>
            <input {...register("Duration")} placeholder="הכנס זמן הכנה"  value={selectRecipe?.Duration} />
            <p>{errors.body?.message}</p>
            <input {...register("Difficulty")} placeholder="הכנס רמת קושי"value={selectRecipe?.Difficulty} />
            <p>{errors.body?.message}</p>
            <input {...register("Description")} placeholder="הכנס תאור"value={selectRecipe?.Description} />
            <p>{errors.body?.message}</p>
            <input {...register("UserId")} value={selectRecipe?.UserId} />
            <p>{errors.body?.message}</p>
            {/* </form><input type="submit" value={"הוספה"} /> */}

            <div className="addrecipe">
                <label >products</label>
                {Ingrident?.map((item, index) => (
                    <div key={index}>
                        <input {...register(`Ingrident.${index}.Name`)} placeholder="הכנס שם מוצר" /*value={selectRecipe?.`Ingrident${index}.Name`} *//>
                        <input {...register(`Ingrident.${index}.Count`)} placeholder="הכנס כמות מוצר" />
                        <input {...register(`Ingrident.${index}.Type`)} placeholder="הכנס סוג מוצר" />
                    </div>
                ))}
            </div>
            <button type="button" onClick={() => appendIngrident({ Name: "", Count: 0, Type: "" })}>add product</button>

            <div className="addrecipe">
                <label>Instructions</label>
                {Instructions?.map((item, index) => (
                    <div key={index}>
                        <input {...register(`Instructions.${index}`)} placeholder="הכנס  תוכן" />
                    </div>

                ))}
            </div>
            <button type="button" onClick={() => appendInstructions({ value: "" })}>add Instructions</button>

            <input className="sendit" type="submit" value={"send"} />
            <Link  className="rey" to="/recipes">Back to Recipes</Link>

        </form >
        </>
    );
}

export default AddRecipe;