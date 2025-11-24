import { useState } from "react";
import Navbar from "../components/Navbar";

function GetQuote() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    otherService: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // If user selected "Other", use the custom service
    const finalData = {
      ...formData,
      service:
        formData.service === "Other" ? formData.otherService : formData.service,
    };
    try {
      const response = await fetch("http://localhost:5000/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        alert("Quote Submitted Successfully!");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to submit");
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-black h-150 md:w-full text-amber-50 flex flex-col justify-center pt-24">
        <h1 className="mt-20 lg:text-5xl text-2xl text-center font-bold">
          GET YOUR FREE QUOTE
        </h1>

        <p className="mt-2 mb-5 text-center">
          Fill the form and our team will contact you.
        </p>

        <form
          onSubmit={handleSubmit}
          className="p-5 flex flex-col md:w-130 md:mx-auto"
        >
          <input
            name="name"
            className="bg-white text-black p-2 rounded-md mb-4"
            type="text"
            placeholder="Name"
            onChange={handleChange}
          />

          <input
            name="email"
            className="bg-white text-black p-2 rounded-md mb-4"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <div className="flex flex-col md:flex-row gap-2">
            <input
              name="phone"
              type="text"
              placeholder="Phone"
              className="bg-white text-black p-2 w-full rounded-md mb-4"
              maxLength={10}
              onChange={(e) => {
              
                const value = e.target.value.replace(/\D/g, "");
              
                if (value.length <= 10) {
                  setFormData({ ...formData, phone: value });
                }
              }}
            />

            <select
              name="service"
              onChange={handleChange}
              className="bg-white text-sm text-black p-2 w-full rounded-md mb-4"
            >
              <option value="">Service Type</option>
              <option value="Web Development">Web Development</option>
              <option value="UI/UX">UI/UX</option>
              <option value="AI/ML Modules">AI/ML Modules</option>
              <option value="Other">Other</option>
            </select>
            {formData.service === "Other" && (
              <input
                type="text"
                name="otherService"
                placeholder="Enter custom service"
                onChange={handleChange}
                className="bg-white text-sm text-black p-2 w-full rounded-md mb-4"
              />
            )}
          </div>

          <input
            name="message"
            className="bg-white text-black p-2 rounded-md mb-4"
            type="text"
            placeholder="Message / Requirements"
            onChange={handleChange}
          />

          <button className="bg-purple-400 text-white font-bold p-2 rounded-md mb-4">
            Submit
          </button>

          <p className="text-center">We reply within 24 hours</p>
        </form>
      </div>
    </>
  );
}
export default GetQuote;
