import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar";
import PageTitleComponent from "../components/PageTitleComponent";
import Footer from "../components/Footer";
import InfoComponent from '../components/InfoComponent';
import { useDispatch, useSelector } from 'react-redux';
import CategoryComponent from '../components/Categories';

const Categories = () => {
  const dispatch = useDispatch()

  return (
    <>
      <Navbar />
      <PageTitleComponent pageTitle="Categories" />

      <CategoryComponent />

      <InfoComponent />

      <Footer />
    </>
  )
}

export default Categories