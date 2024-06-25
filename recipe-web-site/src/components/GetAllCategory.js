import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Container, Form, FormControl, ListGroup } from "react-bootstrap";
import AllLinks from "./allLinks";

const GetAllCategory = () => {
  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = useState([]); 
  const [categoryName, setCategoryName] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/category")
      .then(response => {
        setCategoryData(response.data);
        dispatch({ type: "GET_CATEGORY", data: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleAddCategory = () => {
    axios.post("http://localhost:8080/api/category", { Name: categoryName })
      .then(response => {
        setCategoryData([...categoryData, response.data]);
        dispatch({ type: "ADD_CATEGORY", data: response.data });
        setCategoryData(categoryData.map(category => {
          if (category.Id === response.data.Id) {
            category.Recipes = response.data.Recipes;
          }
          return category;
        }));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <>
      <AllLinks />
      <Container>
        <h1 style={{color:"white", fontSize:"4vh"}}>הוסף קטגוריה</h1>
        <Form>
          <FormControl
            type="text"
            placeholder="שם הקטגוריה"
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <Button onClick={handleAddCategory}>הוסף</Button>
        </Form>
        <ListGroup>
          {categoryData?.map((category) => (
            <ListGroup.Item
              key={category.Id}
              action
              onClick={() => handleCategoryClick(category.Id)}
            >
              {category.Name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </>
  );
};

export default GetAllCategory;
