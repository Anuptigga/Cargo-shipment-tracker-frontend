import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { updateLocation } from "../api";
import Footer from "../components/Footer";

const Container = styled.div`
  font-family: Arial, sans-serif;
  height:100vh;
  display:flex;
  flex-direction:column;
`;

const FormContainer = styled.form`
  width:100%;
  background: rgba(200, 200, 250, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin:20px 0;
  box-sizing:border-box;
`;

const Input = styled.input`
  width: 400px;
  height: 40px;
  margin: 10px 0;
`;

const SubmitButton = styled.button`
   height: 40px;
  width: 160px;
  background: rgba(172, 177, 255, 0.9);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: #5a00ff;
  font-weight: 600;
  margin: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(140, 150, 255, 1);
    color: white;
  }
`;

function UpdateLocation() {
  const { id: shipmentId } = useParams();
  const [currentLocation, setCurrentLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentLocation) {
      alert("Please enter the new location.");
      return;
    }
    try {
      const response = await updateLocation(shipmentId, currentLocation);
      alert(response.message);
    } catch (error) {
      alert("Failed to update location");
    }
  };

  return (
    <Container>
      <Navbar />
      <FormContainer onSubmit={handleSubmit}>
        <h3>Update Shipment Location</h3>
        <p>Updating location for Shipment ID: <strong>{shipmentId}</strong></p>
        <Input
          type="text"
          placeholder="Enter New Location"
          value={currentLocation}
          onChange={(e) => setCurrentLocation(e.target.value)}
          required
        />
        <SubmitButton type="submit">Update</SubmitButton>
      </FormContainer>
      < Footer/>
    </Container>
  );
}

export default UpdateLocation;
