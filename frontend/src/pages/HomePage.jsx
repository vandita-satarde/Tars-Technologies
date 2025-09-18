import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import herosectionimage from '../assets/images/herosectionimage.png'
import herosectionicon1 from '../assets/icons/herosectionicon1.png'
import herosectionicon2 from '../assets/icons/herosectionicon2.png'
import herosectionicon3 from '../assets/icons/herosectionicon3.png'
import herosectionicon4 from '../assets/icons/herosectionicon4.png'
import whoweare from '../assets/images/whoweare.png'
import rightarrow from '../assets/icons/r-arrow.png'
import leftarrow from '../assets/icons/l-arrow.png'

import Testimonials from '../components/homecomponents/Testimonials';
import Clients from '../components/commoncomponents/Clients';
import GetinTouch from '../components/commoncomponents/GetinTouch';
import Whoweare from '../components/commoncomponents/Whoweare';
import Counts from '../components/commoncomponents/Counts';
import Services from '../components/commoncomponents/Services';
import Products from '../components/commoncomponents/Products';


function HomePage() {

  return (
    <>
      {/* hero section */}
      <div className='relative w-full h-[710px] lg:h-[900px] '>
        <img src={herosectionimage} className='absolute object-cover w-full h-[710px] lg:h-[900px]' />
        <div className='absolute right-7 lg:right-40 top-68 lg:top-86 space-y-3 lg:space-y-5'>
          <img src={herosectionicon1} className='w-9 md:w-auto' />
          <img src={herosectionicon2} className='w-9 md:w-auto' />
          <img src={herosectionicon3} className='w-9 md:w-auto' />
          <img src={herosectionicon4} className='w-9 md:w-auto' />
        </div>
        <div className='absolute inset-0 flex flex-col justify-center items-center text-center tracking-wider text-white pt-35 lg:pt-45 '>
          <p className='text-[26px] lg:text-[48px] text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FFFFFF30] font-[neutral_face] '>ELEVATE YOUR VISION,<br className='block md:hidden' /> IGNITE<br className='hidden md:block' /> TOMORROW’S INNOVATION.</p>
          <p className='text-[10px] lg:text-[24px] mt-10 lg:mt-15'>Crafting Digital Excellence for a Future<br /> Beyond Imagination.</p>
          <div className='flex justify-center items-center gap-2 lg:gap-20 mt-55 lg:mt-53 text-[8px] lg:text-[24px] '>
            <p>Full Cycle Product Development</p>
            <p>Digital Product Design</p>
            <p>Branding</p>
            <p>Industry Automation Service</p>
          </div>
          <div className=' flex flex-col items-center gap-2 lg:gap-2 pt-12 lg:pt-15 text-[13px] lg:text-[16px] font-[neutral_face]'>
            <p>SCROLL</p>
            <IoIosArrowDown size={23} />
          </div>
        </div>
      </div>

      <div className='py-10 lg:py-28 text-center bg-gradient-to-b from-black to-[#1E1E1E] text-white '>
        <p className='text-[12px] lg:text-[18px] text-[#9C9C9C] font-[500] '>Who We Are</p>
        <p className='text-[16px] lg:text-[28px] mt-1 md:mt-3 uppercase font-[neutral_face]'>Epic Beginnings: Unveiling Our Essence,<br className='hidden md:block' /> Crafting Futures with Excellence.</p>
        <Whoweare
          image={whoweare}
          button='Who We Are &nbsp; →'
        />
      </div>
      <Counts />
      <Services />
      <Products />

      {/* testimonials */}
      <div className="py-10 lg:py-28 text-center bg-gradient-to-b from-[#1E1E1E] to-[#121212] text-white ">
        <p className="text-[12px] lg:text-[18px] text-[#9C9C9C] font-[500] ">Testimonials</p>
        <p className="text-[16px] lg:text-[28px] lg:leading-12 mt-1 md:mt-3 px-6 md:px-0 uppercase font-[neutral_face]">Voices of Trust: Client Stories, Testimonials<br className='hidden md:block' /> that Illuminate Our Shared Success.        </p>
        <div className='flex flex-col md:flex-row gap-4 md:gap-16 px-6 md:px-30 py-8 md:py-20'>
          <Testimonials
            image={herosectionimage}
          />
          <Testimonials
            image={herosectionimage}
          />
        </div>
        <div className='flex justify-center gap-5 '>
          <img src={leftarrow} className='w-8 lg:w-auto' />
          <img src={rightarrow} className='w-8 lg:w-auto' />
        </div>
      </div>


      <Clients />
      <GetinTouch />
    </>
  )
}

export default HomePage
