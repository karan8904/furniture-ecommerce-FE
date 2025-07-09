import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { confirmPayment } from '../slices/orderSlice'
import { Typography } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router'
import { showSnackbar } from '../slices/snackbarSlice'
import { confirmSubscription } from '../slices/subscriptionSlice'

const PaymentSuccess = () => {
    const [params] = useSearchParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const id = params.get("session_id")
    const type = localStorage.getItem("type")
    console.log("type:", type)
    useEffect(() => {
        if(id){
          const update = async() => {
            try {
              if(type === "subscription"){
                await dispatch(confirmSubscription(id)).unwrap()
              }
              if(type === "order"){
                await dispatch(confirmPayment(id)).unwrap()
              }
              dispatch(showSnackbar({ message: "Thank you for payment. You'll be redirected soon." }))
              setTimeout(() => {
               navigate("/")
               localStorage.removeItem("type")
              }, 3000)
            } catch (error) {
              dispatch(showSnackbar({ severity: "error", message: error }))
            }
          }
          update()
        }
    }, [params])
  return (
    <>
        <Typography>Payment Success</Typography>
    </>
  )
}

export default PaymentSuccess