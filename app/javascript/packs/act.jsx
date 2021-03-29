import React, {Component, useEffect, useState, useRef} from 'react'
import {Link, useLocation} from 'react-router-dom'
import actBackground from '../../assets/images/actBackground.png'
import mega from '../../assets/images/megav3.png'
import cardTemplate from '../../assets/images/cardTemplate.png'
import sampleShot from '../../assets/images/sampleShot.png'
import sampleShot2 from '../../assets/images/sampleShot2.png'


//import useDocumentScrollThrottled from './useDocumentScrollThrottled.jsx'
import styled from 'styled-components'

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

import $ from 'jquery';
import greenCheck from '../../assets/images/greenCheck.png'
import searchIcon from '../../assets/images/search.png'
import searchIconOrange from '../../assets/images/searchGreen.png'
import searchIconOrange2 from '../../assets/images/searchPink2.png'
import ResultCardOne from './resultCardOne.jsx'
//import ResultCardTwo from './resultCardTwo.jsx'
var Spinner = require('react-spinkit');
const formData = new FormData();


const ActWrapper = styled.div`
    //min-height: 100vh;
    background-color: black;
    background-image: url(${actBackground});
    background-position: 0 50%;
    background-repeat: no-repeat;
    //background-size: cover;
    position: relative;
    ////padding-bottom: 50px;
    

`;

const Mega = styled.img`
  @media only screen and (max-width: 720px){

    grid-area: 1/1/2/-1;
    display: none;

  }

    //position: absolute;
    //top: -5vh;
    //left: 12vw;
    width: 100%;

    grid-area: 1/2/4/3;
    align-self: center;
    justify-self: end;
    margin-top: -50px;
    margin-right: 1em;
    margin-bottom: 13px;
    ;

`;

const ActGrid = styled.div`

  @media only screen and (max-width: 720px){
        
    grid-template-columns: 1fr;
    grid-template-rows: minmax(min-content, max-content) minmax(min-content, max-content) minmax(100px, max-content) minmax(min-content, max-content);     

  }

  display: grid;
  position: relative;
  //grid-template-columns: 43% 57%;
  grid-template-columns: minmax(20px, 1fr) minmax(335px, 350px)  minmax(350px, 600px)  minmax(20px, 1fr);
  grid-template-rows: minmax(min-content, max-content) minmax(min-content, max-content) minmax(100px, max-content) minmax(min-content, max-content);
  grid-column-gap: .5em;  
`;

const ActHeader = styled.h1`

  @media only screen and (max-width: 720px){

    grid-area: 1/1/2/-1;

  }

    font-family: Poppins;
    font-style: normal;
    font-weight: 800;
    font-size: 10vw;
    //line-height: 165px;
    /* identical to box height */

    letter-spacing: -0.08em;

    color: #FFFFFF;
    grid-area: 1/3/2/-1;
    align-self: end;
    
    line-height: 100%;
    margin: 40px 20px 0px 20px;
    z-index: 1;

    opacity: ${props => props.showCards ? "0" : "1"};
    transition: opacity .4s;
    


`;

const ActSubheader = styled.h1`

@media only screen and (max-width: 720px){

grid-area: 2/1/3/-1;


}

font-family: Poppins;
font-style: normal;
font-weight: normal;
font-size: 2vw;
line-height: 100%;

grid-area: 2/3/3/-1;

color: #E3B55A;
margin: 8px 20px 32px 20px;

opacity: ${props => props.showCards ? "0" : "1"};
transition: opacity .4s;
    


`;


const Form = styled.form`

  @media only screen and (max-width: 720px){

  grid-area: 3/1/5/-1;

  }

  display: grid;
  position: relative;
  grid-template-columns: 100%;
  grid-template-rows: minmax(min-content, max-content) minmax(50px, min-content);
  grid-template-areas:
    "input"
   
    "status";
  justify-content: center;
  justify-self: start;
  align-self: center
  ;
  
 
  width: 100%;
  transition: opacity .4s;
  transition: opacity .4s;
  
  //box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  //margin-top: 72px;

  opacity: ${props => props.showCards ? "0" : "1"};

  grid-area: 3/3/5/4;
  padding: 0px 20px;
`;



