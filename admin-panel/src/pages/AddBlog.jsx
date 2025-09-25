import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Sidebar from '../components/Sidebar'


function AddBlog() {
  const [blogs, setBlogs] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    tag: "",
    title: "",
    name: "",
    date: "",

    readingTime: "",
    sections: [{ subtitle: "", content: "" }],
    points: [""]
  })

  // fetch blogs
  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs")
      setBlogs(res.data)
    } catch (err) {
      console.error("Error fetching blogs:", err)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  // handle form input
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // add new blog
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:5000/api/blogs", formData)
      setFormData({ tag: "", title: "", name: "", date: "", readingTime: "", sections: [{ subtitle: "", content: "" }], points: [""] })
      fetchBlogs()
    } catch (err) {
      console.error("Error adding blog:", err)
    }
  }

  // save edited blog
  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/blogs/${id}`, formData)
      setEditingId(null)
      setFormData({ tag: "", title: "", name: "", date: "", readingTime: "", sections: [{ subtitle: "", content: "" }], points: [""] })
      fetchBlogs()
    } catch (err) {
      console.error("Error updating blog:", err)
    }
  }

  // delete blog
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:5000/api/blogs/${id}`)
        fetchBlogs()
      } catch (err) {
        console.error("Error deleting blog:", err)
      }
    }
  }

  // change subtitle or content of a section
  const handleSectionChange = (index, field, value) => {
    const newSections = [...formData.sections]
    newSections[index][field] = value
    setFormData({ ...formData, sections: newSections })
  }

  // add new section
  const addSection = () => {
    setFormData({
      ...formData,
      sections: [...formData.sections, { subtitle: "", content: "" }]
    })
  }

  // remove a section
  const removeSection = (index) => {
    const newSections = [...formData.sections]
    newSections.splice(index, 1)
    setFormData({ ...formData, sections: newSections })
  }


  // change point text
  const handlePointChange = (index, value) => {
    const newPoints = [...formData.points]
    newPoints[index] = value
    setFormData({ ...formData, points: newPoints })
  }

  // add new point
  const addPoint = () => {
    setFormData({ ...formData, points: [...formData.points, ""] })
  }

  // remove point
  const removePoint = (index) => {
    const newPoints = [...formData.points]
    newPoints.splice(index, 1)
    setFormData({ ...formData, points: newPoints })
  }


  return (
    <>
      <Sidebar />
      <div className="pl-8 md:pl-80 lg:pl-85 pt-24 md:pt-10 lg:pt-20 bg-gradient-to-l from-black to-[#1E1E1E] text-gray-300 min-h-screen pr-8 md:pr-8 lg:pr-16">
        <h1 className='text-[25px] md:text-[35px] font-bold mb-6'>Add / Edit Blogs</h1>

        <form onSubmit={editingId ? (e) => { e.preventDefault(); handleSave(editingId); } : handleSubmit} className='flex flex-col gap-4 mb-10 lg:w-[450px] '>
          <input
            type='text'
            name='tag'
            value={formData.tag}
            onChange={handleChange}
            placeholder='Blog Tag'
            className='p-2 bg-transparent border border-gray-600 rounded-md'
            required
          />
          <input
            name='title'
            value={formData.title}
            onChange={handleChange}
            placeholder='Blog Title'
            className='p-2 bg-transparent border border-gray-600 rounded-md'
            required
          />
          <input
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Author Name'
            className='p-2 bg-transparent border border-gray-600 rounded-md'
            required
          />
          <input
            type='date'
            name='date'
            value={formData.date}
            onChange={handleChange}
            className='p-2 bg-transparent border border-gray-600 rounded-md'
            required
          />

          {/* details */}
          <input
            type='text'
            name='readingTime'
            value={formData.readingTime}
            onChange={handleChange}
            placeholder='Reading Time'
            className='p-2 bg-transparent border border-gray-600 rounded-md'
            required
          />

          {/* Sections */}
          <div className="mt-6  ">
            <h3 className="text-lg font-semibold text-gray-200 mb-2">Blog Sections</h3>
            {formData.sections.map((section, index) => (
              <div key={index} className="mb-4 p-3 border border-gray-600 rounded-md">
                <input
                  type="text"
                  value={section.subtitle}
                  onChange={(e) => handleSectionChange(index, "subtitle", e.target.value)}
                  placeholder={`Subtitle ${index + 1}`}
                  className="p-2 bg-transparent border border-gray-600 rounded-md w-full mb-2"
                />
                <textarea
                  value={section.content}
                  onChange={(e) => handleSectionChange(index, "content", e.target.value)}
                  placeholder={`Content ${index + 1}`}
                  className="p-2 bg-transparent border border-gray-600 rounded-md w-full"
                  rows={3}
                />
                <button
                  type="button"
                  onClick={() => removeSection(index)}
                  className="text-[14px] md:text-[13px] bg-red-500 hover:bg-red-400 px-3 py-1 rounded-sm text-white mt-2"
                >
                  Remove Section
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSection}
              className="text-[14px] md:text-[13px] bg-green-500 hover:bg-green-400 px-3 py-1 rounded-sm text-white"
            >
              + Add Section
            </button>
          </div>

          {/* Points */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-200 mb-2">Blog Points</h3>
            {formData.points.map((point, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={point}
                  onChange={(e) => handlePointChange(index, e.target.value)}
                  placeholder={`Point ${index + 1}`}
                  className="p-2 bg-transparent border border-gray-600 rounded-md w-full"
                />
                <button
                  type="button"
                  onClick={() => removePoint(index)}
                  className="text-[11px] md:text-[10px] bg-red-500 hover:bg-red-400 px-1.5 py-0.5 rounded-sm text-white"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addPoint}
              className="text-[14px] md:text-[13px] bg-green-500 hover:bg-green-400 px-3 py-1 rounded-sm text-white"
            >
              + Add Point
            </button>
          </div>


          <button
            type='submit'
            className='hover:bg-[#a2a0a0] bg-gray-300 text-black md:w-[450px] p-2 rounded-sm'
          >
            {editingId ? "Save Changes" : "Add Blog"}
          </button>
          {editingId && (
            <button
              type='button'
              onClick={() => {
                setEditingId(null)
                setFormData({ tag: "", title: "", name: "", date: "", sections: [{ subtitle: "", content: "" }], points: [" "] })
              }}
              className='hover:bg-red-600 bg-red-500 text-white w-[450px] p-2 rounded-sm'
            >
              Cancel
            </button>
          )}
        </form>

        {/* Display Blogs */}
        <h2 className='text-[25px] md:text-[35px] font-bold mb-6'>Existing Blogs</h2>
        <div className='flex flex-wrap gap-8'>
          {blogs.length > 0 ? blogs.map((item) => (
            <div key={item._id} className='bg-[#1E1E1E] p-4 rounded w-full md:w-[45%]'>
              <h3 className='text-[18px] font-semibold'>{item.tag}</h3>
              <p className='text-gray-400 mt-1'>{item.title}</p>
              <p className='text-gray-400 mt-2'><strong>Author:</strong> {item.name || '-'}</p>
              <p className='text-gray-400'><strong>Date:</strong> {item.date || '-'}</p>
              <p className='text-gray-400'><strong>Reading Time:</strong> {item.readingTime || '-'}</p>

              {/* ✅ Show blog sections */}
              {item.sections && item.sections.length > 0 && (
                <div className="mt-3">
                  <p className="font-semibold text-gray-200">Sections:</p>
                  {item.sections.map((sec, index) => (
                    <div key={index} className="mt-2">
                      <h4 className="text-gray-300 font-semibold">{sec.subtitle}</h4>
                      <p className="text-gray-400">{sec.content}</p>
                    </div>
                  ))}
                </div>
              )}


              {/* ✅ Show blog points */}
              {item.points && item.points.length > 0 && (
                <div className="mt-3">
                  <p className="font-semibold text-gray-200">Points:</p>
                  <ul className="list-disc list-inside text-gray-400">
                    {item.points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className='flex gap-2 mt-4'>
                <button
                  onClick={() => {
                    setEditingId(item._id)
                    setFormData({
                      tag: item.tag,
                      title: item.title,
                      name: item.name,
                      date: item.date,
                      sections: item.sections && item.sections.length > 0 ? item.sections : [{ subtitle: "", content: "" }], // ✅ preserve sections
                      points: item.points && item.points.length > 0 ? item.points : [""], // ✅ preserve points
                    })
                  }}
                  className='bg-blue-500 hover:bg-blue-400 px-3 py-1 rounded-sm text-white'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className='bg-red-500 hover:bg-red-400 px-3 py-1 rounded-sm text-white'
                >
                  Delete
                </button>
              </div>
            </div>
          )) : (
            <p className="text-gray-500 py-6">No Blogs Added</p>
          )}
        </div>
      </div>
    </>
  )
}

export default AddBlog
