import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { updateLocation } from "../api";

const Container = styled.div`
  position: relative;
`;

const FormContainer = styled.form`
  width: 50%;
  background: rgba(200, 200, 250, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 120px;
`;

const Input = styled.input`
  width: 400px;
  height: 40px;
  margin: 10px 0;
`;

const SubmitButton = styled.button`
  width: 150px;
  height: 50px;
  margin-top: 10px;
  color: rgba(90, 0, 255, 0.6);
  cursor: pointer;
  font-size: 15px;
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
    </Container>
  );
}

export default UpdateLocation;
