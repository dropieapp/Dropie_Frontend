export const authHeader = () => {
 const token = localStorage.getItem("token"); // Replace token with the right key
 if (!token) {
   // handle no token case
   return;
 }
  return {
    Authorization: `Bearer ${token}`,

  };  // return the headers to the get request
};