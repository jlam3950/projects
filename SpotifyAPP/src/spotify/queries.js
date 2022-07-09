// const getSpotify = "SELECT * FROM users";
// const getUserbyId = "SELECT * FROM users WHERE user_id = $1";
// const checkEmailExists = "SELECT s FROM users s WHERE s.email = $1";
// const addUser = "INSERT INTO users (username,password,email) VALUES ($1, $2,$3)";
// const removeUser = "DELETE FROM users WHERE user_id = $1";

const pool = require('../../db');

const getSpotify = (req,res) => { 
    pool.query("SELECT * FROM users", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
        console.log(results.rows);
    })
};

const getUserbyId = (req,res) => {
    const id = parseInt(req.params.user_id);
    pool.query("SELECT * FROM users WHERE user_id = $1", [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const addUser = (req,res) => {
    const { username, email } = req.body; 
    // pool.query("SELECT s FROM users s WHERE s.email = $1", [email], (error, results) => {
    //     if(results.rows.length) {
    //         res.send('Email already exists.')
    //     }

        pool.query("INSERT INTO users (username,password,email) VALUES ($1, $2,$3)", [username,email], (error,results) =>{
            if (error) throw error;
            res.status(201).send('User Created Successfully!');
            console.log('User created')
        })
    // });
};

module.exports = {
    getSpotify,
    getUserbyId,
    // checkEmailExists,
    addUser,
    // removeUser
};

// const removeUser = (req,res) => {
//     const id = parseInt(req.params.id);
    
//     // pool.query(queries.getUserbyId, [id], (error,results) => {
//     //     const noUserFound = !results.rows.length; 
//     //     if (noUserFound){
//     //         res.send('User does not exist in database.');
//     //     }

//         pool.query(queries.removeUser, [id], (error, results) => {
//             if (error) throw error;
//             res.status(200).send("Users removed successfully");
//         })
//     // });
// //     })
// // };


