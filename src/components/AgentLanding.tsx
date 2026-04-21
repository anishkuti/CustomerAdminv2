import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  TrendingUp, 
  Activity, 
  CreditCard, 
  AlertTriangle,
  ArrowUpRight,
  Package,
  ArrowRight,
  ArrowRightLeft,
  ShieldCheck,
  Zap,
  Filter,
  Plus,
  Clock,
  Star,
  Settings,
  X,
  ChevronRight,
  LayoutGrid,
  Command,
  Bell,
  LineChart as LineChartIcon,
  CalendarDays,
  LogOut
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  Legend,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { useCustomer } from '../context/CustomerContext';
import { cn } from '../lib/utils';

const portfolioData = [
  { name: 'Jan', data: 4500, cost: 8200 },
  { name: 'Feb', data: 5200, cost: 8900 },
  { name: 'Mar', data: 6100, cost: 9500 },
  { name: 'Apr', data: 7800, cost: 11200 },
];

const distributionData = [
  { account: 'TechSolutions', service: 'Fixed', count: 140 },
  { account: 'TechSolutions', service: 'Mobile', count: 320 },
  { account: 'TechSolutions', service: 'Fiber', count: 90 },
  { account: 'Chen Logistics', service: 'Fixed', count: 80 },
  { account: 'Chen Logistics', service: 'Mobile', count: 180 },
  { account: 'Chen Logistics', service: 'Fiber', count: 40 },
  { account: 'Rodriguez Media', service: 'Fixed', count: 110 },
  { account: 'Rodriguez Media', service: 'Mobile', count: 210 },
  { account: 'Rodriguez Media', service: 'Fiber', count: 60 },
  { account: 'Nexus Venture', service: 'Fixed', count: 120 },
  { account: 'Nexus Venture', service: 'Mobile', count: 180 },
  { account: 'Nexus Venture', service: 'Fiber', count: 130 },
];

const serviceMap: Record<string, string> = {
  'Fixed': '#dc2626',
  'Mobile': '#991b1b',
  'Fiber': '#f87171'
};

