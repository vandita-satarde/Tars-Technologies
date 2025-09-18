import React from 'react'

function Counts() {
  return (
    <>
      <div className='flex justify-center items-center gap-2 lg:gap-25 px-3 md:px-0 py-6 md:py-15 bg-[#121212] text-white'>
        <div className='text-center space-y-1 lg:space-y-5 '>
          <p className='text-[15px] lg:text-[36px] font-[neutral_face] '>400+</p>
          <p className='text-[9px] lg:text-[18px] text-[#9C9C9C] '>Projects Competed</p>
        </div>
        <div className='bg-white w-[1px] h-10 lg:h-18 '></div>
        <div className='text-center space-y-1 lg:space-y-5'>
          <p className='text-[15px] lg:text-[36px] font-[neutral_face] '>15+</p>
          <p className='text-[9px] lg:text-[18px] text-[#9C9C9C] '>Successful Years</p>
        </div>
        <div className='bg-white w-[1px] h-10 lg:h-18 '></div>
        <div className='text-center space-y-1 lg:space-y-5'>
          <p className='text-[15px] lg:text-[36px] font-[neutral_face] '>98%</p>
          <p className='text-[9px] lg:text-[18px] text-[#9C9C9C] '>Client Retention</p>
        </div>
        <div className='bg-white w-[1px] h-10 lg:h-18 '></div>
        <div className='text-center space-y-1 lg:space-y-5'>
          <p className='text-[15px] lg:text-[36px] font-[neutral_face] '>30+</p>
          <p className='text-[9px] lg:text-[18px] text-[#9C9C9C] '>Countries</p>
        </div>
      </div>
    </>
  )
}

export default Counts
