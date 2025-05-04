
import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a192f] text-white">
      <header className="border-b border-blue-900/30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <span className="gradient-text">InstantQuote</span>
          </Link>
          <nav>
            <ul className="hidden md:flex space-x-8">
              <li>
                <Link to="/" className="text-sm font-medium text-blue-100 hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm font-medium text-blue-100 hover:text-blue-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm font-medium text-blue-100 hover:text-blue-400 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm font-medium text-blue-100 hover:text-blue-400 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </nav>
          <div className="hidden md:block">
            <Link to="/" className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
              Contact us
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="border-t border-blue-900/30 bg-[#0a1525] py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-blue-300">InstantQuote</h3>
              <p className="text-sm text-blue-200/70">
                Get accurate quotes for your web development projects instantly.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-blue-300">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-blue-200/70 hover:text-blue-200 transition-colors">
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-blue-200/70 hover:text-blue-200 transition-colors">
                    Design Services
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-blue-200/70 hover:text-blue-200 transition-colors">
                    E-commerce Solutions
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-blue-200/70 hover:text-blue-200 transition-colors">
                    SEO & Marketing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-blue-300">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-blue-200/70 hover:text-blue-200 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-blue-200/70 hover:text-blue-200 transition-colors">
                    Our Work
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-blue-200/70 hover:text-blue-200 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-blue-200/70 hover:text-blue-200 transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-blue-300">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-blue-200/70 hover:text-blue-200 transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-blue-200/70 hover:text-blue-200 transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-blue-200/70 hover:text-blue-200 transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-blue-200/70 hover:text-blue-200 transition-colors">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-900/30 text-center">
            <p className="text-sm text-blue-200/70">
              © {new Date().getFullYear()} InstantQuote. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
