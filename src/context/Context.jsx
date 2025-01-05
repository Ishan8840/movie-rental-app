import { createContext, useState, useContext } from "react";
import { Map } from 'immutable';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [genres, setGenres] = useState([]);
  const [cart, setCart] = useState(Map());

  return (
    <StoreContext.Provider value={{ cart, setCart, email, setEmail, pass, setPass, genres, setGenres, firstName, setFirstName, lastName, setLastName, signedIn, setSignedIn }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStoreContext = () => {
  return useContext(StoreContext);
}