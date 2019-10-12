import isAfter from 'date-fns/isAfter';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import isSameDay from 'date-fns/isSameDay';

export const LEFT_BOUNDARY = 1;
export const RIGHT_BOUNDARY = 2;
export const SINGLE_DAY = 3;
export const SUPERSET = 4;

export function eventInDay(day, startTime, endTime) {
  if (isAfter(day, endOfDay(endTime)) || isAfter(startOfDay(startTime), day)) {
    return null;
  }
  const rightBoundary = isSameDay(day, endTime);
  const leftBoundary = isSameDay(day, startTime);

  if (rightBoundary && leftBoundary) {
    return SINGLE_DAY;
  }

  if (rightBoundary) {
    return RIGHT_BOUNDARY;
  }
  if (leftBoundary) {
    return LEFT_BOUNDARY;
  }

  return SUPERSET;
}
