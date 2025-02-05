import { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

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
width: 50%;
border: 1px solid black;
`;

const Tr = styled.tr`
border: 1px solid black;
`;

const Th = styled.th`
background: rgba(172, 177, 255, 0.73);
`;


const Filter=styled.span`
`;
const Td = styled.td`
background: rgba(172, 178, 255, 0.36);
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

const FormBackground=styled.div`
position:absolute;
left:0;
top:0;
display:flex;
align-items:center;
justify-content:center;
width:100%;
height:100vh;

background:rgba(206, 224, 255, 0.69);
`;
const FormContainer=styled.form`
width:500px;
display:flex;
flex-direction:column;
z-index:2;
`;
const FormTitle=styled.h3``;
const Input=styled.input`
height:40px;
`;
const SubmitButton=styled.button`
width:150px;
height:50px;
margin-left:35%;
`;


function Dashboard() {
  const [shipments, setShipments] = useState([
    { shipmentId: 12345, containerId: 43456, currentLocation: "Delhi", eta: "56hrs", status: "in transit" },
    { shipmentId: 23455, containerId: 83445, currentLocation: "Lucknow", eta: "40hrs", status: "in transit" },
    { shipmentId: 45675, containerId: 23456, currentLocation: "Chennai", eta: "2days", status: "in transit" },
    { shipmentId: 34567, containerId: 34567, currentLocation: "Kolkata", eta: "0days", status: "delivered" },
    { shipmentId: 84567, containerId: 14567, currentLocation: "Kolkata", eta: "4days", status: "delivered" },
  ]);
  const [filterStatus, setFilterStatus] = useState("");

  const [formInfo,setformInfo]=useState([{
    shipmentId:"",
    containerId:"",
    currentLocation:"",
    destination:"",
    ETA:40,
    status:"In transit"
  }]);
  
  const [showForm,setShowForm]=useState(false);


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

    // Creatign new Shipment
    const handleSubmit=(e)=>{
        // e.preventDefault();
        const newformInfo={

          containerId:e.target.containerId.value,
          currentLocation:e.target.currentLocation.value,
          destination:e.target.destination.value,
          status:e.target.status.value
        }
        setformInfo(newformInfo);
        console.log(formInfo);
    }

  return (
    <Container>
      <Navbar />
      <DashContainer>
        <Title>Dashboard</Title>
        <Select onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="in transit">In Transit</option>
          <option value="delivered">Delivered</option>
        </Select>
        <Table>
          <thead>
            <Tr>
              <Th>Shipment ID<Filter><ArrowDropDown style={{cursor:"pointer"}} onClick={()=>handleSortDecreasing("shipmentId")}/><ArrowDropUp style={{cursor:"pointer"}} onClick={()=>handleSortIncreasing("shipmentId")}/></Filter></Th>
              <Th>Container ID<Filter><ArrowDropDown style={{cursor:"pointer"}} onClick={()=>handleSortDecreasing("containerId")}/><ArrowDropUp style={{cursor:"pointer"}} onClick={()=>handleSortIncreasing("containerId")}/></Filter></Th>
              <Th>Current Location</Th>
              <Th>ETA</Th>
              <Th>Status</Th>
            </Tr>
          </thead>
          <tbody>
            {filteredShipments.map((s) => (
              <Tr key={s.shipmentId}>
                <Td>{s.shipmentId}</Td>
                <Td>{s.containerId}</Td>
                <Td>{s.currentLocation}</Td>
                <Td>{s.eta}</Td>
                <Td>{s.status}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </DashContainer>
      <Button onClick={()=>setShowForm(true)}>+ New Shipment</Button>
      {showForm &&(
        <FormBackground>
      <FormContainer onSubmit={handleSubmit}>
        <FormTitle>Create Shipment</FormTitle>
        Container ID:<Input type="text" name="containerId" required></Input>
        Current Location<Input type="text" name="currentLocation" required></Input>
        Destination<Input type="text" name="destination" required></Input>
        Status<Select name="status">
        <option value="in transit">In Transit</option>
        <option value="delivered">Delivered</option>
        </Select>
        <SubmitButton type="submit">Create</SubmitButton>
      </FormContainer>
      </FormBackground>
      )}
    </Container>
  );
}

export default Dashboard;