export default function AgentLanding({ onLogout }: { onLogout?: () => void }) {
  const { allCustomers, setCustomer } = useCustomer();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAlerts, setShowAlerts] = useState(false);

  const filteredCustomers = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allCustomers.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allCustomers, searchQuery]);

  const frequentAccounts = useMemo(() => allCustomers.slice(0, 4), [allCustomers]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 lg:p-8 overflow-x-hidden font-sans">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* --- Top Command & Stats Bar --- */}
        <div className="lg:col-span-12 flex flex-col md:flex-row items-stretch gap-4">
          {/* Integrated Search Command Bar */}
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Command className="w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Execute Account Search (Company, Industry, ID...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-[15px] font-bold outline-none shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 placeholder:text-slate-400"
            />
            
            {/* Command Results Popover - Integrated */}
            <AnimatePresence>
              {searchQuery.trim() !== '' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  className="absolute top-full left-0 right-0 mt-3 bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden z-[100] p-1.5"
                >
                  <div className="p-2.5 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] bg-slate-50 rounded-lg mb-1.5 flex justify-between items-center">
                    <span>Ecosystem Matches</span>
                    <button onClick={() => setSearchQuery('')} className="p-1 hover:bg-primary/10 rounded-full"><X size={14} className="text-primary" /></button>
                  </div>
                  <div className="space-y-1 max-h-[400px] overflow-y-auto">
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map(customer => (
                        <div 
                          key={customer.id} 
                          onClick={() => setCustomer(customer.id)}
                          className="flex items-center justify-between p-3.5 hover:bg-primary-light rounded-xl transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-primary font-black text-lg transition-all shadow-sm group-hover:scale-105 group-hover:border-primary/20">
                              {customer.companyName.charAt(0)}
                            </div>
                            <div>
                              <h4 className="text-[14px] font-black text-slate-900 group-hover:text-primary">{customer.companyName}</h4>
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{customer.industry} • {customer.id}</p>
                            </div>
                          </div>
                          <ChevronRight size={18} className="text-slate-400 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                        </div>
                      ))
                    ) : (
                      <div className="py-10 text-center text-slate-500 font-bold text-[13px]">No records found for that query.</div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Stat Ribbon */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl p-2 px-4 shadow-sm h-[60px]">
             <div className="flex items-center gap-4 px-3 last:border-0 h-full">
                <div className="text-right">
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Priority Alerts</p>
                   <p className="text-[14px] font-black text-red-600 leading-none mt-0.5">24</p>
                </div>
                <div onClick={() => setShowAlerts(true)} className="p-1.5 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors">
                  <Bell size={16} className="text-red-600" />
                </div>
             </div>
          </div>

          {/* Logout Terminal Access */}
          <button 
            onClick={onLogout}
            className="px-6 h-[60px] bg-slate-900 text-white rounded-2xl flex items-center gap-3 hover:bg-slate-800 transition-all group shadow-lg shadow-slate-900/10 shrink-0"
          >
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">Sarah Mitchell</span>
              <span className="text-[11px] font-black group-hover:text-primary transition-colors leading-none">Exit Session</span>
            </div>
            <LogOut size={18} className="text-white group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* --- Main Bento Grid --- */}
        <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Portfolio Intelligence Dashboard - NOW FIRST BLOCK */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm min-h-[600px] flex flex-col">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-black text-slate-900 tracking-tight uppercase">Portfolio Intelligence</h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-200">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Real-time Stream Active</span>
                </div>
              </div>

              <div className="space-y-4 overflow-y-auto flex-1">
                {[
                  { name: 'TechSolutions Global Ltd.', id: 'ACC-982341', fixed: 12, mobile: 20, fiber: 10, status: 'Healthy' },
                  { name: 'Chen Logistics & Supply', id: 'ACC-552109', fixed: 14, mobile: 110, fiber: 42, status: 'Healthy' },
                  { name: 'Rodriguez Media Group', id: 'ACC-110293', fixed: 10, mobile: 200, fiber: 64, status: 'Healthy' },
                  { name: 'Nexus Venture Group', id: 'ACC-771100', fixed: 22, mobile: 40, fiber: 132, status: 'Healthy' }
                ].map((account, i) => (
                  <div 
                    key={i} 
                    onClick={() => setCustomer(account.id)}
                    className="group flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-slate-50/50 border border-slate-200 rounded-2xl hover:bg-white hover:shadow-xl transition-all hover:border-primary/20 cursor-pointer"
                  >
                    <div className="flex-1 mb-4 md:mb-0">
                      <p className="text-[15px] font-black text-slate-900 group-hover:text-primary transition-colors">{account.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">ID: {account.id}</p>
                        <span className="text-slate-300">•</span>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Primary Node: EMEA-4</p>
                      </div>
                    </div>
                    <div className="flex items-center flex-wrap gap-x-8 gap-y-4 w-full md:w-auto md:text-right">
                      <div className="min-w-[60px]">
                        <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Fixed</p>
                        <p className="text-[16px] font-black text-slate-900">{account.fixed}</p>
                      </div>
                      <div className="min-w-[60px]">
                        <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Mobile</p>
                        <p className="text-[16px] font-black text-slate-900">{account.mobile}</p>
                      </div>
                      <div className="min-w-[60px]">
                        <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Fiber</p>
                        <p className="text-[16px] font-black text-slate-900">{account.fiber}</p>
                      </div>
                      <div className="md:w-24 text-right">
                        <span className={cn(
                          "text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest inline-block border",
                          account.status === 'Healthy' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"
                        )}>{account.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="p-5 bg-slate-900 text-white rounded-2xl shadow-lg border border-white/5 group hover:bg-slate-800 transition-all">
                  <p className="text-[9px] font-bold text-white/40 uppercase mb-1 tracking-widest">Open Orders</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-black">42</p>
                    <ArrowUpRight size={14} className="text-primary-light" />
                  </div>
                </div>
                <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                  <p className="text-[9px] font-bold text-red-600 uppercase mb-1 tracking-widest">Active Issues</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-black text-slate-900">18</p>
                    <AlertTriangle size={14} className="text-red-600" />
                  </div>
                </div>
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                  <p className="text-[9px] font-bold text-slate-500 uppercase mb-1 tracking-widest">Plan SLA</p>
                  <p className="text-2xl font-black text-slate-900">99.8%</p>
                </div>
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                  <p className="text-[9px] font-bold text-slate-500 uppercase mb-1 tracking-widest">Portfolio MRR</p>
                  <p className="text-2xl font-black text-slate-900">£142.5k</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Ecosystem - NOW RIGHT BLOCK */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm h-full flex flex-col max-h-[600px]">
              <div className="flex items-center gap-2 mb-8">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-[0.1em]">Account Ecosystem</h3>
              </div>
              
              <div className="flex-1 overflow-auto bg-slate-50/50 rounded-2xl p-6 border border-slate-100 pr-2">
                <div className="min-w-[400px] pr-4"> {/* Set min-width to trigger horizontal scroll if needed */}
                  <div className="relative pl-8">
                    {/* Vertical Connector Line */}
                    <div className="absolute left-[15px] top-4 bottom-8 w-px bg-slate-200"></div>

                    {/* Primary Parent Node */}
                    <div className="relative mb-10">
                      <div className="absolute left-[-23px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm z-10"></div>
                      <div 
                        onClick={() => setCustomer('ACC-982341')}
                        className="p-5 bg-primary text-white rounded-2xl cursor-pointer hover:bg-primary-dark transition-all shadow-md group flex items-center justify-between"
                      >
                        <div>
                          <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Corporate Parent</p>
                          <p className="text-[15px] font-black leading-tight">TechSolutions Global Ltd.</p>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors shrink-0 ml-4">
                          <ArrowUpRight size={16} />
                        </div>
                      </div>
                    </div>

                    {/* Sub-Account Children */}
                    <div className="space-y-4">
                      {[
                        { name: 'Chen Logistics & Supply', id: 'ACC-552109', industry: 'Logistics' },
                        { name: 'Rodriguez Media Group', id: 'ACC-110293', industry: 'Digital' },
                        { name: 'Nexus Venture Group', id: 'ACC-771100', industry: 'Capital' },
                        { name: 'Global Logistics Unit B', id: 'ACC-552110', industry: 'Logistics' },
                        { name: 'Enterprise Cloud Dev', id: 'ACC-223344', industry: 'SaaS' }
                      ].map((child, i) => (
                        <div key={i} className="relative group">
                          <div className="absolute left-[-23px] top-1/2 -translate-y-1/2 w-4 h-px bg-slate-200 group-hover:bg-primary transition-colors"></div>
                          <div 
                            onClick={() => setCustomer(child.id)}
                            className="ml-4 p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between hover:border-primary/30 transition-all cursor-pointer group/item shadow-sm"
                          >
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[12px] font-black text-primary shadow-sm">
                                 {child.name.charAt(0)}
                               </div>
                               <div>
                                 <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tight">{child.industry} Unit</p>
                                 <p className="text-[12px] font-bold text-slate-900 group-hover/item:text-primary transition-colors leading-tight">{child.name}</p>
                               </div>
                            </div>
                            <ArrowRight size={14} className="text-slate-400 group-hover/item:text-primary transition-transform group-hover/item:translate-x-1 shrink-0 ml-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Shortcut Panel */}
        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 flex items-center justify-between group cursor-pointer hover:border-primary/40 hover:-translate-y-1 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                 <ArrowRightLeft size={20} />
              </div>
              <div>
                <p className="text-[12px] font-black text-slate-900 uppercase tracking-tight">Bulk Transfer</p>
                <p className="text-[9px] font-bold text-slate-500 uppercase">Fleet Migration Engine</p>
              </div>
            </div>
            <ArrowUpRight size={18} className="text-slate-400 group-hover:text-primary" />
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 flex items-center justify-between group cursor-pointer hover:border-primary/40 hover:-translate-y-1 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
                 <Package size={20} />
              </div>
              <div>
                <p className="text-[12px] font-black text-slate-900 uppercase tracking-tight">Catalog Sync</p>
                <p className="text-[9px] font-bold text-slate-500 uppercase">Commercial Deployment</p>
              </div>
            </div>
            <ArrowUpRight size={18} className="text-slate-400 group-hover:text-purple-600" />
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 flex items-center justify-between group cursor-pointer hover:border-primary/40 hover:-translate-y-1 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all shadow-sm">
                 <Settings size={20} />
              </div>
              <div>
                <p className="text-[12px] font-black text-slate-900 uppercase tracking-tight">Node Config</p>
                <p className="text-[9px] font-bold text-slate-500 uppercase">Station Protocol Opts</p>
              </div>
            </div>
            <ArrowUpRight size={18} className="text-slate-400 group-hover:text-amber-600" />
          </div>

          <div className="bg-white shadow-xl shadow-primary/10 border-2 border-primary/20 rounded-2xl p-6 flex items-center justify-between group cursor-pointer hover:bg-primary hover:text-white transition-all overflow-hidden relative">
             <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
               <Plus size={80} />
             </div>
             <div className="flex items-center gap-4 relative z-10">
               <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all">
                 <Plus size={24} />
               </div>
               <div>
                  <p className="text-[12px] font-black uppercase tracking-tight text-slate-900 group-hover:text-white">Onboard Client</p>
                  <p className="text-[9px] font-black text-slate-500 group-hover:text-white/60 uppercase">Manual Entry Mode</p>
               </div>
             </div>
             <ChevronRight size={20} className="relative z-10" />
          </div>
        </div>
      </div>

      {/* --- Overlay Modals --- */}
      <AnimatePresence>
        {showAlerts && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAlerts(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-xl bg-white rounded-[2rem] shadow-2xl overflow-hidden">
              <div className="bg-red-600 p-6 text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <AlertTriangle className="animate-bounce" />
                   <div>
                     <h2 className="text-xl font-black uppercase tracking-tight">System Incident Hub</h2>
                     <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest mt-1">Aggregated Priority Items</p>
                   </div>
                </div>
                <button onClick={() => setShowAlerts(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={24} /></button>
              </div>
              <div className="p-6 max-h-[50vh] overflow-y-auto space-y-3">
                {[
                  { id: 'AL-001', company: 'Nexus Venture Group', companyId: 'ACC-771100', type: 'High Consumption Spike', severity: 'CRITICAL' },
                  { id: 'AL-002', company: 'TechSolutions Global', companyId: 'ACC-982341', type: 'Unpaid Statement', severity: 'WARNING' },
                  { id: 'AL-003', company: 'Rodriguez Media Group', companyId: 'ACC-110293', type: 'Payment Method Expiring', severity: 'CRITICAL' },
                  { id: 'AL-004', company: 'Chen Logistics & Supply', companyId: 'ACC-552109', type: 'Regional Outage', severity: 'IMMEDIATE' }
                ].map((alert) => (
                  <div key={alert.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:border-red-600/20 transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[10px] font-black text-primary uppercase tracking-widest">{alert.company}</span>
                       <span className={cn("px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter", alert.severity === 'CRITICAL' || alert.severity === 'IMMEDIATE' ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-700")}>{alert.severity}</span>
                    </div>
                    <h3 className="font-bold text-[14px] text-slate-900 mb-1">{alert.type}</h3>
                    <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between">
                       <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Case ID: {alert.id}</span>
                       <button 
                         onClick={(e) => {
                           e.stopPropagation();
                           setCustomer(alert.companyId);
                           setShowAlerts(false);
                         }} 
                         className="text-[11px] font-black text-primary hover:underline"
                       >
                         Execute Resolution Strategy
                       </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
                 <button onClick={() => setShowAlerts(false)} className="text-[11px] font-black text-slate-500 hover:text-slate-900 uppercase tracking-widest">Acknowledge All</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
