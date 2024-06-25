import Accordion from 'react-bootstrap/Accordion';
import '../styles/style.css';
import AllLinks from "./allLinks";


function AboutUs() {
  return (
    <>
     <AllLinks/>
    <style>
        {`
          .about {
            background-color: white;
          }
          .header{
            background-color:black
          }
          .header :hover{
            background-color:black
            color:wheat

          }
          .header:active{
            background-color:red
            color:red
          }
        `}
      </style>
   
    <div className='about' style={{width:"80vw", textAlign:"center"} }>
    <Accordion defaultActiveKey="0" style={{paddingTop:"10vh"}}>
      <Accordion.Item eventKey="0" style={{color:"white"}}>
        <Accordion.Header className='header'>ABOUT US</Accordion.Header >
        <Accordion.Body style={{color:"black"}}>
        Welcome! Glad you are here...
Our website was created on 01/01/2024 and our main goal is to make it tasty and easy for you!
Have you ever tried a recipe and been disappointed? Did you get your hopes up and - - - nothing?
We decided to put an end to it!
From today life is easy! Any recipe! From meats to chilled chics, from gourmet dishes to light meals - all in
fun!
On our website you can find recipes for all types of food: easy to prepare, short preparation time,
And in addition - our recipes are suitable for all shades of the rainbow and customers from all over the
world!
You can add and remove a recipe as you wish and many more upgrades!

Come in and enjoy!
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header className='header'>CONTACT</Accordion.Header>
        <Accordion.Body>
        Do you spend too much time debating what to go for?

Do you want the maximum meal in an easy preparation??
Contact us by phone, email or WhatsApp
Number: 
0504106914
0527146981
0583261142
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>
    </>
  );
 
}

export default AboutUs;