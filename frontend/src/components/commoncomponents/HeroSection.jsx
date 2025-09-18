import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import herosectionimage from '../../assets/images/herosectionimage.png'
import herosectionicon1 from '../../assets/icons/herosectionicon1.png'
import herosectionicon2 from '../../assets/icons/herosectionicon2.png'
import herosectionicon3 from '../../assets/icons/herosectionicon3.png'
import herosectionicon4 from '../../assets/icons/herosectionicon4.png'

function HeroSection({ heading, description }) {
  return (
    <>
      <div className='relative '>
        <img src={herosectionimage} className=' object-cover w-full h-[720px] md:h-[730px]' />
        <div className='absolute right-7 lg:right-40 top-85 lg:top-94 space-y-3 lg:space-y-5'>
          <img src={herosectionicon1} className='w-9 md:w-auto' />
          <img src={herosectionicon2} className='w-9 md:w-auto' />
          <img src={herosectionicon3} className='w-9 md:w-auto' />
          <img src={herosectionicon4} className='w-9 md:w-auto' />
        </div>
        <div className='absolute inset-0 flex flex-col justify-center items-center text-center tracking-wider text-white pt-20 lg:pt-42 '>
          <p className='text-[26px] lg:text-[48px] text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FFFFFF30] font-[neutral_face] '>{heading}</p>
          <p className='w-[326px] md:w-[1000px] text-[11px] lg:text-[24px] mt-8 lg:mt-24 tracking-widest md:leading-10'>{description}</p>
          <div className=' flex flex-col items-center gap-2 lg:gap-2 pt-60 lg:pt-30 text-[13px] lg:text-[16px] font-[neutral_face]'>
            <p>SCROLL</p>
            <IoIosArrowDown size={23} />
          </div>
        </div>
      </div>
    </>
  )
}

export default HeroSection
