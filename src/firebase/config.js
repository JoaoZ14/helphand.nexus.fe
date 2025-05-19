import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAPrGwSX0z5AGBlYiV-Bd_3v5YuPSQp548",
  authDomain: "helphands-d3f75.firebaseapp.com",
  projectId: "helphands-d3f75",
  storageBucket: "helphands-d3f75.appspot.com",
  messagingSenderId: "308495198700",
  appId: "1:308495198700:web:b3dacabbb06c602e75b8c9",
  measurementId: "G-BR11N4E246"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence); // Garante persistência local
const db = getFirestore(app);
const storage = getStorage(app);

// Função para criar usuário
export const createUser = async (email, password, userData) => {
  try {
    if (!auth) {
      throw new Error('Firebase Auth não está inicializado');
    }

    // Cria o usuário no Authentication
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
    // Prepara os dados do usuário
    const userDataToSave = {
      ...userData,
      email,
      tipo: 'doador',
      createdAt: new Date(),
      status: 'ativo'
    };
    
    // Salva dados adicionais do usuário no Firestore
    await setDoc(doc(db, 'users', user.uid), userDataToSave);
    
    return {
      user,
      userData: userDataToSave
    };
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    // Melhorar a mensagem de erro para o usuário
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Este email já está em uso. Por favor, use outro email ou faça login.');
    } else if (error.code === 'auth/weak-password') {
      throw new Error('A senha é muito fraca. Use pelo menos 6 caracteres.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('O email fornecido é inválido.');
    } else {
      throw new Error('Erro ao criar usuário. Por favor, tente novamente mais tarde.');
    }
  }
};

// Função para fazer login
export const signIn = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    
    // Busca dados adicionais do usuário no Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.data();
    
    return {
      user,
      userData
    };
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

// Função para fazer logout
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    throw error;
  }
};

// Função para login com Google
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    // Verifica se o usuário já existe no Firestore
    const userDoc = await getDoc(doc(db, 'users', result.user.uid));
    
    if (!userDoc.exists()) {
      // Se não existir, cria um novo documento com os dados do Google
      const userData = {
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        tipo: 'doador',
        createdAt: new Date(),
        status: 'ativo'
      };
      
      await setDoc(doc(db, 'users', result.user.uid), userData);
    }
    
    return {
      user: result.user,
      userData: userDoc.exists() ? userDoc.data() : null
    };
  } catch (error) {
    console.error('Erro ao fazer login com Google:', error);
    throw error;
  }
};

// Função para fazer upload de imagens
export const uploadImage = async (file, folder = 'images') => {
  try {
    if (!file) throw new Error('Nenhum arquivo foi fornecido.');

    const storageRef = ref(storage, `${folder}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    throw new Error('Não foi possível fazer o upload da imagem. Verifique as configurações do Firebase Storage.');
  }
};

// Função para registrar doação via PIX
export const registerPixDonation = async (userId, donationData) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) throw new Error('Usuário não encontrado');
    const userDonations = userDoc.data().pixDonations || [];
    const newDonation = {
      ...donationData,
      date: new Date(),
    };
    await setDoc(userRef, {
      pixDonations: [...userDonations, newDonation],
    }, { merge: true });
    return newDonation;
  } catch (error) {
    console.error('Erro ao registrar doação PIX:', error);
    throw error;
  }
};

// Função para editar dados do usuário
export const updateUser = async (userId, updates) => {
  try {
    if (!userId) throw new Error('ID do usuário não informado');
    await setDoc(doc(db, 'users', userId), updates, { merge: true });
    return true;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
};

export { auth, db, storage };
export default app;