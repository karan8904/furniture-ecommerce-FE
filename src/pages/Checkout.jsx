import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTitleComponent from '../components/PageTitleComponent'
import InfoComponent from '../components/InfoComponent'
import CheckoutForm from '../components/CheckoutForm'

const Checkout = () => {
  return (
    <>
        <Navbar />
        <PageTitleComponent pageTitle={"Checkout"} />
        <CheckoutForm />
        <InfoComponent />
        <Footer />
    </>
  )
}

export default Checkout