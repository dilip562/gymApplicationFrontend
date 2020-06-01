export const signin = (data) => {
    return fetch(`${process.env.REACT_APP_API}/signin`,{
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response=>response.json())
    .catch(err=>console.log(err))
}

export const signout = () => {
    if(typeof window !== undefined){
        localStorage.removeItem("jwt")
    }
}

export const authenticate = (data,next) => {
    if(typeof window !== undefined){
        localStorage.setItem("jwt",JSON.stringify(data))
        next()
    }
}

export const isAuthenticated = () => {
    if(typeof window !== undefined){
        if(localStorage.getItem("jwt")){
            return JSON.parse(localStorage.getItem("jwt"))
        }else{
            return false
        }
    }else{
        return false
    }
}