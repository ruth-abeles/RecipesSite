
import React from "react";
import { useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import { Link} from "react-router-dom";
import backgroundImage from '../images/1.jpeg'
import { Navigate } from "react-router-dom";
import '../styles/style.css';

const AllLinks=()=>{

    const user = useSelector((state) => state.user);

    return(<>
        <div className="links">
            {user &&
                <>
                    
                        
                      <Button variant="outline-dark"><Link to="/recipes" style={{color:"wheat", textDecoration:"none"}}> מתכונים</Link></Button>
                      <Button variant="outline-dark"><Link to="/about" style={{color:"wheat", textDecoration:"none"}}>קצת עלינו</Link></Button>

                      <Button variant="outline-dark"><Link to="/allCategory" style={{color:"wheat", textDecoration:"none"}}>קטגוריות</Link></Button>
                      <Button variant="outline-dark"><Link to="/gallery" style={{color:"wheat", textDecoration:"none"}}>בלוג</Link></Button>
                      <Button variant="outline-dark"><Link to="/listOfShopping" style={{color:"wheat", textDecoration:"none"}}>רשימת קניות</Link></Button>
                    
                </>
            }
         
         
         {
            !user && (
                <>
                
                    <Button style={{ background:"black"}} ><Link to="/login" style={{color:"wheat", textDecoration:"none"}}> LOGIN</Link></Button>
                    <Button style={{ background:"black"}}><Link to="/signin" style={{color:"wheat", textDecoration:"none"}}>SIGN IN</Link></Button>
                    
                </>
                    )
        }
        </div>
    
    </>)
}
 export default AllLinks;
