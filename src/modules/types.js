import PropTypes from 'prop-types';

export const eventShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  startTime: PropTypes.instanceOf(Date).isRequired,
  endTime: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
});
