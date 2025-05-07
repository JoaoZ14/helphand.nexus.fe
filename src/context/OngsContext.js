import React, { createContext, useState, useContext, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

const OngsContext = createContext({});

export const OngsProvider = ({ children }) => {
  const [ongs, setOngs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOngs = async () => {
      try {
        const ongsCollection = collection(db, 'ongs');
        const ongsSnapshot = await getDocs(ongsCollection);
        const ongsData = ongsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).filter(ong => ong.ativo);
        
        setOngs(ongsData);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar ONGs:', err);
        setError('Não foi possível carregar as ONGs');
        setLoading(false);
      }
    };

    fetchOngs();
  }, []);

  return (
    <OngsContext.Provider
      value={{
        ongs,
        loading,
        error
      }}
    >
      {children}
    </OngsContext.Provider>
  );
};

export const useOngs = () => {
  const context = useContext(OngsContext);
  if (!context) {
    throw new Error('useOngs must be used within an OngsProvider');
  }
  return context;
};
