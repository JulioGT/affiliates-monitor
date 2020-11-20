import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

const ScrollToTop = ({ children, location: { pathname } }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return children || null;
};

export default withRouter(ScrollToTop);

export const loadFromLocalStorage = (localst = 'auth') => {
  try {
    const serializedState = localStorage.getItem(localst);
    if (serializedState === null) return undefined;
    
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export const notifySuccess = (message) => {
  toast.success(message, { containerId: 'B' });
};

export const notifyError = (message) => {
  toast.error(message, {
    containerId: 'B'
  });
};
