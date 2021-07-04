import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { createTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';

import ReactLoading from 'react-loading';

import CharList from './components/CharList';
import FavoriteCharList from './components/FavoriteCharList';
import Logo from './assets/logo.png';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

const theme = createTheme();

function App() {
  const [search, setSearch] = useState('');
  const [value, setValue] = useState(0);

  const token = JSON.parse(localStorage.getItem('Favorites'));
  const [favorites, setFavorites] = useState(token ? token : []);
  const [favoritesList, setFavoritesList] = useState([]);
  const [characterList, getCharacterList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [pages, setPages] = useState();
  const [selectedPage, setSelectedPage] = useState(1);

  const handleLoading = (e) => {
    setLoading(e);
  };

  const handlePage = (e) => {
    getCharacterList([]);
    setSelectedPage(e);
  };

  const removeItem = (index) => {
    var newFavorites = favorites;
    newFavorites.splice(index, 1);
    setFavorites([...newFavorites]);
  };

  const handleFavorite = (e) => {
    const checked = e.target.checked;
    const value = parseInt(e.target.value);
    const index = favorites.indexOf(value);

    if (checked && !favorites.includes(value)) {
      setFavorites((favorites) => [...favorites, value]);
    } else {
      removeItem(index);
    }
  };

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    localStorage.setItem('Favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    axios
      .get(
        `https://rickandmortyapi.com/api/character/?page=${selectedPage}&name=${search}`
      )
      .then((response) => {
        getCharacterList(response.data.results);
        setPages(response.data.info.pages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search, selectedPage]);

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${favorites}`)

      .then((response) => {
        console.log(response);
        setFavoritesList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [favorites]);

  useEffect(() => {
    if (characterList.length === 0) {
      handleLoading(true);
    } else {
      handleLoading(false);
    }
  }, [characterList]);

  return (
    <Container>
      <Image src={Logo} />

      <Section margin="5rem 0 1rem">
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => handleSearch(e)}
        />
      </Section>

      <StyledTabs value={value} onChange={handleChange} centered>
        <Tab label="Multiverse" />
        <Tab label="Favorites" />
      </StyledTabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
          {loading ? (
            <StyledReactLoading
              type="spinningBubbles"
              color="#97ce4c"
              height={100}
              width={100}
            />
          ) : (
            <CharList
              search={search}
              favorites={favorites}
              handleFavorite={handleFavorite}
              pages={pages}
              handlePage={handlePage}
              characterList={characterList}
            />
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FavoriteCharList
            search={search}
            favorites={favorites}
            handleFavorite={handleFavorite}
            favoritesList={favoritesList}
          />
        </TabPanel>
      </SwipeableViews>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Section = styled.div`
  margin: ${({ margin }) => margin && `${margin}`};
  width: 40vw;
`;

const Image = styled.img`
  width: 640px;
  height: 272px;
`;

const StyledTabs = styled(Tabs)`
  .Mui-selected {
    color: #97ce4c;
  }
  .MuiTabs-indicator {
    background-color: #97ce4c;
  }
`;

const StyledReactLoading = styled(ReactLoading)`
  margin-top: 100px;
`;

export default App;
