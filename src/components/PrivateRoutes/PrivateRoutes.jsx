import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children, redirectedTo = '/' }) => {
  const authUser = useSelector(state => state.authUser.token);
  return authUser ? children : <Navigate to={redirectedTo} />;
};

export default PrivateRoutes;
