import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

function AddProduct() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    images: [], 
    title: "",
    description: "",
    category: "",
    technologies: [],
    uses: [],
    benefits: [],
    problemsSolutions: [],
    features: [],
    specifications: {}
  });

  const availableTechnologies = ["HTML", "CSS", "Python", "WordPress", "JavaScript", "React", "Angular", "Aws", "Azure"];
  const formRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  // Temporary input states
  const [useInput, setUseInput] = useState({ title: "", description: "" });
  const [benefitInput, setBenefitInput] = useState({ title: "", description: "" });
  const [problemSolutionInput, setProblemSolutionInput] = useState({ problem: "", solution: "" });
  const [featureInput, setFeatureInput] = useState("");
  const [specInput, setSpecInput] = useState({ key: "", value: "" });

  // Image Upload
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);

    try {
      const uploadedImages = [];

      for (let file of files) {
        const formDataImg = new FormData();
        formDataImg.append('image', file);

        const res = await axios.post("http://localhost:5000/api/images/upload", formDataImg, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        if (res.data.success) {
          uploadedImages.push({
            url: res.data.data.secure_url,
            public_id: res.data.data.public_id
          });
        }
      }

      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...uploadedImages]
      }));

    } catch (err) {
      console.error("Image upload error: ", err);
      alert("Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (public_id) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.public_id !== public_id)
    }));
  };

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Uses Management
  const addUse = () => {
    if (useInput.title.trim() && useInput.description.trim()) {
      setFormData(prev => ({
        ...prev,
        uses: [...prev.uses, { ...useInput }]
      }));
      setUseInput({ title: "", description: "" });
    } else {
      alert("Please fill both title and description for the use");
    }
  };

  const removeUse = (index) => {
    setFormData(prev => ({
      ...prev,
      uses: prev.uses.filter((_, i) => i !== index)
    }));
  };

  // Benefits Management
  const addBenefit = () => {
    if (benefitInput.title.trim() && benefitInput.description.trim()) {
      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, { ...benefitInput }]
      }));
      setBenefitInput({ title: "", description: "" });
    } else {
      alert("Please fill both title and description for the benefit");
    }
  };

  const removeBenefit = (index) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  // Problem & Solution Management
  const addProblemSolution = () => {
    if (problemSolutionInput.problem.trim() && problemSolutionInput.solution.trim()) {
      setFormData(prev => ({
        ...prev,
        problemsSolutions: [...prev.problemsSolutions, { ...problemSolutionInput }]
      }));
      setProblemSolutionInput({ problem: "", solution: "" });
    } else {
      alert("Please fill both problem and solution");
    }
  };

  const removeProblemSolution = (index) => {
    setFormData(prev => ({
      ...prev,
      problemsSolutions: prev.problemsSolutions.filter((_, i) => i !== index)
    }));
  };

  // Features Management
  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput("");
    } else {
      alert("Please enter a feature");
    }
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  // Specifications Management
  const addSpecification = () => {
    if (specInput.key.trim() && specInput.value.trim()) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specInput.key]: specInput.value
        }
      }));
      setSpecInput({ key: "", value: "" });
    } else {
      alert("Please fill both key and value for the specification");
    }
  };

  const removeSpecification = (key) => {
    setFormData(prev => {
      const newSpecs = { ...prev.specifications };
      delete newSpecs[key];
      return { ...prev, specifications: newSpecs };
    });
  };

  // Submit Form
//  const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await axios.post("http://localhost:5000/api/products", formData);

//     console.log("Product Saved:", response.data);

//     setProducts([...products, response.data]);

//     // Reset form
//     setFormData({
//       images: [],
//       title: "",
//       description: "",
//       category: "",
//       technologies: [],
//       uses: [],
//       benefits: [],
//       problemsSolutions: [],
//       features: [],
//       specifications: {}
//     });

