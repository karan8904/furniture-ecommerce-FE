import React from 'react'
import PageTitleComponent from "../components/PageTitleComponent";
import InfoComponent from '../components/InfoComponent';
import CategoryComponent from '../components/Categories';

const Categories = () => {
  return (
    <>
      <PageTitleComponent pageTitle="Categories" />

      <CategoryComponent isCategoryPage={true} />

      <InfoComponent />
    </>
  )
}

export default Categories