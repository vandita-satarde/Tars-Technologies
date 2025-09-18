import React from 'react'
import mainBlog from '../assets/images/main-blog.jpg'
import blogProfile from '../assets/images/blog-profile.png'

function BlogCard({name}) {
    return (
        <>
            <div className='bg-black w-[280px] md:w-[390px] p-2 md:p-3 rounded-[12px] '>
                <img src={mainBlog} className='h-[180px] md:h-[240px] rounded-[6px] ' />
                <div className=' space-y-5 p-2 '>
                    <p className='bg-[#4B6BFB4D] text-[#4B6BFB] w-[80px] md:w-[97px] py-1 text-[11px] md:text-[14px] rounded-[6px]  '>Technology</p>
                    <p className='text-[15px] md:text-[20px] text-left font-bold leading-6 lg:leading-8 uppercase '>The Impact of Technology on the Workplace: How Technology is Changing</p>
                    <div className='text-[11px] md:text-[16px] text-[#97989F] flex items-center gap-2 md:gap-3'>
                        <img src={blogProfile} className='w-[22px] md:w-[36px] ' />
                        <p>{name}</p>
                        <p className='ml-2'>August 20, 2022</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogCard
