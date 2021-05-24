import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';


import TimeAgo from 'javascript-time-ago'
TimeAgo.addDefaultLocale(en)
import ReactTimeAgo from 'react-time-ago'
import en from 'javascript-time-ago/locale/en'
import CommentForm from './commentForm'

import defaultAvatar from '../../assets/images/man3'

 




//import LookupSection from './lookupSection.jsx'

import {
    
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
  
} from "react-share";



import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";



const ArticleSection = styled.div`


    
    padding: 0px 10px;
    display: grid;
    grid-template-rows: 125px 1fr;
    grid-template-columns: minmax(200px, 700px);
    grid-template-areas:

        "banner banner"
        "content ad  ";
    grid-gap: 15px;
    justify-content: center;
    justify-items: center;
    margin-top: 80px;

    @media screen and (min-width: 750px){
        display: grid;
        grid-template-columns: 1fr  minmax(200px, 700px) minmax(10px, 200px) 1fr;
        grid-gap: 20px;

        grid-template-areas:

        "banner banner banner banner"
        "  .   content   ad     .   ";
    }
`;


const HorizontalAds = styled.div`

    background-color: pink;
    width: 100%;
    grid-area: banner;

`;
const NewsAds = styled.div`
    
    background-color: pink;
    width: 100%;
    grid-area: ad;
`;



const NewsWrapper = styled.div`

    display: grid;
    grid-template-columns: 100%;
    justify-content: center;
    position: relative;
    grid-area: content;

    grid-template-areas:

        "title"
        "info"
        
        "image"
        
        "body";

`;

const StoryTitleWrapper = styled.div`

    grid-area: title;
    margin-bottom: 15px;


`;

const StoryTitle = styled.h1`

    color: #303030;
    line-height: 1;



`;

const InfoBar = styled.div`


    display: grid;
    overflow: hidden;
    grid-area: info;
    grid-template-columns: minmax(0px, min-content) 1fr minmax(0px, min-content);
    grid-auto-rows: 1fr minmax(0px, min-content);
    grid-template-areas:

        "image    name    social "
        "image    date    social ";

    //margin-bottom: 10px;


`;

const StoryImageWrapper = styled.div`

    width:100%;
    height: 0px;
    //min-height: 90px;
    //max-height: 300px;
    grid-area: 1 /1 /3 /-1;
    padding-top: 60%;
    position: relative;

    grid-area: image;
    
    
    
`;



const StoryImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;


`;
const StoryShareButtons = styled.div`

    
    display: flex;
    justify-content: end;
    grid-area: social;
    align-self: end;

    button{

        width: 25px;
        height: 25px;
        margin-bottom: 3px;
    }
    


`;

const PWrapper = styled.div`

    font-size: .9em;
    line-height: 1.6em;
    grid-area: body;
    text-indent: 45px;
    margin-top: 30px;
    padding: 0px 0px 0px 20px;
    font-family: 'IBM Plex Serif', serif;

    p{

        margin-bottom: 20px;
    }


`;

const Loading = styled.div`

    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    
    h1{
        margin:0 auto;
        line-height:100vh;
        vertical-align:middle;

    }

`;

const CommentDisplay = styled.div`

    display: grid;
    grid-template-columns: minmax(min-content, max-content) minmax(min-content, max-content) 1fr;
    grid-template-rows: minmax(min-content, max-content) 1fr 1fr minmax(min-content, max-content);
    grid-template-areas:

    "avatar nick date  "
    "avatar body body  "
    "  .    body body  "
    "  .    vote reply ";
    margin-bottom: 20px;


`;

const CommentReply = styled.div`



`;

const CommentBody = styled.p`
    overflow-wrap: break-word;
    word-wrap: break-word;

    -ms-word-break: break-all;

    word-break: break-word;



`;

const AuthorAvartar = styled.img`

    width: 40px;
    height: 40px;
    align-self: end;
    grid-area: image; 

`;

const AvatarTest = styled.img`

    display: none;

