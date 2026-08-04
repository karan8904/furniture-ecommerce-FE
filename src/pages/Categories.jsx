import React from 'react'
import Navbar from "../components/Navbar";
import PageTitleComponent from "../components/PageTitleComponent";
import Footer from "../components/Footer";
import InfoComponent from '../components/InfoComponent';
import CategoryComponent from '../components/Categories';

const Categories = () => {
  return (
    <>
      <Navbar />
      <PageTitleComponent pageTitle="Categories" />

      <CategoryComponent isCategoryPage={true} />

      <InfoComponent />

      <Footer />
    </>
  )
}

export default Categories