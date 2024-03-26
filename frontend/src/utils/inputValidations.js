export const isValidEmail = (email) => {
  email = email.trim();
  return !!email;
};

export const isValidPassword = (password) => {
  return !!password;
};
