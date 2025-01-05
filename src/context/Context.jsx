import { createContext, useState, useContext } from "react";
import { Map } from 'immutable';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [genres, setGenres] = useState([]);
  const [cart, setCart] = useState(Map());

  return (
    <StoreContext.Provider value={{ cart, setCart, genres, setGenres, user, setUser }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStoreContext = () => {
  return useContext(StoreContext);
}