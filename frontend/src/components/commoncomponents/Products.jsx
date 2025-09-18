import React from 'react'
import productsection from '../../assets/images/productsection.png'
import tech1 from '../../assets/icons/tech1.png'
import tech2 from '../../assets/icons/tech2.png'
import tech3 from '../../assets/icons/tech3.png'
import tech4 from '../../assets/icons/tech4.png'
import leftarrow from '../../assets/icons/l-arrow.png'
import rightarrow from '../../assets/icons/r-arrow.png'

function Products() {
  return (
    <>
      <div className="py-10 lg:py-28 text-center bg-gradient-to-bl from-[#1E1E1E] to-[#121212] text-white ">
              <p className="text-[12px] lg:text-[18px] text-[#9C9C9C] font-[500] ">Product</p>
              <p className="text-[16px] lg:text-[28px] mt-1 md:mt-3 px-6 md:px-0 uppercase font-[neutral_face]">
                From Challenge to Victory: Exploring Case<br className='hidden md:block' /> Studies of Innovation and Excellence
              </p>
              <div className='flex flex-col md:flex-row gap-5 lg:gap-16 px-5 lg:px-20 pt-6 lg:pt-14 '>
                <img src={productsection} className='md:w-1/2' />
                <div className='flex flex-col justify-between text-left lg:w-[490px] '>
                  <div className='space-y-4 lg:space-y-5'>
                    <p className="text-[10px] lg:text-[14px] text-[#9C9C9C] font-[500] ">Category</p>
                    <p className='text-[15px] lg:text-[24px] '>Dave Financial CRM</p>
                    <p className='text-[11px] lg:text-[16px] '>Lorem ipsum dolor sit amet consectetur. Sit non diam justo fames. Blandit et purus mollis convallis malesuada egestas risus quam enim. Semper lorem rhoncus et felis tristique tellus volutpat orci. Dui elementum a sed.</p>
                    <p className="pt-4 lg:pt-6 pb-3 text-[11px] lg:text-[16px] text-[#9C9C9C] font-[500] ">Technology</p>
                    <div className='flex gap-7 lg:gap-15 pl-4 lg:pl-6'>
                      <img src={tech1} className='w-6 lg:w-full' />
                      <img src={tech2} className='w-6 lg:w-full' />
                      <img src={tech3} className='w-6 lg:w-full' />
                      <img src={tech4} className='w-6 lg:w-full' />
                      <img src={tech3} className='w-6 lg:w-full' />
                    </div>
                  </div>
                  <button className='mt-8 md:mt-0 w-[160px] lg:w-[238px] h-[40px] lg:h-[56px] rounded-[8px] border hover:bg-white hover:text-black duration-500 text-[13px] lg:text-[16px] font-[500] '>View Case Study &nbsp; →</button>
                </div>
              </div>
              <div className='flex justify-center gap-5 pt-10 lg:pt-15'>
                <img src={leftarrow} className='w-8 lg:w-auto' />
                <img src={rightarrow} className='w-8 lg:w-auto' />
              </div>
            </div>
    </>
  )
}

export default Products