`;


function Article(props){

    const [userData, setUserData] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [artData, setArtData] = useState({})
    const [artDataComments, setArtDataComments] = useState([])
    const [state, setState] = useState("pending")
    const [avatarLoaded, setAvatarLoaded] = useState(false)

    let editLink = null;
    
    if(userData && userData.isAdmin)
    {
        editLink = <a href={`/ziploker/edit/${artData.id}`}>edit</a>;
    }

    console.log("Article_PROPS", props)
    
    const slug = props.match.params.id
            
    useEffect ((props) => {

        
        //const mode = process.env.NODE_ENV =="development" ? "http://127.0.0.1:3000" : "https://www.floiridablaze.io"
        axios.post("/blog/get_article_info", {
          
          data: { 
            slug: slug
            
          }
        },
        {withCredentials: true})
        .then(response => {
          

            console.log("article info Response", response)

            setUserData(response.data.user)
            setArtData(response.data.article)
            setArtDataComments(response.data.comments)
            setLoading(false);
          
          
        }).catch(error => {
          
          console.log("articleErrors", error)
        })
    },[])
    
        if (isLoading) {
            return <Loading><h1>Loading......</h1>


            </Loading>;
        }
    
    return (
    
        <>

        <AvatarTest src={artData.author_avatar}
            onLoad={() => setAvatarLoaded(true)}></AvatarTest>
        <ArticleSection>
            
           <HorizontalAds/>
            
            <NewsWrapper>
        
                <StoryTitleWrapper>
                    <StoryTitle>{artData.title}</StoryTitle>
                </StoryTitleWrapper>

                <InfoBar>

                    <AuthorAvartar src={avatarLoaded ? artData.author_avatar : defaultAvatar } />

                   


                    
                    <h4 style={{gridArea: "name", alignSelf: "end", fontSize: ".7rem", lineHeight: "normal"}}> {artData.author_nick} </h4>
                    <h4 style={{gridArea: "date", fontFamily: "serif", color: "#777777", alignSelf: "start", fontSize: ".7rem", lineHeight: "normal"}}>{artData.date}</h4>

                    <StoryShareButtons>
                        <FacebookShareButton children={<FacebookIcon size={25} round={false} borderRadius={17} />} url={"www.420.com"} style={{marginRight: "3px"}} />
                        <TwitterShareButton children={<TwitterIcon size={25} round={false} borderRadius={17}/>} url={"www.420.com"} style={{marginRight: "3px"}}/>
                        <WhatsappShareButton children={<WhatsappIcon size={25} round={false} borderRadius={17}/>} url={"www.420.com"} />
                    </StoryShareButtons>
                
                
                
                
                </InfoBar>

                
                
                <StoryImageWrapper>
                
                    <StoryImage src={artData.url}/>
                
                </StoryImageWrapper>
                
                
                

               <PWrapper dangerouslySetInnerHTML={{ __html: artData.body }}></PWrapper>

                   
                   
                <div style={{margin: "30px 30px"}}>

                <CommentForm userData={userData} articleID={artData.id} commentID="x" setArtDataComments={setArtDataComments}/>

                </div>

                <div>
                    {artDataComments.map((item,i) => 
                    
                        <ul key={i}>

                            <CommentDisplay>

                                <img style={{width: "25px", height: "25px", gridArea: "avatar", margin: "5px 10px 0px 5px"}} src={item.author_avatar}/>
                                <h3 style={{fontSize: ".6em", gridArea: "nick", marginRight: "8px"}}>{item.author_nick}</h3>
                                <span style={{gridArea: "date", fontSize: ".6em", color: "gray"}}><ReactTimeAgo date={item.created_at ? new Date(item.created_at) : null} locale="en-US" timeStyle="round-minute"/></span>
                                <CommentBody style={{gridArea: "body", fontSize: ".7em"}}>{item.body}</CommentBody>
                                

                                
                            </CommentDisplay>

                            <CommentReply>

                            {item.comments.map((item,i) => 
                        
                                <li style={{marginLeft: "15px", listStyleType: "none"}} key={i}>
                                {"id = " + item.id + ", commenting to " + item.commentable_id + " and its a " + item.commentable_type + " "}
                        
                                {item.body}
                            
                            
                        </li>
            
                    )}


                            </CommentReply>
                            
                        </ul>

                    
                        
                    ).reverse()}



                    <br/>
                    {editLink}



                    
                </div>
                
            </NewsWrapper>  
            
            

            <NewsAds/>

            
        
        </ArticleSection>

        
        
        </>
    );
}


export default Article;


/*



*/

  

