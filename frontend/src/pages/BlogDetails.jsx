import React, { useState, useEffect } from 'react'
import mainBlog from '../assets/images/main-blog.jpg'
import blogProfile from '../assets/images/blog-profile.png'
import axios from 'axios'
import { useParams, Link } from "react-router-dom";

function BlogDetails() {
    const { id } = useParams();
    const [blogData, setBlogData] = useState(null)

    useEffect(() => {
        const fetchCase = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
                setBlogData(res.data);
            } catch (err) {
                console.error("Error fetching blog:", err)
            }
        }
        fetchCase()
    }, [id])

    if (!blogData) return <p>Loading...</p>

    return (
        <>
            <div className=' lg:pt-16 pb-10 flex flex-col gap-6 bg-gradient-to-b from-black to-[#1E1E1E] text-white '>
                <img src={mainBlog} className='h-[220px] md:h-[500px] w-[330px] md:w-[1200px] object-cover mx-auto mt-18 rounded-[12px] ' />
                <div className='px-10 lg:px-50 space-y-6'>
                    <p className='text-[48px] font-[700] '>{blogData.title}</p>
                    <div>
                        <div className='flex items-center '>
                            <img src={blogProfile} className='w-[22px] md:w-[36px] ' />
                            <span className='ml-2 text-[20px] text-[#dfe2ec] font-[600] '>{blogData.name}</span>
                        </div>
                        <div className='ml-12 space-y-5 text-[16px] text-[#6D6E76] '>
                            <div className='text-[20px] text-center'>
                                <span className='ml-2'>{blogData.date}</span>
                                <span className='ml-2'>Reading Time</span>
                            </div>
                            <p className='text-[36px] text-[#eaebef] '>{blogData.subtitle1}</p>
                            <p>{blogData.content1}</p>
                            <p className='text-[36px] text-[#eaebef] '>{blogData.subtitle2}</p>
                            <p>{blogData.content2}</p>
                            {blogData.points && blogData.points.length > 0 && (
                                <ul className='list-disc list-inside text-[24px] text-[#bdbec4] mt-4'>
                                    {blogData.points.map((point, index) => (
                                        <li key={index}>{point}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogDetails
