import React, { useEffect } from 'react'
import Slide from '../components/Slide'
import Reviews from '../components/Reviews'
import LatestJobs from '../components/LatestJobs'


function Home() {
  useEffect(()=>{
    document.title = "Home | JobDrop"
  }, [])
  
  return (
    <div>
      <Slide />
      <LatestJobs />
      <Reviews />
    </div>
  )
}

export default Home
