import 'react-toastify/dist/ReactToastify.css';
import { Flip } from 'react-toastify';

export const styleToastify = {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
  transition: Flip,
};