import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import getDate from 'date-fns/getDate';

import * as Styled from './styles';

export default function Day({ day }) {
  const title = useMemo(() => getDate(day), [day]);

  return (
    <Styled.Day>
      <Styled.DayTitle>{title}</Styled.DayTitle>
    </Styled.Day>
  );
}

Day.propTypes = {
  day: PropTypes.instanceOf(Date).isRequired,
};
