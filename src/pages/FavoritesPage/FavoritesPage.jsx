import { TeachersMarkup } from "../../components/TeachersCard/TeachersCard";
import { database } from "../../firebaseconfig/config";
import { Container } from "../../globalStyles";
import { useFavorite } from "../../helpers/useFavorite";
import styles from './FavoritesPage.module.css';

const FavoritesPage = () => {
  const favorite = useFavorite(database);

  return (
    <div className={styles.section}>
      <Container>
        <TeachersMarkup item={favorite} />
        {favorite.length === 0 && (
          <p className={styles.title}>
            You haven't added teachers to your favorites yet.
          </p>
        )}
      </Container>
    </div>
  );
};

export default FavoritesPage;
