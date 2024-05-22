export const verifyToken = (userStr: string | null) => {
  if (!userStr) return null;

  const user = JSON.parse(userStr);
  const now = new Date().getTime();

  if (now > user.expiry) {
    localStorage.removeItem("user");
    return null;
  }

  return user;
};
