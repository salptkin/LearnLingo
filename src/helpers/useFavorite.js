import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ref, onValue } from 'firebase/database';
import { auth } from '../firebaseconfig/config';

export const useFavorite = database => {
  const [favorite, setFavorite] = useState([]);
  const authUser = useSelector(state => state.authUser.token);

  useEffect(() => {
    if (!authUser) return;
    auth.onAuthStateChanged(user => {
      if (user) {
        onValue(
          ref(database, `/favorite/${auth.currentUser.uid}`),
          snapshot => {
            setFavorite([]);
            const data = snapshot.val();
            if (data !== null) {
              Object.values(data).map(model =>
                setFavorite(prev => [...prev, model])
              );
            }
          }
        );
      }
    });
  }, [authUser, database]);

  return favorite;
};