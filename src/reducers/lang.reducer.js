import { LANGUAGE_CHANGE } from '../constants';

const initialState = {
  lang: 'fi',
};

const language = (state = initialState, action) => {
  switch (action.type) {
    case LANGUAGE_CHANGE:
      return Object.assign(
        {},
        { ...state },
        {
          lang: action.lang,
        },
      );
    default:
      return state;
  }
};

export default language;
