import React, { useState } from 'react';
import { 
  CreditCard, 
  History, 
  Smartphone, 
  Search,
  Users2,
  Smartphone as SmartphoneIcon,
  Wifi,
  Package,
  Settings2,
  ArrowRightLeft,
  Trash2,
  AlertCircle,
  PhoneCall,
  Mail,
  MessageSquare,
  User,
  History as HistoryIcon,
  Zap,
  ShieldAlert,
  Globe,
  ArrowRight,
  ArrowUpRight,
  LayoutDashboard,
  Bell,
  LineChart,
  ChevronDown,
  FileText,
  PanelRightClose,
  PanelRight,
  Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { useCustomer, CustomerProvider } from './context/CustomerContext';
import Overview from './components/Overview';
import Subscriptions from './components/ManageLines';
import BillingAndPayments from './components/BillingAndPayments';
import Offerings from './components/Offerings';
import ServiceRequestsAndOrders from './components/ServiceRequestsAndOrders';
import Preferences from './components/Preferences';
import Login from './components/Login';
import AgentLanding from './components/AgentLanding';
import ContractModal from './components/ContractModal';

type TabType = 'overview' | 'lines' | 'billing' | 'service-request' | 'order' | 'offerings' | 'preferences' | 'contracts';

interface DashboardProps {
  onLogout: () => void;
}

function Dashboard({ onLogout }: DashboardProps) {
  const { currentCustomer, allCustomers, setCustomer, offerings } = useCustomer();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

  const menuItems: { id: TabType, label: string, icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'lines', label: 'Subscriptions', icon: Smartphone },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'contracts', label: 'Contracts', icon: FileText },
    { id: 'order', label: 'Orders', icon: Package },
    { id: 'service-request', label: 'Service Requests', icon: MessageSquare },
    { id: 'offerings', label: 'Offerings', icon: Lightbulb },
    { id: 'preferences', label: 'Settings', icon: Settings2 },
  ];

  const filteredCustomers = searchQuery.trim() === '' 
    ? [] 
    : allCustomers.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase())
      );

  if (!currentCustomer) {
    return <AgentLanding onLogout={onLogout} />;
  }

  return (
    <div className="flex flex-col h-screen bg-bg-app text-text-main font-sans overflow-hidden">
      {/* Header - Top Bar */}
      <header className="h-[64px] bg-white border-b border-border-main px-6 flex items-center justify-between flex-shrink-0 z-50">
        <div className="flex items-center gap-8">
           <button 
             onClick={() => setCustomer(null)}
             className="text-[10px] font-black text-text-muted hover:text-primary transition-colors uppercase tracking-[0.2em] border-r border-border-main pr-8 py-2 cursor-pointer"
           >
             Workspace
           </button>
           
           <div className="md:flex flex-1 min-w-[300px] relative">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search Customers, Orders, Services..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full pl-10 pr-4 py-2 bg-[#f8f9fa] border border-border-main rounded-lg text-sm outline-none focus:border-primary/30 transition-all font-medium"
              />
            </div>
            
            <AnimatePresence>
              {isSearchFocused && filteredCustomers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute top-full mt-2 left-0 right-0 bg-white border border-border-main rounded-lg shadow-xl overflow-hidden z-[100]"
                >
                  <div className="p-3 text-[10px] font-black text-text-muted uppercase tracking-widest bg-bg-app border-b border-border-main">
                    Results
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {filteredCustomers.map((customer) => (
                      <button
                        key={customer.id}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          setCustomer(customer.id);
                          setSearchQuery('');
                          setIsSearchFocused(false);
                        }}
                        className="w-full text-left p-4 hover:bg-primary-light/30 border-b border-border-main last:border-0 flex items-center gap-4 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-base">
                          {customer.companyName.charAt(0)}
                        </div>
                        <div>
                          <div className="text-[14px] font-black text-text-main leading-tight">{customer.companyName}</div>
                          <div className="text-[11px] text-text-muted font-bold">{customer.id}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end mr-2">
            <div className="text-[14px] font-black text-text-main leading-tight">Sarah Mitchell</div>
            <div className="text-[11px] text-text-muted font-bold uppercase tracking-tighter">Corporate Admin • Finance</div>
          </div>
          <div className="flex relative">
            <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center text-primary font-black text-sm border border-primary/10 transition-colors hover:bg-primary/10 cursor-pointer">
              SM
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-primary border-2 border-white rounded-full"></div>
          </div>
          <button 
            onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
            className="md:flex hidden w-10 h-10 items-center justify-center text-text-muted hover:text-primary transition-colors bg-bg-app border border-border-main rounded-lg ml-2"
          >
            {isRightPanelOpen ? <PanelRightClose size={20} /> : <PanelRight size={20} />}
          </button>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-[260px] bg-white border-r border-border-main flex flex-col flex-shrink-0">
          <nav className="flex-1 px-3 py-6 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-black transition-all group relative",
                  activeTab === item.id 
                    ? "text-primary bg-primary-light" 
                    : "text-text-muted hover:text-text-main hover:bg-bg-app"
                )}
              >
                <item.icon size={20} className={cn(
                  "transition-colors",
                  activeTab === item.id ? "text-primary" : "text-text-muted group-hover:text-text-main"
                )} />
                <span className="tracking-tight">{item.label}</span>
                {activeTab === item.id && (
                  <div className="absolute right-3 w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.5)]" />
                )}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-border-main mt-auto space-y-3">
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-black text-text-muted hover:text-red-600 hover:bg-red-50 transition-all"
            >
              <Trash2 size={20} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Dynamic Content Columns */}
        <main className={cn(
          "flex-1 grid bg-border-main gap-[1px] overflow-hidden transition-all duration-300",
          isRightPanelOpen ? "grid-cols-1 xl:grid-cols-[1fr_320px]" : "grid-cols-1"
        )}>
          
          {/* Main Workspace Area */}
          <section className="bg-bg-app overflow-y-auto p-4 sm:p-6 relative scroll-smooth thin-scrollbar">
            <div className={cn("mx-auto mb-10 transition-all", isRightPanelOpen ? "w-full" : "max-w-6xl")}>
              <div className="flex flex-col mb-8 mt-2">
                 <p className="text-[12px] font-black text-primary uppercase tracking-[0.3em] mb-2 leading-none">Welcome back, Sarah</p>
                 <div className="flex items-center justify-between gap-4">
                   <h1 className="text-3xl font-black text-text-main tracking-tighter uppercase leading-none">
                     {menuItems.find(m => m.id === activeTab)?.label}
                   </h1>
                   <button className="bg-white border border-border-main text-[11px] font-black px-4 py-2 rounded-xl text-text-main hover:bg-bg-app transition-colors uppercase tracking-widest flex items-center gap-2">
                     <History size={14} /> Last updated 2 min ago
                   </button>
                 </div>
                 <p className="text-[13px] text-text-muted font-bold mt-2 uppercase tracking-wide">
                   {currentCustomer.companyName} • UK & Ireland
                 </p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'overview' && (
                    <Overview 
                      onNavigate={setActiveTab} 
                      onOpenContracts={() => setIsContractModalOpen(true)} 
                    />
                  )}
                  {activeTab === 'lines' && <Subscriptions />}
                  {activeTab === 'billing' && <BillingAndPayments />}
                  {activeTab === 'offerings' && <Offerings />}
                  {activeTab === 'service-request' && <ServiceRequestsAndOrders initialTab="Requests" hideTabs />}
                  {activeTab === 'order' && <ServiceRequestsAndOrders initialTab="Orders" hideTabs />}
                  {activeTab === 'preferences' && <Preferences />}
                  {activeTab === 'contracts' && (
                    <div className="space-y-6">
                      <div className="bg-white p-6 rounded-xl border border-border-main">
                        <div className="flex items-center justify-between mb-8">
                          <div>
                            <h2 className="text-[18px] font-black text-text-main uppercase tracking-tight">Active Master Service Agreements</h2>
                            <p className="text-[12px] text-text-muted font-medium">Governing terms and contractual artifacts</p>
                          </div>
                          <button className="px-4 py-2 bg-primary text-white text-[11px] font-black rounded-lg uppercase tracking-widest">Download PDF Package</button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {[
                            { title: 'Global Framework Agreement', ref: 'GFA-2024-088', status: 'Active', expiry: 'Dec 2026' },
                            { title: 'Data Processing Addendum', ref: 'DPA-V2.1', status: 'Current', expiry: 'Linked' },
                            { title: 'SLA Addendum (Platinum)', ref: 'SLA-UK-24', status: 'Active', expiry: 'Dec 2026' },
                            { title: 'Equipment Lease Agreement', ref: 'ELA-4992', status: 'Active', expiry: 'Ongoing' },
                          ].map((doc, idx) => (
                            <div key={idx} className="p-4 rounded-xl bg-bg-app border border-border-main hover:border-primary/30 transition-all cursor-pointer group">
                              <div className="flex items-center justify-between mb-3">
                                <FileText className="text-primary" size={20} />
                                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 uppercase">{doc.status}</span>
                              </div>
                              <h4 className="text-[14px] font-black text-text-main group-hover:text-primary transition-colors">{doc.title}</h4>
                              <div className="flex items-center justify-between mt-4">
                                <span className="text-[10px] font-bold text-text-muted uppercase font-mono">{doc.ref}</span>
                                <span className="text-[10px] font-bold text-text-muted uppercase">Exp: {doc.expiry}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          {/* Right Panel: Context & Insights */}
          {isRightPanelOpen && (
            <section className="bg-white p-6 hidden xl:flex flex-col overflow-y-auto thin-scrollbar divide-y divide-border-main/50">
              <div className="pb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em]">Priority System Alerts</h3>
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              </div>
              
              <div className="space-y-3">
                {[
                  { title: 'Data Limit Threshold', desc: 'Line +44 7700 900456 over 95%', severity: 'high', icon: ShieldAlert },
                  { title: 'Billing Discrepancy', desc: 'Mismatched MRR for SKU: BDL-492', severity: 'medium', icon: AlertCircle },
                  { title: 'Network Latency', desc: 'Regional node spiking in IRL-Dublin', severity: 'low', icon: Globe },
                ].map((alert, i) => (
                  <div key={i} className="p-3 rounded-xl border border-border-main bg-bg-app hover:border-primary/30 transition-all cursor-pointer group">
                    <div className="flex items-center gap-3 mb-1.5">
                      <alert.icon size={14} className={cn(
                        alert.severity === 'high' ? "text-red-600" : 
                        alert.severity === 'medium' ? "text-amber-500" : "text-blue-500"
                      )} />
                      <span className="text-[12px] font-black text-text-main group-hover:text-primary transition-colors">{alert.title}</span>
                    </div>
                    <p className="text-[11px] text-text-muted font-bold leading-tight pl-6">{alert.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 pb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em]">Quick Metrics</h3>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[9px] font-black border border-emerald-100">STABLE</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-bg-app p-4 rounded-2xl border border-border-main">
                   <p className="text-[10px] font-black text-text-muted uppercase mb-1">Utilization</p>
                   <p className="text-lg font-black text-text-main">84%</p>
                </div>
                <div className="bg-bg-app p-4 rounded-2xl border border-border-main">
                   <p className="text-[10px] font-black text-text-muted uppercase mb-1">Active SIMs</p>
                   <p className="text-lg font-black text-text-main">{currentCustomer.activeLines}</p>
                </div>
              </div>
            </div>
            
            <div className="pt-8">
               <div className="flex items-center gap-2 mb-4">
                 <Lightbulb className="text-amber-500" size={16} />
                 <h3 className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em]">Recommendations</h3>
               </div>
               <div className="space-y-3">
                 {offerings.slice(0, 2).map((o) => (
                   <div 
                    key={o.id} 
                    onClick={() => setActiveTab('offerings')}
                    className="p-4 rounded-2xl border border-border-main bg-white hover:border-primary/40 transition-all cursor-pointer group"
                   >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black text-primary uppercase">{o.id}</span>
                        <ArrowUpRight size={14} className="text-text-muted group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-[13px] font-black text-text-main leading-tight mb-1">{o.title}</p>
                      <p className="text-[11px] text-text-muted font-bold leading-relaxed">{o.benefit}</p>
                   </div>
                 ))}
               </div>
            </div>
            </section>
          )}
        </main>
      </div>

      <AnimatePresence>
        {isContractModalOpen && (
          <ContractModal 
            isOpen={isContractModalOpen} 
            onClose={() => setIsContractModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <CustomerProvider>
      {isAuthenticated ? (
        <Dashboard onLogout={() => setIsAuthenticated(false)} />
      ) : (
        <Login onLogin={() => setIsAuthenticated(true)} />
      )}
    </CustomerProvider>
  );
}