const Button = styled.button`

  
  height: 40px;
  width: 50px;
  //grid-area: button;
  background-color: #e8e5e5;
  //background-image: ${props => props.searchButtonActive ? 'url(' +searchIconOrange+ ')' : 'url(' +searchIcon +')'};
  background-image: url( ${searchIconOrange});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center; 
  border: 5px solid #e8e5e5;
  //border: none;
  z-index: 999;
  cursor: pointer;
  color: black;
  position: absolute;
  
  z-index: 1002;
  
  transition: background-image 1s;
  transition-timing-function: ease-in;
  filter: ${props => props.searchButtonActive ? 'grayscale(0%)' : 'grayscale(80%)'};
  //filter: ${props => props.searchButtonActive ? 'sepia(0%)' : 'sepia(60%)'};

  &:hover{
    
    //background-image: url( ${searchIconOrange});transition: background-image 1s;
    transition-timing-function: ease-in;
    filter: grayscale(0%);
    //filter: sepia(0%);


  }

  //&:disabled{
  //  opacity: .6;
  //  cursor: default;
  //  background-color: #eae6de;
  //  &:hover{

  //    background-color: #FFA500;
  //      opacity: .6;
  //      background-color: #eae6de;
        
  //  }
  //}

  
`;

const CardOneInfo = styled.div`


`;


const CardTwoInfo = styled.div`


`;

const StatusHolder = styled.div`

  grid-area: status;
  display: flex;
  justify-content: center;
  align-content: center;

  justify-self: start;

`;



const StatusBar = styled.div`

  max-height: 100%;
  opacity: 1;
  transition: opacity .4s;
  transition-timing-function: ease-in;
  

`;



const StatusSpinner = styled.div`
  
  max-height: ${ props => props.showStatusSpinner.toString() == "true" ? "100%" : "0px"};
  opacity: ${ props => props.showStatusSpinner.toString() == "true" ? "1" : "0"};
  transition: opacity .4s;
  transition-timing-function: ease-out;
  margin-left: 8px;

`;



const CheckMark = styled.img`
  
  max-height: ${ props => props.showStatusCheck.toString() == "true" ? "100%" : "0px"};
  opacity: ${ props => props.showStatusCheck.toString() == "true" ? "1" : "0"};
  transition: opacity .4s;
  transition-timing-function: ease-out;
  padding-left: 6px;
  height: 11px;

`;



const ResultSpan = styled.div`
  
  &:hover{

    background-color: #56c5cc;
    //color: red;
    //font-size: 3em;
  }

`;


const Span = styled.span`

  display: ${props => props.status == "Search Complete!!" ? "none" : "Block"};
  height: 100%;
  font-size: .75em;
  transition: opacity 2s ease-in;
  opacity: ${props => props.status.toString() == "Enter an address." ? "0" : "1"};
  color: white;
            

`;






const ResultSection = styled.div`

  @media only screen and (max-width: 720px){

    grid-area: 1/1/-1/-1;
    margin: 0px auto;
    padding: 0px 15px 32px 15px;
    grid-template-columns: minmax(100px, 171px) minmax(100px, 171px);

  }

  display: grid;
  transition: opacity 2s linear;  
  transform: ${props => props.showCards ? "translate(0)" : "transform:translate(9999px)"};
  opacity: ${props => props.showCards ? "1" : "0"};
  grid-template-columns: minmax(150px, 171px) minmax(150px, 171px);
  //grid-template-rows: 1fr minmax(min-content, max-content) minmax(min-content, max-content) minmax(min-content, max-content);
  //visibility: hidden;
  //grid-template-rows: ${props => props.showCards ? "minmax(min-content, max-content) minmax(min-content, max-content) minmax(min-content, max-content) minmax(min-content, max-content) 1fr" : "0px 0px 0px 0px 0px"};
  
  //grid-row-gap: .7em;
  grid-column-gap: .5em;
  //padding-top: 50px;

  //padding: ${props => props.showCards ? "75px 0px 50px 0px" : "0px 0px 50px 0px" };

  grid-area: 1/3/5/4;
  margin: 20px 0px 20px 50px;


`;

