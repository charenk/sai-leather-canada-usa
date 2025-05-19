import React, { useEffect } from 'react';
import SectionHeading from '@/components/SectionHeading';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { ArrowRight, Calendar, Route } from 'lucide-react';
import StatCard from '@/components/StatCard';

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
      
      {/* Timeline Section - Redesigned */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="section-container">
          <SectionHeading 
            title="Our Journey Through Time" 
            subtitle="Key milestones that shaped our growth and excellence"
            alignment="center"
          />
          
          <div className="mt-16">
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {[
                  {
                    year: "2008",
                    title: "Humble Beginnings",
                    description: "Founded with 15 artisans, specializing in handcrafted leather goods in a small workshop in the industrial district.",
                    color: "red"
                  },
                  {
                    year: "2012",
                    title: "European Partnership",
                    description: "Secured our first major European brand partnership, marking our entry into OEM manufacturing for luxury fashion houses.",
                    color: "coral"
                  },
                  {
                    year: "2015",
                    title: "Facility Expansion",
                    description: "Expanded to a 25,000 sq ft state-of-the-art facility with advanced machinery and over 100 skilled artisans.",
                    color: "blue"
                  },
                  {
                    year: "2018",
                    title: "Sustainability Initiative",
                    description: "Launched our comprehensive sustainability program focusing on ethical sourcing, waste reduction, and eco-friendly production practices.",
                    color: "lavender"
                  },
                  {
                    year: "2023",
                    title: "North American Expansion",
                    description: "Beginning our strategic expansion into North American markets with dedicated sales, support, and distribution networks.",
                    color: "red"
                  }
                ].map((milestone, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 h-full">
                    <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6 h-full flex flex-col">
                        <div className="flex items-center gap-2 mb-4">
                          <Calendar className="text-sai-red" />
                          <span className="text-xl font-bold text-sai-navy">{milestone.year}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-sai-navy">{milestone.title}</h3>
                        <p className="text-gray-600 mb-4 flex-grow">{milestone.description}</p>
                        <div className="w-16 h-1 bg-sai-red rounded-full mt-auto"></div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>
          
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard value="15+" label="Years of Experience" color="red" className="shadow-lg" />
            <StatCard value="200+" label="Skilled Artisans" color="coral" className="shadow-lg" />
            <StatCard value="10+" label="European Partnerships" color="blue" className="shadow-lg" />
            <StatCard value="50K+" label="Products per Year" color="lavender" className="shadow-lg" />
          </div>
          
          <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-8 bg-gray-50 p-8 rounded-xl shadow-sm animate-on-scroll">
            <div className="flex items-center justify-center w-16 h-16 bg-sai-red/10 rounded-full">
              <Route className="w-8 h-8 text-sai-red" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-sai-navy mb-2">The Road Ahead</h3>
              <p className="text-gray-700 max-w-2xl">
                As we continue our journey, we remain committed to craftsmanship excellence, 
                sustainable practices, and expanding our global footprint while preserving 
                the artisanal quality that has defined our success.
              </p>
            </div>
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
