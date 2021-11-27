import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import React from 'react';
const FooterContainer = styled(Box)(({ theme }) => ({
    backgroundColor:"#070707",
    display: "flex",
    alignIteams: "center",
    justifyContent: "center",
}));

const FooterText = styled('p')(({ theme }) => ({
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: "1rem",
}));


const Footer = () => {
    return (
        <FooterContainer>
            <FooterText>
                Project 3 - 20183991 -  Nguyễn Đức Thành
            </FooterText>
        </FooterContainer>
    )
}

export default Footer
