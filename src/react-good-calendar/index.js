import React, {
  useReducer,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import {
  StateContext,
} from './context';
import reducer, { initialState } from './reducer';
import * as Styled from './styles';
import baseTheme from './theme';
import ViewMonth from './views/month';

export default function ReactGoodCalendar({
  theme,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fullTheme = useMemo(() => ({
    ...baseTheme,
    ...theme,
  }), [theme]);

  return (
    <StateContext.Provider value={state}>
      <ThemeProvider theme={fullTheme}>
        <Styled.Container>
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
