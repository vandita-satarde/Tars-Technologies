import React from 'react'
import rightarrow from '../../assets/icons/r-arrow.png'
import leftarrow from '../../assets/icons/l-arrow.png'


function Clients() {
  return (
    <>
      <div className='py-10 lg:py-28 text-center bg-gradient-to-t from-[#121212] to-[#1E1E1E] text-white '>
        <p className='text-[12px] lg:text-[18px] text-[#9C9C9C] font-[500] '>Clients</p>
        <p className='text-[16px] lg:text-[28px] mt-1 md:mt-3 uppercase font-[neutral_face]'>Building Lasting Partnerships with<br className='hidden md:block'/> Organizations Across Industries</p>
        <div className='flex flex-col md:flex-row justify-center items-center gap-6 md:gap-22 py-8 md:py-11 '>
          <img className=' w-[170px] md:w-[320px] h-[110px] md:h-[220px] border ' />
          <img className=' w-[220px] md:w-[418px] h-[140px] md:h-[270px] border ' />
          <img className=' w-[170px] md:w-[320px] h-[110px] md:h-[220px] border ' />
        </div>
        <div className='flex justify-center gap-6 '>
          <img src={leftarrow} className='w-8 lg:w-auto' />
          <img src={rightarrow} className='w-8 lg:w-auto' />
        </div>
      </div>
    </>
  )
}

export default Clients
