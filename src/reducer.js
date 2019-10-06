import addMonths from 'date-fns/addMonths';

export const NAVIGATED = 'NAVIGATED';

export const initialState = {
  date: new Date(),
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case NAVIGATED:
      return {
        ...state,
        date: addMonths(state.date, action.direction),
      };

    default:
      return state;
  }
}
