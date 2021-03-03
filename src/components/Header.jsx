import React from "react";
import { NavLink, Switch,Route} from 'react-router-dom'
import styled from 'styled-components';
import  './Header.styl';
import {Input} from 'antd';
import {SearchOutlined } from '@ant-design/icons';
const Headlink=styled(NavLink)`
  text-decoration:none;
  padding:30px 20px;
  color:gray;
  
`
const prefix=(<SearchOutlined />)
const Header = (props) => {
  return (
    <div className='header'>
      <a href='/' className='sprite-01 logo'>网易云音乐</a>
      <Headlink  to="/discovery" exact>发现音乐<i className='sprite-01 active-icon'></i></Headlink>
      <Headlink  to="/mymusic">我的音乐<i className='sprite-01 active-icon'></i></Headlink>
      <Headlink  to="/friends">朋友<i className='sprite-01 active-icon'></i></Headlink>
      <Headlink  to="/store">商城<i className='sprite-01 active-icon'></i></Headlink>
      <Headlink  to="/musicman">音乐人<i className='sprite-01 active-icon'></i></Headlink>
      <Headlink  to="/download">下载客户端
      <i className='sprite-01 hot-icon'></i>
      <i className='sprite-01 active-icon'></i></Headlink>
      <Input placeholder='音乐/视频/电台/用户' style={{borderRadius:'20px',width:'200px'}} prefix={prefix} className='Head-input'/>
    
    </div>
  );
};
export default Header;