import React from 'react';
import styled from 'styled-components';

import Card from '../Card';

const FavoritesWrapper = ({ favorites, favoritesList, handleFavorite }) => {
  const length = favorites.length;
  console.log(length);
  if (length > 1) {
    return favoritesList.map((char, id) => {
      return (
        <Card
          key={id}
          char={char}
          favorites={favorites}
          handleFavorite={handleFavorite}
        />
      );
    });
  }
  if (length === 1) {
    return (
      <Card
        char={favoritesList}
        favorites={favorites}
        handleFavorite={handleFavorite}
      />
    );
  }
  if (length === 0) {
    return <div>"Adicionar Favoritos"</div>;
  }
};

export default function FavoriteCharList({
  favoritesList,
  favorites,
  handleFavorite,
}) {
  return (
    <Container>
      <CardWrapper>
        <FavoritesWrapper
          favorites={favorites}
          favoritesList={favoritesList}
          handleFavorite={handleFavorite}
        />
      </CardWrapper>
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
