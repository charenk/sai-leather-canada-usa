
import React from 'react';
import SectionHeading from '@/components/SectionHeading';
import ClientLogo from '@/components/ClientLogo';

const ClientelePage = () => {
  return (
    <main className="pt-32 pb-16">
      <div className="section-container">
        <SectionHeading 
          title="Our Clientele" 
          subtitle="Proud to partner with these brands across Europe and North America"
          alignment="center"
        />
        
        <div className="mt-12">
          <h3 className="text-xl font-bold text-sai-navy mb-6">European Partners</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <ClientLogo key={index} name={`European Client ${index + 1}`} />
            ))}
          </div>
        </div>
        
        <div className="mt-16">
          <h3 className="text-xl font-bold text-sai-navy mb-6">North American Expansion</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <ClientLogo key={index} name={`North American Client ${index + 1}`} />
            ))}
          </div>
        </div>
        
        <div className="mt-20 bg-gray-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-sai-navy mb-4">Testimonials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            {[
              {
                quote: "Sai International has been our trusted manufacturing partner for over 5 years. Their attention to detail and quality craftsmanship has helped elevate our leather collections.",
                author: "Jean Dubois",
                role: "Product Director",
                company: "Maison Leather, France"
              },
              {
                quote: "Working with Sai International has streamlined our production process. Their team is responsive, professional, and consistently delivers exceptional quality products on schedule.",
                author: "Isabella Romano",
                role: "Sourcing Manager",
                company: "Milano Fashion Group, Italy"
              },
              {
                quote: "As we expanded our leather goods line, finding a reliable manufacturing partner was crucial. Sai International exceeded our expectations with their craftsmanship and commitment to quality.",
                author: "Markus Schmidt",
                role: "CEO",
                company: "Berlin Luxury Goods, Germany"
              },
              {
                quote: "The attention to detail and finish quality that Sai International provides is remarkable. Their team understands our brand aesthetic and consistently delivers products that meet our high standards.",
                author: "Catherine Wilson",
                role: "Design Director",
                company: "London Heritage, UK"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <blockquote className="text-gray-600 italic mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-sai-navy/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-sai-navy font-bold">{testimonial.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ClientelePage;
