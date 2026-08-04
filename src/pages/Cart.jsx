import React from 'react'
import PageTitleComponent from '../components/PageTitleComponent'
import InfoComponent from '../components/InfoComponent'
import CartTable from '../components/CartTable'
import { Box } from '@mui/material'

const Cart = () => {
  return (
    <>
     <PageTitleComponent pageTitle={"Cart"} />
     <Box sx={{ margin: "50px" }}>
        <CartTable />  
     </Box>
     <InfoComponent />
    </>
  )
}

export default Cart