import styled from "styled-components";

const FooterContainer = styled.footer`
  width: 100%;
  text-align: center;
  padding: 20px;
  box-sizing:border-box;
  background: rgba(90, 0, 225, 0.8);
  color: white;
  font-size: 16px;
  margin:50px 0;
`;
function Footer(){
    return (
        <FooterContainer>© 2025 ShipTrack Inc. All rights reserved.</FooterContainer>
    )
}
export default Footer;