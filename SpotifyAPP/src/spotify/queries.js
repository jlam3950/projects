const getSpotify = "SELECT * FROM users";
const getUserbyId = "SELECT * FROM users WHERE user_id = $1";
const checkEmailExists = "SELECT s FROM users s WHERE s.email = $1";
const addUser = "INSERT INTO users (username,password,email) VALUES ($1, $2,$3)";
// const removeUser = "DELETE FROM users WHERE user_id = $1";

module.exports = {
    getSpotify,
    getUserbyId,
    checkEmailExists,
    addUser,
    // removeUser
};

