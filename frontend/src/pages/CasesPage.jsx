import React, { useEffect, useState } from 'react'
import axios from 'axios'

import HeroSection from '../components/commoncomponents/HeroSection'
import CaseCard from '../components/commoncomponents/CaseCard'
import GetinTouch from '../components/commoncomponents/GetinTouch'
import casestudy from '../assets/images/caseStudy.png'

function CasesPage() {
  const [cases, setCases] = useState([])

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cases")
        setCases(res.data)
      } catch (error) {
        console.error("Enter fetching Cases", error)
      }
    }
    fetchCases();
  }, [])
  
  return (
    <>
      <HeroSection
        heading={`CASES`}
        description={`At Tars Technology, every case study tells a story of transformation. By combining innovative design, powerful technology, and user-centered thinking, we help businesses overcome challenges and unlock measurable success.`}
      />

      <div className='py-10 lg:py-28 text-center bg-gradient-to-b from-black to-[#1E1E1E] text-white '>
        <p className='text-[12px] lg:text-[18px] text-[#9C9C9C] font-[500] '>Case Study</p>
        <p className='text-[16px] lg:text-[28px] mt-1 md:mt-3 uppercase font-[neutral_face]'>Case Studies That Reflect Our<br /> Commitment to Excellence</p>
        <div>
          {cases.length > 0 ? (
            cases.map((item) => (
              <CaseCard
                key={item._id}
                image={casestudy}
                title={item.title}
                description={item.description}
                contentDiv='w-[260px] lg:w-[450px]'
                showText={false}
                button='Know More &nbsp; →'
                link={`/cases-details/${item._id}`}
              />
            ))
          ) : (
            <p className='text-gray-400'>Loading...</p>
          )}
        </div>
      </div>

      <GetinTouch />
    </>
  )
}

export default CasesPage
