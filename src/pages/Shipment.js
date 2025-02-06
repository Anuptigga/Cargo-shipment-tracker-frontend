import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { createShipment } from "../api";
const Container=styled.div`
position:relative;
`;
const FormContainer=styled.form`
width:50%;
background:rgba(200, 200, 250, 0.4);
display:flex;
flex-direction:column;
align-items:center;
padding:10px;
position:absolute;
left:0;
right:0;
margin:auto;
top:120px;

`;
const FormTitle=styled.h3``;
const Input=styled.input`
width:400px;
height:40px;
`;
const Select = styled.select`
margin-bottom: 10px;
padding: 5px;
font-size: 14px;
`;
const SubmitButton=styled.button`
width:150px;
height:50px;
margin-top:10px;
Color:rgba(90, 0, 255, 0.6);
cursor:pointer;
font-size:15px;
`;

function Shipment(){
    const [formData, setFormData] = useState({
        containerId: "",
        origin: "",
        destination: "",
        status: "In Transit",
      });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log("Submitting form data:", formData);
    try {
        await createShipment(formData);
        alert("Shipment created successfully!");
        // setFormData({ containerId: "", origin: "", destination: "", status: "In Transit" });
    } catch (error) {
        console.log(error);
    }
}


    return(
        <Container>
            <Navbar/>
            <FormContainer onSubmit={handleSubmit}>
            <FormTitle>Create Shipment</FormTitle>
            Container ID:<Input type="text" name="containerId" placeholder="CARGO12345" required onChange={handleChange}></Input>
            Origin<Input type="text" name="origin" required onChange={handleChange}></Input>
            Destination<Input type="text" name="destination" required onChange={handleChange}></Input>
            Status<Select name="status" onChange={handleChange}>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            </Select>
        <SubmitButton type="submit">Create</SubmitButton>
      </FormContainer>
        </Container>
    )
    
}
export default Shipment;