const ResultSectionHeader = styled.h1`

  @media only screen and (max-width: 720px){

  grid-area: 1/1/-1/-1;
  
    margin-bottom: 8px;
  justify-self: center;

  }


  font-family: Poppins;
  //font-style: normal;
  //font-weight: 500;
  font-size: clamp(36px, 4vw, 120px);
  //font-size: clamp(1rem, -0.875rem + 8.333333vw, 3.5rem);
  
  

  /* identical to box height, or 90px */
  
  letter-spacing: -0.03em;
  color: #FFFFFF;

  grid-area: 1/1/2/3;
  justify-self: start;
  align-self: start;

  white-space: nowrap; 




`;

const ResultSectionSubHeader = styled.h2`


  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: clamp(12px, 1.5vw, 60px);
  //text-align: end;

  /* or 22px */
  /* display: flex;
  align-items: center; */
  letter-spacing: -0.03em;

  color: #FFFFFF;

  grid-area: 2/1/3/3;

  justify-self: start;
  white-space: nowrap; 
  line-height: 1em;
  margin-bottom: 15px;

`;



const CardOne = styled.div`

  display: grid;
  position: relative;
  grid-template-columns: 85% 15%;
  grid-template-rows: 73% 17% 10%;

  grid-area: 3/1/4/2;

  justify-self: end;
  max-height: 250px;

  



  

`;

const CardTwo = styled.div`

  display: grid;
  position: relative;
  grid-template-columns: 85% 15%;
  grid-template-rows: 73% 17% 10%;

  grid-area: 3/2/4/3;

  justify-self: end;
  max-height: 250px;

  



  

`;


const CardTemplate = styled.img`

  grid-area: 1/1/-1/-1;
  width: 100%;
  height: 100%;

`;

const CardPicture = styled.img`
  grid-area: 1/1/-1/-1;

  width: 100%;
  height: 100%;
  border-radius: 13px;
  


`;

const CardNameOfRep = styled.h1`

  color: black;
  font-size: clamp(9px, .7vw, 25px);
  line-height: 1.1em;
  /* position: absolute;
  bottom: 10%;
  left: 3%; */

  align-self: center;
  padding-left: 6px;

  grid-area: 2/1/3/2;
  //word-spacing: -2px;
  



`;



const Letter = styled.div`

grid-area: 1/4/6/-2;
border-radius: 10px;
background: white;
margin: 15px 15px 0px 15px;
grid-template-columns: 1fr 1fr;
grid-auto-rows: minmax(min-content, max-content);

display: grid;
padding: 20px;

  h1{
    justify-self: center;
    font-size: .8rem;
    grid-area: 1/1/2/3;
    
  }

  h2{

    justify-self: center;
    font-size: .8em;
    font-weight: 300;
    
  }

  h3{

    justify-self: start;
    font-size: .8em;
    font-weight: 500;
    margin-top: 15px;
  }

  p{

    text-indent: 2rem;
    font-size: .8em;
    font-weight: 300;
    margin-top: 15px;

  }

  div{
    font-size: .6em;
    font-weight: 300;
    margin-top: 15px;

  }



`;

