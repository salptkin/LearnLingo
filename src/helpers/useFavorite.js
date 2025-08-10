import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { auth } from "../firebaseconfig/config";

export const useFavorite = (database) => {
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    let offValue;

    const offAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        setFavorite([]);
        if (offValue) offValue();
        return;
      }

      const favRef = ref(database, `/favorite/${user.uid}`);
      offValue = onValue(favRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const favArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          setFavorite(favArray);
        } else {
          setFavorite([]);
        }
      });
    });

    return () => {
      if (offValue) offValue();
      offAuth();
    };
  }, [database]);

  return favorite;
};
