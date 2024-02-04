'use client';
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import {store} from "../stores";


interface Props {
    children: React.ReactNode
}

export default function Providers({children}: Props) {

  useEffect(() => {

  }, [])
  


  return (
    <Provider store={store} >{children}</Provider>
  )
}