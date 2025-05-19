
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
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
        "fixed w-full top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      )}
    >
      <div className="section-container flex justify-between items-center">
        <NavLink to="/" className="flex items-center">
          <h1 className="text-2xl font-display font-bold text-sai-navy">
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
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "text-sai-red"
                    : "text-sai-navy hover:bg-muted"
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
          <NavLink to="/get-quote">
            <Button className="ml-4 bg-sai-red hover:bg-sai-red/90">Get Quote</Button>
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-sai-navy p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t py-3 animate-fade-in">
          <div className="section-container flex flex-col space-y-2">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "text-sai-red bg-muted"
                      : "text-sai-navy hover:bg-muted"
                  )
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            <NavLink to="/get-quote" onClick={() => setIsMenuOpen(false)}>
              <Button className="bg-sai-red hover:bg-sai-red/90 mt-2 w-full">Get Quote</Button>
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
