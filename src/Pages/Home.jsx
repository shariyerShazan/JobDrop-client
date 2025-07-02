import React from 'react'
import Slide from '../components/Slide'
import Reviews from '../components/Reviews'
import LatestJobs from '../components/LatestJobs'


function Home() {
  return (
    <div>
      <Slide />
      <LatestJobs />
      <Reviews />
    </div>
  )
}

export default Home
