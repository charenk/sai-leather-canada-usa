
import React, { useEffect } from 'react';
import SectionHeading from '@/components/SectionHeading';

const About = () => {
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
    <main className="pt-32 pb-16">
      {/* Hero Section */}
      <section className="pb-16">
        <div className="section-container">
          <SectionHeading 
            title="Our Journey" 
            subtitle="From our humble beginnings to becoming a preferred OEM partner for premium European brands."
            alignment="center"
          />
          
          <div className="mt-12 relative">
            <img 
              src="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80" 
              alt="Leather workshop" 
              className="w-full h-[400px] object-cover rounded-xl" 
            />
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
                <p>
                  Founded in 2008, Sai International began as a small workshop specializing in handcrafted leather goods. Our founder, with a deep passion for leatherwork and a vision for creating exceptional quality products, established the company with just 15 skilled artisans.
                </p>
                <p>
                  As demand for our craftsmanship grew, so did our operations. By 2012, we had expanded our facilities and workforce to meet the growing needs of European luxury brands who recognized the quality of our work. Our commitment to excellence and attention to detail quickly established us as a reliable partner for premium leather manufacturing.
                </p>
                <p>
                  Today, Sai International operates a state-of-the-art manufacturing facility spanning over 50,000 square feet, employing more than 200 skilled artisans and technicians. We've maintained our commitment to quality craftsmanship while integrating modern production techniques and sustainable practices.
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 animate-on-scroll">
              <h2 className="text-3xl font-display font-bold text-sai-navy mb-6">Our Mission</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  At Sai International, our mission is to bridge traditional leather craftsmanship with modern manufacturing techniques to create premium quality leather garments that exceed our clients' expectations.
                </p>
                <p>
                  We are committed to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Delivering exceptional quality in every piece we produce</li>
                  <li>Maintaining ethical and sustainable production practices</li>
                  <li>Supporting our skilled artisans with fair wages and working conditions</li>
                  <li>Continuously innovating while preserving traditional craftsmanship</li>
                  <li>Building long-term partnerships based on trust and reliability</li>
                </ul>
                <p>
                  As we expand into North American markets, we bring with us our European-honed expertise and commitment to excellence, ready to serve new clients with the same dedication that has built our reputation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="section-container">
          <SectionHeading 
            title="Our Journey" 
            subtitle="Key milestones in Sai International's growth over the years"
            alignment="center"
          />
          
          <div className="mt-16 space-y-16">
            {[
              {
                year: "2008",
                title: "Humble Beginnings",
                description: "Founded with 15 artisans, specializing in handcrafted leather goods."
              },
              {
                year: "2012",
                title: "European Partnership",
                description: "Secured first major European brand partnership, marking our entry into OEM manufacturing."
              },
              {
                year: "2015",
                title: "Facility Expansion",
                description: "Expanded to a 25,000 sq ft facility with advanced machinery and 100+ skilled workers."
              },
              {
                year: "2018",
                title: "Sustainability Initiative",
                description: "Launched our sustainability program focusing on ethical sourcing and eco-friendly practices."
              },
              {
                year: "2023",
                title: "North American Expansion",
                description: "Beginning our expansion into North American markets with dedicated sales and support teams."
              }
            ].map((milestone, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-8 items-start animate-on-scroll">
                <div className="md:w-1/5">
                  <span className="inline-block bg-sai-red text-white py-2 px-6 rounded-full text-xl font-bold">
                    {milestone.year}
                  </span>
                </div>
                <div className="md:w-4/5">
                  <h3 className="text-2xl font-bold text-sai-navy mb-3">{milestone.title}</h3>
                  <p className="text-gray-700">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16">
        <div className="section-container">
          <SectionHeading 
            title="Our Values" 
            subtitle="The principles that guide our work and relationships"
            alignment="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                value: "Excellence",
                description: "We strive for excellence in every stitch, seam, and finished product."
              },
              {
                value: "Integrity",
                description: "We conduct our business with honesty, transparency, and ethical practices."
              },
              {
                value: "Innovation",
                description: "We continuously explore new techniques and materials while respecting traditional craftsmanship."
              },
              {
                value: "Sustainability",
                description: "We are committed to environmentally responsible practices throughout our production process."
              },
              {
                value: "Partnership",
                description: "We build lasting relationships with our clients based on mutual respect and collaboration."
              },
              {
                value: "Empowerment",
                description: "We invest in our people, providing opportunities for growth and development."
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-8 shadow-md border border-gray-100 text-center animate-on-scroll"
              >
                <h3 className="text-xl font-bold text-sai-navy mb-4">{item.value}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
