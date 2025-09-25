import image2 from '../assets/images/herosectionimage.png'
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function CasesDetails() {
    const { id } = useParams();
    const [caseData, setCaseData] = useState(null);

    useEffect(() => {
        const fetchCase = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/cases/${id}`);
                setCaseData(res.data);
            } catch (err) {
                console.error("Error fetching case:", err);
            }
        };
        fetchCase();
    }, [id]);

    if (!caseData) return <p>Loading...</p>;
    
    return (
        <>
            <div className='px-10 lg:pt-40 pb-10 flex gap-15 bg-gradient-to-b from-black to-[#1E1E1E] text-white '>
                    <div className='w-[1800px] '>
                        <h1 className='text-[46px] lg:text-[48px] mt-1 md:mt-3 uppercase font-[neutral_face]'>{caseData.title}</h1>
                        <p className='text-[12px] lg:text-[14px] text-[#9C9C9C] font-[500] '>{caseData.description}</p>
                        <div className='mt-30 text-[#9C9C9C] text-[12px] lg:text-[14px] '>
                            <span className=''>Space and Universe</span>
                            <span className=''> | </span>
                            <span className=''>Daniel albarta</span>
                            <span className=''> | </span>
                            <span className=''>October 22, 2023</span>
                        </div>
                    </div>
                    <div className='mt-10 w-[800px] h-[500px]'>
                        <img src={image2} className='w-full h-full object-cover' />
                    </div>
                    <div className='space-y-5 '>
                        <div>
                            <p className='text-[20px] '>Problem Before - </p>
                            <p className='text-[14px] text-[#FFFFFFCC] '>On Thursday, three Russian astronauts lifted off on the Moscow-17 spacecraft from the Sputnik 1 Satellite Launch Center deep in the Gobi Desert, heading for the Mir space station for a six-month stay.</p>
                        </div>
                        <div>
                            <p className='text-[20px] '>Problem Solved - </p>
                            <p className='text-[14px] text-[#FFFFFFCC] '>On Thursday, three Russian astronauts lifted off on the Moscow-17 spacecraft from the Sputnik 1 Satellite Launch Center deep in the Gobi Desert, heading for the Mir space station for a six-month stay.</p>
                        </div>
                        <div>
                            <p className='text-[20px] '>What we Add - </p>
                            <p className='text-[14px] text-[#FFFFFFCC] '>On Thursday, three Russian astronauts lifted off on the Moscow-17 spacecraft from the Sputnik 1 Satellite Launch Center deep in the Gobi Desert, heading for the Mir space station for a six-month stay.</p>
                        </div>
                    </div>
                </div>
           
        </>
    )
}

export default CasesDetails
