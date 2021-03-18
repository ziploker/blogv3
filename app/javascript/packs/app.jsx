import React, {useEffect, useState, useRef} from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"


import axios from 'axios'
import Header from "./header"
import Home from "./home"
import Act from "./act"
import Signup from "./signup"
import styled, { ThemeProvider } from 'styled-components'
import GlobalStyles from "./global"


///////////////////////////////// MAIN APP STARTING POINT ///////////////
function App(controllerProps){
    
    
    console.log("APP_controllerProps", controllerProps)
    
    //global APP state 
    // const [appState, setAppState] = useState({
        
    //     loggedInStatus: "NOT_LOGGED_IN",
    //     emailStatus: "EMAIL_NOT_VERIFIED",
    //     test: "a",
    //     user: {},
    //     stories: controllerProps.stories
        
    // })
    // const [openSideMenu, setOpenSideMenu] = useState(false);
    // const [loginClicked, setLoginClicked] = useState(false)

    
   
    const theme = {
        
        white:        "#ffffff",
        offWhite:     "#f4f4f4",
        lightBlue:    "#56c5cc",  //(86,197,204)
        pink:         "#f14f7b",  //(241,79,123)
        orange:       "#f7aa1c",  //(247,170,28)
        darkBlue:     "#000321",  //(0,3,33)
        blueGray:     "#0E2021",
        black:        "#181818"   //(0,0,0)
    };
    

    
    // const handleSuccessfulAuth = data => {
        
    //     setAppState({
    //         ...appState,
    //         loggedInStatus: "LOGGED_IN",
    //         user: data.user
    //     })
    // }

    
    // const handleLogOutClick = () => {
        
    //     //const mode = process.env.NODE_ENV =="development" ? "http://127.0.0.1:3000" : "https://www.floiridablaze.io"
        
    //     axios.delete("/logout", {withCredentials : true})
    //         .then(response => {
    //             setAppState({
    //                 ...appState,
    //                 loggedInStatus: "NOT_LOGGED_IN",
    //                 user: {}
    //             })

    //         }).catch(error => {
    //             console.log("logout errors", error)
    //         })
    // }
    
    
    
    // reference for lookupSection to scroll to, when click on nav link
    // const LookupScrollToRef = useRef();
    // const LookupInputRef = useRef();

    // const section2ScrollToRef = useRef();
    
    // when click on nav link, scrolls to LookupScrollToRef
    // const scrollToRef = (ref) => {
        
    //     window.scrollTo(0, ref.current.offsetTop)

        
    //     setOpenSideMenu(false)
    //     LookupInputRef.current.focus();

    // }

    // const scrollToRef2 = (ref) => {

    //     console.log(ref)
        
    //     window.scrollTo(0, ref.current.offsetTop)

        
       
    // }
        
    
    
    // const executeScrollForLookupSection = () => {
        
    //     scrollToRef(LookupScrollToRef)
    //     setOpenSideMenu(false)
    // }
    
    // const executeScrollForSection2 = () => {
        
    //     scrollToRef2(section2ScrollToRef)
    //     setOpenSideMenu(false)
    // }
    
    // useEffect(() => {

    //     //const mode = process.env.NODE_ENV == "development" ? "http://127.0.0.1:3000" : "https://www.floiridablaze.io"
        
        
        
    // },[]);

    
    
    
    return (

        <ThemeProvider theme={theme}>
        
            <Router>
                
                <GlobalStyles/>
                
                
                    
                <Header/>
                
                
                
                <Switch>
                    <Route exact path="/" render={ () => <Home  />}/>

                    {/* <Route exact path="/" render={ () => <Home handleSuccessfulAuth={handleSuccessfulAuth} loginClicked={loginClicked} setLoginClicked={setLoginClicked} stories={appState.stories} appState={appState} setAppState={setAppState} />}/>
                    <Route path="/login" render={ props => <Login {...props} handleSuccessfulAuth={handleSuccessfulAuth} />} />
                    <Route path="/signup" render={ props => <Signup {...props} handleSuccessfulAuth={handleSuccessfulAuth} />} />
                    <Route path="/forgot" render={ props => <Forgot {...props}  />} /> 
                    <Route path="/resend" render={ props => <Resend {...props}  />} />                   
                    <Route exact path="/change_pw/:token" render={ props => <Change {...props}  />} />
                    <Route path="/edit" render={ props => <Edit {...props} user={appState.user}/>} />
                     */}
                </Switch>

                <Act/>
                <Signup/>

                {/* <LookupSection appState={appState} ref={{LookupScrollToRef: LookupScrollToRef, LookupInputRef: LookupInputRef}}/>
                <Section2 ref={{section2ScrollToRef: section2ScrollToRef}} stories={appState.stories} appState={appState} setAppState={setAppState} handleSuccessfulAuth={handleSuccessfulAuth} />
               <Footer/> */}
            </Router>
        
        </ThemeProvider>
    );
}


export default props => <App {...props} />;