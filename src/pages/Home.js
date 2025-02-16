import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Container = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Poppins", sans-serif;
`;

const HeroSection = styled.div`
  width: 100%;
  height: 90vh;
  background: url("https://img.freepik.com/free-photo/interior-large-distribution-warehouse-with-shelves-stacked-with-palettes-goods-ready-market_342744-1481.jpg?uid=R164722645&ga=GA1.1.1348064402.1739722610&semt=ais_hybrid") center/cover no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  color: white;
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 22px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content:space-between;
  background: white;
  padding: 12px;
  border-radius: 8px;
  margin-top: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  border: none;
  outline: none;
  padding: 12px;
  width: 320px;
  font-size: 18px;
`;

const Button = styled.button`
  background: rgba(89, 0, 255, 0.9);
  color: white;
  border: none;
  padding: 12px 24px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  border-radius: 6px;
  margin-left: 10px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(90, 0, 255, 0.7);
  }
`;

const Temp = styled.div`
  margin-top: 10px;
  padding: 6px;
  cursor: pointer;
  color: #0033cc;
  text-decoration: underline;
  font-weight: 600;
  background:white;
`;

const Section = styled.div`
  width: 80%;
  margin: 60px auto;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 38px;
  font-weight: 700;
  margin-bottom: 25px;
  color: #222;
`;

const FeaturesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const FeatureCard = styled.div`
  width: 30%;
  padding: 24px;
  background: #f8f8f8;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0px 4px 8px rgba(90, 0, 225, 0.3);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 16px rgba(90, 0, 225, 0.6);
  }

  h3 {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: #555;
  }
`;

function HomePage() {
  const [trackingId, setTrackingId] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (trackingId.trim()) {
      navigate(`/shipment/${trackingId}`);
    }
  };

  return (
    <Container>
      <Navbar />
      <HeroSection>
        <HeroContent>
          <Title>Reliable Global Shipment Tracking</Title>
          <Subtitle>Track your shipment in real-time with ease</Subtitle>
          <SearchContainer>
            <Input 
              type="text" 
              placeholder="Enter container ID..." 
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
            <Button onClick={handleSearch}>Track</Button>
          </SearchContainer>
          <Temp onClick={() => navigate(`/shipments`)}>Click here for testing View All Shipments</Temp>
        </HeroContent>
      </HeroSection>
      
      <Section>
        <SectionTitle>Why Choose Us?</SectionTitle>
        <FeaturesContainer>
          <FeatureCard>
            <h3>Fast & Secure</h3>
            <p>Our system ensures your shipments are delivered safely and on time.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Real-time Tracking</h3>
            <p>Know the exact location of your cargo at any time.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Global Coverage</h3>
            <p>We operate worldwide with reliable logistics partners.</p>
          </FeatureCard>
        </FeaturesContainer>
      </Section>
      <Footer/>
    </Container>
  );
}

export default HomePage;
