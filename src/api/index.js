import axios from "axios";
const API_URL="http://localhost:5000";


//fetch all shipments
export const fetchShipments = async()=>{
    try {
        const response = await axios.get(`${API_URL}/shipments`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Create new shipments
export const createShipment = async (shipmentData)=>{
    try {
        const response= await axios.post(`${API_URL}/shipment`,shipmentData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//fetch shipment by id
export const fetchShipment=async(id)=>{
    try {
        const response =await axios.get(`${API_URL}/shipment/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//update location 
export const updateLocation=async(id, currentLocation)=>{
    try {
        const response=await axios.put(`${API_URL}/shipment/${id}/update-location`,{currentLocation})
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}