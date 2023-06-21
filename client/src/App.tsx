import React from 'react';
import './App.css';
import Navbar from './components/Navbar';

import Router from './Router';


function App() {

  const [search, setSearch] = React.useState<string>('')

  return (
    <div>
      <Navbar setSearch={setSearch} search={search} />
      <Router search={search} />
    </div>
  );
}

export default App;