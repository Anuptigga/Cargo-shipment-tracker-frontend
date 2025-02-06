import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { format } from "date-fns";
import { fetchShipments } from "../api/index";

const Container = styled.div`
  position: relative;
`;

const Title = styled.h1``;

const DashContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Table = styled.table`
  width: 60%;
  border: 1px solid black;
`;

const Tr = styled.tr`
  border: 1px solid black;
`;

const Th = styled.th`
  background: rgba(172, 177, 255, 0.73);
`;

const Filter = styled.span``;

const Td = styled.td`
  background: rgba(172, 178, 255, 0.36);
  cursor: pointer; /* Make Shipment ID clickable */
  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled.button`
  height: 30px;
  width: 150px;
  background: rgba(172, 177, 255, 0.73);
  border-style: none;
  margin: 5px;
  position: absolute;
  left: 60%;
  cursor: pointer;
`;

const Select = styled.select`
  margin-bottom: 10px;
  padding: 5px;
  font-size: 14px;
`;

function Dashboard() {
  const [shipments, setShipments] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const getShipments = async () => {
      try {
        const data = await fetchShipments();
        setShipments(data);
      } catch (error) {
        console.error("Error fetching shipments:", error);
      }
    };
    getShipments();
  }, []);

  // Sorting function
  const handleSortIncreasing = (field) => {
    const sortedData = [...shipments].sort((a, b) =>
      a[field] > b[field] ? -1 : 1
    );
    setShipments(sortedData);
  };

  const handleSortDecreasing = (field) => {
    const sortedData = [...shipments].sort((a, b) =>
      a[field] > b[field] ? 1 : -1
    );
    setShipments(sortedData);
  };

  // Filtering function
  const filteredShipments = filterStatus
    ? shipments.filter((s) => s.status === filterStatus)
    : shipments;

  return (
    <Container>
      <Navbar />
      <DashContainer>
        <Title>Dashboard</Title>
        <Select onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
        </Select>
        <Table>
          <thead>
            <Tr>
              <Th>
                Shipment ID
                <Filter>
                  <ArrowDropDown
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSortDecreasing("_id")}
                  />
                  <ArrowDropUp
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSortIncreasing("_id")}
                  />
                </Filter>
              </Th>
              <Th>
                Container ID
                <Filter>
                  <ArrowDropDown
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSortDecreasing("containerId")}
                  />
                  <ArrowDropUp
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSortIncreasing("containerId")}
                  />
                </Filter>
              </Th>
              <Th>Current Location</Th>
              <Th>ETA</Th>
              <Th>Status</Th>
            </Tr>
          </thead>
          <tbody>
            {filteredShipments.map((s) => (
              <Tr key={s._id}>
                <Td onClick={() => navigate(`/shipment/${s._id}`)}>{s._id}</Td>
                <Td>{s.containerId}</Td>
                <Td>{s.currentLocation}</Td>
                <Td>{format(new Date(s.ETA), "yyyy-MM-dd")}</Td>
                <Td>{s.status}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </DashContainer>
      <Button onClick={() => navigate("/shipment")}>+ New Shipment</Button>
    </Container>
  );
}

export default Dashboard;
