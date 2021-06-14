import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';


import TimeAgo from 'javascript-time-ago'
TimeAgo.addDefaultLocale(en)
import ReactTimeAgo from 'react-time-ago'
import en from 'javascript-time-ago/locale/en'
import CommentForm from './commentForm'
import CommentReplyForm from './commentReplyForm'

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


    
    
    /* display: grid;
    
    grid-template-columns: minmax(200px, 700px);
   
    justify-content: center;
    justify-items: center;
    margin: 50px auto 0px auto; */

    
    display: grid;
    grid-template-columns: minmax(651px, 1100px) 300px;
    justify-content: center;
    margin-top: 20px;
    margin-left: 14px;
    margin-right: 14px;
    grid-column-gap: 28px;

    @media only screen and (max-width: 600px){

        grid-template-columns: 1fr;


    }
        

        
    
`;






const NewsWrapper = styled.div`

    display: grid;
    grid-template-columns: 100%;
    justify-content: center;
    position: relative;
    grid-area: 2/1/3/2;
    max-width: 770px;

    grid-template-areas:

        
        "info"
        
        "image"
        
        "body"
        "comments";

`;

const StoryTitleWrapper = styled.div`

    grid-area: 1/1/2/3;
    margin: 16px;
    justify-self: start;


`;

const StoryTitle = styled.h1`

    color: #303030;
   
    font-size: 60px;
    font-weight: 700;
    line-height: 1.2em;


    color: #111111;
    
    @media only screen and (max-width: 800px){

        font-size: 50px;


    }
    @media only screen and (max-width: 600px){

        font-size: 30px;


    }




`;

const InfoBar = styled.div`


    display: grid;
    overflow: hidden;
    grid-area: 4/1/5/2;
    grid-template-columns: minmax(0px, min-content) 1fr minmax(0px, min-content);
    grid-auto-rows: 1fr minmax(0px, min-content);
    grid-template-areas:

        "flexbox    flexbox    social "
        "flexbox    flexbox    social ";

    margin-top: 25px;
    align-content: center;
    padding: 0px 20px;

    @media only screen and (max-width: 420px){


        grid-template-columns: minmax(100px, min-content) ;
        grid-auto-rows: 1fr 1fr;
        margin-top: 0px;
        grid-template-areas:

        "social social "
        "flexbox flexbox ";


    }

    

`;

const FlexBar = styled.div`
    display: flex;
    grid-area: flexbox;
    align-items: center;

    @media only screen and (max-width: 420px){

        justify-content: start;
        margin-top: 8px;

    }
    


`;

const StoryImageWrapper = styled.div`

    width:100%;
    height: 0px;
    //min-height: 90px;
    //max-height: 300px;
    
    padding-top: 60%;
    position: relative;
    
    
    
    grid-area: 2/1/3/2;
    
    
    
`;



const StoryImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;


`;

const Caption = styled.div`

    font-size: 13px;
    line-height: 1.7;
    font-style: italic;
    color: #999999;
    padding: 12px;
    margin: 0 20px;
    border-bottom: 1px solid #c0c0c0;
    grid-area: 3/1/4/2;

`;
const StoryShareButtons = styled.div`

    
    display: flex;
    justify-content: end;
    grid-area: social;
    align-self: center;

    @media only screen and (max-width: 420px){

        //justify-self: center;

    }

    button{

        width: 25px;
        height: 25px;
        margin-bottom: 3px;
    }
    


`;

const PWrapper = styled.div`

    //font-size: .9em;
    line-height: 1.9em;
    grid-area: 5/1/6/2;
    //text-indent: 45px;
    margin-top: 16px;
    padding: 0px 20px;
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

const Comments = styled.div`


    grid-area: 6/1/7/2;


`;

const CommentFormWrapper = styled.div`

    margin: 30px 30px;
    grid-area: 7/1/8/2;

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
    border: 1px solid gray;
    border-radius: 50%;
    margin-right: 8px;

    

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
            
           
            <StoryTitleWrapper>
                <StoryTitle>{artData.title}</StoryTitle>
            </StoryTitleWrapper>

            <Caption>
                {artData.caption}
            </Caption>
            
            
            
           
        
                

                <InfoBar>

                    <FlexBar>
                        <AuthorAvartar src={avatarLoaded ? artData.author_avatar : defaultAvatar } />
                        <h4 style={{fontSize: ".7rem", lineHeight: "normal"}}>by FloridaBlaze</h4>
                        <div style={{margin: "0px 5px"}}>|</div>
                        <h4 style={{fontFamily: "serif", color: "#777777", fontSize: ".7rem", lineHeight: "normal", marginRight: "8px"}}>{artData.date}</h4>
                    </FlexBar>
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

                   
                   
                <CommentFormWrapper>

                    <CommentForm userData={userData} storyID={artData.id} setArtDataComments={setArtDataComments}/>

                </CommentFormWrapper>

                <Comments>
                    {artDataComments.map((item,i) => 
                    
                        <ul key={i}>

                            <CommentDisplay>

                                <img style={{width: "25px", height: "25px", gridArea: "avatar", margin: "5px 10px 0px 5px"}} src={item.author_avatar}/>
                                <h3 style={{fontSize: ".6em", gridArea: "nick", marginRight: "8px"}}>{item.author_nick}</h3>
                                <span style={{gridArea: "date", fontSize: ".6em", color: "gray"}}><ReactTimeAgo date={item.created_at ? new Date(item.created_at) : null} locale="en-US" timeStyle="round-minute"/></span>
                                <CommentBody style={{gridArea: "body", fontSize: ".7em"}}>{item.body}</CommentBody>
                                <CommentReplyForm userData={userData} storyID={artData.id} commentID={item.id} setArtDataComments={setArtDataComments}/>
                                

                                
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



                    
                </Comments>
                
              
            
            

           

            
        
        </ArticleSection>

        
        
        </>
    );
}


export default Article;


/*



*/

  

