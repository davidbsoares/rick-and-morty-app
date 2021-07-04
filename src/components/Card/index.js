import React from 'react';
import styled from 'styled-components';

import MuiCard from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';

const Card = ({ char, favorites, handleFavorite }) => {
  return (
    <StyledCard>
      <StyledCardMedia image={char.image} title={char.name} />
      <CardContent>
        <TitleWrapper>
          <Typography variant="h5">{char.name}</Typography>
          <StyledCheckbox
            size="medium"
            checked={favorites.includes(char.id)}
            icon={<FavoriteBorder />}
            checkedIcon={<StyledFavorite />}
            value={char.id}
            onChange={(e) => handleFavorite(e)}
          />
        </TitleWrapper>
        <Typography variant="body2" color="text.secondary">
          Origin: {char.origin.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gender: {char.gender}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

const StyledCard = styled(MuiCard)`
  height: 430px;
  width: 345px;
`;
const StyledCardMedia = styled(CardMedia)`
  height: 300px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledCheckbox = styled(Checkbox)`
  :hover {
    background-color: inherit;
  }

  .MuiTouchRipple-child {
    background-color: #97ce4c;
  }
`;

const StyledFavorite = styled(Favorite)`
  color: #97ce4c;
`;

export default Card;
