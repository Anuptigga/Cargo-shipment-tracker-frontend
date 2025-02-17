import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { createShipment } from "../api";
import Footer from "../components/Footer";

const Container = styled.div`
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.form`
  max-width: 500px;
  width: 100%;
  margin:20px;
  background: rgba(200, 200, 250, 0.4);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
  @media(max-width:768px){
  max-width:300px;
  }
`;

const FormTitle = styled.h3`
  text-align: center;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  @media(max-width:768px){
  width:90%;
  }
`;

const Select = styled.select`
  width: 100%;
  height: 40px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  background: rgba(90, 0, 255, 0.8);
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: rgba(70, 0, 230, 1);
  }
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
    } catch (error) {
        console.log(error);
    }
}


    return(
        <Container>
            <Navbar/>
            <FormContainer onSubmit={handleSubmit}>
            <FormTitle>Create Shipment</FormTitle>
            <Label>Container ID:</Label><Input type="text" name="containerId" placeholder="CARGO12345" required onChange={handleChange}></Input>
            <Label>Origin</Label><Input type="text" name="origin" required onChange={handleChange}></Input>
            <Label>Destination</Label><Input type="text" name="destination" required onChange={handleChange}></Input>
            <Label>Status</Label><Select name="status" onChange={handleChange}>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            </Select>
        <SubmitButton type="submit">Create</SubmitButton>
      </FormContainer>
      <Footer/>
        </Container>
    )
    
}
export default Shipment;