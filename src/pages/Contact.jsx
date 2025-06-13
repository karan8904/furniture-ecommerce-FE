import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTitleComponent from '../components/PageTitleComponent'
import InfoComponent from '../components/InfoComponent'
import ContactForm from '../components/ContactForm'

const Contact = () => {
  return (
    <>
      <Navbar />
      <PageTitleComponent pageTitle={"Contact"} />
      <ContactForm />
      <InfoComponent />
      <Footer />
    </>
  )
}

export default Contact