import {
  LEFT_BOUNDARY,
  RIGHT_BOUNDARY,
  SINGLE_DAY,
  SUPERSET,
  eventInDay,
} from '../time';

test('eventInDay returns null for events which do not intersect the given day', () => {
  expect(eventInDay(
    new Date('2019-10-12T12:17+0100'), // day
    new Date('2019-10-11T03:21+0100'), // startTime
    new Date('2019-10-11T08:11+0100') // endTime
  )).toEqual(null);

  expect(eventInDay(
    new Date('2019-10-12'), // day
    new Date('2019-10-13'), // startTime
    new Date('2019-10-14') // endTime
  )).toEqual(null);
});

test('eventInDay returns SUPERSET for events which intersect both the previous and next day', () => {
  expect(eventInDay(
    new Date('2019-10-12T12:17+0100'), // day
    new Date('2019-10-11T03:21+0100'), // startTime
    new Date('2019-10-13T08:11+0100') // endTime
  )).toEqual(SUPERSET);

  expect(eventInDay(
    new Date('2019-10-12'), // day
    new Date('2019-10-11'), // startTime
    new Date('2019-10-13') // endTime
  )).toEqual(SUPERSET);
});

test('eventInDay returns SINGLE_DAY for events which start and end on the day', () => {
  expect(eventInDay(
    new Date('2019-10-11T12:17+0100'), // day
    new Date('2019-10-11T03:21+0100'), // startTime
    new Date('2019-10-11T08:11+0100') // endTime
  )).toEqual(SINGLE_DAY);

  expect(eventInDay(
    new Date('2019-10-11'), // day
    new Date('2019-10-11'), // startTime
    new Date('2019-10-11') // endTime
  )).toEqual(SINGLE_DAY);
});

test('eventInday returns LEFT_BOUNDARY for events which start on the current day', () => {
  expect(eventInDay(
    new Date('2019-10-12T12:17+0100'), // day
    new Date('2019-10-12T03:21+0100'), // startTime
    new Date('2019-10-13T08:11+0100') // endTime
  )).toEqual(LEFT_BOUNDARY);

  expect(eventInDay(
    new Date('2019-10-12'), // day
    new Date('2019-10-12T03:21+0100'), // startTime
    new Date('2019-10-13T08:11+0100') // endTime
  )).toEqual(LEFT_BOUNDARY);

  expect(eventInDay(
    new Date('2019-10-12'), // day
    new Date('2019-10-12'), // startTime
    new Date('2019-10-14') // endTime
  )).toEqual(LEFT_BOUNDARY);
});

test('eventInday returns RIGHT_BOUNDARY for events which end on the current day', () => {
  expect(eventInDay(
    new Date('2019-10-12T12:17+0100'), // day
    new Date('2019-10-11T03:21+0100'), // startTime
    new Date('2019-10-12T08:11+0100') // endTime
  )).toEqual(RIGHT_BOUNDARY);

  expect(eventInDay(
    new Date('2019-10-12'), // day
    new Date('2019-10-11T03:21+0100'), // startTime
    new Date('2019-10-12T08:11+0100') // endTime
  )).toEqual(RIGHT_BOUNDARY);

  expect(eventInDay(
    new Date('2019-10-12'), // day
    new Date('2019-10-10'), // startTime
    new Date('2019-10-12') // endTime
  )).toEqual(RIGHT_BOUNDARY);
});
