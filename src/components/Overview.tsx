import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck,
  Zap,
  PhoneCall,
  Globe,
  Mail,
  MapPin,
  ArrowRight,
  AlertTriangle,
  Smartphone,
  Info,
  History,
  MessageSquare,
  Video,
  User,
  CreditCard,
  MessageCircle,
  Hash,
  Target,
  Heart,
  CalendarDays,
  Briefcase,
  UserCheck,
  Building,
  X
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { useCustomer } from '../context/CustomerContext';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Overview({ 
  onNavigate, 
  onOpenContracts 
}: { 
  onNavigate?: (tab: any) => void;
  onOpenContracts?: () => void;
}) {
  const { currentCustomer, usageData, bills, serviceRequests, alerts } = useCustomer();
  const [isCompanyModalOpen, setIsCompanyModalOpen] = React.useState(false);

  const companyInfo = {
    name: 'TechSolutions Global Ltd.',
    tier: 'Enterprise',
    primaryContact: 'Jonathan Sterling',
    email: 'j.sterling@techsolutions.com',
    location: 'London, UK - Canary Wharf',
    vertical: 'Information Technology',
    manager: 'Alex Rivera'
  };
  
  const currentBillAmount = bills.length > 0 ? `£${bills[0].amount.toLocaleString()}` : '£0.00';
  const billTrend = bills.length > 1 
    ? (bills[0].amount > bills[1].amount ? '+1.2%' : '-2.4%')
    : 'New Account';

  const stats = [
    { label: 'Total Spend (MTD)', value: currentBillAmount, trend: billTrend, icon: CreditCard, color: 'text-white', bg: 'bg-primary' },
    { label: 'Active Lines', value: currentCustomer.activeLines, total: currentCustomer.totalLines, icon: Smartphone, color: 'text-white', bg: 'bg-primary' },
    { label: 'Open Alerts', value: alerts.length, priority: alerts.filter(a => a.severity === 'Critical').length, icon: AlertTriangle, color: 'text-white', bg: 'bg-primary', up: false, trend: '-2 vs last month' },
    { label: 'Avg. Usage / Line', value: '14.6 GB', trend: '+1.4 GB', icon: Activity, color: 'text-white', bg: 'bg-primary', up: true },
  ];

  const usageDistribution = [
    { name: 'Data Services', value: 55, color: '#dc2626' },
    { name: 'Voice Traffic', value: 20, color: '#991b1b' },
    { name: 'Cloud Hosting', value: 15, color: '#f87171' },
    { name: 'IoT Connectivity', value: 10, color: '#ef4444' },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'Network': return Zap;
      case 'Billing': return CreditCard;
      case 'Security': return ShieldCheck;
      default: return Info;
    }
  };

  const getAlertStyles = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-50 border-red-100 text-red-800';
      case 'Warning': return 'bg-amber-50 border-amber-100 text-amber-800';
      default: return 'bg-blue-50 border-blue-100 text-blue-800';
    }
  };

  // Mock CreditCard import since it's not and actually we don't have it in lucide list here, oh it's in App.tsx. 
  // I will use Zap, PhoneCall, Globe for now instead of CreditCard if missing.
  // Actually let's use Activity or AlertTriangle.

  return (
    <div className="space-y-6 pb-12">
      {/* Customer Hero Section */}
      <div className="bg-white rounded-2xl border border-border-main shadow-sm overflow-hidden mb-6">
        <div className="p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center text-primary font-black text-3xl border border-primary/10 shrink-0 shadow-sm">
              {currentCustomer.companyName.charAt(0)}
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-black text-text-main tracking-tight uppercase">{currentCustomer.companyName}</h2>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded border border-emerald-100 uppercase tracking-widest">
                  <ShieldCheck size={10} className="fill-emerald-700/20" /> {currentCustomer.tier} Account
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-black rounded border border-blue-100 uppercase tracking-widest font-mono">
                  {currentCustomer.id}
                </div>
                <button 
                  onClick={() => setIsCompanyModalOpen(true)}
                  className="flex items-center gap-1.5 px-2.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-black rounded-full border border-slate-200 uppercase tracking-widest hover:bg-slate-200 transition-all cursor-pointer"
                >
                  <Building size={10} className="text-primary" /> Company Info
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] font-bold text-text-muted">
                <span className="flex items-center gap-2 text-text-main">
                  <User className="w-4 h-4 text-primary" /> {currentCustomer.name}
                </span>
                <span className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> {currentCustomer.industry}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {currentCustomer.location}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-row items-center gap-4 lg:border-l lg:border-border-main lg:pl-10">
            <div className="space-y-0.5">
              <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.15em] block">Health</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]"></div>
                <span className="text-sm font-black text-emerald-600 uppercase tracking-tight">Stable</span>
              </div>
            </div>
            <div className="h-8 w-px bg-border-main"></div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.15em] block">SLA Status</span>
              <span className="text-sm font-black text-primary uppercase tracking-tight">Platinum</span>
            </div>
          </div>
        </div>
        
        {/* KPI / Action Strip */}
        <div className="bg-bg-app/40 border-t border-border-main px-8 py-2.5 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Active Tickets:</span>
              <button 
                onClick={() => onNavigate?.('service-request')}
                className="text-[11px] font-black text-amber-600 hover:text-amber-700 underline underline-offset-4 decoration-1 transition-colors flex items-center gap-1.5"
              >
                {serviceRequests.filter(r => r.status !== 'Completed').length} PENDING <ArrowRight size={10} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">LTV Value:</span>
              <span className="text-[11px] font-black text-text-main uppercase">£450k Annually</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate?.('contracts')}
              className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-2"
            >
              Analyze Governing Agreements <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Primary Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-4 lg:p-5 rounded-2xl border border-border-main shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
              <div className="flex items-center justify-between mb-3">
                <div className={cn("p-2 rounded-xl border border-white/20", stat.bg)}>
                  <stat.icon className={cn("w-4 h-4", stat.color)} />
                </div>
              {stat.trend && (
                <span className={cn(
                  "flex items-center gap-1 text-[9px] font-black px-1.5 py-0.5 rounded-md",
                  stat.up ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100"
                )}>
                  {stat.up ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                  {stat.trend}
                </span>
              )}
            </div>
            <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.1em] block mb-1">{stat.label}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-text-main tracking-tight leading-none">{stat.value}</span>
              {stat.total && <span className="text-[10px] text-text-muted font-bold opacity-60">/ {stat.total}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Usage Analytics */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-border-main shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[15px] font-bold text-text-main uppercase tracking-tight">Enterprise Network Usage Analytics</h3>
                <p className="text-[12px] text-text-muted font-medium">Consumption trends across all active subscriptions</p>
              </div>
              <select className="bg-[#f1f3f5] border border-border-main rounded-md px-3 py-1.5 text-[11px] font-bold text-text-muted outline-none focus:ring-1 focus:ring-primary/20 transition-all">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Quarter</option>
              </select>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#dc2626" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f3f5" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#6c757d', fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#6c757d', fontWeight: 600 }}
                    tickFormatter={(value) => value >= 1000 ? `${(value/1000).toFixed(1)}GB` : `${value}MB`}
                  />
                  <Tooltip 
                    formatter={(value: any) => [value >= 1000 ? `${(value/1000).toFixed(1)} GB` : `${value} MB`, 'Usage']}
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: '1px solid #dee2e6', 
                      fontSize: '12px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="data" 
                    stroke="#dc2626" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorUsage)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Interaction Log */}
          <div className="bg-white p-6 rounded-lg border border-border-main shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[15px] font-bold text-text-main uppercase tracking-tight">Recent Account Interactions</h3>
                <p className="text-[12px] text-text-muted font-medium">Log of latest customer touchpoints across all channels</p>
              </div>
              <button className="text-[11px] font-bold text-primary hover:underline">View Full History</button>
            </div>
            
            <div className="space-y-4">
              {currentCustomer.interactions?.map((interaction) => (
                <div key={interaction.id} className="flex gap-4 p-4 bg-bg-app rounded-lg border border-border-main hover:border-primary/20 transition-all group cursor-pointer">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border shadow-sm",
                    interaction.type === 'Phone' || interaction.type === 'Call' ? "bg-blue-50 text-blue-600 border-blue-100" :
                    interaction.type === 'SMS' ? "bg-amber-50 text-amber-600 border-amber-100" :
                    interaction.type === 'WhatsApp' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                    interaction.type === 'Email' ? "bg-purple-50 text-purple-600 border-purple-100" :
                    "bg-gray-50 text-gray-600 border-gray-100"
                  )}>
                    {(interaction.type === 'Phone' || interaction.type === 'Call') && <PhoneCall size={18} />}
                    {interaction.type === 'SMS' && <MessageSquare size={18} />}
                    {interaction.type === 'WhatsApp' && <MessageCircle size={18} />}
                    {interaction.type === 'Email' && <Mail size={18} />}
                    {interaction.type === 'Chat' && <MessageSquare size={18} />}
                    {interaction.type === 'In-Person' && <User size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold text-text-main group-hover:text-primary transition-colors">{interaction.type} Session</span>
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-border-main bg-white text-text-muted uppercase tracking-tighter shadow-sm">{interaction.id}</span>
                      </div>
                      <span className="text-[11px] font-bold text-text-muted bg-white px-2 py-0.5 rounded-full border border-border-main">{interaction.date}</span>
                    </div>
                    <p className="text-[12px] text-text-main font-semibold mb-2 leading-relaxed">{interaction.summary}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50/50 px-2 py-0.5 rounded-md border border-emerald-100/50">
                        <ShieldCheck size={12} /> {interaction.outcome}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Usage Distribution */}
          <div className="bg-white p-6 rounded-lg border border-border-main shadow-sm">
            <div className="mb-6">
              <h3 className="text-[15px] font-bold text-text-main uppercase tracking-wider mb-1">Usage Distribution</h3>
              <p className="text-[12px] text-text-muted font-medium">Consumption breakdown by service type</p>
            </div>
            
            <div className="h-[220px] w-full flex items-center justify-center mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageDistribution} layout="vertical" barSize={24} margin={{ left: 0, right: 20 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" hide />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '11px', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="value" radius={[0, 12, 12, 0]}>
                    {usageDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {usageDistribution.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-[12px] font-semibold text-text-muted">{item.name}</span>
                  </div>
                  <span className="text-[12px] font-bold text-text-main">{item.value}%</span>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 py-3 bg-white border border-border-main rounded-md text-text-main text-[12px] font-bold hover:bg-bg-app transition-colors flex items-center justify-center gap-2 border-dashed">
              Detailed Consumption Report <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Actions / Tips */}
          <div className="bg-primary p-6 rounded-lg text-white shadow-lg shadow-primary/20">
            <Zap className="w-6 h-6 mb-4 text-emerald-400" />
            <h4 className="text-[15px] font-bold mb-2 uppercase tracking-tighter">{currentCustomer.insightTitle || 'Proactive Insight'}</h4>
            <p className="text-[12px] opacity-80 leading-relaxed font-medium mb-6">
              {currentCustomer.insight || 'Monitoring account consumption patterns for optimization opportunities.'}
            </p>
            <button className="w-full py-2.5 bg-white text-primary rounded-md text-[13px] font-bold hover:bg-opacity-90 transition-all shadow-sm">
              Apply Recommendation
            </button>
          </div>
        </div>
      </div>

      {/* Company Info Modal */}
      <AnimatePresence>
        {isCompanyModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCompanyModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl z-[101] overflow-hidden border border-slate-200"
            >
              <div className="bg-slate-900 p-8 text-white relative">
                <button 
                  onClick={() => setIsCompanyModalOpen(false)}
                  className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center border border-white/20 shadow-lg">
                    <Building className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black tracking-tight">{companyInfo.name}</h2>
                    <span className="px-2 py-0.5 bg-primary rounded text-[9px] font-black uppercase tracking-widest">{companyInfo.tier} Account</span>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                      <UserCheck size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Primary Contact</p>
                      <p className="text-[15px] font-bold text-slate-900">{companyInfo.primaryContact}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Account Email</p>
                      <p className="text-[15px] font-bold text-slate-900">{companyInfo.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                      <Globe size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">H.Q. Location</p>
                      <p className="text-[15px] font-bold text-slate-900">{companyInfo.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Vertical Market</p>
                      <p className="text-[15px] font-bold text-slate-900">{companyInfo.vertical}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Account Manager</p>
                      <p className="text-[15px] font-bold text-slate-900">{companyInfo.manager}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <button 
                    onClick={() => setIsCompanyModalOpen(false)}
                    className="w-full py-4 bg-slate-900 text-white font-black text-[13px] uppercase tracking-widest rounded-2xl hover:bg-primary transition-all shadow-lg"
                  >
                    Close Profile
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}