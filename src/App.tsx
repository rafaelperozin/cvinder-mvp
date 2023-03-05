
import React from 'react';
import './App.css';
import { Application } from 'src/pages/application.page';
import { StoreProvider } from 'src/contexts/store.context';
import { Header } from 'src/layouts/header.layout';

const App = () => {
  return (
    <StoreProvider>
      <div className="App">
        <Header />
        <Application />
      </div>
    </StoreProvider>
  );
}

export default App;
