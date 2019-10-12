import React, {
  useRef,
  useReducer,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import {
  StateContext,
  EventsContext,
} from './context';
import reducer, {
  NAVIGATED,
  NOW_SET,
  initialState,
} from './reducer';
import * as Styled from './styles';
import baseTheme from './theme';
import { eventShape } from './modules/types';

import Toolbar from './toolbar';
import ViewMonth from './views/month';

export default function ReactGoodCalendar({
  theme,
  events,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fullTheme = useMemo(() => ({
    ...baseTheme,
    ...theme,
  }), [theme]);

  const navigateNext = useCallback(() => dispatch({ type: NAVIGATED, direction: 1 }), []);
  const navigatePrev = useCallback(() => dispatch({ type: NAVIGATED, direction: -1 }), []);

  const nowTimer = useRef();
  useEffect(() => {
    nowTimer.current = setInterval(() => dispatch({ type: NOW_SET }), 5000);

    return () => clearInterval(nowTimer.current);
  }, []);

  return (
    <StateContext.Provider value={state}>
      <ThemeProvider theme={fullTheme}>
        <Styled.Container>
          <Toolbar
            navigateNext={navigateNext}
            navigatePrev={navigatePrev}
          />
          <EventsContext.Provider value={events}>
            <ViewMonth />
          </EventsContext.Provider>
        </Styled.Container>
      </ThemeProvider>
    </StateContext.Provider>
  );
}

ReactGoodCalendar.propTypes = {
  theme: PropTypes.shape({
    weekHeight: PropTypes.number,
  }),
  events: PropTypes.arrayOf(eventShape.isRequired),
};

ReactGoodCalendar.defaultProps = {
  theme: {},
  events: [],
};
