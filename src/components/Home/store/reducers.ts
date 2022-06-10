import { moduleReducer } from 'src/store/tools';
import { Actions } from './actions';
import { initStates, State } from './initState';

const reducer = moduleReducer<State>(
    {
        [Actions.updateState]: (state, action) => {
            return {
                ...state,
                count: action.payload,
            };
        },
    },
    initStates,
);

export default reducer;
