
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
                  Founded in 2001, Sai International began as a small workshop specializing in handcrafted leather goods. Our founder, with a deep passion for leatherwork and a vision for creating exceptional quality products, established the company with a dedicated team of skilled artisans.
                </p>
                <p>
                  As demand for our craftsmanship grew, so did our operations. By 2006, we had secured partnerships with leading European luxury brands who recognized the quality of our work. Our commitment to excellence and attention to detail quickly established us as a reliable partner for premium leather manufacturing.
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
