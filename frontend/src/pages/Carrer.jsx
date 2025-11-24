import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import HeroSection from "../components/commoncomponents/HeroSection"; 

const cultureValues = [
  {
    title: "Build for the customer and yourself",
    description:
      "We love building for our customers and believe that we are uniquely positioned to create history and in the process find the best version of ourselves.",
  },
  {
    title: "Play like the MVP",
    description:
      "We are a group of high performing teams who care about each other's growth. We recruit the best and train them to excel and lead.",
  },
  {
    title: "Act with ownership",
    description:
      "We encourage taking responsibility and accountability for delivering outcomes with autonomy and confidence.",
  },
  {
    title: "Think long term",
    description:
      "We believe in solving foundational problems by thinking long-term and creating sustainable impact.",
  },
];

const benefits = [
  {
    title: "Competitive Salary",
    description: "We offer market-leading salary packages for top talent.",
    icon: "💰",
  },
  {
    title: "Health Insurance",
    description: "Comprehensive health insurance for you and your family.",
    icon: "🏥",
  },
  {
    title: "Learning & Growth",
    description:
      "Upskill with mentorship, courses, and real growth opportunities.",
    icon: "📈",
  },
  {
    title: "Flexible Work",
    description:
      "Hybrid & remote options to maintain a healthy work-life balance.",
    icon: "🏡",
  },
];