function Act(props) {

   
  console.log("ACT________________PROPS", location.pathname)
  //console.log("HEADER_PROPS solo", location.pathname)


  const [formInfo, setFormInfo] = React.useState({
  
      address: ''
    
  })

  const ref = useRef();

  //const {LookupScrollToRef, LookupInputRef} = ref;
  const [searchButtonActive, setSearchButtonActive] = React.useState (false)
  const [status, setStatus] = React.useState ("");
  const [showStatusSpinner, setShowStatusSpinner] = React.useState (false);
  const [lastTermSearched, setLastTermSearched] = React.useState ('')
  const [coordinates, setCoordinates] = React.useState ({lat: '', lng: ''})
  const [showCards, setShowCards] = React.useState (true);
  const [resultFromFlorida, setResultFromFlorida] = React.useState(true)
  const [sendButtonClass, setSendButtonClass] = React.useState("button error")

  


  const [results, setResults] = React.useState( {"one":{"resultFromFlorida":"true","name":"Juan Alfonso Fernandez-Barquin","firstName":"","lastName":"","image":"https://www.myfloridahouse.gov//FileStores/Web/Imaging/Member/4709.jpg","id":"ocd-person/a8c88fee-1915-4907-ae37-5755c4bff446","email":"JuanF.Barquin@myfloridahouse.gov","chamber":"House","party":"Republican","parent":"Florida Legislature","district":"119","fullDistrict":"Florida State House district 119","fullDistrictTrunk":"Florida State House"},"two":{"name":"Annette Taddeo","firstName":"Annette","lastName":"Taddeo","image":"http://www.flsenate.gov/PublishedContent/Senators/2018-2020/Photos/s40_5331.jpg","id":"ocd-person/ea190b03-d1ca-4d75-89c7-dca745386db7","email":"taddeo.annette.web@flsenate.gov","chamber":"Senate","party":"Democrat","parent":"Florida Legislature","district":"40","fullDistrict":"Florida State Senate  ","fullDistrictTrunk":"Florida State Senate"}});
  //const [results, setResults] = React.useState( {"one": {}, "two": {} });

  
  
  
  // to activate the input field while typing
   
   
    function activateField(e) {
    
    
    setSearchButtonActive( true)
  
  }

  // to deactivate input only if it's empty
  function disableField(e) {
    if (e.target.value == ""){
    setSearchButtonActive( false)
  }
    
  }

  

  //search options for 'react places autocomplete
  const searchOptions = {
    componentRestrictions: { country: ['us'] }
  }
  
  //address selected from dropdown box///////////////////  HANDLE_SELECT  /////////
  const handleSelect = address => {
   
    //populate the input with the address selected from 'react places autocomplete'
    setFormInfo( {address: address} ) 
    
    
    //get the lat/lng of the address selected and save to state
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        
        setCoordinates({
        
          lat: latLng.lat,
          lng: latLng.lng

        })
      }).catch(error => {
        setStatus("No results found. Check address")
        setShowStatusSpinner(false)
        console.error('Error', error);
      })
  };

  
  ///SEARCH BUTTON CLICKED///////////////////////////////// HANDLE_ADD  //////////
  const handleAdd = e => {

    

    //user enters address but doesnt choose one from "react places autocomplete"
    //and thus bypasses handkeSelect method, which gets the lat lng, so get lat lan otherway
    let secondTryLat = ''
    let secondTryLng = ''
    
    e.preventDefault();
    
    if ( validForm() ) {


      //const fooBarNode = props.sendButtonRef.current

      //Adding class to node element
      //fooBarNode.classList.remove('animate');

      if (props.bullet2 == "COMPLETED"){

        setSendButtonClass("button error")
        //props.setShowStatusCheck2(false)
        //props.setBullet2msg("Send Message")

        //props.setBullet2("NOT_COMPLETED");

      }


      
      //set current Search term state from input
      setLastTermSearched(formInfo.address)
      
      //let user know somethings happening
      setStatus('....may take up to 60 seconds')
      
      setShowStatusSpinner(true)
     
      
      //get formdata ready to send to server
      formData.append('event[address]', formInfo.address);
      
      
      //lat lng will be empty if user manually enters address instead if 
      //selecting address from react places autocompete
      if (coordinates.lat == '' || coordinates.lng == ''){
        
        geocodeByAddress(formInfo.address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
        
            secondTryLat = latLng.lat
            secondTryLng = latLng.lng
            
            const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
            
            fetch('/lookup', {
              method: 'post',
              dataType: "text",
              body: JSON.stringify(
                {"lookup" : {
                  "address" : formInfo.address,
                  "lat" : secondTryLat,
                  "lng" : secondTryLng
                }}
              ),
              headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrf
              }
            })
            .then(response => response.json() )
            .then(data => {
              //props.setStatus("Search Complete!!")
              
              //info message under the address search input box
              setStatus("")

              //message on bullet 1
              
              //props.setBullet1msg("Search Complete!")
              setShowStatusSpinner(false)
              //props.setShowStatusCheck(true)
              setShowCards(true)
              
              //props.setBullet1("COMPLETED")
              
              setResults(data)
              
              setResultFromFlorida(data.one.resultFromFlorida.toString())

              let flag = data.one.resultFromFlorida.toString()

              console.log("FLAG IS "+ flag )

              if (flag == "false") {
                
                //props.setBullet2msg("Non-Florida result");
                //props.setBullet2("COMPLETED")
                //props.setShowStatusCheck2(true)
              }else{
                //props.setBullet2msg("Send Message");
                //props.setShowSteps(true)

              }
              
            })
        
          }).catch(error => {
            
            setStatus("No results found. Check address")
            setShowStatusSpinner(false)
            console.log("Error", error)
        
          })


      }else{
      
       
        console.log("lat was NOT empty")
        const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content"); 
        fetch('/lookup', {
          method: 'post',
          dataType: "text",
          body: JSON.stringify(
            {"lookup" : {
              "address" : formInfo.address,
              "lat" : coordinates.lat,
              "lng" : coordinates.lng
            }}
          ),
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrf
          }
        })
        .then(response => response.json() )
        .then(data => {
          //props.setStatus("Search Complete!!")
          setStatus("")
          //props.setBullet1msg("Search Complete!")
          setShowStatusSpinner(false)
          //props.setShowStatusCheck(true)
          setShowCards(true)
          
          //props.setBullet1("COMPLETED")
          
          setResults(data)
          
          setResultFromFlorida(data.one.resultFromFlorida.toString())

          let flag = data.one.resultFromFlorida.toString()

          console.log("FLAG IS "+ flag )

          if (flag == "false") {
                
            //props.setBullet2msg("non-Florida result");
            //props.setBullet2("COMPLETED")
            //props.setShowStatusCheck2(true)
            
          }else{
            //props.setBullet2msg("Send Message");
            //props.setShowSteps(true);

          }
          
        })
      }
      
    }
  }

  
  ////////////////////////////////////////////////   VALID_FORM  //////
  const validForm = () => {
    if (formInfo.address == "" ){
      setStatus("Enter an address.")
      //props.setShowStatusCheck(false)

      setTimeout( () => {setStatus("")}, 2000 )
      
      return false;
    
    }else if(formInfo.address == lastTermSearched){
      setStatus("Enter a different address.")
      //props.setShowStatusCheck(false)
      return false;

    }else{
      return true;
    }
  }

  const handleChange2 = event => {
    console.log("handle change 222")
    
    //resets search if user erases first search term
    if (event != lastTermSearched){

      setStatus("")
      //setShowStatusCheck(false)
    
    } 
    
    
    setFormInfo({ 
      address: event
    });
    

    //if (!formInfo.address ){
      
    //  setSearchButtonActive( true)
    //} else{

    //  setSearchButtonActive( false)

    //}
      
  }
    
      
    return (
        
        <ActWrapper>

            

          <ActGrid>
                <ActHeader showCards={showCards}>ACT NOW</ActHeader>
                <ActSubheader showCards={showCards}>Contact Your State Representatives </ActSubheader>

                <Form className="form-inline" onSubmit={handleAdd} showCards={showCards} >
        
                    <PlacesAutocomplete
                        value={formInfo.address}
                        onChange={handleChange2}
                        onSelect={handleSelect}
                        searchOptions={searchOptions}
                    >
                        
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            
                        <div style={{
                            width: "100%",
                            border: "medium none !important",
                            margin: "0 0 10px",
                            minWidth: "100%",
                            padding: "50",
                            zIndex: "1000",
                            gridArea: "input",
                            position: "relative",
                            overflow: "visible"
                        }}>

                            <Button searchButtonActive={searchButtonActive} disabled={false} type="submit" className="btn btn-primary"> </Button>
                            

                            
                            <input 
                            {...getInputProps({
                                placeholder: '123 Main St, Miami FL, 33155',
                                className: 'location-search-input',
                                type: "text",
                                tabIndex: "1",
                                className: "form-control",
                                name: "address",
                                onFocus: activateField,
                                onBlur: disableField,
                                ref: ref
                                
                            })}
                            style={{
                                width: "100%", 
                                height: "40px",
                                boxShadow: "0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)",
                                border: "honeydew",
                                display: "block",
                                paddingLeft: "62px",
                                fontSize: "16px",
                                borderRadius: "2px",
                                outline: "none"
                            }}
                            />
                            
                            
                            <div 
                            style={{
                                position: "absolute",
                                zIndex: "1000",
                                borderBottom: "honeydew",
                                borderLeft: "honeydew",
                                borderRight: "honeydew",
                                borderTop: "1px solid #e6e6e6",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                                backgroundColor: '#FFF',
                                fontSize: ".7em",
                                borderRadius: "0 0 2px 2px"
                            }}
                            >
                                
                            {loading && <div>Loading...</div>}
                            
                            
                            {suggestions.map(suggestion => {
                                console.log(suggestions.values().next().value.description)
                                //props.setFirstMatch(suggestions.values().next().value.description)
                            
                                const style = suggestion.active
                                ? { backgroundColor: '#5FCC61', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                
                                
                                return (
                                
                                <div {...getSuggestionItemProps(suggestion, {style})}>
                                    
                                    <ResultSpan>{suggestion.description}</ResultSpan>
                                
                                </div>
                                
                                )
                            
                            })}
                            
                            </div>
                        </div>
                        )}
                    </PlacesAutocomplete>
                    

                    
                    
                    <StatusHolder>
                        
                        <StatusBar>
                        
                        <Span status={status}> {status}</Span>
                        
                        </StatusBar>
                    
                        <StatusSpinner showStatusSpinner={showStatusSpinner}>
                        <Spinner name='wave' color='#87d388' />
                        </StatusSpinner>

                    </StatusHolder>   
                    
                    
                        
                    </Form>
                    <Mega src={mega}>

                    </Mega>


                    {/* 
                    <ResultCardOne showCards={showCards} results={results} />
                    <CardOneInfo><sub style={{fontSize: ".7em"}}>{results.one.fullDistrictTrunk}</sub></CardOneInfo>
                     */}


              <ResultSection showCards={showCards}>

              <ResultSectionHeader>Results:</ResultSectionHeader>


              <CardOne>


                <CardPicture src={results.one.image ? results.one.image : sampleShot2}></CardPicture>
                
                <CardTemplate src={cardTemplate}></CardTemplate>

                <CardNameOfRep>{results.one.name ? results.one.name : ""}</CardNameOfRep>


              </CardOne>
              <sub style={{fontSize: ".5em", alignSelf: "center", marginBottom: "4px", color: "white", gridArea: "2/1/3/2", justifySelf: "center"}}>{results.one.fullDistrictTrunk}</sub>




              <CardTwo>


                <CardPicture src={results.two.image ? results.two.image : sampleShot2}></CardPicture>
                
                <CardTemplate src={cardTemplate}></CardTemplate>

                <CardNameOfRep>{results.two.name ? results.two.name : ""}</CardNameOfRep>


              </CardTwo>
              <sub style={{fontSize: ".5em", alignSelf: "center", marginBottom: "4px", color: "white", gridArea: "2/2/3/3", justifySelf: "center"}}>{results.two.fullDistrictTrunk}</sub>

              {/* <Letter>

                <h1>recipients:</h1>
                <h2 style={{gridArea: "2/1/3/3"}}>{results.one.email}</h2>
                <h2 style={{gridArea: "3/1/4/3"}}>{results.two.email}</h2>

                <h3 style={{gridArea: "4/1/5/3"}}>Dear Representatives/Senator,</h3>


                <p style={{gridArea: "5/1/6/3"}}>I am a constituant of (Florida State House district 20/Florida State Senate distr ict 8).
                  I am writing on behalf of legalizing marijuana to all above the age of eighteen. 
                  Marijuana is as much a recreational drug as alcohol, tobacco, and even coffee. 
                  Marijuana has never had a report of fatal use and the common use for medical purposes 
                  has been proved and even infused into society today. Many states today have legalized 
                  it's medical purposes because it has proven to help certain illnesses including glaucoma, 
                  sclerosis, and cancers such as breast and brain cancer. Prohibition has only cost 
                  billions of dollars and studies prove that it has not affected the use of marijuana, 
                  in fact it has made it cheaper and more accessible. All the money used for prosecution 
                  of small offenders can be used for tax revenues and ultimately save billions.
                </p>

                <div style={{gridArea: "6/1/7/3"}}>

                  Sincerely, <br/>
                  <sub>Your Name Here</sub> <br/>
                  <span>{lastTermSearched}</span><br/>
                  <sub>Your Email Here</sub> <br/>

                </div>


                <button style={{
                  gridArea: "6/2/7/3",
                  background: "#E3B55A",
                  borderRadius: "10px",
                  border: "none",
                  width: "12em",
                  height: "4em",
                  justifySelf: "center",
                  alignSelf: "center"}}>SEND</button>



              </Letter> */}


              </ResultSection>
                     

            </ActGrid>



            
        </ActWrapper>
    )
}





export default Act;
