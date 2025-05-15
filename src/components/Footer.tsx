
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Mail, Phone, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-sai-navy text-white pt-16 pb-6">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold">Sai International</h3>
            <p className="text-gray-300 max-w-xs">
              Premium OEM leather garment manufacturer with 15+ years of 
              experience serving European brands, now expanding to North America.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className="text-gray-300 hover:text-white transition-colors">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </NavLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/services" className="text-gray-300 hover:text-white transition-colors">
                  OEM Manufacturing
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="text-gray-300 hover:text-white transition-colors">
                  Custom Design
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="text-gray-300 hover:text-white transition-colors">
                  Quality Control
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="text-gray-300 hover:text-white transition-colors">
                  Ethical Production
                </NavLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="mr-2 h-5 w-5 text-sai-coral flex-shrink-0" />
                <a href="tel:+919876543210" className="text-gray-300 hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-start">
                <Mail className="mr-2 h-5 w-5 text-sai-coral flex-shrink-0" />
                <a href="mailto:info@saiinternational.com" className="text-gray-300 hover:text-white transition-colors">
                  info@saiinternational.com
                </a>
              </li>
              <li className="flex items-start">
                <Globe className="mr-2 h-5 w-5 text-sai-coral flex-shrink-0" />
                <a href="https://www.saiinternational.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  www.saiinternational.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-6 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {currentYear} Sai International. All rights reserved.</p>
          <div className="flex mt-4 md:mt-0 space-x-6">
            <a href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
