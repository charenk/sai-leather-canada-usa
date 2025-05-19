import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import StatCard from '@/components/StatCard';
import { Link } from 'react-router-dom';

// Remove client logo imports as they're no longer needed
const Index = () => {
  useEffect(() => {
    // Animation on scroll
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1
    });
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  return <main>
      {/* Hero Section */}
      <section className="pt-28 pb-20 md:pt-40 md:pb-24 relative bg-gradient-to-br from-sai-blue/40 to-white">
        <div className="section-container flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-sai-navy">
              Premium OEM <span className="text-sai-red">Leather</span> Garment Manufacturer
            </h1>
            <p className="mt-6 text-xl text-gray-700 max-w-lg">
              15+ years of experience crafting high-quality leather garments for European brands, with a global vision for growth and expansion.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-sai-red hover:bg-sai-red/90">
                <Link to="/contact">
                  Get in Touch
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/products">
                  Explore Products
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 pl-0 md:pl-10">
            <img src="/lovable-uploads/2511fc82-3bbf-40f1-8e0d-3f5c678b8ecc.png" alt="Collection of colorful leather jackets on a clothing rack" className="rounded-lg shadow-xl w-full h-auto object-cover aspect-[4/3]" />
          </div>
        </div>
      </section>
      
      {/* Client logos section removed */}
      
      {/* About Section - Updated to switch positions of content */}
      <section className="py-16 bg-gray-50">
        <div className="section-container">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Stats now on the left */}
            <div className="w-full md:w-1/2 space-y-6 animate-on-scroll order-2 md:order-1">
              <div className="grid grid-cols-2 gap-6">
                <StatCard value="15+" label="Years Experience" color="red" />
                <StatCard value="200+" label="Skilled Artisans" color="blue" />
                <StatCard value="500K+" label="Units Produced" color="coral" />
                <StatCard value="50+" label="Brand Partners" color="lavender" />
              </div>
            </div>
            
            {/* Content now on the right */}
            <div className="w-full md:w-1/2 animate-on-scroll order-1 md:order-2">
              <SectionHeading title="From European Excellence to North American Markets" />
              <p className="mb-6 text-gray-600">
                Sai International provides dependable OEM manufacturing for leather garments at scale. With 15+ years of industry experience, skilled artisans, and a proven track record serving top European brands, we deliver consistent quality, ethical production, and on-time delivery — customized to your brand's needs.
              </p>
              <Button asChild variant="outline" className="mt-4 flex items-center">
                <Link to="/about">
                  Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Products Preview Section */}
      <section className="py-16">
        <div className="section-container">
          <SectionHeading title="Our Leather Products" subtitle="We specialize in crafting premium leather garments with superior quality, customization options, and attention to detail." alignment="center" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[{
            title: "Leather Jackets",
            image: "/lovable-uploads/82d75e5e-0fdd-410e-9674-feea43f6bc11.png"
          }, {
            title: "Leather Bags",
            image: "/lovable-uploads/0c6d4a38-8187-417f-9faa-5e32816d8e29.png"
          }, {
            title: "Leather Accessories",
            image: "/lovable-uploads/5e2cec59-2229-41a3-ae41-d3d650701b1d.png"
          }].map((product, index) => <div key={index} className="group relative overflow-hidden rounded-xl shadow-md animate-on-scroll">
                <img src={product.image} alt={product.title} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-xl font-bold text-white">{product.title}</h3>
                    <Button variant="link" asChild className="text-white p-0 flex items-center mt-2 hover:text-sai-coral">
                      <Link to="/products">
                        View Collection <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>)}
          </div>
          
          <div className="flex justify-center mt-12">
            <Button asChild size="lg">
              <Link to="/products">
                View All Products
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section - Remove bottom padding to eliminate the white space */}
      <section className="py-20 bg-sai-red/10 mb-0">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sai-navy mb-6">Looking for a Trusted OEM Leather Partner?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Let's discuss how Sai International can meet your leather garment manufacturing needs with our premium OEM services.
          </p>
          <Button asChild size="lg" className="bg-sai-red hover:bg-sai-red/90">
            <Link to="/contact">
              Contact Us Today
            </Link>
          </Button>
        </div>
      </section>
    </main>;
};
export default Index;