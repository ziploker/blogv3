import React, {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'


//import useDocumentScrollThrottled from './useDocumentScrollThrottled.jsx'
import styled from 'styled-components'
import headerLeaf from "../../assets/images/headerLeaf.svg"
//import Logo from '../../assets/images/cwaLogo5.jpg'

//import Burger from './burger'
//import SideMenu from './sidemenu'


const HeaderWrapper = styled.div`

/* background-image: url(${headerLeaf});
background-position: right;
background-repeat: no-repeat;
background-size: contain;
min-height: 85px;
min-width: 80vw; */


min-height: 85px;
min-width: 600px;
background: pink;
`;

const Logo = styled.h1`

    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 96px;
    line-height: 144px;
    letter-spacing: -5px;
    /* identical to box height */


color: #010101;


`;

const HeaderLeafImage = styled.img`

    max-width: 80vw;
    min-height: 100%;
    float: right;


`;



function Header(props) {

   
    console.log("HEADER_________________PROPS", location.pathname)
    //console.log("HEADER_PROPS solo", location.pathname)

    
      
    return (
        
        <HeaderWrapper>
                <Logo>LOGO</Logo>
                <HeaderLeafImage src={headerLeaf}></HeaderLeafImage>
            
        
        
        </HeaderWrapper>
    )
}





export default Header;
