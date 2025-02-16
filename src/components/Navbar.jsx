import styled from "styled-components";
const Container=styled.div`
height:60px;
width:100%;
background:rgba(200, 200, 250, 0.4);
display:flex;
align-items:center;
padding:10px;
box-sizing: border-box;
`;
const Logo=styled.p`
color: rgba(90, 0, 255, 0.9);
font-size: 22px;
font-weight: 700;
margin: 0;
`;
function Navbar(){
    return(
        <Container>
            <Logo>Cargo Shipmet Tracker</Logo>
        </Container>
    )
}
export default Navbar;