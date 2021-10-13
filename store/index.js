import { createStore, applyMiddleware, combineReducers } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import { rootReducer } from "../reducers";
import { persistStore, persistReducer } from "redux-persist"
import AsyncStorage from "redux-persist/lib/storage"

//COMBINING ALL REDUCERS
const combinedReducer = rootReducer;
const makeStore = ({ isServer }) => {
  if (isServer) {
    //If it's on server side, create a store
    return createStore(combinedReducer);
  } else {
    const persistConfig = {
      key: "nextjs",
      whitelist: ["counter"], // only counter will be persisted, add other reducers if needed
      storage: AsyncStorage, // if needed, use a safer storage
    };
    const persistedReducer = persistReducer(persistConfig, combinedReducer); // Create a new reducer with our existing reducer
    const store = createStore(
      persistedReducer,
    ); // Creating the store again

    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature
    return store;
  }
};

// Export the wrapper & wrap the pages/_app.js with this wrapper only
export const wrapper = createWrapper(makeStore);