//   } catch (error) {
//     console.error("Error saving product:", error);
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let response;

    if (editingId) {
      // UPDATE
      response = await axios.put(
        `http://localhost:5000/api/products/${editingId}`,
        formData
      );
    } else {
      // CREATE
      response = await axios.post(
        "http://localhost:5000/api/products",
        formData
      );
    }

    // Update product list
    fetchProducts();

    // Reset form
    setFormData({
      images: [],
      title: "",
      description: "",
      category: "",
      technologies: [],
      uses: [],
      benefits: [],
      problemsSolutions: [],
      features: [],
      specifications: {}
    });

    setEditingId(null);

  } catch (error) {
    console.error("Error saving product:", error);
  }
};


  const handleEdit = (product) => {
    setFormData({
      images: product.images || [],
      title: product.title || "",
      description: product.description || "",
      category: product.category || "",
      technologies: product.technologies || [],
      uses: product.uses || [],
      benefits: product.benefits || [],
      problemsSolutions: product.problemsSolutions || [],
      features: product.features || [],
      specifications: product.specifications || {}
    });
    setEditingId(product._id);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  const handleCancelEdit = () => {
    setFormData({
      images: [],
      title: "",
      description: "",
      category: "",
      technologies: [],
      uses: [],
      benefits: [],
      problemsSolutions: [],
      features: [],
      specifications: {}
    });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
      alert("Product deleted successfully!");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product.");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="pl-8 md:pl-80 lg:pl-85 pt-24 md:pt-10 lg:pt-20 bg-gradient-to-l from-black to-[#1E1E1E] text-gray-300 min-h-screen pr-8 md:pr-8 lg:pr-16 pb-10">
        <h1 className='text-[25px] md:text-[35px] font-bold mb-6 text-white'>
          {editingId ? 'Edit Product' : 'Add New Product'}
        </h1>

        {/* FORM */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 mb-10 max-w-5xl">
          
          {/* BASIC INFORMATION */}
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm">1</span>
              Basic Information
            </h2>
            
            {/* Images */}
            <div className="mb-4">
              <label className="block font-semibold mb-2 text-gray-300">Product Images *</label>
              <input
                type='file'
                multiple
                accept='image/*'
                onChange={handleImageUpload}
                className='border border-gray-600 rounded-md p-2 w-full bg-gray-900 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700'
              />
              {uploading && <p className='text-indigo-400 mt-2'>Uploading images...</p>}
              
              {formData.images?.length > 0 && (
                <div className='flex gap-3 flex-wrap mt-4'>
                  {formData.images.map((img) => (
                    <div key={img.public_id} className='relative group'>
                      <img src={img.url} alt='preview' className='w-24 h-24 object-cover rounded border-2 border-gray-600' />
                      <button
                        type='button'
                        onClick={() => handleRemoveImage(img.public_id)}
                        className='absolute -top-2 -right-2 bg-red-600 text-white text-xs w-6 h-6 rounded-full hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity'
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-2 text-gray-300">Product Title *</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., E-Commerce Platform"
                  value={formData.title}
                  onChange={handleChange}
                  className='border border-gray-600 rounded-md p-3 w-full bg-gray-900 text-white placeholder-gray-500'
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-300">Category</label>
                <input
                  type="text"
                  name="category"
                  placeholder="e.g., Technology, Healthcare, Finance"
                  value={formData.category}
                  onChange={handleChange}
                  className='border border-gray-600 rounded-md p-3 w-full bg-gray-900 text-white placeholder-gray-500'
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block font-semibold mb-2 text-gray-300">Description *</label>
              <textarea
                name="description"
                placeholder="Detailed product description..."
                value={formData.description}
                onChange={handleChange}
                className='border border-gray-600 rounded-md p-3 w-full h-32 bg-gray-900 text-white placeholder-gray-500'
                required
              />
            </div>

            {/* Technologies */}
            <div className="mt-4">
              <label className="block font-semibold mb-2 text-gray-300">Technologies Used</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {availableTechnologies.map((tech) => (
                  <label
                    key={tech}
                    className={`flex items-center gap-2 cursor-pointer bg-gray-900 hover:bg-gray-800 rounded-lg p-3 border transition-all ${
                      formData.technologies.includes(tech) 
                        ? "border-indigo-500 bg-indigo-900/30" 
                        : "border-gray-600"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.technologies.includes(tech)}
                      onChange={() => {
                        setFormData((prev) => {
                          const alreadySelected = prev.technologies.includes(tech);
                          return {
                            ...prev,
                            technologies: alreadySelected
                              ? prev.technologies.filter((t) => t !== tech)
                              : [...prev.technologies, tech],
                          };
                        });
                      }}
                      className="accent-indigo-500 w-4 h-4"
                    />
                    <span className="text-gray-200 text-sm font-medium">{tech}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* PRODUCT USES */}
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm">2</span>
              Product Uses
            </h2>
            
            <div className="grid md:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="Use Title (e.g., Business Automation)"
                value={useInput.title}
                onChange={(e) => setUseInput({ ...useInput, title: e.target.value })}
                className='border border-gray-600 rounded-md p-3 w-full bg-gray-900 text-white placeholder-gray-500'
              />
              <textarea
                placeholder="Use Description"
                value={useInput.description}
                onChange={(e) => setUseInput({ ...useInput, description: e.target.value })}
                className='border border-gray-600 rounded-md p-3 w-full bg-gray-900 text-white placeholder-gray-500'
                rows="1"
              />
            </div>
            <button
              type="button"
              onClick={addUse}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              + Add Use
            </button>

            {formData.uses.length > 0 && (
              <div className="mt-4 space-y-2">
                {formData.uses.map((use, index) => (
                  <div key={index} className="bg-gray-900 p-4 rounded-lg flex justify-between items-start border border-gray-700">
                    <div className="flex-1">
                      <p className="font-bold text-white mb-1">{use.title}</p>
                      <p className="text-sm text-gray-400">{use.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeUse(index)}
                      className="text-red-500 hover:text-red-400 ml-3 text-xl"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* BENEFITS */}
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm">3</span>
              Why Choose Our Product? (Benefits)
            </h2>
            
            <div className="grid md:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="Benefit Title (e.g., Cost Effective)"
                value={benefitInput.title}
                onChange={(e) => setBenefitInput({ ...benefitInput, title: e.target.value })}
                className='border border-gray-600 rounded-md p-3 w-full bg-gray-900 text-white placeholder-gray-500'
              />
              <textarea
                placeholder="Benefit Description"
                value={benefitInput.description}
                onChange={(e) => setBenefitInput({ ...benefitInput, description: e.target.value })}
                className='border border-gray-600 rounded-md p-3 w-full bg-gray-900 text-white placeholder-gray-500'
                rows="1"
              />
            </div>
            <button
              type="button"
              onClick={addBenefit}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              + Add Benefit
            </button>

            {formData.benefits.length > 0 && (
              <div className="mt-4 space-y-2">
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="bg-gray-900 p-4 rounded-lg flex justify-between items-start border border-gray-700">
                    <div className="flex-1">
                      <p className="font-bold text-white mb-1">{benefit.title}</p>
                      <p className="text-sm text-gray-400">{benefit.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeBenefit(index)}
                      className="text-red-500 hover:text-red-400 ml-3 text-xl"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PROBLEMS & SOLUTIONS */}
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm">4</span>
              Problems and Their Solutions
            </h2>
            
            <div className="space-y-3 mb-3">
              <textarea
                placeholder="Problem Statement"
                value={problemSolutionInput.problem}
                onChange={(e) => setProblemSolutionInput({ ...problemSolutionInput, problem: e.target.value })}
                className='border border-gray-600 rounded-md p-3 w-full bg-gray-900 text-white placeholder-gray-500'
                rows="2"
              />
              <textarea
                placeholder="Solution Provided"
                value={problemSolutionInput.solution}
                onChange={(e) => setProblemSolutionInput({ ...problemSolutionInput, solution: e.target.value })}
                className='border border-gray-600 rounded-md p-3 w-full bg-gray-900 text-white placeholder-gray-500'
                rows="2"
              />
            </div>
            <button
              type="button"
              onClick={addProblemSolution}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              + Add Problem & Solution
            </button>

            {formData.problemsSolutions.length > 0 && (
              <div className="mt-4 space-y-3">
                {formData.problemsSolutions.map((ps, index) => (
                  <div key={index} className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-red-400 text-lg">⚠</span>
                        <p className="font-bold text-red-400">Problem</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeProblemSolution(index)}
                        className="text-red-500 hover:text-red-400 text-xl"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-sm text-gray-400 mb-3 pl-7">{ps.problem}</p>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-400 text-lg">✓</span>
                      <p className="font-bold text-green-400">Solution</p>
                    </div>
                    <p className="text-sm text-gray-400 pl-7">{ps.solution}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* KEY FEATURES */}
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm">5</span>
              Key Features
            </h2>
            
            <div className="flex gap-3 mb-3">
              <input
                type="text"
                placeholder="Feature Name (e.g., Real-time synchronization)"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                className='border border-gray-600 rounded-md p-3 flex-1 bg-gray-900 text-white placeholder-gray-500'
              />
              <button
                type="button"
                onClick={addFeature}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                + Add
              </button>
            </div>

            {formData.features.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="bg-indigo-900/30 border border-indigo-600 px-4 py-2 rounded-lg flex items-center gap-3">
                    <span className="text-white font-medium">{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-red-400 hover:text-red-300 text-lg"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SPECIFICATIONS */}
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm">6</span>
              Technical Specifications
            </h2>
            
            <div className="grid md:grid-cols-3 gap-3 mb-3">
              <input
                type="text"
                placeholder="Key (e.g., Platform)"
                value={specInput.key}
                onChange={(e) => setSpecInput({ ...specInput, key: e.target.value })}
                className='border border-gray-600 rounded-md p-3 w-full bg-gray-900 text-white placeholder-gray-500'
              />
              <input
                type="text"
                placeholder="Value (e.g., Web, iOS, Android)"
                value={specInput.value}
                onChange={(e) => setSpecInput({ ...specInput, value: e.target.value })}
                className='border border-gray-600 rounded-md p-3 w-full bg-gray-900 text-white placeholder-gray-500'
              />
              <button
                type="button"
                onClick={addSpecification}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                + Add Spec
              </button>
            </div>

            {Object.keys(formData.specifications).length > 0 && (
              <div className="mt-4 space-y-2">
                {Object.entries(formData.specifications).map(([key, value]) => (
                  <div key={key} className="bg-gray-900 p-3 rounded-lg flex justify-between items-center border border-gray-700">
                    <div>
                      <span className="text-gray-400 font-medium">{key}:</span>
                      <span className="text-white ml-3 font-semibold">{value}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSpecification(key)}
                      className="text-red-500 hover:text-red-400 text-xl"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SUBMIT BUTTONS */}
          <div className="flex gap-4 pt-4">
            <button
              className='bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition transform hover:scale-105'
              type="submit"
            >
              {editingId ? "✓ Update Product" : "✓ Save Product"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-bold transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* PRODUCTS LIST */}
        <div className="border-t border-gray-700 pt-10 mt-10">
          <h2 className="text-2xl font-bold mb-6 text-white">All Products ({products.length})</h2>
          
          {products.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <div
                  key={p._id}
                  className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 hover:border-indigo-500 transition group"
                >
                  {p.images && p.images.length > 0 && (
                    <img 
                      src={p.images[0].url} 
                      alt="product" 
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-1">{p.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-3">{p.description}</p>
                    
                    {p.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {p.technologies.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="bg-indigo-900/30 text-indigo-300 text-xs px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                        {p.technologies.length > 3 && (
                          <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                            +{p.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleEdit(p)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded font-semibold transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded font-semibold transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-800/30 rounded-lg border border-gray-700">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-gray-400 text-lg">No products added yet.</p>
              <p className="text-gray-500 text-sm mt-2">Create your first product using the form above!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AddProduct;