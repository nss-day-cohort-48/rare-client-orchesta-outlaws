import React, { createContext } from "react"

export const UserContext = createContext()

export const UserProvider = (props) => {

    const getUserById = (id) => {
        return fetch(`http://localhost:8088/users/${id}`)
        .then(res => res.json())
    }

    return (
        <UserContext.Provider value={{
            getUserById
        }}>
            {props.children}
        </UserContext.Provider>
    )
}