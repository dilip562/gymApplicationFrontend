export const getAllTrainer = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API}/trainers/${userId}`,{
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(res=>res.json())
    .catch(err=>console.log(err))
}

export const deleteTrainer = (userId, token, trainerId) => {
    return fetch(`${process.env.REACT_APP_API}/trainer/${userId}/${trainerId}`,{
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(res=>res.json())
    .catch(err=>console.log(err))
}

export const createTrainer = (userId, token, data) => {

    return fetch(`${process.env.REACT_APP_API}/trainer/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(res=>res.json())
    .catch(err=>console.log(err))
}

export const getTrainer = (trainerId) => {
    return fetch(`${process.env.REACT_APP_API}/trainer/${trainerId}`,{
        method: "GET",
        headers: {
            Accept: 'application/json'
        }
    }).then(res=>res.json())
    .catch(err=>console.log(err))
}

export const updateTrainer = (userId, token, trainerId, data) => {
    return fetch(`${process.env.REACT_APP_API}/trainer/${userId}/${trainerId}`,{
        method: "PUT",
        headers: {
            Accept: "application.json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(res=>res.json())
    .catch(err=>console.log(err))
}

export const updatePassword = (userId, token, trainerId, data) => {
    return fetch(`${process.env.REACT_APP_API}/trainer/resetpass/${userId}/${trainerId}`,{
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(res=>res.json())
    .catch(err=>console.log(err))
}