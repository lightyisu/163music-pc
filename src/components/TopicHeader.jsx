import React from 'react';
import styled from 'styled-components';

const I=styled.i`
    text-indent:-9999px;
    width:20px;
    height:20px;
    display:inline-block;
    background-position:-230px -160px;
`
const H2=styled.h2`
    display:inline-block;
    margin:0 10px;
`
const Link=styled.a`
    margin:0px 5px;
    color:gray;
    &:after{
        content:' |';
        margin-left:2px;
    }
`
const Hr=styled.hr`
    background-color:rgb(193, 13, 12);
    border:0.5px solid rgb(193, 13, 12);
`
const TopicHeader=({title,keywords=[]})=>{
    return(
        <div>
            <I className='sprite-02'>Xo</I>
            <H2>{title}</H2>
            {keywords.map((key,index)=>{
                return (
                    <Link href='#' key={index}>
                        {key}
                    </Link>
                )
            })}
            <Hr/>
        </div>
    )
}
export default TopicHeader;