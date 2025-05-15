import React from 'react';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/SectionHeading';
import { Link } from 'react-router-dom';
import { ArrowRight, Package, Workflow } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Services = () => {
  return (
    <main className="pt-32 pb-16">
      <div className="section-container">
        <SectionHeading 
          title="Our OEM Services" 
          subtitle="End-to-end manufacturing solutions for premium leather garments"
          alignment="center"
        />

        {/* Service Process - REDESIGNED */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold text-sai-navy mb-8">Our OEM Process</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: 1,
                title: "Consultation & Design",
                description: "Understanding your brand vision and developing technical specifications.",
                icon: <Workflow className="h-8 w-8 text-sai-red mb-4" />
              },
              {
                step: 2,
                title: "Sampling & Prototyping",
                description: "Creating detailed prototypes for your review and refinement.",
                icon: <Package className="h-8 w-8 text-sai-red mb-4" />
              },
              {
                step: 3,
                title: "Material Sourcing",
                description: "Sourcing premium leathers from ethical suppliers.",
                icon: <Workflow className="h-8 w-8 text-sai-red mb-4" />
              },
              {
                step: 4,
                title: "Production",
                description: "Skilled artisans crafting each piece with precision.",
                icon: <Package className="h-8 w-8 text-sai-red mb-4" />
              },
              {
                step: 5,
                title: "Quality Control",
                description: "Multiple inspections ensuring exceptional quality.",
                icon: <Workflow className="h-8 w-8 text-sai-red mb-4" />
              },
              {
                step: 6,
                title: "Packaging & Shipping",
                description: "Custom packaging solutions and reliable logistics.",
                icon: <Package className="h-8 w-8 text-sai-red mb-4" />
              }
            ].map((process, index) => (
              <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    {process.icon}
                    <div className="w-10 h-10 bg-sai-red/10 rounded-full flex items-center justify-center mb-4">
                      <span className="font-bold text-sai-red">{process.step}</span>
                    </div>
                    <h4 className="text-lg font-bold text-sai-navy mb-2">{process.title}</h4>
                    <p className="text-gray-600 text-sm">{process.description}</p>
                  </div>
                </CardContent>
              </Card>
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
