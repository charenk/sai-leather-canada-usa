
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import ClientLogo from '@/components/ClientLogo';
import StatCard from '@/components/StatCard';
import { Link } from 'react-router-dom';

// Import logo assets directly
import gerardDarelLogo from '@/assets/logos/gerard-darel.png';
import carollLogo from '@/assets/logos/caroll.png';
import maison123Logo from '@/assets/logos/maison123.png';
import burberryLogo from '@/assets/logos/burberry.png';
import emporioArmaniLogo from '@/assets/logos/emporio-armani.png';

const Index = () => {
  useEffect(() => {
    // Animation on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
      observer.observe(element);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <main className="pb-16">
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
            <img 
              src="/lovable-uploads/2511fc82-3bbf-40f1-8e0d-3f5c678b8ecc.png" 
              alt="Collection of colorful leather jackets on a clothing rack" 
              className="rounded-lg shadow-xl w-full h-auto object-cover aspect-[4/3]" 
            />
          </div>
        </div>
      </section>
      
      {/* Clients Section */}
      <section className="py-16">
        <div className="section-container">
          <p className="text-center text-gray-600 mb-10">Trusted by leading brands across Europe</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <ClientLogo name="Gerard Darel" logoSrc={gerardDarelLogo} />
            <ClientLogo name="Caroll Paris" logoSrc={carollLogo} />
            <ClientLogo name="Maison 123" logoSrc={maison123Logo} />
            <ClientLogo name="Burberry" logoSrc={burberryLogo} />
            <ClientLogo name="Emporio Armani" logoSrc={emporioArmaniLogo} />
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="section-container">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 animate-on-scroll">
              <SectionHeading 
                title="From European Excellence to North American Markets" 
              />
              <p className="mb-6 text-gray-600">
                Sai International specializes in OEM manufacturing of high-quality leather garments, combining traditional craftsmanship with modern production techniques. Our commitment to quality, ethical production practices, and customized solutions has made us a preferred partner for premium brands across Europe.
              </p>
              <Button asChild variant="outline" className="mt-4 flex items-center">
                <Link to="/about">
                  Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="w-full md:w-1/2 space-y-6 animate-on-scroll">
              <div className="grid grid-cols-2 gap-6">
                <StatCard 
                  value="15+"
                  label="Years Experience"
                  color="red"
                />
                <StatCard 
                  value="200+"
                  label="Skilled Artisans"
                  color="blue"
                />
                <StatCard 
                  value="500K+"
                  label="Units Produced"
                  color="coral"
                />
                <StatCard 
                  value="50+"
                  label="Brand Partners"
                  color="lavender"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Products Preview Section */}
      <section className="py-16">
        <div className="section-container">
          <SectionHeading 
            title="Our Leather Products" 
            subtitle="We specialize in crafting premium leather garments with superior quality, customization options, and attention to detail."
            alignment="center"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Leather Jackets",
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Leather Bags",
                image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Leather Accessories",
                image: "/lovable-uploads/5e2cec59-2229-41a3-ae41-d3d650701b1d.png"
              }
            ].map((product, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl shadow-md animate-on-scroll">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-xl font-bold text-white">{product.title}</h3>
                    <Button 
                      variant="link" 
                      asChild 
                      className="text-white p-0 flex items-center mt-2 hover:text-sai-coral"
                    >
                      <Link to="/products">
                        View Collection <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
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
      
      {/* Services Section */}
      <section className="py-16 bg-gradient-to-br from-sai-navy to-sai-navy/90 text-white">
        <div className="section-container">
          <SectionHeading 
            title="Our OEM Services" 
            subtitle="From concept to creation, we provide end-to-end manufacturing solutions for premium leather garments."
            alignment="center"
            className="text-white"
            subtitleClassName="text-white/80"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Custom Design",
                description: "From concept sketches to finished products, our design team works closely with clients to bring their vision to life."
              },
              {
                title: "Material Sourcing",
                description: "We source the highest quality leather and materials from ethical suppliers to ensure premium final products."
              },
              {
                title: "Production",
                description: "Our skilled artisans combine traditional craftsmanship with modern techniques to create exceptional garments."
              },
              {
                title: "Quality Control",
                description: "Rigorous quality control at every stage ensures that every piece meets our high standards."
              },
              {
                title: "Packaging & Shipping",
                description: "Custom packaging solutions and reliable shipping to destinations across North America and Europe."
              },
              {
                title: "After-Sales Support",
                description: "Dedicated customer service to ensure satisfaction with every order and address any concerns."
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-filter backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors animate-on-scroll"
              >
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-white/80">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-sai-red/10">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sai-navy mb-6">
            Ready to explore opportunities in North America?
          </h2>
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
    </main>
  );
};

export default Index;
