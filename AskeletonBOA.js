import React, { useState, useEffect } from 'react';
import { 
  Home, 
  PieChart, 
  Shield, 
  TrendingUp, 
  Eye, 
  EyeOff, 
  Send, 
  QrCode, 
  Phone, 
  FileText, 
  Lock, 
  Unlock, 
  Sliders, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Globe, 
  Zap, 
  CreditCard, 
  AlertCircle,
  X,
  ChevronRight,
  CheckCircle2,
  DollarSign,
  User,
  HelpCircle,
  LogOut
} from 'lucide-react';

export default function CbePremiumApp() {
  // --- LOCALIZATION DICTIONARY ENGINE ---
  const dict = {
    en: {
      hello: "Welcome Back,",
      totalBalance: "Total Aggregate Wealth",
      checking: "CBE Main Checking",
      wallet: "CBE Birr Mobile Wallet",
      savings: "Fixed-Time Deposit (Equb Account)",
      send: "Send Birr",
      scan: "Scan to Pay",
      airtime: "Airtime Top-Up",
      utilities: "Utility Bills",
      ledger: "Live Transaction Ledger",
      analytics: "Wealth Allocation & Metrics",
      security: "Card Security Controls",
      crypto: "Digital Pockets & Forex Hub",
      freeze: "Freeze Card Account",
      blockAtm: "Block ATM Withdrawals",
      revealPin: "Reveal Card Details",
      dailyLimit: "Daily Remittance Cap",
      frozenStatus: "ACCOUNT FROZEN",
      insufficient: "Insufficient Funds in Target Account Node",
      successTx: "Remittance Executed Securely",
      amount: "Value (ETB)",
      recipient: "Destination Target Reference",
      source: "Source Account Pocket",
      submit: "Authorize Financial Settlement",
      pwaBanner: "Install CBE Premium Application Shell for Standalone Access",
      dismiss: "Dismiss",
      install: "Install Native Package",
      profile: "Premium Customer Identifier",
      help: "Priority Corporate Support",
      changePass: "Modify Core Access Credentials"
    },
    am: {
      hello: "እንኳን ደህና መጡ፣",
      totalBalance: "አጠቃላይ የገንዘብ መጠን",
      checking: "መደበኛ የሂሳብ ቁጥር",
      wallet: "ሲቢኢ ብር የሞባይል ቦርሳ",
      savings: "የጊዜ ገደብ ቁጠባ (ዕቁብ)",
      send: "ብር ላክ",
      scan: "በኪውአር ክፈል",
      airtime: "አየር ሰዓት ሙላ",
      utilities: "የአገልግሎት ክፍያ",
      ledger: "የግብይት ታሪክ ማህደር",
      analytics: "የፋይናንስ ትንተና መረጃ",
      security: "የካርድ ደህንነት ቁጥጥር",
      crypto: "የዲጂታል መዋዕለ ንዋይ ገበያ",
      freeze: "ካርዱን አግድ (Freeze)",
      blockAtm: "ኤቲኤም አጠቃቀም አግድ",
      revealPin: "የካርድ ሚስጥር ቁጥር አሳይ",
      dailyLimit: "የቀን የገንዘብ ማስተላለፊያ ጣሪያ",
      frozenStatus: "ካርዱ ታግዷል",
      insufficient: "ሂሳብዎ ላይ በቂ ገንዘብ የለም",
      successTx: "ግብይቱ በተሳካ ሁኔታ ተጠናቋል",
      amount: "የገንዘብ መጠን (ETB)",
      recipient: "የተቀባይ መለያ ቁጥር",
      source: "መነሻ የሂሳብ ኪስ",
      submit: "ክፍያውን አረጋግጥ",
      pwaBanner: "የሲቢኢ ፕሪሚየም መተግበሪያን በስልክዎ ላይ ይጫኑ",
      dismiss: "አቋርጥ",
      install: "መተግበሪያውን ጫን",
      profile: "የፕሪሚየም ደንበኛ መለያ",
      help: "የጥንቃቄ ድጋፍ ማዕከል",
      changePass: "የመግቢያ የይለፍ ቃል ቀይር"
    }
  };

  // --- CORE UTILITY STATES ---
  const [lang, setLang] = useState('en');
  const [currentTab, setCurrentTab] = useState('home');
  const [showPwaBanner, setShowPwaBanner] = useState(true);
  const [showBalances, setShowBalances] = useState(true);
  
  // --- BALANCES ACCOUNT STATE MACHINE ---
  const [balances, setBalances] = useState({
    checking: 35000.00,
    wallet: 15000.00,
    savings: 50000.00,
    cryptoPocket: 15000.00
  });

  // --- INTERACTIVE SYSTEM OVERLAYS ---
  const [modalType, setModalType] = useState(null); // 'send' | 'airtime' | null
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  
  // --- TRANSACTION FORM BUFFER STATE ---
  const [txAmount, setTxAmount] = useState('');
  const [txTarget, setTxTarget] = useState('');
  const [txSource, setTxSource] = useState('checking');

  // --- SECURITY PRESET CONFIGURATIONS ---
  const [cardFrozen, setCardFrozen] = useState(false);
  const [atmBlocked, setAtmBlocked] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [dailyLimit, setDailyLimit] = useState(50000);

  // --- FOREX CALCULATION ENGINE STATE ---
  const [calcBirr, setCalcBirr] = useState('1000');
  const [cryptoPrices, setCryptoPrices] = useState({
    btc: 8420500.00,
    eth: 435200.00,
    sol: 18450.00
  });
  const [flashPrice, setFlashPrice] = useState(false);

  // --- INITIAL TRANSACTION RECORD ENTRIES ---
  const [ledger, setLedger] = useState([
    { id: 'TXN-99821', title: 'Transfer to Awash Bank', subtitle: 'Inter-Bank Settlement', amount: -2400.00, type: 'expense', date: 'Today, 10:14 AM', icon: 'bank' },
    { id: 'TXN-99740', title: 'telebirr Wallet Bridge', subtitle: 'Mobile Float Cashout', amount: -1500.00, type: 'expense', date: 'Today, 08:32 AM', icon: 'phone' },
    { id: 'TXN-99611', title: 'Sheger Cafe — Bole', subtitle: 'Point of Sale Purchase', amount: -450.00, type: 'expense', date: 'Yesterday', icon: 'food' },
    { id: 'TXN-99502', title: 'Inbound Remittance', subtitle: 'Salary Node Processing', amount: 45000.00, type: 'income', date: 'May 28, 2026', icon: 'deposit' },
    { id: 'TXN-99481', title: 'Ethio Telecom Postpaid', subtitle: 'Corporate Data Package', amount: -1200.00, type: 'expense', date: 'May 26, 2026', icon: 'zap' }
  ]);

  // --- MOCK CRYPTO TICKER INTERVAL ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoPrices(prev => ({
        btc: prev.btc + (Math.random() - 0.5) * 4500,
        eth: prev.eth + (Math.random() - 0.5) * 400,
        sol: prev.sol + (Math.random() - 0.5) * 25
      }));
      setFlashPrice(true);
      setTimeout(() => setFlashPrice(false), 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // --- TOAST DISPATCH ENGINE ---
  const triggerToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  // --- CORE BUSINESS TRANSACTION COMPILER ---
  const executeTransaction = (e) => {
    e.preventDefault();
    const parsedAmt = parseFloat(txAmount);

    if (isNaN(parsedAmt) || parsedAmt <= 0 || !txTarget.trim()) {
      triggerToast("Input validation failed: Enter appropriate structural constraints.", "error");
      return;
    }

    // Checking Limit Restraints
    if (parsedAmt > balances[txSource]) {
      triggerToast(dict[lang].insufficient, "error");
      return;
    }

    if (parsedAmt > dailyLimit) {
      triggerToast("Transaction aborted: Remittance vector exceeds daily user constraints.", "error");
      return;
    }

    // Deducting Balances dynamically
    setBalances(prev => ({
      ...prev,
      [txSource]: prev[txSource] - parsedAmt
    }));

    // Generating Dynamic Entry
    const newRecord = {
      id: `TXN-${Math.floor(Math.random() * 90000 + 10000)}`,
      title: modalType === 'send' ? `Sent to ${txTarget}` : `Airtime for ${txTarget}`,
      subtitle: modalType === 'send' ? 'Real-Time Gross Settlement' : 'Instant Network Top-Up',
      amount: -parsedAmt,
      type: 'expense',
      date: 'Just Now',
      icon: modalType === 'send' ? 'bank' : 'zap'
    };

    setLedger(prev => [newRecord, ...prev]);
    triggerToast(dict[lang].successTx, "success");
    
    // Clear Input Buffer
    setTxAmount('');
    setTxTarget('');
    setModalType(null);
  };

  const aggregateWealth = balances.checking + balances.wallet + balances.savings;

  return (
    <div className="w-full bg-zinc-950 min-h-screen text-slate-100 font-sans flex flex-col items-center justify-center p-0 sm:p-6 antialiased selection:bg-amber-400 selection:text-black">
      
      {/* Dynamic Toast Alert Header Area */}
      {toast.show && (
        <div className={`fixed top-4 z-[100] max-w-sm w-11/12 flex items-start gap-3 p-4 rounded-xl border animate-bounce shadow-2xl transition-all duration-300 ${
          toast.type === 'error' 
            ? 'bg-zinc-900 border-red-500/50 text-red-400' 
            : 'bg-zinc-900 border-amber-500/50 text-amber-400'
        }`}>
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-xs font-semibold leading-relaxed tracking-wide">{toast.message}</div>
        </div>
      )}

      {/* ================= SMARTPHONE APPLICATION CASING EDGE FRAME ================= */}
      <div className="w-full max-w-md bg-black rounded-none sm:rounded-[48px] border-none sm:border-[10px] border-zinc-900 shadow-2xl overflow-hidden flex flex-col h-screen sm:h-[860px] relative">
        
        {/* TOP STATUS BAR CONTAINER */}
        <div className="w-full px-6 pt-3 pb-1 flex justify-between items-center text-[11px] font-mono tracking-wider text-zinc-400 bg-zinc-950 border-b border-zinc-900/50 z-30 select-none">
          <span class="font-bold">22:26 EAT</span>
          <div className="w-1/3 h-4 bg-zinc-900 rounded-full border border-zinc-800/60 hidden sm:block mx-auto relative overflow-hidden">
            <div className="w-3 h-3 bg-zinc-950 rounded-full mx-auto mt-0.5"></div>
          </div>
          <div className="flex items-center gap-2">
            <span>5G LTE</span>
            <div className="w-6 h-3 border border-zinc-600 rounded-xs p-0.5 flex items-center bg-zinc-950">
              <div className="w-full h-full bg-amber-400 rounded-3xs"></div>
            </div>
          </div>
        </div>

        {/* CORE APP NAV CONTROL BANNER */}
        <header class="w-full px-5 py-4 bg-zinc-950 border-b border-zinc-900 flex justify-between items-center z-20">
          <div class="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-600 flex items-center justify-center text-black font-black text-xs shadow-md tracking-tighter">
              CBE
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 font-medium leading-none tracking-tight">{dict[lang].hello}</p>
              <h2 className="text-xs font-bold text-zinc-100 tracking-wide mt-1">The all mighty King of Kings</h2>
            </div>
          </div>

          {/* Interactive Global Language Swapper Block */}
          <button 
            onClick={() => setLang(prev => prev === 'en' ? 'am' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800/60 hover:border-amber-400/40 text-xs text-zinc-300 font-medium tracking-wide active:scale-95 transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-[11px] uppercase font-bold">{lang === 'en' ? 'Amharic' : 'English'}</span>
          </button>
        </header>

        {/* APPLICATION BODY HUB (SCROLLABLE STAGE) */}
        <div className="flex-1 overflow-y-auto bg-black pb-24 relative">
          
          {/* PWA OVERLAY SYSTEM CALL */}
          {showPwaBanner && (
            <div className="m-4 p-3.5 bg-gradient-to-r from-zinc-900 to-zinc-950 border gold-border rounded-xl flex items-start justify-between gap-3 animate-fade-in shadow-xl">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-amber-400 tracking-tight">{dict[lang].pwaBanner}</h4>
                <p className="text-[10px] text-zinc-400 leading-relaxed">Execute native installation from browser layout without store commissions.</p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button onClick={() => setShowPwaBanner(false)} className="text-zinc-500 hover:text-white self-end transition-colors"><X className="w-4 h-4" /></button>
                <button onClick={() => { alert("PWA Framework Deployment Vector Linked Successfully."); setShowPwaBanner(false); }} className="bg-amber-400 text-black text-[9px] font-black px-2.5 py-1.5 rounded-md hover:bg-yellow-500 uppercase tracking-wider transition-colors">{dict[lang].install}</button>
              </div>
            </div>
          )}

          {/* ================= CONFIG VIEW CONDITIONAL RENDER: A. HOME ================= */}
          {currentTab === 'home' && (
            <div className="p-4 space-y-5 animate-fadeIn">
              
              {/* GOLD PREMIUM ACCOUNT HERO CARD CARD COMPONENT */}
              <div className="w-full bg-gradient-to-br from-zinc-900 via-zinc-900 to-stone-900 border border-amber-400/20 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-400/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-700"></div>
                
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">{dict[lang].totalBalance}</span>
                  <button onClick={() => setShowBalances(prev => !prev)} className="text-amber-400 hover:text-yellow-300 transition-colors">
                    {showBalances ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>

                <div className="space-y-1">
                  <h3 className="text-3xl font-mono font-bold tracking-tight text-white transition-all">
                    {showBalances ? `${aggregateWealth.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : "••••••••••" } <span className="text-sm font-sans font-bold text-amber-400 ml-1">ETB</span>
                  </h3>
                </div>

                {/* Sub-Account Tier Breakdowns */}
                <div className="mt-6 pt-4 border-t border-zinc-800/80 grid grid-cols-1 gap-2 text-[11px] text-zinc-400">
                  <div class="flex justify-between font-mono">
                    <span className="text-zinc-500">{dict[lang].checking}:</span>
                    <span className="text-slate-200 font-bold">{showBalances ? `${balances.checking.toLocaleString()} Br` : "•••"}</span>
                  </div>
                  <div class="flex justify-between font-mono">
                    <span className="text-zinc-500">{dict[lang].wallet}:</span>
                    <span className="text-slate-200 font-bold">{showBalances ? `${balances.wallet.toLocaleString()} Br` : "•••"}</span>
                  </div>
                  <div class="flex justify-between font-mono">
                    <span className="text-zinc-500">{dict[lang].savings}:</span>
                    <span className="text-amber-400 font-bold">{showBalances ? `${balances.savings.toLocaleString()} Br` : "•••"}</span>
                  </div>
                </div>
              </div>

              {/* SERVICE ACTION ICON INTERACTIVE SET */}
              <div className="grid grid-cols-4 gap-2.5">
                <button onClick={() => setModalType('send')} className="bg-zinc-900/80 border border-zinc-900 hover:border-amber-400/30 p-3 rounded-xl flex flex-col items-center gap-2 group transition-all duration-200 active:scale-95">
                  <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-black transition-all"><Send className="w-4 h-4" /></div>
                  <span className="text-[10px] text-zinc-300 font-medium text-center leading-tight tracking-tight">{dict[lang].send}</span>
                </button>
                <button onClick={() => alert("QR Permission Requested via Mobile Core Engine Interface API.")} className="bg-zinc-900/80 border border-zinc-900 hover:border-amber-400/30 p-3 rounded-xl flex flex-col items-center gap-2 group transition-all duration-200 active:scale-95">
                  <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-black transition-all"><QrCode className="w-4 h-4" /></div>
                  <span className="text-[10px] text-zinc-300 font-medium text-center leading-tight tracking-tight">{dict[lang].scan}</span>
                </button>
                <button onClick={() => setModalType('airtime')} className="bg-zinc-900/80 border border-zinc-900 hover:border-amber-400/30 p-3 rounded-xl flex flex-col items-center gap-2 group transition-all duration-200 active:scale-95">
                  <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-black transition-all"><Phone className="w-4 h-4" /></div>
                  <span className="text-[10px] text-zinc-300 font-medium text-center leading-tight tracking-tight">{dict[lang].airtime}</span>
                </button>
                <button onClick={() => alert("EEU Electric Post / Water Utility Interfaces active on core deployment stage.")} className="bg-zinc-900/80 border border-zinc-900 hover:border-amber-400/30 p-3 rounded-xl flex flex-col items-center gap-2 group transition-all duration-200 active:scale-95">
                  <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-black transition-all"><FileText className="w-4 h-4" /></div>
                  <span className="text-[10px] text-zinc-300 font-medium text-center leading-tight tracking-tight">{dict[lang].utilities}</span>
                </button>
              </div>

              {/* TRANSACTION HISTORICAL LEDGER PANEL */}
              <div className="space-y-3">
                <div class="flex justify-between items-center px-1">
                  <h4 className="text-xs font-bold tracking-wider text-zinc-400 uppercase">{dict[lang].ledger}</h4>
                  <span class="text-[10px] text-amber-400 font-mono font-bold tracking-tight">Active Node ⚡</span>
                </div>

                <div className="space-y-2">
                  {ledger.map((tx) => (
                    <div key={tx.id} className="p-3.5 bg-zinc-900/50 border border-zinc-900/80 rounded-xl flex justify-between items-center shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                          tx.amount > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-400/10 text-amber-400'
                        }`}>
                          {tx.amount > 0 ? <ArrowDownLeft className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-zinc-200 tracking-wide">{tx.title}</p>
                          <p className="text-[9px] text-zinc-500 font-medium mt-0.5">{tx.subtitle} • {tx.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-mono font-bold tracking-tight ${
                          tx.amount > 0 ? 'text-emerald-400' : 'text-zinc-200'
                        }`}>
                          {tx.amount > 0 ? `+${tx.amount.toLocaleString()}` : `${tx.amount.toLocaleString()}`} Br
                        </span>
                        <p className="text-[8px] font-mono text-zinc-600 tracking-tighter mt-0.5">{tx.id}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================= CONFIG VIEW CONDITIONAL RENDER: B. WEALTH & EQUB ================= */}
          {currentTab === 'wealth' && (
            <div className="p-4 space-y-5 animate-fadeIn">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 px-1">{dict[lang].analytics}</h3>
              
              {/* CUSTOM SVG FINTECH TRACKING DONUT MATRIX DIAGRAM */}
              <div className="bg-zinc-900/50 border border-zinc-900 p-6 rounded-2xl flex flex-col items-center text-center">
                <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-zinc-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Category 1: Fixed Savings (50%) */}
                  <path className="text-amber-500" strokeDasharray="50, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Category 2: Checking Account (35%) */}
                  <path className="text-yellow-600" strokeDasharray="35, 100" strokeDashoffset="-50" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Category 3: Mobile Wallet (15%) */}
                  <path className="text-zinc-400" strokeDasharray="15, 100" strokeDashoffset="-85" strokeWidth="2.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>

                <div className="grid grid-cols-3 gap-4 mt-6 w-full text-[10px] font-mono">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span><span className="text-zinc-400">Savings</span></div>
                    <span className="text-white font-bold mt-1">50%</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-600"></span><span className="text-zinc-400">Checking</span></div>
                    <span className="text-white font-bold mt-1">35%</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-zinc-400"></span><span className="text-zinc-400">Wallet</span></div>
                    <span className="text-white font-bold mt-1">15%</span>
                  </div>
                </div>
              </div>

              {/* BUDGET LIMITATION TRACKERS COMPONENT AREA */}
              <div className="space-y-3 bg-zinc-900/30 p-4 border border-zinc-900 rounded-xl">
                <h4 className="text-[11px] uppercase tracking-wider font-bold text-zinc-500 mb-2">Monthly Budget Allotment Tracks</h4>
                
                <div className="space-y-3">
                  <div>
                    <div class="flex justify-between text-xs mb-1 font-mono">
                      <span class="text-zinc-300 font-sans">Ethio Telecom Allowance</span>
                      <span class="text-zinc-400">1,200 / 3,000 Br</span>
                    </div>
                    <div class="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div class="h-full bg-amber-400 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div class="flex justify-between text-xs mb-1 font-mono">
                      <span class="text-zinc-300 font-sans">Peer Remittances Limit</span>
                      <span class="text-zinc-400">14,200 / 50,000 Br</span>
                    </div>
                    <div class="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div class="h-full bg-yellow-600 rounded-full" style={{ width: '28.4%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SAVINGS EQUB MATRICES LINK */}
              <div class="bg-gradient-to-r from-zinc-900 to-black p-4 border gold-border rounded-xl flex items-center justify-between">
                <div>
                  <div class="text-xs font-bold text-amber-400">Next Active Cycle Draw: June 05</div>
                  <p class="text-[10px] text-zinc-500 mt-0.5 font-mono">Premium Elite Equb Vault • Loop 04</p>
                </div>
                <span class="bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">In Sync</span>
              </div>
            </div>
          )}

          {/* ================= CONFIG VIEW CONDITIONAL RENDER: C. SECURITY & CARDS ================= */}
          {currentTab === 'security' && (
            <div className="p-4 space-y-5 animate-fadeIn">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 px-1">{dict[lang].security}</h3>
              
              {/* DEEP MATTE BLACK BLACK AND GOLD VISA DEBIT COMPONENT */}
              <div className="w-full h-52 rounded-2xl bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border border-zinc-800 p-5 flex flex-col justify-between relative overflow-hidden shadow-2xl select-none group">
                <div className="absolute inset-0 bg-radial-at-t from-amber-400/5 via-transparent to-transparent"></div>
                
                {/* Visual Frosted Overlayer State Trigger */}
                {cardFrozen && (
                  <div className="absolute inset-0 bg-zinc-950/85 backdrop-blur-md z-30 flex flex-col items-center justify-center transition-all duration-300">
                    <Lock className="w-8 h-8 text-red-500 animate-pulse mb-1" />
                    <span className="text-xs font-black tracking-widest text-red-500 uppercase">{dict[lang].frozenStatus}</span>
                  </div>
                )}

                <div class="flex justify-between items-start z-10">
                  <div>
                    <h4 className="text-[10px] font-bold tracking-widest text-amber-400 uppercase">CBE PLATINUM EXCLUSIVE</h4>
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">DEBIT CHIP NETWORK</span>
                  </div>
                  <div className="text-right text-xs font-serif italic text-zinc-400 font-bold">VISA</div>
                </div>

                <div class="my-auto pt-4 z-10">
                  <p className="text-lg font-mono tracking-widest text-zinc-100">
                    4921  8820  {showPin ? "9112  0482" : "••••  ••••"}
                  </p>
                  <div class="flex gap-4 mt-2 text-[9px] font-mono text-zinc-500">
                    <div>EXP: <span class="text-zinc-300">09/31</span></div>
                    <div>CVV: <span class="text-zinc-300">{showPin ? "882" : "•••"}</span></div>
                    <div>PIN: <span class="text-amber-400">{showPin ? "4910" : "••••"}</span></div>
                  </div>
                </div>

                <div class="flex justify-between items-center z-10">
                  <span className="text-[10px] font-mono font-bold tracking-wide uppercase text-zinc-400">THE ALL MIGHTY KING OF KINGS</span>
                  <div className="w-8 h-6 rounded bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-[10px]">⚜️</div>
                </div>
              </div>

              {/* CORE INTERACTIVE TOGGLE SWATCH GRID */}
              <div className="space-y-2">
                <div className="p-4 bg-zinc-900/60 border border-zinc-900 rounded-xl flex justify-between items-center">
                  <div className="space-y-0.5">
                    <label className="text-xs font-bold text-zinc-200 block">{dict[lang].freeze}</label>
                    <span className="text-[10px] text-zinc-500">Locks physical assets network validation paths</span>
                  </div>
                  <button 
                    onClick={() => { setCardFrozen(!cardFrozen); if(!cardFrozen) setShowPin(false); }}
                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${cardFrozen ? 'bg-red-500' : 'bg-zinc-800'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 transform ${cardFrozen ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                </div>

                <div className="p-4 bg-zinc-900/60 border border-zinc-900 rounded-xl flex justify-between items-center">
                  <div className="space-y-0.5">
                    <label className="text-xs font-bold text-zinc-200 block">{dict[lang].blockAtm}</label>
                    <span className="text-[10px] text-zinc-500">Refuses physical terminal authorization protocols</span>
                  </div>
                  <button 
                    disabled={cardFrozen}
                    onClick={() => setAtmBlocked(!atmBlocked)}
                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none opacity-50 disabled:cursor-not-allowed ${atmBlocked ? 'bg-amber-400' : 'bg-zinc-800'}`}
                    style={{ opacity: cardFrozen ? 0.3 : 1 }}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 transform ${atmBlocked ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                </div>

                <div className="p-4 bg-zinc-900/60 border border-zinc-900 rounded-xl flex justify-between items-center">
                  <div className="space-y-0.5">
                    <label className="text-xs font-bold text-zinc-200 block">{dict[lang].revealPin}</label>
                    <span className="text-[10px] text-zinc-500">Decrypts identifiers for online merchant use</span>
                  </div>
                  <button 
                    disabled={cardFrozen}
                    onClick={() => setShowPin(!showPin)}
                    className={`p-2 rounded-lg border text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all ${
                      showPin ? 'bg-amber-400 text-black border-amber-400' : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                    }`}
                    style={{ opacity: cardFrozen ? 0.3 : 1 }}
                  >
                    {showPin ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                    <span>{showPin ? "Hide" : "Reveal"}</span>
                  </button>
                </div>
              </div>

              {/* CUSTOM SLIDER LIMIT INTERACTIVE COMPONENT */}
              <div className="p-4 bg-zinc-900/30 border border-zinc-900 rounded-xl space-y-3">
                <div class="flex justify-between items-center text-xs">
                  <span class="font-bold text-zinc-400 uppercase tracking-wide">{dict[lang].dailyLimit}</span>
                  <span class="font-mono font-bold text-amber-400 text-sm">{dailyLimit.toLocaleString()} Br</span>
                </div>
                <input 
                  type="range" 
                  min="5000" 
                  max="200000" 
                  step="5000"
                  value={dailyLimit}
                  onChange={(e) => setDailyLimit(parseInt(e.target.value))}
                  className="w-full accent-amber-400 bg-zinc-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <p class="text-[9px] text-zinc-600 font-mono text-right">Maximum ceiling allowance: 200,000.00 ETB</p>
              </div>

            </div>
          )}

          {/* ================= CONFIG VIEW CONDITIONAL RENDER: D. CRYPTO & INVESTMENT HUB ================= */}
          {currentTab === 'crypto' && (
            <div className="p-4 space-y-5 animate-fadeIn">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 px-1">{dict[lang].crypto}</h3>
              
              {/* ASSET VALUATION BRIEF INSIGHT */}
              <div className="p-4 bg-gradient-to-r from-zinc-900 via-zinc-900 to-black border gold-border rounded-xl">
                <span className="text-[10px] uppercase font-bold text-zinc-500 font-mono block">Parallel Digital Holdings Portfolio</span>
                <div className="text-xl font-bold font-mono text-white mt-1">15,000.00 <span class="text-xs text-amber-400 font-sans font-bold">ETB POCKET</span></div>
              </div>

              {/* LIVE DIGITAL EXCHANGES PRICE RATE MATRIX CARD */}
              <div className="space-y-2">
                <div className="p-3 bg-zinc-900/60 border border-zinc-900 rounded-xl flex justify-between items-center transition-all duration-300">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold text-xs">₿</div>
                    <div>
                      <span className="text-xs font-bold block text-zinc-200">Bitcoin</span>
                      <span className="text-[9px] text-zinc-500 font-mono">BTC / ETB Rate Vector</span>
                    </div>
                  </div>
                  <div className={`text-right font-mono text-xs font-bold tracking-tight transition-all duration-300 ${flashPrice ? 'text-amber-400 scale-105' : 'text-zinc-100'}`}>
                    {cryptoPrices.btc.toLocaleString(undefined, { maximumFractionDigits: 2 })} Br
                  </div>
                </div>

                <div className="p-3 bg-zinc-900/60 border border-zinc-900 rounded-xl flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-xs">Ξ</div>
                    <div>
                      <span className="text-xs font-bold block text-zinc-200">Ethereum</span>
                      <span className="text-[9px] text-zinc-500 font-mono">ETH / ETB Rate Vector</span>
                    </div>
                  </div>
                  <div className={`text-right font-mono text-xs font-bold tracking-tight transition-all duration-300 ${flashPrice ? 'text-amber-400 scale-105' : 'text-zinc-100'}`}>
                    {cryptoPrices.eth.toLocaleString(undefined, { maximumFractionDigits: 2 })} Br
                  </div>
                </div>

                <div className="p-3 bg-zinc-900/60 border border-zinc-900 rounded-xl flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-xs">◎</div>
                    <div>
                      <span className="text-xs font-bold block text-zinc-200">Solana</span>
                      <span className="text-[9px] text-zinc-500 font-mono">SOL / ETB Rate Vector</span>
                    </div>
                  </div>
                  <div className={`text-right font-mono text-xs font-bold tracking-tight transition-all duration-300 ${flashPrice ? 'text-amber-400 scale-105' : 'text-zinc-100'}`}>
                    {cryptoPrices.sol.toLocaleString(undefined, { maximumFractionDigits: 2 })} Br
                  </div>
                </div>
              </div>

              {/* CORE CALCULATOR EXCHANGE CALCULATOR */}
              <div className="p-4 bg-zinc-900/30 border border-zinc-900 rounded-xl space-y-3">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Instant Converter Grid Valuation (1 USD = 125 Br)</h4>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 bg-black p-2 border border-zinc-800 rounded-lg">
                    <span className="text-xs text-zinc-400 font-bold px-1">ETB</span>
                    <input 
                      type="number" 
                      value={calcBirr}
                      onChange={(e) => setCalcBirr(e.target.value)}
                      className="bg-transparent text-xs text-white font-mono flex-1 focus:outline-none"
                      placeholder="Value amount"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                    <div class="bg-zinc-900 p-2.5 rounded-lg border border-zinc-850">
                      <span class="text-zinc-500 block text-[9px] uppercase">USD Equiv.</span>
                      <span class="text-zinc-200 font-bold mt-0.5 block">
                        {(!isNaN(parseFloat(calcBirr)) ? (parseFloat(calcBirr) / 125).toFixed(2) : '0.00')} $
                      </span>
                    </div>
                    <div class="bg-zinc-900 p-2.5 rounded-lg border border-zinc-850">
                      <span class="text-zinc-500 block text-[9px] uppercase">Satoshi Equiv.</span>
                      <span class="text-amber-400 font-bold mt-0.5 block">
                        {(!isNaN(parseFloat(calcBirr)) ? Math.floor((parseFloat(calcBirr) / cryptoPrices.btc) * 100000000) : 0)} Sats
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SETTINGS SECTION (INLINE EXPANSION TO PREVENT OVER-COMPLEX STRUCTURES) */}
              <div className="bg-zinc-900/40 border border-zinc-900 p-4 rounded-xl space-y-3.5">
                <h4 className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold">{dict[lang].profile}</h4>
                <div className="flex items-center gap-3 bg-black/40 p-3 rounded-lg border border-zinc-850">
                  <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-black font-black text-xs">👑</div>
                  <div>
                    <span className="text-xs font-bold block text-white">The all mighty King of Kings</span>
                    <span className="text-[9px] text-zinc-500 font-mono">Tier-3 Private Banking Client ID: #CBE-VIP-88902</span>
                  </div>
                </div>
                
                <div className="text-xs text-zinc-400 space-y-2.5">
                  <button onClick={() => alert("Credentials server communication requires encrypted administration keys.")} className="w-full flex justify-between items-center p-2 bg-zinc-900/60 rounded-lg hover:border-amber-400/20 border border-transparent transition-all">
                    <span className="flex items-center gap-2"><Lock className="w-3.5 h-3.5 text-amber-400" />{dict[lang].changePass}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
                  </button>
                  <button onClick={() => alert("Direct terminal connection established: Calling Node 8118.")} className="w-full flex justify-between items-center p-2 bg-zinc-900/60 rounded-lg hover:border-amber-400/20 border border-transparent transition-all">
                    <span className="flex items-center gap-2"><HelpCircle className="w-3.5 h-3.5 text-amber-400" />{dict[lang].help}</span>
                    <span className="text-[10px] font-mono font-bold text-amber-400">8118</span>
                  </button>
                  <button onClick={() => { setCurrentTab('home'); alert("Session invalidated safely."); }} className="w-full flex justify-between items-center p-2 bg-red-950/20 border border-red-900/20 rounded-lg text-red-400 font-bold transition-all">
                    <span className="flex items-center gap-2"><LogOut className="w-3.5 h-3.5" />Terminate Session Vault</span>
                    <span>🚪</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* ================= TRANSACTION DIALOG OVERLAYS (MODALS) ================= */}
        {modalType && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-zinc-900 border border-amber-400/30 rounded-2xl w-full p-5 space-y-4 shadow-2xl animate-scale-up">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-2.5">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  {modalType === 'send' ? <Send className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                  {dict[lang][modalType]}
                </h3>
                <button onClick={() => setModalType(null)} className="text-zinc-400 hover:text-white"><X className="w-4 h-4" /></button>
              </div>

              <form onSubmit={executeTransaction} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">{dict[lang].source}</label>
                  <select 
                    value={txSource}
                    onChange={(e) => setTxSource(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
                  >
                    <option value="checking">{dict[lang].checking} ({balances.checking.toLocaleString()} Br)</option>
                    <option value="wallet">{dict[lang].wallet} ({balances.wallet.toLocaleString()} Br)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">{dict[lang].recipient}</label>
                  <input 
                    type="text"
                    required
                    placeholder={modalType === 'send' ? "e.g., Awash Acc / CBE Acc" : "0911... / 0711..."}
                    value={txTarget}
                    onChange={(e) => setTxTarget(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">{dict[lang].amount}</label>
                  <input 
                    type="number"
                    required
                    min="1"
                    step="0.01"
                    placeholder="0.00 Br"
                    value={txAmount}
                    onChange={(e) => setTxAmount(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-xs font-mono text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-black text-xs py-3 rounded-xl hover:from-amber-400 hover:to-yellow-400 tracking-wider uppercase shadow-lg shadow-amber-400/10 active:scale-[0.98] transition-transform">
                  {dict[lang].submit}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ================= STABLE BOTTOM USER NAVIGATION TAB PANEL ================= */}
        <nav className="absolute bottom-0 inset-x-0 bg-zinc-950 border-t border-zinc-900 py-3.5 flex justify-around items-center z-40 px-2">
          <button 
            onClick={() => setCurrentTab('home')} 
            className={`flex flex-col items-center gap-1 focus:outline-none group active:scale-90 transition-all ${
              currentTab === 'home' ? 'text-amber-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-bold tracking-widest uppercase">Home</span>
          </button>

          <button 
            onClick={() => setCurrentTab('wealth')} 
            className={`flex flex-col items-center gap-1 focus:outline-none group active:scale-90 transition-all ${
              currentTab === 'wealth' ? 'text-amber-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <PieChart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-bold tracking-widest uppercase">Wealth</span>
          </button>

          <button 
            onClick={() => setCurrentTab('security')} 
            className={`flex flex-col items-center gap-1 focus:outline-none group active:scale-90 transition-all ${
              currentTab === 'security' ? 'text-amber-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Shield className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-bold tracking-widest uppercase">Security</span>
          </button>

          <button 
            onClick={() => setCurrentTab('crypto')} 
            className={`flex flex-col items-center gap-1 focus:outline-none group active:scale-90 transition-all ${
              currentTab === 'crypto' ? 'text-amber-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <TrendingUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-bold tracking-widest uppercase">Invest</span>
          </button>
        </nav>

      </div>
    </div>
  );
}