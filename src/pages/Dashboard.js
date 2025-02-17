import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import {differenceInDays, parseISO, isFuture } from "date-fns";
import { fetchShipments } from "../api/index";
import Footer from "../components/Footer";

const Container = styled.div`
  font-family: Arial, sans-serif;
  min-height: 100vh;
  background-color: #f4f4f4;
`;

const DashContainer = styled.div`
  max-width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #333;
  margin-bottom: 15px;
  @media(max-width:768px){
  font-size:24px;
  }
`;
const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  @media(max-width:768px){
  font-size:12px;
  }
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background:rgb(244, 244, 244);
  }
  &:hover {
    background: rgba(172, 178, 255, 0.36);
  }
`;

const Th = styled.th`
  background:rgba(90, 0, 225);
  color: white;
  padding: 12px;
  font-size: 16px;
  text-align: left;
  position: relative;
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const Td = styled.td`
  padding: 12px;
  font-size: 14px;
  color: #333;
  text-align: left;
  @media (max-width: 768px) {
    padding: 8px;
    font-size: 12px;
  }
`;

const Filter = styled.span`
  display: inline-flex;
  margin-left: 10px;
  align-items: center;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 15px;
  @media (max-width: 768px) {
  font-size: 12px;
  padding: 6px;
  }
`;

const Button = styled.button`
  background:rgba(90, 0, 225);
  color: white;
  font-size: 16px;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
  transition: 0.3s;

  &:hover {
    background: #4a00cc;
  }
`;

function Dashboard() {
  const [shipments, setShipments] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const navigate = useNavigate();

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

  // Format ETA
  const formatDate = (eta) => {
    if (!eta) return "N/A";
  
    const etaDate = parseISO(eta);
    const today = new Date();
  
    if (isFuture(etaDate)) {
      return `${differenceInDays(etaDate, today)+2}`;
    } else {
      return `${differenceInDays(today, etaDate)}`;
    }
  };

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
        <TableWrapper>
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
                <Td style={{cursor:"pointer", textDecoration:"underline"}} onClick={() => navigate(`/shipment/${s._id}`)}>{s._id}</Td>
                <Td>{s.containerId}</Td>
                <Td>{s.currentLocation.name}</Td>
                <Td>In {formatDate(s.ETA)} days</Td>
                <Td>{s.status}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
      <Button onClick={() => navigate("/shipment")}>+ New Shipment</Button>
      </DashContainer>
      <Footer/>
    </Container>
  );
}

export default Dashboard;
