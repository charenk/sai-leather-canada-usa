
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/SectionHeading';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

const Products = () => {
  // Product categories
  const categories = [
    {
      name: "Leather Jackets",
      description: "Premium quality jackets crafted with the finest leather",
      products: [
        { name: "Classic Biker Jacket", image: "/lovable-uploads/3bbec8a1-8659-4ca6-a4e0-d53062aaf34d.png" },
        { name: "Bomber Jacket", image: "/lovable-uploads/73b3308c-0cae-429f-aa5c-ea6143df14fc.png" },
        { name: "Aviator Jacket", image: "/lovable-uploads/173f7d5f-cac1-4eb3-b679-90d68dac897a.png" },
      ]
    },
    {
      name: "Leather Bags",
      description: "Stylish and durable bags for everyday use and special occasions",
      products: [
        { name: "Crossbody Bag", image: "/lovable-uploads/ae49afcf-ce95-4b1c-a96b-6a8f53318c18.png" },
        { name: "Backpack", image: "/lovable-uploads/01ad3cd8-013f-41ed-b44d-935400579892.png" },
        { name: "Tote Bag", image: "/lovable-uploads/26e173b7-12cc-4b67-b142-b7821a6d757a.png" },
      ]
    },
    {
      name: "Leather Accessories",
      description: "Complete your look with our range of premium leather accessories",
      products: [
        { name: "Wallets", image: "/lovable-uploads/8aa850d0-0029-45a4-b0f3-d03d3660805f.png" },
        { name: "Belts", image: "/lovable-uploads/76978a37-8a0b-4895-b698-1e9fd2be0293.png" },
        { name: "Gloves", image: "/lovable-uploads/df83f6be-199d-453d-9ae5-7fcb97e2ae7a.png" },
      ]
    },
  ];

  return (
    <main className="pt-32 pb-16">
      <div className="section-container">
        <SectionHeading 
          title="Our Products" 
          subtitle="We specialize in crafting premium leather products with superior quality and attention to detail."
          alignment="center"
        />

        {/* Product Categories */}
        {categories.map((category, categoryIndex) => (
          <section key={categoryIndex} className="mt-16">
            <h3 className="text-2xl font-bold text-sai-navy mb-2">{category.name}</h3>
            <p className="text-gray-600 mb-8">{category.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {category.products.map((product, productIndex) => (
                <ProductCard key={productIndex} product={product} />
              ))}
            </div>
          </section>
        ))}

        {/* Quality Assurance */}
        <section className="mt-20 bg-sai-red/10 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-sai-navy mb-6">Our Quality Assurance</h3>
          <p className="text-gray-700 mb-8">
            Every product manufactured by Sai International undergoes rigorous quality control to ensure it meets our exacting standards:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "Material Inspection",
                description: "Every hide is carefully inspected for quality and consistency before being approved for production."
              },
              {
                step: "Expert Craftsmanship",
                description: "Our skilled artisans bring decades of experience to every piece they create."
              },
              {
                step: "Multiple Quality Checks",
                description: "Products undergo quality inspections at every stage of the manufacturing process."
              },
              {
                step: "Final Approval",
                description: "Before shipping, each finished product receives a final comprehensive quality assessment."
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-sai-navy rounded-full flex items-center justify-center text-white font-bold mb-4">
                  {index + 1}
                </div>
                <h4 className="font-bold text-lg text-sai-navy mb-2">{item.step}</h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Materials Section */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold text-sai-navy mb-6">Our Materials</h3>
          <div className="bg-gray-50 rounded-xl p-8">
            <p className="text-gray-700 mb-6">
              At Sai International, we source only the highest quality leathers from ethical suppliers. Our commitment to excellence begins with the materials we select:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                {
                  name: "Full Grain Leather",
                  description: "The highest quality leather, featuring the full grain of the hide for superior durability and a rich patina development over time."
                },
                {
                  name: "Top Grain Leather",
                  description: "Slightly processed to remove imperfections while maintaining excellent durability and a luxurious feel."
                },
                {
                  name: "Nappa Leather",
                  description: "Soft, lightweight leather with a smooth finish, perfect for comfortable wearable items."
                },
                {
                  name: "Suede",
                  description: "Leather with a napped finish, offering a soft, velvety texture for distinctive styling."
                },
                {
                  name: "Vegetable Tanned Leather",
                  description: "Eco-friendly leather tanned using natural materials for a traditional, artisanal finish."
                },
                {
                  name: "Chrome Tanned Leather",
                  description: "Modern tanning process resulting in soft, flexible leather with excellent color retention."
                },
              ].map((material, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-bold text-lg text-sai-navy mb-2">{material.name}</h4>
                  <p className="text-gray-600">{material.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-sai-navy mb-4">
            Custom OEM Manufacturing
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Looking for custom manufactured leather goods for your brand? We offer comprehensive OEM services tailored to your specific requirements.
          </p>
          <Button asChild size="lg" className="bg-sai-red hover:bg-sai-red/90">
            <Link to="/contact">
              Get a Custom Quote
            </Link>
          </Button>
        </section>
      </div>
    </main>
  );
};

// Product Card Component for better image loading management
const ProductCard = ({ product }: { product: { name: string; image: string } }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group overflow-hidden rounded-xl shadow-md">
      <div className="h-80 overflow-hidden bg-gray-100 relative">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Skeleton className="w-full h-full absolute" />
            <span className="text-gray-400">Loading...</span>
          </div>
        )}
        
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <span className="text-gray-500">Image unavailable</span>
          </div>
        )}
        
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
          loading="lazy" 
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />
      </div>
      <div className="p-6">
        <h4 className="font-bold text-lg mb-2">{product.name}</h4>
        <p className="text-gray-600">Custom manufactured to your specifications</p>
        <div className="mt-4">
          <Button asChild variant="outline" size="sm">
            <Link to="/contact">
              Request Details
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Products;
