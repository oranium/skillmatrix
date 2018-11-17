import { createStore } from 'redux';
import reducer from './reducers';
import { loadState, saveState} from './localStorage';

// state management with redux
const persistedState = loadState();


const store = createStore(
    reducer,
    persistedState
);


store.subscribe(
    () => 
    {
        saveState(store.getState());
    }
);

export default store;