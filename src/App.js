import { useState } from 'react';
import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import { createTheme } from '@material-ui/core/styles';

import CharList from './components/CharList';

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const theme = createTheme();

function App() {
  const [search, setSearch] = useState('');
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(search);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Container>
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
        <Tab label="Multiverse" {...a11yProps} />
        <Tab label="Favorites" {...a11yProps} />
      </Tabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
          <CharList search={search} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
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

export default App;
