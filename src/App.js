import { useEffect, useState } from 'react';
import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import { createTheme } from '@material-ui/core/styles';

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

  return (
    <Container>
      <Image src={Logo} />
      <button onClick={() => localStorage.removeItem('Favorites')}>
        Clear
      </button>
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

      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Multiverse" />
        <Tab label="Favorites" />
      </Tabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
          <CharList
            search={search}
            favorites={favorites}
            handleFavorite={handleFavorite}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FavoriteCharList
            search={search}
            favorites={favorites}
            handleFavorite={handleFavorite}
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

export default App;
