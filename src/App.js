import React from 'react';
import './App.css';

import ReactGoodCalendar from './react-good-calendar';

const theme = {
  // weekHeight: 128,
};

function App() {
  return (
    <div className="App">
      <ReactGoodCalendar
        theme={theme}
      />
    </div>
  );
}

export default App;
