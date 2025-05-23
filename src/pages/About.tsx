
import React, { useEffect } from 'react';
import SectionHeading from '@/components/SectionHeading';

const About = () => {
  useEffect(() => {
    // Enhanced animation on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '-10% 0px'
    });
    
    document.querySelectorAll('.animate-on-scroll, .timeline-item').forEach(element => {
      observer.observe(element);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <main className="pt-32 pb-16">
      {/* Hero Section */}
      <section className="pb-8">
        <div className="section-container">
          <div className="animate-on-scroll">
            <SectionHeading 
              title="Our Journey" 
              subtitle="From our humble beginnings to becoming a preferred OEM partner for premium European brands."
              alignment="center"
            />
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="bg-gray-50 py-12">
        <div className="section-container">
          <div className="space-y-16">
            {[
              {
                year: "2001",
                title: "Founded with Purpose",
                description: "Sai International is established with a dedicated team of artisans, focusing on handcrafted leather garments for export."
              },
              {
                year: "2003",
                title: "Entry into European Markets",
                description: "Started building relationships with fashion houses across Europe, delivering custom leather goods with craftsmanship and care."
              },
              {
                year: "2006",
                title: "First Major Brand Partnership",
                description: "Secured long-term manufacturing partnerships with leading European brands — marking a milestone in our global reputation."
              },
              {
                year: "2010",
                title: "Facility Expansion",
                description: "Scaled up operations with a 25,000 sq ft facility and advanced machinery to support higher volumes and more complex production needs."
              },
              {
                year: "2018",
                title: "Sustainability Commitment",
                description: "Launched our sustainability initiative, emphasizing ethical sourcing, eco-conscious materials, and responsible manufacturing."
              },
              {
                year: "2024",
                title: "500,000+ Garments Shipped",
                description: "Celebrated the production and global shipment of over half a million leather garments — a testament to consistent quality and enduring client trust."
              }
            ].map((milestone, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-8 items-start timeline-item">
                <div className="md:w-1/5">
                  <span className="inline-block bg-sai-red text-white py-2 px-6 rounded-full text-xl font-bold transition-all duration-300 hover:scale-110 hover:shadow-lg">
                    {milestone.year}
                  </span>
                </div>
                <div className="md:w-4/5 group">
                  <h3 className="text-2xl font-bold text-sai-navy mb-3 transition-colors duration-300 group-hover:text-sai-red">{milestone.title}</h3>
                  <p className="text-gray-700">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16">
        <div className="section-container">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/2 animate-on-scroll">
              <h2 className="text-3xl font-display font-bold text-sai-navy mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700">
                <p className="transition-all duration-300 hover:text-gray-900">
                  Founded in 2001, Sai International began as a small workshop with 15 artisans, dedicated to crafting premium leather garments.
                </p>
                <p className="transition-all duration-300 hover:text-gray-900">
                  By 2003, we were serving fashion brands across Europe and Western markets. Our focus on quality, consistency, and customization earned us lasting partnerships with top-tier labels.
                </p>
                <p className="transition-all duration-300 hover:text-gray-900">
                  Today, we operate a 25,000 sq. ft. facility with over 200 skilled artisans, combining heritage craftsmanship with modern manufacturing to meet global OEM demands.
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 animate-on-scroll">
              <h2 className="text-3xl font-display font-bold text-sai-navy mb-6">Our Mission</h2>
              <div className="space-y-4 text-gray-700">
                <p className="transition-all duration-300 hover:text-gray-900">
                  At Sai International, we blend traditional leather craftsmanship with modern techniques to deliver premium-quality garments tailored to our clients' needs.
                </p>
                <p className="transition-all duration-300 hover:text-gray-900">
                  We're committed to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li className="transition-all duration-300 hover:text-gray-900 hover:translate-x-1">Exceptional quality and detail</li>
                  <li className="transition-all duration-300 hover:text-gray-900 hover:translate-x-1">Ethical, sustainable production</li>
                  <li className="transition-all duration-300 hover:text-gray-900 hover:translate-x-1">Supporting skilled artisans</li>
                  <li className="transition-all duration-300 hover:text-gray-900 hover:translate-x-1">Innovation without compromising tradition</li>
                  <li className="transition-all duration-300 hover:text-gray-900 hover:translate-x-1">Long-term, trust-based partnerships</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
