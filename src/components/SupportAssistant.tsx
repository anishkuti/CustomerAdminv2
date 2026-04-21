import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Minimize2,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCustomer } from '../context/CustomerContext';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function SupportAssistant() {
  const { currentCustomer } = useCustomer();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Hello! I'm your TelcoConnect Support Assistant prototype. How can I help you managing ${currentCustomer?.companyName}'s ecosystem today?` }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const getMockResponse = (text: string): string => {
    const query = text.toLowerCase();
    if (query.includes('create sr') || query.includes('new request')) {
      return "I can help you draft a Service Request. Please tell me the subject of your request (e.g., 'Device Replacement' or 'Billing Query').";
    }
    if (query.includes('billing')) {
      return "I see you have some recent bills. Would you like to raise a query regarding the latest invoice for TechSolutions Global Ltd.?";
    }
    if (query.includes('network') || query.includes('status')) {
      return "Current network status for your primary fiber links in London and Manchester is 'Optimal'. No major outages reported.";
    }
    if (query.includes('order') || query.includes('track')) {
      return "I can see your recent Mobile activation order (ORD-001) is currently 'Shipped'. Expect delivery by end of day tomorrow.";
    }
    return "I'm a prototype assistant. I can help you with Service Requests, Billing, and Order status inquiries. What would you like to explore?";
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate thinking delay for prototype
    setTimeout(() => {
      setIsLoading(false);
      const response = getMockResponse(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-[100] transition-all",
          isOpen ? "scale-0 opacity-0 pointer-events-none" : "bg-primary text-white scale-100 opacity-100"
        )}
      >
        <MessageSquare size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? '60px' : '550px'
            }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className={cn(
              "fixed bottom-6 right-6 w-[400px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-200 z-[100] overflow-hidden flex flex-col transition-all duration-300",
              isMinimized ? "w-[240px]" : "w-[400px]"
            )}
          >
            {/* Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between cursor-pointer" onClick={() => isMinimized && setIsMinimized(false)}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                  <Bot size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-[14px] font-black tracking-tight uppercase leading-none mb-1">Support Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Prototype Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMinimized(!isMinimized);
                  }}
                  className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-slate-400 hover:text-white"
                >
                  {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-slate-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            {!isMinimized && (
              <>
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 thin-scrollbar"
                >
                  {messages.map((m, i) => (
                    <div 
                      key={i}
                      className={cn(
                        "flex items-start gap-2",
                        m.role === 'user' ? "flex-row-reverse" : "flex-row"
                      )}
                    >
                      <div className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                        m.role === 'user' ? "bg-slate-200" : "bg-primary/10 border border-primary/20"
                      )}>
                        {m.role === 'user' ? <User size={14} className="text-slate-600" /> : <Bot size={14} className="text-primary" />}
                      </div>
                      <div className={cn(
                        "px-3 py-2 rounded-2xl text-[13px] leading-relaxed max-w-[80%]",
                        m.role === 'user' 
                          ? "bg-primary text-white rounded-tr-none shadow-lg shadow-primary/10" 
                          : "bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm"
                      )}>
                        {m.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-start gap-2">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <Bot size={14} className="text-primary" />
                      </div>
                      <div className="bg-white border border-slate-200 px-3 py-2 rounded-2xl rounded-tl-none flex items-center gap-2">
                        <Loader2 size={14} className="animate-spin text-primary" />
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Processing...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Suggested Actions */}
                <div className="px-4 py-2 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar">
                  {[
                    "Create SR",
                    "Billing Issue",
                    "Network Status",
                    "Order Help"
                  ].map((action) => (
                    <button
                      key={action}
                      onClick={() => setInput(action)}
                      className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-primary/30 hover:text-primary transition-all whitespace-nowrap"
                    >
                      {action}
                    </button>
                  ))}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-200">
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSend();
                    }}
                    className="flex items-center gap-2"
                  >
                    <input 
                      type="text" 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask the assistant..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-[13px] outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                    />
                    <button 
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                        !input.trim() || isLoading 
                          ? "bg-slate-100 text-slate-400" 
                          : "bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
                      )}
                    >
                      <Send size={18} />
                    </button>
                  </form>
                  <p className="text-[9px] text-slate-400 mt-2 text-center uppercase tracking-widest font-bold">
                    Static Mock Interface • B2B Prototype
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
