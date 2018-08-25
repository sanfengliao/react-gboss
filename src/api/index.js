import ajax from "./ajax"

export const reqRegister = (user) => ajax("http://localhost:4000/api/register", user, 'POST');
export const reqLogin = (user) => ajax("http://localhost:4000/api/login", user, 'POST');
export const reqUpdateUser = (user) => ajax('http://localhost:4000/api/update', user, 'POST');
export const reqUser = () => ajax("http://localhost:4000/api/user")

export const reqUserList = (type) => ajax("http://localhost:4000/api/list", {type})

export const reqChatList = () => ajax("http://localhost:4000/api/msglist")
export const reqReadMsg = (from) => ("http://localhost:4000/api/readMsg", {from}, 'POST')