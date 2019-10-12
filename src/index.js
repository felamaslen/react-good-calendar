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
  ComponentsContext,
  EventsContext,
} from './context';
import reducer, {
  NAVIGATED,
  NOW_SET,
  initialState,
} from './reducer';
import * as Styled from './styles';
import baseTheme from './theme';
import baseComponents from './components';
import { eventShape } from './modules/types';

import Toolbar from './toolbar';
import ViewMonth from './views/month';

export default function ReactGoodCalendar({
  theme,
  components,
  events,
  onNewEvent,
  onEditEvent,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fullTheme = useMemo(() => ({
    ...baseTheme,
    ...theme,
  }), [theme]);

  const fullComponents = useMemo(() => ({
    ...baseComponents,
    ...components,
  }), [components]);

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
        <ComponentsContext.Provider value={fullComponents}>
          <Styled.Container>
            <Toolbar
              navigateNext={navigateNext}
              navigatePrev={navigatePrev}
            />
            <EventsContext.Provider value={events}>
              <ViewMonth
                onNewEvent={onNewEvent}
                onEditEvent={onEditEvent}
              />
            </EventsContext.Provider>
          </Styled.Container>
        </ComponentsContext.Provider>
      </ThemeProvider>
    </StateContext.Provider>
  );
}

ReactGoodCalendar.propTypes = {
  theme: PropTypes.shape({
    weekHeight: PropTypes.number,
  }),
  components: PropTypes.shape({
    Toolbar: PropTypes.func,
  }),
  events: PropTypes.arrayOf(eventShape.isRequired),
  onNewEvent: PropTypes.func,
  onEditEvent: PropTypes.func,
};

ReactGoodCalendar.defaultProps = {
  theme: {},
  components: {},
  events: [],
  onNewEvent: () => null,
  onEditEvent: () => null,
};
