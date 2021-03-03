import React, { useEffect } from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import Recommend from './discovery/Recommend';
import Toplist from './discovery/Toplist';
import Songslist from './discovery/Songslist';
import Album from './discovery/Album';
import Artists from './discovery/Artists';
import Livedj from './discovery/Livedj';
import './Discovery.styl'
import { getBannerAction } from '../common/actions';
import { useDispatch } from 'react-redux';
const Discovery=({match})=>{
    let dispatch=useDispatch()
    useEffect(()=>{
      dispatch(getBannerAction());
    },[])

    return(
        <div>
            <div className='redhead-line'>
            <NavLink to={`${match.url}/recommend`}>推荐</NavLink>
            <NavLink to={`${match.url}/toplist`}>排行榜</NavLink>
            <NavLink to={`${match.url}/songslist`}>歌单</NavLink>
            <NavLink to={`${match.url}/livedj`}>主播电台</NavLink>
            <NavLink to={`${match.url}/artists`}>歌手</NavLink>
            <NavLink to={`${match.url}/album`}>新碟上架</NavLink>
            </div>
            <Route path={`${match.url}`} render={()=>(<Redirect to={`${match.url}/recommend`}/>)}/>
            <Switch>
            {/**NESTED REDIRECT TO /RECOMMEND */}
            
            <Route path={`${match.url}/recommend`} component={Recommend}/>
            <Route path={`${match.url}/toplist`} component={Toplist}/>
            <Route path={`${match.url}/songslist`} component={Songslist}/>
            <Route path={`${match.url}/livedj`} component={Livedj}/>
            <Route path={`${match.url}/artists`} component={Artists}/>
            <Route path={`${match.url}/album`} component={Album}/>

            </Switch>
           
            
        </div>
    )
}
export default Discovery;