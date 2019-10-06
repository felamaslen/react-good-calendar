import React, {
  useReducer,
  useMemo,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import {
  StateContext,
} from './context';
import reducer, {
  NAVIGATED,
  initialState,
} from './reducer';
import * as Styled from './styles';
import baseTheme from './theme';

import Toolbar from './toolbar';
import ViewMonth from './views/month';

export default function ReactGoodCalendar({
  theme,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fullTheme = useMemo(() => ({
    ...baseTheme,
    ...theme,
  }), [theme]);

  const navigateNext = useCallback(() => dispatch({ type: NAVIGATED, direction: 1 }), []);
  const navigatePrev = useCallback(() => dispatch({ type: NAVIGATED, direction: -1 }), []);

  return (
    <StateContext.Provider value={state}>
      <ThemeProvider theme={fullTheme}>
        <Styled.Container>
          <Toolbar
            navigateNext={navigateNext}
            navigatePrev={navigatePrev}
          />
          <ViewMonth />
        </Styled.Container>
      </ThemeProvider>
    </StateContext.Provider>
  );
}

ReactGoodCalendar.propTypes = {
  theme: PropTypes.shape({
    weekHeight: PropTypes.number,
  }),
};

ReactGoodCalendar.defaultProps = {
  theme: {},
};
