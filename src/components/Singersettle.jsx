import React from "react";
import "./Singersettle.styl";
const Singersettle = ({ singers }) => {
  return (
    <div className="singer-settle">
      <h4>入驻歌手</h4>
      <hr />

      {singers.map((singer, index) => {
        return (
          <div className="singer-wrap" key={index}>
            <img src={`${singer.picUrl}?param=62x62`} alt="singer" />
            <div className="singer-desc">
              <h4>{singer.name}</h4>

              <p>流行歌手</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Singersettle;
