export const getAllMembership = () => {
    return fetch(`${process.env.REACT_APP_API}/mempacks`,{
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}

export const createMembership = (data) => {
    return fetch(`${process.env.REACT_APP_API}/mempack/create`,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}

export const deleteMembership = (id) => {
    return fetch(`${process.env.REACT_APP_API}/mempack/${id}`,{
        method: 'DELETE',
        headers: {
            Accept: 'application/json'
        }
        
    }).then(res=>res.json())
    .catch(err=>console.log(err))
}

export const getMembership = (id) => {
    return fetch(`${process.env.REACT_APP_API}/mempack/${id}`,{
        method: "GET",
        headers: {
            Accept: 'application/json'
        }
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}

export const updateMempack = (id, data) => {
    console.log(id)
    console.log(data)
    return fetch(`${process.env.REACT_APP_API}/mempack/${id}`,{
        method: 'PUT',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res=>res.json())
    .catch(err=>console.log(err))
}

export const getPackageCount = () => {
    return fetch(`${process.env.REACT_APP_API}/mampack/countpack`,{
        method: "GET",
        headers:{
            Accept: 'application/json'
        }
    }).then(res=>res.json())
    .catch(err=>console.log(err))
}

export const getPaidRemCount = () => {
    return fetch(`${process.env.REACT_APP_API}/mampack/countPaidRem`,{
        method: "GET",
        headers: {
            Accept: 'application/json'
        }
    }).then(res=>res.json())
    .catch(err=>console.log(err))
}