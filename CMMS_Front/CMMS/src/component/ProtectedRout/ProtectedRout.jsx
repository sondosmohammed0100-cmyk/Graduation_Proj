import React from 'react'
import style from "./ProtectedRout.module.css"
import { Navigate } from 'react-router-dom'

export default function ProtectedRout(props) {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token"); 

  if (token) {
    return props.children
  } else {
    return <Navigate to={"/login"}/>
  }
}