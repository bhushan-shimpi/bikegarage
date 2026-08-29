import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Home } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Button } from '../../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 text-center">
      <SEO title="404 Page Not Found" robots="noindex, nofollow" />
      <div className="max-w-md mx-auto bg-[#141414] border border-[#262626] rounded-2xl p-8 sm:p-10 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-[#1F1F1F] border border-[#F5B900]/40 flex items-center justify-center text-[#F5B900] mx-auto mb-6">
          <Wrench className="w-8 h-8 rotate-45" />
        </div>

        <h1 className="text-5xl font-black text-white font-sans tracking-tight mb-2">
          404
        </h1>

        <h2 className="text-xl font-bold uppercase text-white tracking-wide mb-3">
          Route Not Found
        </h2>

        <p className="text-sm text-neutral-400 mb-8 leading-relaxed">
          Looks like this road leads nowhere! Head back to the Chaudhari Auto Centre garage home.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>
          <Link to="/services">
            <Button variant="secondary" size="md">
              View Services
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
