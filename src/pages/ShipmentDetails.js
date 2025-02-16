import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { fetchShipment, updateStatus } from "../api/index";
import { format } from "date-fns";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

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

const InfoWrapper=styled.div`
z-index:1;`;

const DetailItem = styled.p`
  font-size: 16px;
  margin: 5px 0;
`;

const Button=styled.button`
  height: 40px;
  width: 150px;
  background: rgba(172, 177, 255, 0.73);
  margin:5px 5px;
  border-style: 2px solid rgba(98, 35, 236);
  border-radius: 4px;
  cursor: pointer;
  color:rgb(122, 83, 231)
`;
const StatusWrapper=styled.div`
  position:absolute;
  height:400px;
  width:400px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  z-index:3;
  background:rgba(0, 0, 0, 0.67);
`;

const MapWrapper = styled.div`
  width: 600px;
  height: 400px;
  margin-top: 20px;
  z-index:1;
`;

const RoutingMachine = ({ route }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || route.length < 2) return;
    const routingControl = L.Routing.control({
      waypoints: route.map((point) => L.latLng(point.lat, point.lng)),
      lineOptions: {
        styles: [{ color: "blue", weight: 4 }],
      },
      createMarker: () => null,
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),
      routeWhileDragging: true,
      collapsed: true,
    }).addTo(map);

    const controlContainer = routingControl.getContainer();
    if (controlContainer) {
      controlContainer.style.display = "none";
    }
    return () => {
      try {
        routingControl.getPlan().setWaypoints([]);
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
  const [route, setRoute] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [view,setView]=useState (false);

  useEffect(() => {
    const getShipmentDetails = async () => {
      try {
        const data = await fetchShipment(id);
        setShipment(data);
        setRoute(data.route.map((points)=>points.coordinates));
        console.log(data.route.map((points)=>points.coordinates));
      } catch {
        setError("Failed to fetch shipment details");
      } finally {
        setLoading(false);
      }
    };

    getShipmentDetails();
  }, [id]);


  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateStatus(id, newStatus);
      setShipment((prev) => ({ ...prev, status: newStatus }));
      setView(false);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

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
            <DetailItem><b>Shipment ID:</b> {shipment._id}</DetailItem>
            <DetailItem><b>Container ID:</b> {shipment.containerId}</DetailItem>
            <DetailItem><b>Current Location:</b> {shipment.currentLocation.name}</DetailItem>
            <DetailItem><b>Destination:</b> {shipment.destination.name}</DetailItem>
            <DetailItem><b>Status:</b> {shipment.status}</DetailItem>
            <DetailItem><b>ETA:</b> {format(new Date(shipment.ETA), "yyyy-MM-dd")}</DetailItem>
            <Button onClick={() => navigate(`/shipment/${id}/update-location`)}>Update Location</Button>
            <Button onClick={()=>setView(!view)}>Update Status</Button>
          </InfoWrapper>
          { view &&
          <StatusWrapper>
            <Button onClick={()=>handleStatusUpdate("In Transit")}>In Transit</Button>
            <Button onClick={()=>handleStatusUpdate("Delivered")}>Delivered</Button>
          </StatusWrapper> 
          }
            <MapWrapper>
              <MapContainer
                center={shipment.currentLocation.coordinates}
                zoom={8}
                style={{ width: "100%", height: "100%" }}
                >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />

                <Marker position={shipment.currentLocation.coordinates} icon={customIcon}>
                  <Popup>Current Location</Popup>
                </Marker>

                <Marker position={shipment.destination.coordinates} icon={customIcon}>
                  <Popup>Current Location</Popup>
                </Marker>

                {route.map((point, index) => (
                  <Marker key={index} position={point} icon={customIcon}>
                    <Popup>Route Point {index + 1}</Popup>
                  </Marker>
                ))}

                <RoutingMachine route={route} />
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
