import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import htmlIcon from "../assets/icons/tech2.png";
import cssIcon from "../assets/icons/tech1.png";
import pythonIcon from "../assets/icons/tech3.png";
import wordPressIcon from "../assets/icons/tech4.png";
import jsIcon from "../assets/icons/js.png";
import reactIcon from "../assets/icons/React.png";
import angularicon from "../assets/icons/angular.png";
import Awsicon from "../assets/icons/Aws.png";
import Azureicon from "../assets/icons/azure.jpg";
import image2 from "../assets/images/herosectionimage.png";

const techIcons = {
  HTML: htmlIcon,
  CSS: cssIcon,
  Python: pythonIcon,
  WordPress: wordPressIcon,
  JavaScript: jsIcon,
  React: reactIcon,
  Angular: angularicon,
  Aws: Awsicon,
  Azure: Azureicon,
};

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Auto-rotate images
  useEffect(() => {
    if (!product?.images || product.images.length === 0) return;

    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % product.images.length);
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [product]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    const fetchRelatedProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products`);
        const filtered = res.data.filter((p) => p._id !== id).slice(0, 3);
        setRelatedProducts(filtered);
      } catch (err) {
        console.error("Related Product Fetch Error", err);
      }
    };

    fetchProduct();
    fetchRelatedProducts();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-lg font-light font-[neutral_face]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* HERO SECTION */}
      <div className="relative bg-gradient-to-br from-black via-zinc-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05),transparent_50%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* LEFT - CONTENT */}
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
                <span className="text-white/60 text-xs uppercase tracking-wider font-medium font-[neutral_face]">
                  {product.category || "Technology"}
                </span>
              </div>
              
              {/* ➤ APPLIED FONT HERE */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight leading-tight font-[neutral_face]">
                {product.title}
              </h1>

              <div className="relative">
                <p className="text-gray-400 text-base md:text-lg leading-relaxed font-[neutral_face]">
                  {isExpanded ? product.description : product.description}
                </p>
              </div>

              {/* Technologies */}
              {product.technologies?.length > 0 && (
                <div className="space-y-4 pt-4">
                  <p className="text-white/60 text-sm font-medium uppercase tracking-wide font-[neutral_face]">
                    Technologies Used
                  </p>
                  <div className="flex flex-wrap gap-4 items-center">
                    {product.technologies.map((tech, index) => (
                      <div 
                        key={index} 
                        className="group relative"
                        title={tech}
                      >
                        <div className="w-12 h-12 bg-white/5 rounded-lg p-2 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300">
                          <img
                            src={techIcons[tech]}
                            alt={tech}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT - IMAGE */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-white/10 to-transparent rounded-3xl blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-zinc-900 to-black p-2 rounded-2xl border border-white/10">
                <img
                  src={product.images?.[selectedImage]?.url || image2}
                  alt={product.title}
                  className="w-full h-[400px] md:h-[500px] object-cover rounded-xl"
                />
                
                {/* Thumbnail Navigation */}
                {product.images?.length > 1 && (
                  <div className="flex gap-2 mt-4 justify-center">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedImage(idx);
                          setImageIndex(idx);
                        }}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === idx
                            ? "border-white scale-105"
                            : "border-white/20 opacity-50 hover:opacity-100"
                        }`}
                      >
                        <img src={img.url} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT USES SECTION */}
      {product.uses && (
        <div className="bg-gradient-to-br from-zinc-900 to-black border-y border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="text-center mb-12">
              {/* ➤ APPLIED FONT HERE */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight font-[neutral_face] mb-4">
                Product Uses
              </h2>
              <div className="w-24 h-1 bg-white/30 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.uses.map((use, index) => (
                <div 
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-white/20 transition-all">
                    <span className="text-2xl">✓</span>
                  </div>
                  {/* ➤ APPLIED FONT HERE */}
                  <h3 className="text-xl font-bold text-white mb-3 font-[neutral_face]">{use.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-[neutral_face]">{use.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* WHY CHOOSE SECTION */}
      {product.benefits && (
        <div className="bg-black">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="text-center mb-12">
              {/* ➤ APPLIED FONT HERE */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight font-[neutral_face] mb-4">
                Why Choose Our Product?
              </h2>
              <div className="w-24 h-1 bg-white/30 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {product.benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex gap-4 bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white font-bold font-[neutral_face]">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    {/* ➤ APPLIED FONT HERE */}
                    <h3 className="text-xl font-bold text-white mb-2 font-[neutral_face]">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-[neutral_face]">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PROBLEMS & SOLUTIONS SECTION */}
      {product.problemsSolutions && (
        <div className="bg-gradient-to-br from-zinc-900 to-black border-y border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="text-center mb-12">
              {/* ➤ APPLIED FONT HERE */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight font-[neutral_face] mb-4">
                Problems and Their Solutions
              </h2>
              <div className="w-24 h-1 bg-white/30 mx-auto"></div>
            </div>

            <div className="space-y-8">
              {product.problemsSolutions.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300"
                >
                  <div className="grid md:grid-cols-2 divide-x divide-white/10">
                    {/* Problem */}
                    <div className="p-6 md:p-8">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-red-400 text-lg">⚠</span>
                        </div>
                        {/* ➤ APPLIED FONT HERE */}
                        <h3 className="text-xl font-bold text-white font-[neutral_face]">Problem</h3>
                      </div>
                      <p className="text-gray-400 leading-relaxed font-[neutral_face]">{item.problem}</p>
                    </div>

                    {/* Solution */}
                    <div className="p-6 md:p-8 bg-white/5">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-green-400 text-lg">✓</span>
                        </div>
                        {/* ➤ APPLIED FONT HERE */}
                        <h3 className="text-xl font-bold text-white font-[neutral_face]">Solution</h3>
                      </div>
                      <p className="text-gray-400 leading-relaxed font-[neutral_face]">{item.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* KEY FEATURES SECTION */}
      {product.features && (
        <div className="bg-black">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="text-center mb-12">
              {/* ➤ APPLIED FONT HERE */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight font-[neutral_face] mb-4">
                Key Features
              </h2>
              <div className="w-24 h-1 bg-white/30 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-xl p-6 hover:border-white/30 hover:scale-105 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-white text-black rounded-lg flex items-center justify-center mb-4 font-bold text-xl font-[neutral_face]">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-[neutral_face]">{feature}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SPECIFICATIONS SECTION */}
      {product.specifications && (
        <div className="bg-gradient-to-br from-zinc-900 to-black border-y border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="text-center mb-12">
              {/* ➤ APPLIED FONT HERE */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight font-[neutral_face] mb-4">
                Technical Specifications
              </h2>
              <div className="w-24 h-1 bg-white/30 mx-auto"></div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden max-w-4xl mx-auto">
              {Object.entries(product.specifications).map(([key, value], index) => (
                <div 
                  key={index}
                  className={`grid md:grid-cols-2 p-4 md:p-6 ${
                    index !== Object.entries(product.specifications).length - 1 ? 'border-b border-white/10' : ''
                  } hover:bg-white/5 transition-all`}
                >
                  {/* ➤ APPLIED FONT HERE */}
                  <div className="text-white/60 font-medium mb-2 md:mb-0 font-[neutral_face]">{key}</div>
                  <div className="text-white font-semibold font-[neutral_face]">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RELATED PRODUCTS */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-32">
          <div className="text-center mb-16">
            <p className="text-white/60 text-sm md:text-base font-medium mb-3 uppercase tracking-wide font-[neutral_face]">
              Explore More
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight mb-4 font-[neutral_face]">
              Related Products
            </h2>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((item) => (
                <Link
                  to={`/product-details/${item._id}`}
                  key={item._id}
                  className="group relative bg-gradient-to-br from-zinc-900 to-black rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10"></div>
                  
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.images?.[0]?.url || image2}
                      alt={item.title}  
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="relative z-20 p-6 bg-gradient-to-t from-black to-transparent ">
                    {/* ➤ APPLIED FONT HERE */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-200 transition-colors font-[neutral_face]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2 font-[neutral_face]">
                      {item.description?.slice(0, 100)}...
                    </p>

                    {/* Technologies */}
                    {item.technologies?.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {item.technologies.slice(0, 4).map((tech, idx) => (
                          <div 
                            key={idx}
                            className="w-8 h-8 bg-white/5 rounded p-1.5 border border-white/10"
                          >
                            <img
                              src={techIcons[tech]}
                              alt={tech}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ))}
                        {item.technologies.length > 4 && (
                          <div className="w-8 h-8 bg-white/5 rounded flex items-center justify-center border border-white/10">
                            <span className="text-white text-xs">+{item.technologies.length - 4}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="mt-4 flex items-center gap-2 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity font-[neutral_face]">
                      View Details
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="w-20 h-20 mx-auto mb-4 bg-white/5 rounded-full flex items-center justify-center">
                  <span className="text-4xl text-white/30">📦</span>
                </div>
                <p className="text-gray-400 text-lg font-[neutral_face]">No related products found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;