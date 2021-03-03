import React, { useEffect } from "react";
import "./Hotstreamer.styl";
const Hotstreamer = ({ streamers }) => {


  return (
    <div className="hotStreamer">
      <h4>热门主播</h4>
      <hr />

      {streamers.map((streamer, index) => {
     return (  <div className="streamer-wrap" key={index}>
          <img src={`${streamer.picUrl}`} />
          <div className="streamer-content">
            <h4>
              <a href="#" className="streamer-name">
                {streamer.name}
              </a>
            </h4>
            <p>
              <a href="#">{streamer.desc}</a>
            </p>
          </div>
        </div>)
      })}
    </div>
  );
};
export default Hotstreamer;
