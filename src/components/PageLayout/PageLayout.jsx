import { Container } from "../../globalStyles";
import { Outlet, NavLink } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { Suspense, useEffect, useState } from "react";
import styles from "./PageLayout.module.css";
import { Loader } from "../../components/Loader/Loader";
import { useModal } from "../../helpers/useModal";
import { ModalComponent } from "../../components/Modal/Modal";
import { Register } from "../Auth/RegisterForm";
import { Login } from "../Auth/LoginForm";
import { auth } from "../../firebaseconfig/config";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { deleteToken } from "../../redux/sliceAuth";
import turkey from "/turkey.png";

const Layout = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [user, setUser] = useState(null);
  const authUser = useSelector(state => state.authUser.token);
  const dispatch = useDispatch();

  const clickLogOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      dispatch(deleteToken());
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(maybeUser => {
      const user = auth.currentUser;

      if (authUser || user) {
        return setUser(maybeUser);
      }
      return;
    });
  }, [authUser]);

  return (
    <>
      <header className={styles.header}>
        <Container>
          <div className={styles.headerContainer}>
            <div className={styles.wrapperLogo}>
              <img
                src={turkey}
                alt="Flag Turkey"
                width="28"
                height="28"
              />
              <p className={styles.titleLogo}>LearnLingo</p>
            </div>

            <nav className={styles.nav}>
              <ul className={styles.list}>
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? `${styles.navigate} ${styles.active}`
                        : styles.navigate
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="teachers"
                    className={({ isActive }) =>
                      isActive
                        ? `${styles.navigate} ${styles.active}`
                        : styles.navigate
                    }
                  >
                    Teachers
                  </NavLink>
                </li>
                {authUser && (
                  <li>
                    <NavLink
                      to="favorite"
                      className={({ isActive }) =>
                        isActive
                          ? `${styles.navigate} ${styles.active}`
                          : styles.navigate
                      }
                    >
                      Favorite
                    </NavLink>
                  </li>
                )}
              </ul>
            </nav>

            {!authUser && (
              <ul className={styles.wrapperAut}>
                <li>
                  <button
                    type="button"
                    className={styles.buttonLogin}
                    onClick={() => openModal('login')}
                  >
                    <span>
                      <FiLogIn />
                    </span>
                    Log in
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={styles.buttonRegister}
                    onClick={() => openModal('register')}
                  >
                    Register
                  </button>
                </li>
              </ul>
            )}

            {authUser && user && (
              <button
                type="button"
                className={styles.buttonRegister}
                onClick={clickLogOut}
              >
                Log out
              </button>
            )}
          </div>
        </Container>

        {isOpen.open && isOpen.name === 'login' && (
          <ModalComponent onClose={closeModal}>
            <Login onClose={closeModal} />
          </ModalComponent>
        )}

        {isOpen.open && isOpen.name === 'register' && (
          <ModalComponent onClose={closeModal}>
            <Register onClose={closeModal} />
          </ModalComponent>
        )}
      </header>

      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
