import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';

import { StateContext } from '../context';
import * as Styled from './styles';

const Toolbar = ({
  navigateNext,
  navigatePrev,
}) => {
  const { date } = useContext(StateContext);

  return (
    <Styled.Toolbar>
      <Styled.Title>{format(date, 'MMMM yyyy')}</Styled.Title>
      <Styled.Button onClick={navigatePrev}>&lt;</Styled.Button>
      <Styled.Button onClick={navigateNext}>&gt;</Styled.Button>
    </Styled.Toolbar>
  );
};

Toolbar.propTypes = {
  navigateNext: PropTypes.func.isRequired,
  navigatePrev: PropTypes.func.isRequired,
};

export default memo(Toolbar);
