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

export default function CharList({ search }) {
  const [CharacterList, GetCharacterList] = useState([]);
  const [pages, setPages] = useState();
  const [selectedPage, setSelectedPage] = useState(1);

  console.log(pages);
  console.log(selectedPage);

  useEffect(() => {
    axios
      .get(
        `https://rickandmortyapi.com/api/character/?page=${selectedPage}&name=${search}`
      )
      .then((response) => {
        GetCharacterList(response.data.results);
        setPages(response.data.info.pages);
        console.log('passou');
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search, selectedPage]);

  const handlePage = (e) => {
    setSelectedPage(e);
  };

  return (
    <Container>
      <CardWrapper>
        {CharacterList.map((chars, id) => {
          return (
            <StyledCard sx={{ width: 345 }} key={id}>
              <CardMedia
                sx={{ height: 300 }}
                image={chars.image}
                title={chars.name}
              />
              <CardContent>
                <TitleWrapper>
                  <Typography variant="h5">{chars.name}</Typography>
                  <StyledCheckbox
                    size="medium"
                    icon={<FavoriteBorder />}
                    checkedIcon={<StyledFavorite />}
                  />
                </TitleWrapper>
                <Typography variant="body2" color="text.secondary">
                  Origin: {chars.origin.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gender: {chars.gender}
                </Typography>
              </CardContent>
            </StyledCard>
          );
        })}
      </CardWrapper>
      <Pagination
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
  position: relative;
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
