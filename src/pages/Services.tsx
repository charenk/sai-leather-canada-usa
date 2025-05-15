
import React from 'react';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/SectionHeading';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Services = () => {
  return (
    <main className="pt-32 pb-16">
      <div className="section-container">
        <SectionHeading 
          title="Our OEM Services" 
          subtitle="End-to-end manufacturing solutions for premium leather garments"
          alignment="center"
        />

        {/* Core Services */}
        <section className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-sai-navy mb-6">Core Manufacturing Services</h3>
              <p className="text-gray-700 mb-6">
                Sai International offers comprehensive OEM manufacturing services for premium leather goods. With 15+ years of experience serving European luxury brands, we bring expertise, quality, and reliability to every project.
              </p>
              <p className="text-gray-700 mb-6">
                Our state-of-the-art facilities and skilled artisans combine traditional craftsmanship with modern production techniques to deliver exceptional products that meet the highest standards of quality.
              </p>
            </div>
            
            <div className="rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1530883374828-563643f6b43c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Leather manufacturing process" 
                className="w-full h-auto object-cover aspect-[4/3]" 
              />
            </div>
          </div>
        </section>

        {/* Service Process */}
        <section className="mt-20">
          <h3 className="text-2xl font-bold text-sai-navy mb-8">Our OEM Process</h3>
          
          <div className="space-y-12">
            {[
              {
                step: "Consultation & Design",
                description: "We start by understanding your brand's vision, target market, and specific requirements. Our design team collaborates with you to refine concepts, provide material recommendations, and develop technical specifications.",
                image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              },
              {
                step: "Sampling & Prototyping",
                description: "Once designs are approved, we create detailed prototypes for your review. This crucial step allows for refinements before full production begins. We provide multiple revisions until the product perfectly matches your vision.",
                image: "https://images.unsplash.com/photo-1569137273169-a8f7ccd8cd9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              },
              {
                step: "Material Sourcing",
                description: "We source premium quality leathers and materials from ethical suppliers. Our procurement team ensures all materials meet our rigorous standards for quality, sustainability, and compliance with international regulations.",
                image: "https://images.unsplash.com/photo-1563483623993-36255a856c0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              },
              {
                step: "Production",
                description: "Our skilled artisans and modern production facilities work together to create your products with precision and care. Each piece is crafted according to the approved specifications, with regular quality checks throughout the process.",
                image: "https://images.unsplash.com/photo-1597843786215-9a1c2c952107?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              },
              {
                step: "Quality Control",
                description: "Our comprehensive quality control process ensures every product meets our exacting standards. Each piece undergoes multiple inspections for material quality, construction, stitching, finish, and overall appearance.",
                image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              },
              {
                step: "Packaging & Shipping",
                description: "We offer custom packaging solutions to enhance your brand presentation. Our logistics team ensures reliable and timely shipping to destinations across North America and Europe, with full tracking and documentation.",
                image: "https://images.unsplash.com/photo-1608115959373-d4ee03d8f4d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              }
            ].map((service, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
                <div className="w-full md:w-1/2">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-sai-red rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-sai-navy mb-4">{service.step}</h4>
                      <p className="text-gray-700">{service.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2">
                  <img 
                    src={service.image} 
                    alt={service.step} 
                    className="w-full h-64 object-cover rounded-xl shadow-md" 
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Services */}
        <section className="mt-20 bg-gray-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-sai-navy mb-8">Additional Services</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                service: "Custom Branding",
                description: "We offer various branding options including embossing, debossing, foil stamping, and custom hardware for your products."
              },
              {
                service: "Technical Design",
                description: "Our technical design team can help refine your concepts into production-ready specifications."
              },
              {
                service: "Material Development",
                description: "Looking for unique finishes or specialized materials? We can develop custom solutions for your specific needs."
              },
              {
                service: "Small Batch Production",
                description: "We accommodate smaller production runs for exclusive collections or market testing."
              },
              {
                service: "Sustainability Consulting",
                description: "We offer guidance on eco-friendly materials and processes to enhance your brand's sustainability profile."
              },
              {
                service: "Quality Certification",
                description: "We provide documentation certifying the quality standards and testing results for your products."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-lg text-sai-navy mb-2">{item.service}</h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mt-20">
          <h3 className="text-2xl font-bold text-sai-navy mb-8">Why Choose Sai International</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "European Quality Standards",
                description: "With 15+ years serving European luxury brands, we understand and maintain the highest quality standards."
              },
              {
                title: "Skilled Craftsmanship",
                description: "Our team of 200+ skilled artisans combines traditional techniques with modern precision."
              },
              {
                title: "Competitive Pricing",
                description: "We offer excellent value without compromising on quality, material, or craftsmanship."
              },
              {
                title: "Ethical Production",
                description: "We maintain ethical working conditions and fair wages throughout our production process."
              },
              {
                title: "Material Expertise",
                description: "Extensive knowledge of various leather types, treatments, and applications."
              },
              {
                title: "North American Support",
                description: "Dedicated team serving North American clients with regional support and expertise."
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="w-10 h-10 bg-sai-red/10 rounded-full flex items-center justify-center text-sai-red font-bold mr-4 flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-lg text-sai-navy mb-2">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-20 text-center">
          <div className="bg-gradient-to-br from-sai-navy to-sai-navy/90 text-white rounded-xl p-12">
            <h3 className="text-3xl font-bold mb-6">
              Ready to discuss your manufacturing needs?
            </h3>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Let's explore how Sai International can provide exceptional OEM leather manufacturing services for your brand.
            </p>
            <Button asChild size="lg" className="bg-sai-red hover:bg-sai-red/90">
              <Link to="/contact" className="flex items-center">
                Contact Our OEM Team <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Services;
