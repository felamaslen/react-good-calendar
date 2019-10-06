import addMonths from 'date-fns/addMonths';

export const NAVIGATED = 'NAVIGATED';
export const NOW_SET = 'NOW_SET';

export const initialState = {
  date: new Date(),
  now: new Date(),
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case NAVIGATED:
      return {
        ...state,
        date: addMonths(state.date, action.direction),
      };

    case NOW_SET:
      return { ...state, now: new Date() };

    default:
      return state;
  }
}
