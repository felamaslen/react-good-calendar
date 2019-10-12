import React from 'react';
import Calendar from 'react-good-calendar';

const theme = {
  // weekHeight: 128,
  // borderColor: 'rgb(220, 220, 220)',
  // eventFontSize: 14,
  // eventMargin: 2,
  // eventPadding: 8,
};

const events = [
  {
    id: 'event-1',
    startTime: new Date(Date.now() - 1000 * (86400 * 3 - 3600 * 2.5)),
    endTime: new Date(Date.now() + 1000 * 86400 * 1.5),
    title: 'Partay',
    color: '#fea031',
  },
  {
    id: 'event-2',
    startTime: new Date(),
    endTime: new Date(),
    title: 'Point in time (today)',
    color: 'darkgreen',
  },
  {
    id: 'event-3',
    startTime: new Date(Date.now() + 1000 * (86400 * 1.5)),
    endTime: new Date(Date.now() + 1000 * (86400 * 1.5)),
    title: 'In future',
    color: 'cyan',
  },
];

const App = () => (
  <Calendar
    theme={theme}
    events={events}
  />
);

export default App;
