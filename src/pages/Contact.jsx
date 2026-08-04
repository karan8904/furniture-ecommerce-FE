import React from 'react'
import PageTitleComponent from '../components/PageTitleComponent'
import InfoComponent from '../components/InfoComponent'
import ContactForm from '../components/ContactForm'

const Contact = () => {
  return (
    <>
      <PageTitleComponent pageTitle={"Contact"} />
      <ContactForm />
      <InfoComponent />
    </>
  )
}

export default Contact