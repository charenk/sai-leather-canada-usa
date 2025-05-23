
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <header 
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-500 ease-out",
        isScrolled ? "navbar-backdrop shadow-lg py-3" : "bg-transparent py-5"
      )}
    >
      <div className="section-container flex justify-between items-center">
        <NavLink to="/" className="flex items-center group">
          <h1 className="text-2xl font-display font-bold text-sai-navy transition-all duration-300 group-hover:scale-105">
            Sai International
          </h1>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 underline-animation",
                  isActive
                    ? "text-sai-red"
                    : "text-sai-navy hover:bg-muted hover:scale-105"
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
          <NavLink to="/get-quote">
            <Button className="ml-4 bg-sai-red hover:bg-sai-red/90 btn-hover pulse-glow">Get Quote</Button>
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={cn(
            "md:hidden text-sai-navy p-2 rounded-lg transition-all duration-300 hover:bg-muted",
            isMenuOpen && "bg-muted"
          )}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="relative w-6 h-6">
            <Menu 
              size={24} 
              className={cn(
                "absolute inset-0 transition-all duration-300",
                isMenuOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
              )}
            />
            <X 
              size={24} 
              className={cn(
                "absolute inset-0 transition-all duration-300",
                isMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden bg-white/95 backdrop-blur-sm border-t overflow-hidden transition-all duration-500 ease-out",
        isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <nav className="section-container py-4 space-y-2">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "block px-4 py-3 rounded-md text-sm font-medium transition-all duration-300 transform",
                  isActive
                    ? "text-sai-red bg-muted scale-105"
                    : "text-sai-navy hover:bg-muted hover:scale-105 hover:translate-x-2"
                )
              }
              onClick={() => setIsMenuOpen(false)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {link.name}
            </NavLink>
          ))}
          <NavLink 
            to="/get-quote" 
            onClick={() => setIsMenuOpen(false)}
            className="block pt-2"
          >
            <Button className="bg-sai-red hover:bg-sai-red/90 w-full btn-hover">Get Quote</Button>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
