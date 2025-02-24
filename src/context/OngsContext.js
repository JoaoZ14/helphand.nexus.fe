import React, { createContext, useContext, useState } from 'react';

const OngsContext = createContext();

const ongsData = [
  { id: 1, name: 'ONG 1', description: 'Aliqua exercitation mollit anim nisi ea. Ex esse veniam anim irure ut.', address: { cep: '27537-278', street: 'Street 1', city: 'City 1', state: 'State 1' }, image: 'https://source.unsplash.com/300x200/?charity1' },
  { id: 2, name: 'ONG 2', description: 'Description 2', address: { cep: '27537-278', street: 'Street 2', city: 'City 2', state: 'State 2' }, image: 'https://source.unsplash.com/300x200/?charity2' },
  { id: 3, name: 'ONG 3', description: 'Description 3', address: { cep: '27537-278', street: 'Street 3', city: 'City 3', state: 'State 3' }, image: 'https://source.unsplash.com/300x200/?charity3' },
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
