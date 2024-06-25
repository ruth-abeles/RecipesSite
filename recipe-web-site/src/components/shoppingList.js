import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import * as ActionType from '../redux/action'
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import '../styles/style.css';
import AllLinks from "./allLinks";
import Swal from 'sweetalert2'


const ShoppingList = () => {
  const [myShoppingList, setMyShoppingList] = useState([]);
  const [myUser,setMyUser]=useState(useSelector(state=>state.user))
  const user = useSelector(state => state.user);
  console.log(useSelector(state => state))
  console.log("user:",myUser)  
  const userId = user?.Id;
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(userId)
        const response = await axios.get(`http://localhost:8080/api/bay/${userId}`);
        console.log(response, userId)
        setMyShoppingList(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
   }, [userId]);

  const filteredList = myShoppingList.filter((item) => item.UserId === userId);
  const [formData, setFormData] = useState({
    Name: "",
    Count: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value,
    });
  };

  const delete_item = (item) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
  
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            console.log("id: ", item.Id);
            await axios.post(`http://localhost:8080/api/bay/delete/${item.Id}`);
            console.log("succeed");
            const updatedList = myShoppingList.filter((x) => x.Name !== item.Name);
            setMyShoppingList(updatedList);
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          } catch (error) {
            console.error("Error deleting item:", error);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };
  const onSubmit = async (e) => {
    console.log(e);
    const data = {
      Name: e.Name,
      Count: e.Count,
      UserId: user.Id,
      Id: 0,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/bay", data);
      console.log(data);
      console.log(response?.status);

      if (response?.status === 404) {
        console.log("error 404");
    
      } else {
        console.log("-------");
        const existingItem = myShoppingList.find((x) => x.Name === data.Name);

        if (existingItem) {
          const updateList = [...myShoppingList];
          const findIndex = myShoppingList.findIndex((x) => x.Name === data.Name);
          updateList[findIndex] = { ...existingItem, Count: data.Count };
          setMyShoppingList(updateList);

          try {
            await axios.post("http://localhost:8080/api/bay/", data);
             } catch (error) {
                        console.log(error);
                      }
        } else {
          await axios.post("http://localhost:8080/api/bay", data);

          if (response?.status === 404) {
            console.log("--------------");
          }

          const newList = [...myShoppingList, data];
          setMyShoppingList(newList);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
     <AllLinks />
       <div className="shoppingListPage" style={{marginTop:"5vh"}} >
     
      <div style={{ textAlign: 'center', width: '30%', height: '15%', margin: 'auto', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h5>Add  quantity in shopping cart</h5>
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} id="form" onSubmit={handleSubmit(onSubmit)}>
          <label >product</label>
          <input
            type="text"
            name="Name"
            placeholder="Name"
            onChange={handleChange}
            {...register("Name", {
              required: "This field is required",
            })}
          />
          {errors.Name && <p>{errors.Name.message}</p>}
          <label >count</label>
          <input
            type="text"
            name="Count"
            placeholder="Count"
            onChange={handleChange}
            {...register("Count", {
              required: "This field is required",
              pattern: {
                value: /^\d+$/,
                message: "Only digits must be entered",
              },
            })}

          />
          <br></br>
          {errors.Count && <p>{errors.Count.message}</p>}
          <button className="btn btn-dark" type="submit">Add Product</button>
        </form>
      </div>
      <h2>My Shopping List</h2>
      <table>
        <thead>
          <tr>
            <th><h4>Count</h4></th>
            <th><h4>Name</h4></th>
            <th><h4>Delete</h4></th>
          </tr>
        </thead>
        <tbody>
          {myShoppingList?.map((item) => (
            <tr key={item.Name}>
              <td>{item.Count}</td>
              <td>{item.Name}</td>
              <td>
                <button className="btn btn-outline-dark" onClick={() => delete_item(item)} style={{color:'wheat'}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default ShoppingList;








