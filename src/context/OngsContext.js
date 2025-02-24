import React, { createContext, useContext, useState } from 'react';

const OngsContext = createContext();

const ongsData = [
  { id: 1, name: 'ONG 1', description: 'Description 1', address: 'Address 1', image: 'https://source.unsplash.com/300x200/?charity1' },
  { id: 2, name: 'ONG 2', description: 'Description 2', address: 'Address 2', image: 'https://source.unsplash.com/300x200/?charity2' },
  { id: 3, name: 'ONG 3', description: 'Description 3', address: 'Address 3', image: 'https://source.unsplash.com/300x200/?charity3' },
];

export const OngsProvider = ({ children }) => {
  const [ongs, setOngs] = useState(ongsData);

  return (
    <OngsContext.Provider value={{ ongs, setOngs }}>
      {children}
    </OngsContext.Provider>
  );
};

export const useOngs = () => {
  return useContext(OngsContext);
};
