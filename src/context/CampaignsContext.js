import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

const CampaignsContext = createContext({});

export const CampaignsProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCampaigns = async () => {
    try {
      const campaignsRef = collection(db, 'campaigns');
      const q = query(campaignsRef, where('status', '==', 'active'));
      const querySnapshot = await getDocs(q);
      
      const campaignsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setCampaigns(campaignsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async (campaignData) => {
    try {
      const campaignsRef = collection(db, 'campaigns');
      const docRef = await addDoc(campaignsRef, {
        ...campaignData,
        status: 'active',
        createdAt: new Date(),
        totalDonations: 0
      });
      return docRef.id;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateCampaign = async (campaignId, updates) => {
    try {
      const campaignRef = doc(db, 'campaigns', campaignId);
      await updateDoc(campaignRef, updates);
      await fetchCampaigns();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <CampaignsContext.Provider
      value={{
        campaigns,
        loading,
        error,
        createCampaign,
        updateCampaign,
        fetchCampaigns
      }}
    >
      {children}
    </CampaignsContext.Provider>
  );
};

export const useCampaigns = () => {
  const context = useContext(CampaignsContext);
  if (!context) {
    throw new Error('useCampaigns must be used within a CampaignsProvider');
  }
  return context;
}; 