import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { fetchShipment } from "../api/index";
import { format } from "date-fns";

const Container = styled.div`
  position: relative;
`;

const DetailsContainer = styled.div`
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

const DetailItem = styled.p`
  font-size: 16px;
  margin: 5px 0;
`;

function ShipmentDetails() {
  const { id } = useParams();
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getShipmentDetails = async () => {
      try {
        const data = await fetchShipment(id);
        setShipment(data);
      } catch {
        setError("Failed to fetch shipment details");
      } finally {
        setLoading(false);
      }
    };

    getShipmentDetails();
  }, [id]);

  return (
    <Container>
      <Navbar />
      <DetailsContainer>
        <h3>Shipment Details</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : shipment ? (
          <>
            <DetailItem><b>Shipment ID:</b>{shipment._id}</DetailItem>
            <DetailItem><b>Container ID:</b> {shipment.containerId}</DetailItem>
            <DetailItem><b>ETA:</b> {format(new Date(shipment.ETA), "yyyy-MM-dd")}</DetailItem>
          </>
        ) : (
          <p>Shipment not found.</p>
        )}
      </DetailsContainer>
    </Container>
  );
}

export default ShipmentDetails;
