
export const getAllMember = () => {
    return fetch(`${process.env.REACT_APP_API}/members`,{
        method: 'GET',
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(response=> response.json())
    .catch(err=> console.log(err))
}

export const deleteMember = (trainerId, token, memberId) => {
    // console.log(`CHECK ${id}`)
    console.log(JSON.parse(localStorage.getItem("jwt")))
    return fetch(`${process.env.REACT_APP_API}/member/${trainerId}/${memberId}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .catch(err=>console.log(err))
}

export const createMember = (trainerId, token, data) => {
    return fetch(`${process.env.REACT_APP_API}/member/create/${trainerId}`,{
        method: "POST",
        headers:{
            Accept: 'application/json',
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response=>response.json())
    .catch(err=>console.log(err))
}

export const getMember = async (memberId) => {
    console.log(`MEMBER ID ${memberId}`)
    return await fetch(`${process.env.REACT_APP_API}/member/${memberId}`,{
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })
    .then(async response=> await response.json())
    .catch(err=>console.log(err))
}

export const updateMember = async (trainerId, token, memberId, data) => {
    return await fetch(`${process.env.REACT_APP_API}/member/${trainerId}/${memberId}`,{
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response=>response.json())
    .catch(err=>console.log(err))
}