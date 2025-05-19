
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
              src="https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Premium leather craftsmanship" 
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
                subtitle="With 15 years of experience serving European brands, we're expanding our premium leather manufacturing expertise to North America."
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
