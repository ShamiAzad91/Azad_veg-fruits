import React from 'react'
import Hero from '../components/home/Hero';
import Category from '../components/home/Category';
import Feature from '../components/home/Feature';
import PopularProduct from '../components/home/PopularProduct';
import CustomerReviews from '../components/home/CustomerReviews ';
import CTASection from '../components/home/CTASection';
import {useAuth} from "../context/Auth";
const Home = () => {
  const [auth,setAuth] = useAuth();
  return (
    <div>
        <Hero />
{/* <pre>{JSON.stringify(auth,null,4)}</pre> */}
        <Category/>
        <Feature />
        <PopularProduct />
        <CustomerReviews />
        <CTASection/>
        
    </div>
  )
}

export default Home