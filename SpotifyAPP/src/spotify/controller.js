const pool = require('../../db');
const queries = require('./queries');

const getSpotify = (req,res) => { 
    pool.query(queries.getSpotify, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const getUserbyId = (req,res) => {
    const id = parseInt(req.params.user_id);
    pool.query(queries.getUserbyId, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const addUser = (req,res) => {
    const { username,password,email } = req.body; 
    //check if exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if(results.rows.length) {
            res.send('Email already exists.')
        }

        //add user to db
        pool.query(queries.addUser, [username,password,email], (error,results) =>{
            if (error) throw error;
            res.status(201).send('User Created Successfulyl!');
            console.log('User created')
        })
    });
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

module.exports = {
    getSpotify,
    getUserbyId,
    addUser,
    // removeUser
};