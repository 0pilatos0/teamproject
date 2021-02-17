const users = require('../sql/users.js')
const sha512 = require('sha512')

const nameRegex = new RegExp(/^[a-z ,.'-]+$/i)
const usernameRegex = new RegExp(/\w{5,29}/i)
const emailRegex = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)
const passwordRegex = new RegExp(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?@"])(?!.*\s).*$/)

module.exports.login = (data) => {

}

module.exports.register = (data) => {
    if(!(data.name && data.username && data.email && data.password && data.verificationPassword)) return "All of them must be filled in"
    if(!nameRegex.exec(data.name)) return "Name does not match regex"
    if(!usernameRegex.exec(data.username)) return "Username does not match regex"
    if(!emailRegex.exec(data.email)) return "Email does not match regex"
    if(!passwordRegex.exec(data.password)) return "Password does not match regex"
    if(!data.password == data.verificationPassword) return "Passwords doesn't match"
    delete data.verificationPassword
    data.password = hashPassword(data.password)
    data.verifytoken = "bekijk het met je token"
    users.create(data)
}

function hashPassword(password){
    return sha512(password)
}