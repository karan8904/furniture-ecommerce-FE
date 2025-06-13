import React from 'react'
import Navbar from '../components/Navbar'
import PageTitleComponent from '../components/PageTitleComponent'
import Footer from '../components/Footer'
import InfoComponent from '../components/InfoComponent'
import CartTable from '../components/CartTable'
import { Box } from '@mui/material'

const Cart = () => {
  return (
    <>
     <Navbar />
     <PageTitleComponent pageTitle={"Cart"} />
     <Box sx={{ margin: "50px" }}>
        <CartTable />  
     </Box>
     <InfoComponent />
     <Footer />
    </>
  )
}

export default Cart