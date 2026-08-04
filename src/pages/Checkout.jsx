import React from 'react'
import PageTitleComponent from '../components/PageTitleComponent'
import InfoComponent from '../components/InfoComponent'
import CheckoutForm from '../components/CheckoutForm'

const Checkout = () => {
  return (
    <>
        <PageTitleComponent pageTitle={"Checkout"} />
        <CheckoutForm />
        <InfoComponent />
    </>
  )
}

export default Checkout