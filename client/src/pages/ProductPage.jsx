import Header from "../components/header/Header";
import React from 'react'
import Edit from "../components/patient/Edit"

const ProductPage = () => {
  return (
    <>
    <Header />
    <div className='px-6'>
        <h1 className='text-4xl font-bold text-center mb-4'>Hasta Raporları</h1>
        <Edit />
    </div>
    </>
  )
}

export default ProductPage