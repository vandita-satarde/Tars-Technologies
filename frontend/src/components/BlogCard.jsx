import React, { useEffect } from 'react'
import mainBlog from '../assets/images/main-blog.jpg'
import blogProfile from '../assets/images/blog-profile.png'
import { Link, useNavigate } from 'react-router-dom'

function BlogCard({tag, title, name, date,link}) {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/blogs-details/${id}`)
    }

    return (
        <>
            <Link
             to={link}
            //  onClick={()=>{navigate(`/blogs-details/${id}`)}}
             
             className='bg-black w-[280px] md:w-[390px] p-2 md:p-3 rounded-[12px] cursor-pointer' >
                <img src={mainBlog} className='h-[180px] md:h-[240px] rounded-[6px] ' />
                <div className=' space-y-5 p-2 '>
                    <p className='bg-[#4B6BFB4D] text-[#4B6BFB] w-[80px] md:w-[97px] py-1 text-[11px] md:text-[14px] rounded-[6px]  '>{tag}</p>
                    <p className='text-[15px] md:text-[20px] text-left font-bold leading-6 lg:leading-8 uppercase '>{title}</p>
                    <div className='text-[11px] md:text-[16px] text-[#97989F] flex items-center gap-2 md:gap-3'>
                        <img src={blogProfile} className='w-[22px] md:w-[36px] ' />
                        <p>{name}</p>
                        <p className='ml-2'>{date}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default BlogCard
