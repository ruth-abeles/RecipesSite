import React, { useEffect } from "react";
import AllLinks from "./allLinks";
import { useSelector } from "react-redux";

const HomePage = () => {

  const user=useSelector(s=>s.user);
  useEffect(()=>{console.log("home page---",user)},[])

  return (<>
   
<AllLinks/>
   
    <div className="home">
      <div className="titlestart" >  
      <h1>Welcome to Our Website</h1>
        <p>Discover Amazing Recipes and Cooking Tips</p></div>
    </div></>
  );
};

export default HomePage;
