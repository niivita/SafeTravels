const users = []; //can use database here instead

//Join user to chat
function userJoin(id, username, room){
    const user = {id, username, room};
    users.push(user);

    return user;
}

//Get current user
function getCurrentUser(id){
    return users.find(user => user.id == id);
}

//User leaves chat --> take user out of array
function userLeave(id){
    const index = users.findIndex(user => user.id == id); //find index of specified user id to remove
    if(index !==-1){
        return users.splice(index, 1)[0]; 
    }
}

// get room users
function getRoomUsers(room){
    return users.filter(user => user.room ==room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}; 

