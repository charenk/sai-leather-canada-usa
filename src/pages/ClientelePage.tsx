import React from 'react';
import SectionHeading from '@/components/SectionHeading';
import ClientLogo from '@/components/ClientLogo';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const ClientelePage = () => {
  return (
    <main className="pt-32 pb-16">
      <div className="section-container">
        <SectionHeading 
          title="Our Clientele" 
          subtitle="Proud to partner with these brands across Europe and globally"
          alignment="center"
        />
        
        <div className="mt-12">
          <h3 className="text-xl font-bold text-sai-navy mb-6">European Partners</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <ClientLogo 
              name="Gerard Darel" 
              logoSrc="/src/assets/logos/gerard-darel.png" 
            />
            <ClientLogo 
              name="Caroll Paris" 
              logoSrc="/src/assets/logos/caroll.png" 
            />
            <ClientLogo 
              name="Maison 123" 
              logoSrc="/src/assets/logos/maison123.png" 
            />
            <ClientLogo 
              name="Burberry" 
              logoSrc="/src/assets/logos/burberry.png" 
            />
            <ClientLogo 
              name="Emporio Armani" 
              logoSrc="/src/assets/logos/emporio-armani.png" 
            />
            {/* Add more European clients */}
            <ClientLogo 
              name="Louis Vuitton" 
              logoSrc="/src/assets/logos/louis-vuitton.png" 
            />
            <ClientLogo 
              name="Gucci" 
              logoSrc="/src/assets/logos/gucci.png" 
            />
            <ClientLogo 
              name="Zara" 
              logoSrc="/src/assets/logos/zara.png" 
            />
            <ClientLogo 
              name="H&M" 
              logoSrc="/src/assets/logos/hm.png" 
            />
            <ClientLogo 
              name="Mango" 
              logoSrc="/src/assets/logos/mango.png" 
            />
          </div>
        </div>
        
        <div className="mt-16">
          <h3 className="text-xl font-bold text-sai-navy mb-6">Global Expansion</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {/* Keeping placeholder logos for global expansion section */}
            {Array.from({ length: 6 }).map((_, index) => (
              <ClientLogo key={index} name={`Potential Partner ${index + 1}`} />
            ))}
          </div>
        </div>
        
        {/* Testimonials Section */}
        <div className="mt-20 bg-gray-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-sai-navy mb-4">Testimonials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            {[
              {
                quote: "Sai International has been our trusted manufacturing partner for over 5 years. Their attention to detail and quality craftsmanship has helped elevate our leather collections.",
                author: "Jean Dubois",
                role: "Product Director",
                company: "Maison 123, France"
              },
              {
                quote: "Working with Sai International has streamlined our production process. Their team is responsive, professional, and consistently delivers exceptional quality products on schedule.",
                author: "Isabella Romano",
                role: "Sourcing Manager",
                company: "Caroll Paris, France"
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
                company: "Burberry, UK"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <blockquote className="text-gray-600 italic mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 bg-sai-navy/10 mr-4">
                      <AvatarFallback className="text-sai-navy font-bold">
                        {testimonial.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ClientelePage;
