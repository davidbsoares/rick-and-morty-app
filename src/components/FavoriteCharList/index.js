import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';

import Pagination from '@material-ui/core/Pagination';

export default function FavoriteCharList({
  search,
  favorites,
  handleFavorite,
}) {
  const [favoritesList, setFavoritesList] = useState([]);
  const [pages, setPages] = useState();
  const [selectedPage, setSelectedPage] = useState(1);

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${favorites}`)

      .then((response) => {
        setFavoritesList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search, selectedPage, favorites]);

  const handlePage = (e) => {
    setSelectedPage(e);
  };

  return (
    <Container>
      <CardWrapper>
        {favoritesList &&
          favoritesList.map((char, id) => {
            return (
              <StyledCard sx={{ width: 345 }} key={id}>
                <CardMedia
                  sx={{ height: 300 }}
                  image={char.image}
                  title={char.name}
                />
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
          })}
      </CardWrapper>
      <StyledPagination
        count={pages}
        hidePrevButton
        hideNextButton
        onChange={(_, p) => handlePage(p)}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CardWrapper = styled.div`
  width: 90vw;
  margin: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(345px, 1fr));
  grid-gap: 1rem;

  justify-items: center;
  align-items: center;
`;

const StyledCard = styled(Card)`
  height: 430px;
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

const StyledPagination = styled(Pagination)`
  margin-top: 1rem;
`;
