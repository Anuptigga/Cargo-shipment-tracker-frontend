import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { fetchShipment } from "../api/index";
import { format } from "date-fns";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";

// Custom map marker icon
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Styled components
const Container = styled.div`
  position: relative;
`;

const DetailsContainer = styled.div`
  background: rgba(200, 200, 250, 0.4);
  display: flex;
  align-items: center;
  justify-content:space-around;
  padding: 20px;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 120px;
`;

const InfoWrapper=styled.div``;

const DetailItem = styled.p`
  font-size: 16px;
  margin: 5px 0;
`;

const Button=styled.button`
  height: 40px;
  width: 150px;
  background: rgba(172, 177, 255, 0.73);
  margin:5px 0;
  border-style: 2px solid rgba(98, 35, 236);
  border-radius: 4px;
  cursor: pointer;
  color:rgb(122, 83, 231)
`;

const MapWrapper = styled.div`
  width: 600px;
  height: 400px;
  margin-top: 20px;
`;

// RoutingMachine component adds the route to the map
const RoutingMachine = ({ route }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || route.length < 2) return;

    // Create the routing control with desired options
    const routingControl = L.Routing.control({
      waypoints: route.map((point) => L.latLng(point.lat, point.lng)),
      lineOptions: {
        styles: [{ color: "blue", weight: 4 }],
      },
      createMarker: () => null, // Disable default markers
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),
      routeWhileDragging: true,
      collapsed: true, // Start collapsed so the panel is hidden
    }).addTo(map);

    // Hide the control's container via CSS (optional)
    const controlContainer = routingControl.getContainer();
    if (controlContainer) {
      controlContainer.style.display = "none";
    }

    // Cleanup: clear waypoints before removing the control to avoid errors
    return () => {
      try {
        // Clear the waypoints which removes the drawn route lines
        routingControl.getPlan().setWaypoints([]);
        // Now remove the control
        map.removeControl(routingControl);
      } catch (e) {
        console.error("Error removing routing control", e);
      }
    };
  }, [map, route]);

  return null;
};

function ShipmentDetails() {
  const { id } = useParams();
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Hardcoded route for now (replace with API data later)
  const hardcodedRoute = [
    { lat: 23.4415853, lng: 84.6869862 }, // Example: Lohardaga
    { lat: 23.3441127, lng: 85.3094015 }, // Example: Ranchi
  ];

  // Hardcoded current location (assumed as the first point)
  const hardcodedCurrentLocation = hardcodedRoute[0];

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
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : shipment ? (
          <>
          <DetailsContainer>
            <InfoWrapper>
          <h2>Shipment Details</h2>
            <DetailItem>
              <b>Shipment ID:</b> {shipment._id}
            </DetailItem>
            <DetailItem>
              <b>Container ID:</b> {shipment.containerId}
            </DetailItem>
            <DetailItem>
              <b>Current Location:</b> {shipment.currentLocation}
            </DetailItem>
            <DetailItem>
              <b>Destination:</b> {shipment.destination}
            </DetailItem>
            <DetailItem>
              <b>Status:</b> {shipment.status}
            </DetailItem>
            <DetailItem style={{color:"blue", cursor:"pointer"}} onClick={() => navigate(`/shipment/${id}/eta`)}>
              <b>ETA:</b> {format(new Date(shipment.ETA), "yyyy-MM-dd")}
            </DetailItem>
            <Button onClick={() => navigate(`/shipment/${id}/update-location`)}>Update Location</Button>
          </InfoWrapper>

            {/* Interactive Map */}
            <MapWrapper>
              <MapContainer
                center={hardcodedCurrentLocation}
                zoom={8}
                style={{ width: "100%", height: "100%" }}
                >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />

                {/* Marker for Current Location */}
                <Marker position={hardcodedCurrentLocation} icon={customIcon}>
                  <Popup>Current Location</Popup>
                </Marker>

                {/* Markers for each point in the route */}
                {hardcodedRoute.map((point, index) => (
                  <Marker key={index} position={point} icon={customIcon}>
                    <Popup>Route Point {index + 1}</Popup>
                  </Marker>
                ))}

                {/* Display the actual route using the RoutingMachine */}
                <RoutingMachine route={hardcodedRoute} />
              </MapContainer>
            </MapWrapper>
          </DetailsContainer>
          </>
        ) : (
          <p>Shipment not found.</p>
        )}
    </Container>
  );
}

export default ShipmentDetails;
