import styled from "styled-components";
const Container=styled.div`
height:50px;
width:100%;
background:rgba(200, 200, 250, 0.4);
display:flex;
align-items:center;
`;
const Logo=styled.p`
color:rgba(90, 0, 255, 0.6);
font-size:20px;
margin:0;
margin-left:5px;
`;
function Navbar(){
    return(
        <Container>
            <Logo>Cargo Shipmet Tracker</Logo>
        </Container>
    )
}
export default Navbar;