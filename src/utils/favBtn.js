import React from 'react';
import { Button } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

export const FavBtn = ({ isFav, handleFav, btnText }) => {
  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleFav} className="fullWidthBtn">
        <FavoriteIcon className="fav_icon" style={{ color: isFav ? '#34495E' : 'white' }} />
        <span style={{ marginLeft: 8 }}>{btnText}</span>
      </Button>
    </div>
  );
};
