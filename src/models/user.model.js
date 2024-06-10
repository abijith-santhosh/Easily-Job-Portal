export default class UserModel {
    constructor(id, name, email, password) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
    }
    // add user to the users array
    static addRegister(name, email, password) {
      let newRegister = new UserModel(users.length + 1, name, email, password);
      users.push(newRegister);
    }
  
    // check if the user is valid or not 
    static isValidUser(email, password) {
      const result = users.find(
        (user) => user.email == email && user.password == password
      );
      return result;
    }
  
    // get user by userId
    static getById(id) {
      return users.find((user) => user.id === id);
    }
  }
  
  
  // users array
  var users = [];
  