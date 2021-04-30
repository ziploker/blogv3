import React, {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'


//import useDocumentScrollThrottled from './useDocumentScrollThrottled.jsx'
import styled from 'styled-components'
import headerLeaf from "../../assets/images/headerLeafv2.png"
import headerLogo from '../../assets/images/logo.png'

import Burger from './burger'
import SideMenu from './sidemenu'


const HeaderWrapper = styled.div`

    /* background-image: url(${headerLeaf});
    background-position: right;
    background-repeat: no-repeat;
    background-size: contain;
    min-height: 85px;
    min-width: 80vw; */

    @media only screen and (max-width: 575px){
        
        min-width: 0px;     

    }
    
    //overflow: hidden;
    min-height: 85px;
    //margin: 0 20px;
    min-width: 500px;
    overflow: hidden;
   
    display: grid;
    //grid-template-columns: minmax(95px, 20vw) minmax(400px, 80vw);

    grid-template-columns: 1fr minmax(0px, 150px) minmax(0px, 800px) 1fr;
    
    //grid-template-columns: 1fr minmax(0px, 15vw) minmax(0px, 82.100vw) 1fr;


    grid-template-rows: 85px;
    grid-template-areas:

        ".  headerLogo  headerLeaf headerLeaf";
        
    grid-gap: 8px;
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
    justify-self: start;
    align-self: center;
    
    width: 80%;
    min-width: 70px;
    margin-left: 25px;
`;



const HeaderLeafImage = styled.img`


    @media only screen and (max-width: 575px){
        
        //display: none; 
        margin-right: -150px;    

    }
    max-width: 95%;
    min-width: 350px;
    max-height: 85px;
    
    
    grid-area: headerLeaf;
    justify-self: end;
    align-self: center;

`;

const Nav = styled.nav`

    @media only screen and (max-width: 575px){
        
        display: none;     

    }   
    
    grid-area: headerLeaf;
    color: white;
    align-self: center;
    justify-self: end;
    margin: 0 -25px;
    //transform: translate(-30px,-30px);
    //opacity: 0;
    //height: 100%;

    display: flex;
    

    /* ul{
        display: flex;
        align-items: flex-end;
        li{
            list-style-type: none;
            margin-right: 40px;
            font-family: Poppins;
            font-style: normal;
            font-weight: normal;
            
            line-height: 72px;
            


            color: #FFFFFF;

            a{
                color: #FFFFFF;

            }

        }



    } */


    ul{
        
        list-style: none;
        margin-right: 40px;
        display: flex;
        align-items: baseline;
        

        
    
        li{
            @media only screen and (max-width: 666px){
        
                padding: 0px 12px;     

            }
            
            display: inline-block;
            padding: 0px 20px;

            font-weight: 500;
            font-size: 16px;
            line-height: 45px;
            color: ${props => props.theme.white};
            
            text-decoration: none;
            cursor: pointer;

        
            a{
                transition: all 0.3s ease 0s;
                font-weight: 500;
                font-size: 12px;
                line-height: 45px;
                color: ${props => props.theme.white};

                &:hover{

                    color: ${props => props.theme.lightBlue};;

                }
            
            }
        
        }
    
    
    
    }
    



`;


function Header(props) {

   
    console.log("HEADER_________________PROPS", location.pathname)
    //console.log("HEADER_PROPS solo", location.pathname)

    useEffect(() => {

        console.log("Header UseEffect Start, openSideMenu state is currently " + props.openSideMenu);
        
        //mousedown listener

        if (
    
            locationFromHook.pathname === "/login" || 
            locationFromHook.pathname === "/signup" ||
            locationFromHook.pathname === "/forgot" ||
            locationFromHook.pathname === "/edit" ||
            locationFromHook.pathname === "/change") {
        
                return;
            }else{
                listener = event => {

                    //if you click in the menu,  dont close it
                    if (ref.current.contains(event.target)) {
            
                        return;
                    }
                  
                    //if you click anywhere outside the side menu, close it.    
                    mouseDownHandler();
                };


            }
       
  
        
        //resize and/or orientationchange listener
        const handleResize = () => {
          
            console.log(window.innerWidth);
            
            //closed sideMenu on orientation change, if it gets bigger than 850px
            if (window.innerWidth > 850){
                props.setOpenSideMenu(false);
            }
        }
  
        //set up event listeners
        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleResize);
        document.addEventListener('mousedown', listener);
        
        
        return () => {
          
          document.removeEventListener('mousedown', listener);
          console.log("cleanup");
          console.log("cleanup done, openSideMenu = " + props.openSideMenu);
        };
      },
      [ref, mouseDownHandler],
    );

    console.log("HEADER_________________PROPS", location.pathname)
    //console.log("HEADER_PROPS solo", location.pathname)

    const locationFromHook = useLocation();
    
    const ref = React.useRef();
    //const navbar = React.createRef();
    
    function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    
    function mouseDownHandler(){
        
        props.setOpenSideMenu(false);
        console.log("mouseDownEventTriggered & openSideMenu = " + props.openSideMenu);
    }

    function doSomething(){

        scrollToTop();
        props.setLoginClicked(true)
        props.setOpenSideMenu(false)
    }



    let listener;
    
    

    console.log("locationFromHook.pathname", locationFromHook.pathname);

    
      
    return (
        
        <HeaderWrapper>
                <Logo src={headerLogo}></Logo>
                <HeaderLeafImage src={headerLeaf}></HeaderLeafImage>
                <Nav>
                    <ul>
                        <li key={0}>news</li>
                        <li key={1} >act</li>
                        <li key={2}>shop</li>

                        <li key={3}>{props.appState.loggedInStatus == "LOGGED_IN" ? [<a key={"a"} onClick= {props.handleLogOutClick}> Logout | </a>, <Link key={"b"} to="/edit">edit </Link>] :   [<a key={"c"} onClick={doSomething}> Login |</a>, <a key={"d"} onClick={props.executeScrollForSection2}> Signup</a>]  } </li>
                    

                    </ul>


                </Nav>
                
                <div style={{
                    position: "relative", 
                    gridArea: "1/3/2/4",
                    justifySelf: "end",
                    alignSelf: "center",
                    paddingRight: "1em"}} ref={ref}>
                    <Burger openSideMenu={props.openSideMenu} setOpenSideMenu={props.setOpenSideMenu}/>
                    
                </div>
            
                <SideMenu 
                        doSomething={doSomething} 
                        openSideMenu={props.openSideMenu} 
                        setOpenSideMenu={props.setOpenSideMenu}
                        executeScroll={props.executeScroll} 
                        appState={props.appState} 
                        executeScrollForLookupSection={props.executeScrollForLookupSection} 
                        executeScrollForSection2={props.executeScrollForSection2}/>
        
        </HeaderWrapper>
    )
}





export default Header;
