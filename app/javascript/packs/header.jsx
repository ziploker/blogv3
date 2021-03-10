import React, {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'


//import useDocumentScrollThrottled from './useDocumentScrollThrottled.jsx'
import styled from 'styled-components'
import headerLeaf from "../../assets/images/headerLeaf.svg"
import headerLogo from '../../assets/images/logo.png'

//import Burger from './burger'
//import SideMenu from './sidemenu'


const HeaderWrapper = styled.div`

    /* background-image: url(${headerLeaf});
    background-position: right;
    background-repeat: no-repeat;
    background-size: contain;
    min-height: 85px;
    min-width: 80vw; */


    
    width: 100%;
    min-height: 85px;

    
   
    display: grid;
    grid-template-columns: minmax(95px, 20vw) minmax(400px, 80vw);
    grid-template-rows: 85px;
    grid-template-areas:

        "headerLogo headerLeaf"
        "headerLogo headerLeaf";

`;



const Logo = styled.img`

    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 96px;
    line-height: 144px;
    letter-spacing: -5px;
    color: #010101;
    

    grid-area: headerLogo;
    justify-self: end;
    align-self: center;
    
    width: 80%;
    min-width: 70px;
    
`;



const HeaderLeafImage = styled.img`

    max-width: 95%;
    min-width: 400px;
    max-height: 85px;
    
    
    grid-area: headerLeaf;
    justify-self: end;
    align-self: center;

`;

const Nav = styled.nav`

    grid-area: headerLeaf;
    color: white;
    align-self: center;
    justify-self: end;
    

    ul{
        display: flex;
        align-items: flex-end;
        li{
            list-style-type: none;
            margin-right: 40px;
            font-family: Poppins;
            font-style: normal;
            font-weight: normal;
            
            line-height: 72px;
            /* identical to box height */


            color: #FFFFFF;

        }



    }
    



`;


function Header(props) {

   
    console.log("HEADER_________________PROPS", location.pathname)
    //console.log("HEADER_PROPS solo", location.pathname)

    
      
    return (
        
        <HeaderWrapper>
                <Logo src={headerLogo}></Logo>
                <HeaderLeafImage src={headerLeaf}></HeaderLeafImage>
                <Nav>
                    <ul>
                        <li>news</li>
                        <li>act</li>
                        <li>shop</li>

                    </ul>


                </Nav>
            
        
        
        </HeaderWrapper>
    )
}





export default Header;
