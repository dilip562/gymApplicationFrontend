
export const getAllPackage = () => {
    return fetch(`${process.env.REACT_APP_API}/packages`,{
        method:"GET",
        headers:{
            Accept: 'application/json' 
        }
    })
    .then(response=>response.json())
    .catch(err=>console.log(err))
}

export const createPackage = (trainerId, token, data) => {
    return fetch(`${process.env.REACT_APP_API}/package/create/${trainerId}`,{
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .catch(err=>console.log(err))
}

export const deletePackage = (packId) => {
    return fetch(`${process.env.REACT_APP_API}/package/${packId}`,{
        method: 'DELETE',
        headers: {
            Accept: 'application/json'
        }
    }).then(res=>res.json())
    .catch(err=>console.log(err))
}

export const getPackage = (packId) => {
    return fetch(`${process.env.REACT_APP_API}/package/${packId}`,{
        method: 'GET',
        headers:{
            Accept: 'application/json'
        }
    }).then(res=>res.json())
    .catch(err=>console.log(err))
}

export const updatePackage = (trainerId, token, packId, data) => {
    return fetch(`${process.env.REACT_APP_API}/package/${trainerId}/create/${packId}`,{
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}