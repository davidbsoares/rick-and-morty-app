import React from 'react';
import styled from 'styled-components';

import Card from '../Card';
import Pagination from '@material-ui/core/Pagination';

export default function CharList({
  favorites,
  handleFavorite,
  pages,
  handlePage,
  characterList,
}) {
  return (
    <Container>
      <CardWrapper>
        {characterList.map((char, id) => {
          return (
            <Card
              key={id}
              char={char}
              favorites={favorites}
              handleFavorite={handleFavorite}
            />
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
  width: 100%;
`;

const CardWrapper = styled.div`
  width: 90vw;
  min-height: 1000px;

  margin: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(345px, 1fr));
  grid-gap: 1rem;

  justify-items: center;
  align-items: center;
`;

const StyledPagination = styled(Pagination)`
  margin-top: 1rem;
`;
