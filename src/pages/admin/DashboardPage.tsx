import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  Sparkles,
  Clock,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { StatCard } from '../../components/admin/StatCard';
import { EnquiryTableRow } from '../../components/admin/EnquiryTableRow';
import { EnquiryCardMobile } from '../../components/admin/EnquiryCardMobile';
import { enquiryService } from '../../services/enquiryService';
import { Enquiry } from '../../types/enquiry';
import { Button } from '../../components/common/Button';

export const DashboardPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  useEffect(() => {
    setEnquiries(enquiryService.getAll());
  }, []);

  const totalCount = enquiries.length;
  const newCount = enquiries.filter((e) => e.status === 'new').length;
  const inProgressCount = enquiries.filter(
    (e) => e.status === 'in_progress' || e.status === 'contacted'
  ).length;
  const completedCount = enquiries.filter((e) => e.status === 'completed').length;

  const recentEnquiries = enquiries.slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Top Banner Alert / Welcome on White Background */}
      <div className="p-6 rounded-2xl bg-white border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#DFA500]">
              Pahur Two-Wheeler Workshop Control Center
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-gray-900 tracking-tight font-sans">
            Chaudhari Auto Workshop Portal
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            You have <strong className="text-gray-900">{newCount} new bike inquiries</strong> awaiting callback today.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link to="/garage/enquiries">
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Manage All Enquiries
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Dashboard Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          label="Total Bike Inquiries"
          count={totalCount}
          icon={Inbox}
          subtext="All customer service requests"
          colorTheme="yellow"
        />
        <StatCard
          label="New Leads"
          count={newCount}
          icon={Sparkles}
          subtext="Awaiting response & quote"
          colorTheme="blue"
        />
        <StatCard
          label="In Service Bays"
          count={inProgressCount}
          icon={Clock}
          subtext="Active bikes undergoing repair"
          colorTheme="amber"
        />
        <StatCard
          label="Delivered & Handed Over"
          count={completedCount}
          icon={CheckCircle2}
          subtext="Satisfied two-wheeler owners"
          colorTheme="emerald"
        />
      </div>

      {/* Recent Enquiries Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FFF9E6] border border-[#F5B900]/40 flex items-center justify-center text-[#DFA500]">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 uppercase tracking-tight font-sans">
                Recent Bike Inquiries & Requests
              </h3>
              <p className="text-xs text-gray-500">
                Latest leads received from public website
              </p>
            </div>
          </div>

          <Link
            to="/garage/enquiries"
            className="text-xs font-bold uppercase tracking-wider text-[#DFA500] hover:text-black transition-colors flex items-center gap-1"
          >
            <span>View All ({totalCount})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-[11px] font-extrabold uppercase tracking-wider text-gray-500 bg-gray-50/60">
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Mobile</th>
                <th className="py-3 px-4">Bike / Model</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Preferred Slot</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Created</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentEnquiries.map((enq) => (
                <EnquiryTableRow key={enq.id} enquiry={enq} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards List */}
        <div className="md:hidden space-y-3">
          {recentEnquiries.map((enq) => (
            <EnquiryCardMobile key={enq.id} enquiry={enq} />
          ))}
        </div>
      </div>
    </div>
  );
};
