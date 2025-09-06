// auth/useAuth.js
export const setAuth = ({ accessToken, role, expiresAt, remember }) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('userRole', role);
  if (remember) {
    localStorage.setItem('expiresAt', expiresAt);
  } else {
    sessionStorage.setItem('expiresAt', expiresAt);
  }
};

export const getAuth = () => {
  const token = localStorage.getItem('accessToken');
  const role = localStorage.getItem('userRole');
  const expiresAt = localStorage.getItem('expiresAt') || sessionStorage.getItem('expiresAt');
  
  return { accessToken: token, role, expiresAt };
};

export const hasToken = () => {
  const { accessToken } = getAuth();
  return !!accessToken;
};

export const authHeader = () => {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const clearAuth = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('expiresAt');
  sessionStorage.removeItem('expiresAt');
};