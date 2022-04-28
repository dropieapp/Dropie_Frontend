export const authHeader = () => {
  const token = JSON.parse(localStorage.getItem("user"));

  if (token && token.token) {
    return {
      Authorization: "Bearer " + token.token,
    };
  } else {
    return {};
  }
};