const CareersPage = () => {
  const [teamImages, setTeamImages] = useState([]);
  
  const [careerData, setCareerData] = useState({
    video: null,
    title: "",        
    subtitle: "",     
    description: ""   
  });

  const [selectedTechs, setSelectedTechs] = useState({});
  const [otherTech, setOtherTech] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getMediaUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http") || url.startsWith("https")) return url;
    return `http://localhost:5000/${url.replace(/\\/g, "/")}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const finalTechList = Object.keys(selectedTechs).filter((key) => selectedTechs[key]);
    
    if (otherTech && otherTech.trim() !== "") {
      finalTechList.push(otherTech.trim());
    }

    const formData = new FormData();
    formData.append("fullName", e.target.fullName.value);
    formData.append("email", e.target.email.value);
    formData.append("mobile", e.target.mobile.value);
    // ➤ ADDED: Job Type Field
    formData.append("jobType", e.target.jobType.value);
    formData.append("address", e.target.address.value);
    formData.append("selectedTechnologies", JSON.stringify(finalTechList));

    if (e.target.resume.files[0])
      formData.append("resume", e.target.resume.files[0]);

    try {
      await axios.post("http://localhost:5000/api/careers/apply", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        title: "Application Submitted!",
        text: "Your application has been sent successfully.",
        icon: "success",
        iconColor: "#000",
        confirmButtonColor: "#000",
        background: "#fff",
        color: "#000"
      });

      e.target.reset();
      setSelectedTechs({});
      setOtherTech("");
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#000",
      });
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTech = (tech) => {
    setSelectedTechs((prev) => ({
      ...prev,
      [tech]: !prev[tech],
    }));
  };

  const technologies = [
    ".Net Developer",
    "React Developer",
    "Node.Js Developer",
    "Wordpress Developer",
    "PHP Developer",
    "Angular Developer",
    "Python Developer",
    "React Native Developer",
    "Android Developer",
    "Mobile App Developer",
    "Full Stack Developer",
    "UI/UX Design and Developer",
    "Front End Developer",
    "UX Designer",
    "Digital Marketing",
    "Software Testing",
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/careers/images")
      .then((res) => setTeamImages(res?.data?.images || []))
      .catch((err) => console.log("Error fetching images:", err));

    axios
      .get("http://localhost:5000/api/careers/section")
      .then((res) => {
        if (res.data.success && res.data.data) {
            setCareerData({
                video: res.data.data.video,
                title: res.data.data.title || "", 
                subtitle: res.data.data.subtitle || "",
                description: res.data.data.description || ""
            });
        }
      })
      .catch((err) => console.log("Error fetching section data:", err));
  }, []);

  const hasContent = careerData.description && careerData.description.trim() !== "";

  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection 
        heading='CAREERS'
        description='Join a team of passionate innovators dedicated to delivering simple and intelligent IT solutions. Discover a career that inspires you and makes a real impact in an industry ready for AI-led transformation.'
        section='#nextsection'
      />

      {/* 2. Culture & Images Section */}
      <div id='nextsection' className='relative z-10 -mt-2 pt-16 lg:pt-32 text-center bg-gradient-to-b from-black to-[#1E1E1E] text-white'>
        
        {/* Images Grid */}
        <div className="px-5 lg:px-25 mb-20">
             <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {teamImages.slice(0, 8).map((img, index) => (
              <div
                key={index}
                className="break-inside-avoid rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-500 ease-in-out border border-[#333]"
              >
                <img
                  src={getMediaUrl(img.url)} 
                  alt="Team"
                  className="w-full h-auto object-cover opacity-80 hover:opacity-100 transition duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Culture Headings */}
        <p className='text-[12px] lg:text-[18px] text-[#9C9C9C] font-[500] uppercase tracking-widest'>Culture Code</p>
        <p className='text-[16px] lg:text-[28px] mt-1 md:mt-3 uppercase font-[neutral_face]'>Our culture reflects our core values</p>
        
        {/* Culture Grid */}
        <div className='flex flex-wrap justify-center gap-6 lg:gap-10 py-12 lg:py-20 px-5 lg:px-25'>
          {cultureValues.map((value, index) => (
            <div
              key={index}
              className="w-full md:w-[45%] lg:w-[40%] text-left p-6 border border-[#333] bg-[#1a1a1a] rounded-xl hover:bg-[#000] hover:border-[#555] transition-all duration-300"
            >
              <h3 className='text-[18px] lg:text-[24px] font-[neutral_face] mb-3 text-white'>{value.title}</h3>
              <p className='text-[12px] lg:text-[16px] text-[#9C9C9C] leading-relaxed'>
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Benefits Section */}
      <div className='pt-16 lg:pt-20 text-center bg-[#1E1E1E] text-white'>
        <p className='text-[12px] lg:text-[18px] text-[#9C9C9C] font-[500] uppercase tracking-widest'>Perks & Benefits</p>
        <p className='text-[16px] lg:text-[28px] mt-1 md:mt-3 uppercase font-[neutral_face]'>Comprehensive benefits to help you grow</p>

        <div className='flex flex-wrap justify-center gap-6 py-12 lg:py-16 px-5 lg:px-25'>
           {benefits.map((benefit, index) => (
              <div
                key={index}
                className="w-full sm:w-[45%] lg:w-[22%] p-6 bg-black border border-[#333] rounded-xl text-left hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="text-3xl mb-4 grayscale">{benefit.icon}</div>
                <h3 className="text-[16px] lg:text-[18px] font-bold mb-2 font-[neutral_face]">{benefit.title}</h3>
                <p className="text-[12px] lg:text-[14px] text-[#9C9C9C]">
                  {benefit.description}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* 4. Testimonials & Form Section */}
      <div className='pt-20 md:pt-14 lg:pt-30 text-center bg-gradient-to-t from-black to-[#1E1E1E] text-white pb-20'>
        
        <p className='text-[12px] md:text-[16px] lg:text-[18px] text-[#9C9C9C] font-[500] uppercase tracking-widest'>Employee Stories</p>
        <p className='text-[16px] md:text-[22px] lg:text-[28px] mt-1 md:mt-3 uppercase font-[neutral_face] mx-6'>Don’t take our word for it.</p>

        <div className={`flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-20 py-12 lg:py-20 px-5 lg:px-40 ${!hasContent && 'justify-center'}`}>
            
             {/* Video Container */}
            <div className={`relative rounded-2xl overflow-hidden shadow-2xl h-64 sm:h-80 md:h-96 bg-[#111] border border-[#333] flex items-center justify-center group ${hasContent ? "w-full md:w-1/2" : "w-full max-w-4xl"}`}>
              {careerData.video && careerData.video.url ? (
                <video
                  key={careerData.video.url}
                  controls
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition duration-500"
                >
                  <source src={getMediaUrl(careerData.video.url)} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                  <div className="text-4xl mb-2">🎥</div>
                  <span className="font-semibold text-sm">Video coming soon</span>
                </div>
              )}
            </div>

            {/* Testimonial Text */}
            {hasContent && (
              <div className="w-full md:w-1/2 text-left">
                <div className="flex flex-wrap gap-4 mb-6">
                   <div className="flex items-center gap-2 bg-[#222] px-3 py-1 rounded-lg border border-[#444]">
                     <span className="font-bold text-sm text-white">AmbitionBox</span>
                     <span className="text-xs text-[#9C9C9C]">4.1 ★</span>
                   </div>
                   <div className="flex items-center gap-2 bg-[#222] px-3 py-1 rounded-lg border border-[#444]">
                     <span className="font-bold text-sm text-white">Glassdoor</span>
                     <span className="text-xs text-[#9C9C9C]">4.3 ★</span>
                   </div>
                </div>

                <blockquote className="text-[16px] lg:text-[22px] leading-relaxed text-[#ccc] italic mb-6 font-[neutral_face]">
                  "{careerData.description}"
                </blockquote>

                <div>
                  <h4 className="text-[18px] font-bold text-white uppercase tracking-wider">{careerData.title}</h4>
                  <p className="text-[#9C9C9C] text-sm">{careerData.subtitle}</p>
                </div>
              </div>
            )}
        </div>

        {/* 5. Application Form */}
        <p className='pt-10 lg:pt-14 text-[12px] md:text-[16px] lg:text-[18px] text-[#9C9C9C] font-[500] uppercase tracking-widest'>Join Us</p>
        <p className='text-[16px] md:text-[22px] lg:text-[28px] mt-1 md:mt-3 uppercase font-[neutral_face] mx-6 mb-10'>Apply For Your Next Role</p>

        <div className="max-w-5xl mx-auto px-5 lg:px-0">
          <div className="border border-[#333] bg-[#111] p-6 md:p-10 rounded-2xl text-left">
             <p className="text-[14px] lg:text-[18px] font-semibold text-gray-300 mb-4">Select Technology</p>

             <div className="flex flex-wrap gap-3 mb-8">
                {technologies.map((tech, index) => (
                  <button
                    key={index}
                    onClick={() => toggleTech(tech)}
                    className={`px-4 py-2 border rounded-full text-[12px] md:text-[14px] flex items-center gap-2 transition duration-300
                    ${selectedTechs[tech] 
                        ? "bg-white text-black border-white font-bold" 
                        : "bg-black text-[#9C9C9C] border-[#333] hover:border-white hover:text-white"}`}
                  >
                    <span>{selectedTechs[tech] ? "✓" : "+"}</span> {tech}
                  </button>
                ))}
                
                <input 
                  type="text"
                  placeholder="Other..."
                  value={otherTech}
                  onChange={(e) => setOtherTech(e.target.value)}
                  className="px-4 py-1.5 border rounded-full border-[#333] bg-black text-white text-[12px] md:text-[14px] focus:outline-none focus:border-white focus:ring-1 focus:ring-white min-w-[120px]"
                />
             </div>

             <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <input type="text" name="fullName" placeholder="Full Name" required className="bg-black border border-[#333] px-4 py-3 rounded-lg focus:border-white focus:outline-none text-white w-full placeholder-[#555]" />
                  
                  {/* Email */}
                  <input type="email" name="email" placeholder="Email Address" required className="bg-black border border-[#333] px-4 py-3 rounded-lg focus:border-white focus:outline-none text-white w-full placeholder-[#555]" />
                  
                  {/* Mobile */}
                  <input type="text" name="mobile" placeholder="Mobile Number" required className="bg-black border border-[#333] px-4 py-3 rounded-lg focus:border-white focus:outline-none text-white w-full placeholder-[#555]" />
                  
                  {/* ➤ ADDED: Job Type Dropdown */}
                  <select 
                    name="jobType" 
                    required 
                    defaultValue=""
                    className="bg-black border border-[#333] px-4 py-3 rounded-lg focus:border-white focus:outline-none text-white w-full appearance-none"
                  >
                     <option value="" disabled className="text-gray-500">Select Job Role</option>
                     <option value="Internship" className="bg-black">Internship</option>
                     <option value="Full Time" className="bg-black">Full Time</option>
                  </select>

                  {/* Resume */}
                  <div className="relative md:col-span-2">
                    <label className="absolute -top-2.5 left-3 bg-[#111] px-1 text-[10px] text-[#9C9C9C]">Upload Resume</label>
                    <input type="file" name="resume" className="block w-full text-sm text-[#9C9C9C] file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#222] file:text-white hover:file:bg-[#333] cursor-pointer bg-black border border-[#333] rounded-lg" />
                  </div>
                </div>

                <textarea name="address" placeholder="Address" required rows="3" className="bg-black border border-[#333] px-4 py-3 rounded-lg focus:border-white focus:outline-none text-white w-full placeholder-[#555]"></textarea>

                <div className="text-center mt-8">
                  <button type="submit" disabled={isSubmitting} className={`px-12 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition transform ${isSubmitting ? "opacity-70" : ""}`}>
                    {isSubmitting ? "Submitting..." : "SUBMIT APPLICATION"}
                  </button>
                </div>
             </form>
          </div>
        </div>

      </div>
    </>
  );
};

export default CareersPage;