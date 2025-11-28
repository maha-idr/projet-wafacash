export const getUserRole = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.Role; // "Admin" ou "Commercial"
  } catch (error) {
    console.error("Token invalide", error);
    return null;
  }
};
