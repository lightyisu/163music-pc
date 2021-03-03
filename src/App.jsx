import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import './App.styl'
import Header from './components/Header';
import Footer from './components/Footer';
import { Redirect, Route,Switch } from 'react-router-dom';
import Discovery from './pages/Discovery';
import Mymusic from './pages/Mymusic';
import Friends from './pages/Friends';
const App=props=>{
  return (
    <div>
      <Header/>
     
      <Switch>
        <Route path='/' exact render={()=>(<Redirect to='/discovery'/>)}/>
        <Route path='/discovery' component={Discovery}/>
        <Route path='/mymusic' component={Mymusic}/>
        <Route path='/friends' component={Friends}/>
      </Switch>
      <Footer/>
    </div>
  )
}

export default App
