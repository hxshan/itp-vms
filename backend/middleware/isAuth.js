const isAuth =(user,permission)=>{
    const [category, action] = permission.split('.');

    if(user?.role && user?.role[category][action] == true){
        return true
    }
    return false
}
module.exports = isAuth