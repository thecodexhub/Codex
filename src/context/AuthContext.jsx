import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import axios from 'axios';
import { BASE_URL } from '../config';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mongodbId, setMongodbId] = useState(() => {
    return localStorage.getItem('mongodbId') || null;
  });
  const [paymentStatus, setPaymentStatus]=useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser || null);
      setLoading(false);
    });
    return () => unsubscribe();

  }, []);
   useEffect(() => {
    const fetchPaymentStatus = async () => {
      if (mongodbId) {
        try {
          localStorage.setItem('mongodbId', mongodbId);
          const res = await axios.get(`${BASE_URL}/api/payments/user/${mongodbId}`);
          console.log("Payment status response", res.data.paymentStatus);

          setPaymentStatus(res.data.paymentStatus); 
          
        } catch (err) {
          console.error("Error fetching payment status", err);
        }
      } else {
        localStorage.removeItem('mongodbId');
        setPaymentStatus(null);
        setIsSubscribedUser(false);
      }
    };

    fetchPaymentStatus();
  }, [mongodbId]);
  return (
    <AuthContext.Provider value={{ user, loading, mongodbId, setMongodbId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
