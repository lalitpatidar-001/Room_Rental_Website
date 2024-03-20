import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist"
import roomReducer from "./slices/roomSlice"
import visitsReducer from "./slices/visitsSlice"
import visitorsReducer from "./slices/visitorsSlice"
import wishlistReducer from "./slices/wishlistSlice"

const rootReducer = combineReducers({
   room:roomReducer,
   visits:visitsReducer,
   visitors:visitorsReducer,
   wishlist:wishlistReducer
});

const persistConfig = {
    key: "root",
    storage,
    version: 1,
    blacklist: ["visits"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddlewate) => getDefaultMiddlewate({
        serializableCheck: false,
        immutableCheck: false
    }),
});

const persistor = persistStore(store);

export { store, persistor }