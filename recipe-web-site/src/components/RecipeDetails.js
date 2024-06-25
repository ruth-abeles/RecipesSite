
import { Link, Button, Typography, Container, Box, Divider } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AllLinks from './allLinks';
import { useEffect, useState } from 'react';
import '../styles/details.css';


const RecipeDetails = () => {

  const { state } = useLocation();
  // const userId = state.UserId;
  const Id = state.Id;
  const user=useSelector(s=>s.user);

  const [isYourUserId,setIsYourUserId]=useState(false);
  useEffect(()=>{
    console.log("user - delete ",isYourUserId)
    if(state.UserId===user.Id || user.Id===1)
    setIsYourUserId(true)
  },[])
  const navigate = useNavigate();

  const hundleupdate = () => {
    navigate(`/edit`, { state });
    
  };

  const print = () => {
    window.print();
  };

  const hundledelete = () => {
    
    navigate(`/deleteRecipe`, { state: Id });
    const Swal = require('sweetalert2')
  };

  return (
<>
<AllLinks/>
    <Container  className='details' maxWidth="md" >
        
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Details of Recipe:
        </Typography>

        <Typography variant="h5" gutterBottom>
          {state.Name}
        </Typography>

        <img src={state.Img} alt="Image of the recipe" />
<div className='underdisplay'>
        <Typography variant="h4" gutterBottom>
          הוראות
        </Typography>
        <Typography variant="body1" paragraph>
          {state.Instructions}
        </Typography>

        <Typography variant="h4" gutterBottom>
          משך זמן הכנת המתכון
        </Typography>
        <Typography variant="body1">{state.Duration}</Typography>

        <Typography variant="h4" gutterBottom>
          תיאור
        </Typography>
        <Typography variant="body1" paragraph>
          {state.Description}
        </Typography>

        <Typography variant="h6" gutterBottom>
          מגיש/ה: {state.UserId}
        </Typography>

        <Divider />

        <Typography variant="h6" gutterBottom>
          מתכון:
        </Typography>
        <Box>
          {state.Ingrident.map((ingredient) => (
            <Typography key={ingredient.Id} variant="body1">
              {ingredient.Name} - {ingredient.Count} - {ingredient.Type}
            </Typography>
          ))}
        </Box>
</div>
        <Link to="/recipes" style={{ marginRight: '8px' }}>
          <Button variant="outlined" color="primary" style={{color:"white",border:"red"}}>
            Back to Recipes
          </Button>
        </Link>

        <Button onClick={() => hundleupdate() } disabled={!isYourUserId} variant="outlined" color="info" style={{color:"white",border:"red"}}>
          Update Recipe
        </Button>

        <Button onClick={() => hundledelete()} disabled={!isYourUserId} variant="outlined" color="error" style={{color:"white",border:"red"}}>
          Delete Recipe
        </Button>
        

        <Button type="button" style={{color:"white",border:"red"}} onClick={print}>להדפסה</Button>
      </Box>
    </Container></>
  );
};

export default RecipeDetails;
