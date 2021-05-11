import React, {useEffect, useState} from 'react'
import styled, { ThemeProvider } from 'styled-components'
//import { Parallax, Background } from 'react-parallax';
import Login from './pages/login'


const HomeWrapper = styled.div`

    //background: pink;
    
    //height: calc(100vh - 85px);
    //max-height: 500px;
    overflow: hidden;
    //min-width: 500px;
    
`;



const News = styled.div`

    @media only screen and (max-width: 575px){
        
        margin-top: 0px;
        margin-bottom: 75px;
        grid-template-columns: 1fr;
        padding: 0px 20px;
    
        grid-template-rows: minmax(min-content, max-content) minmax(min-content, max-content) minmax(min-content, max-content) 1fr;
        grid-template-areas:
            
            "featured"
            "one"
            "two"
            ".";     

        }

    min-height: 100%;
    
    display: grid;
    justify-content: center;
    //grid-template-columns: 1fr minmax(0px, 350px) minmax(0px, 600px) 1fr;
    
    grid-template-columns: minmax(20px, 1fr) minmax(170px, 350px)  minmax(340px, 600px)  minmax(20px, 1fr);

    
    grid-template-rows: 170px 120px 50px 1fr;
    grid-template-areas:
        
        ".   one featured   ."
        
        ".   two featured   ."
        ".   two featured   ."
        ".     .       .    .";
    grid-gap: 8px;

    margin-top: 50px;

    /* display: grid;
    justify-content: center;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
        "featured one two  ." */




`;


const StoryImageWrapper = styled.div`

    width:100%;
    height: 0px;
    //min-height: 90px;
    //max-height: 300px;
    grid-area: 1 /1 /3 /-1;
    padding-top: 60%;
    position: relative;
    
    
    @media screen and (min-width: 750px) and (max-width: 1111px){
        width: 100%;
        height: 100%;

        grid-area: picture;
        
        padding:0;
        
        align-self: center;
        justify-self: center;
        //border: 5px solid white;

    }
`;

const StoryImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;


`;


const StoryImageOverlayWrapper = styled.div`

    grid-area: 1 /1 /3 /-1;
    width: 100%;
    height: 0px;
    padding-top: 60%;
    
    position: relative;
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#ffffff+0,ffffff+100&0+67,1+100 */
    background: -moz-linear-gradient(top,  rgba(255,255,255,0) 0%, rgba(255,255,255,0) 67%, rgba(255,255,255,1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top,  rgba(255,255,255,0) 0%,rgba(255,255,255,0) 67%,rgba(255,255,255,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom,  rgba(255,255,255,0) 0%,rgba(255,255,255,0) 67%,rgba(255,255,255,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 ); /* IE6-9 */
    
    
    
    @media screen and (min-width: 750px) and (max-width: 1111px){


        display: none;
    }
    
`;

const StoryImageOverlay = styled.div`

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

`;



const Div1 = styled.div`
    background: blue;
    grid-area: featured;
    border-radius: 10px;

    display: grid;
    //grid-template-columns: minmax(250px, 1fr);
    //grid-template-rows: auto;  

    grid-template-areas:
        "picture"
        "grayArea"
        "body"
        "time"
    ;
    
    
    

    &:before{
        content: '';
        display: block;
        width: 0;
        height: 0;
        padding-top: calc(100% / (16/9));

        

    }

`;

const Div2 = styled.div`
    background: orange;
    grid-area: one;
    border-radius: 10px;
    //margin-right: 25px;
    &:before{
        content: '';
        display: block;
        width: 0;
        height: 0;
        padding-top: calc(100% / (16/9));

        

    }
    

`;

const Div3 = styled.div`

    background: green;
    grid-area: two;
    border-radius: 10px;
    //margin-right: 25px;
    &:before{
        content: '';
        display: block;
        width: 0;
        height: 0;
        padding-top: calc(100% / (16/9));

        

    }
    
`;

const BackgroundGray = styled.div`

    @media only screen and (max-width: 575px){
        display: none;
    }
    background: #C4C4C4;
    grid-area: 3/1/-1/-1;
    z-index: -1;
    padding: 75px 0px;
    
    



`;



function Home(props){

    // const [screenIsAtTop, setScreenIsAtTop] = React.useState(true);
    
    

    
    return (
        <>
            <HomeWrapper>
                
                    <News>

                        <Div1>

                        <StoryImageWrapper>
                            <StoryImage src={props.lastStory ? props.lastStory.url : null}  />
                        </StoryImageWrapper>
                
                
                        <StoryImageOverlayWrapper>
                            <StoryImageOverlay/>
                        </StoryImageOverlayWrapper>
                            
                            {props.lastStory.title}
                            
                            
                            
                        
                        
                        </Div1>
                        <Div2/>
                        <Div3/>
                        <BackgroundGray></BackgroundGray>

                        
                    </News>
                
                
            </HomeWrapper>

            <Login handleSuccessfulAuth={props.handleSuccessfulAuth} setLoginClicked={props.setLoginClicked} loginClicked={props.loginClicked} />
            
        </>
    );  
}


export default Home;