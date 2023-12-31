import React from "react";
import "./MusicCategory.css";
import Card from "../Card/Card";
const MusicCaterogy = ({ title, description, list = [] }) => {
  return (
    <div className="sound_music-music_category">
      <div className="sound_cloud-music_category">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="sound_cloud-music_category_grid" key={title}>
        {list.map((item, i) => (
          <Card key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MusicCaterogy;
