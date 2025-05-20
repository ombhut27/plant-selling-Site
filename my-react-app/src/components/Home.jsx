import React from 'react'
import { Box } from '@mui/material'
import Banner from './Banner/Banner'
import ShopByCategory from './ShopByCatagory/ShopByCatagory'
import Social from './SocialBanner/Social'
import ProductDispaly from './ProductDisplay/ProductDisplay'

const Home = () => {
  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Banner />
      <br />
      <ShopByCategory />
      <br />
      <Social />
      <br />
      <ProductDispaly />
    </Box>
  )
}

export default Home
