import React from 'react'
import HeroSection from '../components/commoncomponents/HeroSection'
import Whoweare from '../components/commoncomponents/Whoweare'
import GetinTouch from '../components/commoncomponents/GetinTouch'

import casestudy from '../assets/images/caseStudy.png'

function CasesPage() {
  return (
    <>
      <HeroSection
        heading={`CASES`}
        description={`At Tars Technology, every case study tells a story of transformation. By combining innovative design, powerful technology, and user-centered thinking, we help businesses overcome challenges and unlock measurable success.`}
      />

      <div className='py-10 lg:py-28 text-center bg-gradient-to-b from-black to-[#1E1E1E] text-white '>
        <p className='text-[12px] lg:text-[18px] text-[#9C9C9C] font-[500] '>Case Study</p>
        <p className='text-[16px] lg:text-[28px] mt-1 md:mt-3 uppercase font-[neutral_face]'>Case Studies That Reflect Our<br/> Commitment to Excellence</p>
        <Whoweare image={casestudy} contentDiv='w-[260px] lg:w-[450px]' showText={false} button='Know More &nbsp; →' />
        <Whoweare image={casestudy} contentDiv='w-[260px] lg:w-[450px]' showText={false} button='Know More &nbsp; →' />
        <Whoweare image={casestudy} contentDiv='w-[260px] lg:w-[450px]' showText={false} button='Know More &nbsp; →' />
        <Whoweare image={casestudy} contentDiv='w-[260px] lg:w-[450px]' showText={false} button='Know More &nbsp; →' />
        <Whoweare image={casestudy} contentDiv='w-[260px] lg:w-[450px]' showText={false} button='Know More &nbsp; →' />
        <Whoweare image={casestudy} contentDiv='w-[260px] lg:w-[450px]' showText={false} button='Know More &nbsp; →' />
        <Whoweare image={casestudy} contentDiv='w-[260px] lg:w-[450px]' showText={false} button='Know More &nbsp; →' />

      </div>

      <GetinTouch />
    </>
  )
}

export default CasesPage
