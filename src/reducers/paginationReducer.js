import { CHANGE_ADVERT_PAGE, CHANGE_ROWS_PER_PAGE, CHANGE_PAGINATION } from '../constants';
// import { scrollToTop } from '../utils/helperFunctions';

const initialState = {
  selectedPage: {
    selected: 0,
  },
  rowsPerPage: 10,
  isToChangePage: true,
};

export default function paginationReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ADVERT_PAGE:
      // scrollToTop();
      return {
        ...state,
        selectedPage: action.selected,
      };

    case CHANGE_ROWS_PER_PAGE:
      return {
        ...state,
        rowsPerPage: action.rows,
      };

    case CHANGE_PAGINATION:
      return {
        ...state,
        isToChangePage: action.changePage,
      };

    default:
      return state;
  }
}
