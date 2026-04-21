import React from 'react';
import { 
  Zap, 
  ShieldAlert, 
  Globe, 
  MessageSquare,
  Lightbulb as LightbulbIcon,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Package,
  Smartphone,
  Wifi,
  Phone
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useCustomer } from '../context/CustomerContext';
import { Offering } from '../types';

const IconMap: Record<string, React.ElementType> = {
  Zap,
  ShieldAlert,
  Globe,
  MessageSquare,
  Package,
  Smartphone,
  Wifi,
  Phone
};

export default function Offerings() {
  const { offerings } = useCustomer();
  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[17px] font-extrabold text-text-main">Exclusive Offerings</h2>
          <p className="text-[12px] text-text-muted font-medium">Personalized opportunities and new products for your business.</p>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[11px] font-bold text-primary bg-primary-light px-2 py-0.5 rounded border border-primary/10 uppercase tracking-tighter">
             {offerings.filter(o => o.isNew).length} New Offers
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offerings.map((offering, idx) => {
          const Icon = IconMap[offering.icon] || LightbulbIcon;
          return (
            <motion.div
              layout
              key={offering.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-lg border border-border-main p-6 flex flex-col h-full hover:border-primary/20 transition-colors group shadow-sm relative overflow-hidden"
            >
              {offering.tag && (
                <div className="absolute top-0 right-0">
                   <div className="bg-primary text-white text-[9px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-widest">
                     {offering.tag}
                   </div>
                </div>
              )}

              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary-light text-primary rounded-lg flex items-center justify-center border border-primary/10 flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[15px] font-bold text-text-main">{offering.title}</h3>
                    {offering.isNew && (
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                    )}
                  </div>
                  <p className="text-[12px] text-text-muted leading-relaxed font-medium">
                    {offering.description}
                  </p>
                </div>
              </div>

              <div className="mt-auto space-y-4">
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-bg-app p-3 rounded-md border border-border-main">
                      <span className="block text-[10px] font-bold text-text-muted uppercase tracking-tight mb-1">Investment</span>
                      <span className="block text-[13px] font-bold text-text-main">{offering.price}</span>
                   </div>
                   <div className="bg-bg-app p-3 rounded-md border border-border-main">
                      <span className="block text-[10px] font-bold text-text-muted uppercase tracking-tight mb-1">Business Value</span>
                      <span className="block text-[11px] font-bold text-emerald-600 leading-tight">{offering.benefit}</span>
                   </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                   <button className="flex-1 px-4 py-2.5 bg-primary text-white text-[12px] font-bold rounded-md hover:bg-opacity-90 transition-all flex items-center justify-center gap-2">
                     Activate Offer <ChevronRight className="w-4 h-4" />
                   </button>
                   <button className="px-4 py-2.5 bg-white border border-border-main text-text-main text-[12px] font-bold rounded-md hover:bg-bg-app transition-all">
                     Learn More
                   </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Featured Banner */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] p-8 lg:p-12 text-white relative overflow-hidden group shadow-xl border border-white/5">
         <div className="relative z-10 max-w-xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-primary text-white text-[10px] font-black rounded-full uppercase tracking-[0.2em] shadow-lg shadow-primary/20">Special Enterprise Program</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <h3 className="text-3xl lg:text-4xl font-black mb-4 tracking-tighter leading-none">Q2 Business Expansion Pack</h3>
            <p className="text-slate-300 text-[15px] leading-relaxed mb-8 font-medium">
              Upgrade 10+ lines to our Enterprise Unlimited Pro plan and get a dedicated fibre circuit installed at your headquarters with 3 months free.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/btn shadow-lg">
                Talk to Account Manager <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all border border-white/10">
                View Terms
              </button>
            </div>
         </div>

         {/* Decorative elements */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] -mr-48 -mt-48 rounded-full group-hover:bg-primary/20 transition-all duration-700"></div>
         <div className="absolute bottom-0 right-0 opacity-[0.03] p-12 transform rotate-12 group-hover:rotate-0 transition-transform duration-700">
            <Zap size={240} strokeWidth={1} />
         </div>
      </div>

      {/* Trust & Upsell Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { title: 'Global Connectivity', desc: 'Secure connection wherever business takes your team.', icon: Globe },
           { title: 'Priority Support', desc: 'Enterprise-grade response times on all service requests.', icon: ShieldAlert },
           { title: 'Unified Billing', desc: 'Consolidate all services into a single monthly statement.', icon: MessageSquare }
         ].map((item, i) => (
           <div key={i} className="flex items-start gap-3 p-4 bg-white border border-border-main rounded-lg shadow-sm">
              <div className="p-2 bg-primary-light text-primary rounded-md">
                 <item.icon size={18} />
              </div>
              <div>
                 <h4 className="text-[13px] font-bold text-text-main mb-0.5">{item.title}</h4>
                 <p className="text-[11px] text-text-muted leading-normal font-medium">{item.desc}</p>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}
