import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { confirmPayment } from '../slices/orderSlice'
import { Typography } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router'
import { showSnackbar } from '../slices/snackbarSlice'

const PaymentSuccess = () => {
    const [params] = useSearchParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const id = params.get("session_id")
    console.log(id)
    useEffect(() => {
        if(id){
          const update = async() => {
            await dispatch(confirmPayment(id)).unwrap()
            dispatch(showSnackbar({ message: "Thank you for payment. You'll be redirected soon." }))
            setTimeout(() => {
             navigate("/")
            }, 3000)
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