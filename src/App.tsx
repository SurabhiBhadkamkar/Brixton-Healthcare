import React, { useState, useMemo } from 'react';
import { 
  Shield, 
  Activity, 
  Lock, 
  Search, 
  Database, 
  User, 
  PlusCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Menu, 
  X, 
  CheckCircle, 
  LockKeyhole, 
  Clock, 
  Sparkles, 
  Stethoscope, 
  LogOut, 
  Globe, 
  ChevronDown, 
  Check, 
  ExternalLink, 
  FileText, 
  Filter, 
  TrendingUp, 
  Send,
  Eye,
  EyeOff,
  AlertTriangle
} from 'lucide-react';

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  features: string[];
  description: string;
  image?: string;
  isCustom?: boolean;
}

interface MedicalTerm {
  id: string;
  term: string;
  category: 'Disorder' | 'Guideline' | 'Procedure' | 'Device';
  code: string;
  description: string;
  treatments: string[];
  advisory: string;
}

interface Doctor {
  name: string;
  role: string;
  credentials: string;
  education: string;
  specialty: string;
  avatarBg: string;
  bio: string;
}

interface Message {
  sender: 'patient' | 'doctor';
  text: string;
  timestamp: string;
}

export default function App() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  // Navigation
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'products' | 'database' | 'portal' | 'about'>('home');

  // Interactive Product Catalog
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'prod-1',
      name: 'Brixton Somnus-Elite Mattress',
      category: 'Beds & Mattresses',
      price: 2499,
      rating: 4.9,
      features: ['Multi-density medical-grade foam', 'Dynamic clinical spine alignment', 'Micro-climate cooling cover'],
      description: 'Engineered for orthopedic pressure relief, our flagship mattress reduces nocturnal tossing and aids recovery.',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'prod-2',
      name: 'Brixton Respi-Flow CPAP System',
      category: 'Sleep Therapy',
      price: 899,
      rating: 4.8,
      features: ['Whisper-quiet blower (<20dB)', 'Integrated climate heated humidifier', 'Advanced central apnea detection'],
      description: 'Hospital-grade positive airway pressure therapy designed to blend into luxury residential bedside tables.',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'prod-3',
      name: 'Brixton Aura Sleep Sensor Pad',
      category: 'Sensors & Tech',
      price: 349,
      rating: 4.7,
      features: ['Contactless piezoelectric strip', 'High-frequency HRV & breathing logs', 'Direct clinician dashboard sync'],
      description: 'Placed invisibly under the mattress, this diagnostic pad tracks sleep cycles and wellness scores.',
      image: 'https://images.unsplash.com/photo-1511268594014-0e9d3ea5c33e?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'prod-4',
      name: 'Brixton Cervical-Align Pillow',
      category: 'Sleep Therapy',
      price: 149,
      rating: 4.6,
      features: ['Ergonomic memory-contouring', 'Hypoallergenic organic cotton', 'Inward shoulder wedge design'],
      description: 'Designed to cradle the cervical spine, maximizing airway openness and cervical muscle decompression.',
      image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80&w=600'
    }
  ]);

  // Product Filter State
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Add Product Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Beds & Mattresses');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdFeatures, setNewProdFeatures] = useState('');
  const [formSuccessMsg, setFormSuccessMsg] = useState('');

  // Searchable Medical Database State
  const [dbSearch, setDbSearch] = useState('');
  const [dbCategory, setDbCategory] = useState<string>('All');
  const [selectedTerm, setSelectedTerm] = useState<MedicalTerm | null>(null);

  const medicalDatabase: MedicalTerm[] = [
    {
      id: 'term-1',
      term: 'Obstructive Sleep Apnea (OSA)',
      category: 'Disorder',
      code: 'ICD-10 G47.33',
      description: 'A clinical sleep disorder featuring repeated cessations of airflow caused by upper airway collapse during sleep.',
      treatments: ['CPAP positive airway pressure', 'Contoured sleep positioning', 'Oral advancement splints'],
      advisory: 'Severe cases increase risks of persistent hypertension, atrial fibrillation, and metabolic syndromes.'
    },
    {
      id: 'term-2',
      term: 'Clinical Spinal Realignment Theory',
      category: 'Guideline',
      code: 'MS-703A Orthotic',
      description: 'Standard protocol for maintaining natural lordotic, thoracic, and lumbar spine alignment during lateral and supine sleeping.',
      treatments: ['Multi-density supportive foam', 'Zone-targeted reactive mattresses', 'Cervical alignment guides'],
      advisory: 'Misaligned posture increases mechanical pressure on intervertebral disks, degrading deep-stage rest cycles.'
    },
    {
      id: 'term-3',
      term: 'Polysomnography (Clinical Sleep Study)',
      category: 'Procedure',
      code: 'CPT-95810 PSG',
      description: 'Multi-parametric physiological test tracking EEG brainwaves, blood saturation, ECG cardiac rhythm, and respiratory effort.',
      treatments: ['Sleep architecture mapping', 'Titration of positive airway devices', 'Neurological assessment'],
      advisory: 'Recommended for patients with chronic daytime somnolence, heavy snoring, or nocturnal motor irregularities.'
    },
    {
      id: 'term-4',
      term: 'Upper Airway Resistance Syndrome (UARS)',
      category: 'Disorder',
      code: 'ICD-10 G47.30',
      description: 'Sleep disruption characterized by resistance to airflow in the upper respiratory tract, triggering transient brain micro-arousals.',
      treatments: ['Bi-level respiratory support', 'Positional therapy aids', 'Anti-inflammatory protocols'],
      advisory: 'Frequently presents in low-BMI patients. Highly underdiagnosed in standard sleep screenings.'
    },
    {
      id: 'term-5',
      term: 'Somnus Piezoelectric Sensor Strip',
      category: 'Device',
      code: 'FDA Class II Device',
      description: 'High-sensitivity clinical sensor utilizing electrical polarity from kinetic motion to record cardiorespiratory rhythms non-invasively.',
      treatments: ['Contactless respiratory rate tracking', 'Heart rate variability logging', 'Sleep staging algorithms'],
      advisory: 'Ensures zero-contact monitoring, minimizing patient alarm triggers and psychological insomnia factors.'
    }
  ];

  // Secure Patient Portal State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [patientId, setPatientId] = useState('PT-2026');
  const [password, setPassword] = useState('brixton-secure');
  const [showPassword, setShowPassword] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [showMfaScreen, setShowMfaScreen] = useState(false);
  const [portalError, setPortalError] = useState('');
  const [loginStep, setLoginStep] = useState<'credentials' | 'mfa' | 'success'>('credentials');
  
  // Chat in Patient Portal
  const [portalMessages, setPortalMessages] = useState<Message[]>([
    { sender: 'doctor', text: 'Hello, welcome to your secure Brixton portal. Your Somnus-Elite telemetry looks exceptional this week with 94% optimal spinal support. How is your sleep comfort?', timestamp: '09:12 AM' }
  ]);
  const [newMessageText, setNewMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactInquiryType, setContactInquiryType] = useState('Clinical Consultation');
  const [hipaaConsent, setHipaaConsent] = useState(false);
  const [contactEncryptedPayload, setContactEncryptedPayload] = useState('');
  const [contactSubmitSuccess, setContactSubmitSuccess] = useState(false);

  // ==========================================
  // HANDLERS & COMPUTATIONS
  // ==========================================

  // Filter products
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter(p => p.category === selectedCategory);
  }, [products, selectedCategory]);

  // Filter medical database
  const filteredTerms = useMemo(() => {
    return medicalDatabase.filter(item => {
      const matchesSearch = item.term.toLowerCase().includes(dbSearch.toLowerCase()) || 
                            item.code.toLowerCase().includes(dbSearch.toLowerCase()) ||
                            item.description.toLowerCase().includes(dbSearch.toLowerCase());
      const matchesCategory = dbCategory === 'All' || item.category === dbCategory;
      return matchesSearch && matchesCategory;
    });
  }, [dbSearch, dbCategory]);

  // Add new product handler
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice || !newProdDesc) {
      setFormSuccessMsg('Please fill in all mandatory fields.');
      return;
    }

    const priceNum = parseFloat(newProdPrice);
    if (isNaN(priceNum)) {
      setFormSuccessMsg('Please enter a valid price.');
      return;
    }

    const newProduct: Product = {
      id: `prod-custom-${Date.now()}`,
      name: newProdName,
      category: newProdCategory,
      price: priceNum,
      rating: 5.0,
      features: newProdFeatures ? newProdFeatures.split(',').map(f => f.trim()) : ['Medical-Grade Orthopedic Design', 'Clinical Durability Checked'],
      description: newProdDesc,
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600', // Default clinical apparatus style
      isCustom: true
    };

    setProducts([newProduct, ...products]);
    setNewProdName('');
    setNewProdPrice('');
    setNewProdDesc('');
    setNewProdFeatures('');
    setFormSuccessMsg('Success! Product registered securely in HIPAA-audited database.');
    
    // Clear success message after 4s
    setTimeout(() => {
      setFormSuccessMsg('');
      setShowAddForm(false);
    }, 3000);
  };

  // Secure Patient Portal Login
  const handlePortalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (patientId === 'PT-2026' && password === 'brixton-secure') {
      setPortalError('');
      setLoginStep('mfa');
      setShowMfaScreen(true);
      // Simulate SMS / Authenticator delivery
      setMfaCode('');
    } else {
      setPortalError('Invalid Credentials. In compliance with HIPAA secure audit policies, unsuccessful attempts are logged securely.');
    }
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mfaCode === '123456' || mfaCode.length === 6) {
      setLoginStep('success');
      setIsLoggedIn(true);
      setShowMfaScreen(false);
    } else {
      setPortalError('Incorrect secure MFA code. Please input any 6 digit code for evaluation.');
    }
  };

  // Patient secure message send
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    const currentMsg = newMessageText;
    const patientMsg: Message = {
      sender: 'patient',
      text: currentMsg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setPortalMessages(prev => [...prev, patientMsg]);
    setNewMessageText('');
    setIsTyping(true);

    // Simulate HIPAA compliant secure Doctor AI/Consultant response
    setTimeout(() => {
      let doctorReply = "Thank you for updating. Your clinical telemetry is logged on our secure end-to-end HIPAA servers. Dr. Thorne has been notified and will review this message during clinical rounds.";
      
      if (currentMsg.toLowerCase().includes('pain') || currentMsg.toLowerCase().includes('back')) {
        doctorReply = "Adjusting the mattress lateral zones to Level 4 (Firm Spinal Alignment Support) may relieve lumbar load. Let us schedule a brief posture telemetry session with Marcus Brixton.";
      } else if (currentMsg.toLowerCase().includes('mask') || currentMsg.toLowerCase().includes('cpap') || currentMsg.toLowerCase().includes('air')) {
        doctorReply = "Your CPAP compliance rate looks excellent at 7.4 hrs/night. If you feel pressure fluctuations, please check the seal integrity on your Respi-Flow device.";
      }

      setPortalMessages(prev => [...prev, {
        sender: 'doctor',
        text: doctorReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 2000);
  };

  // Secure contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      alert("Please fill out all required fields.");
      return;
    }
    if (!hipaaConsent) {
      alert("You must agree to the secure HIPAA messaging disclosure to proceed.");
      return;
    }

    // Generate simulated 256-bit AES encryption payload block
    const samplePayloadString = JSON.stringify({
      patientName: contactName,
      contactEmail: contactEmail,
      inquiry: contactInquiryType,
      messageDigest: contactMessage,
      timestamp: new Date().toISOString(),
      integrityHash: 'sha256-8f3e1a0b3...'
    });
    
    // Encrypt-like base64 output for showing user how HIPAA compliant transport works
    const b64 = btoa(unescape(encodeURIComponent(samplePayloadString))).substring(0, 48);
    setContactEncryptedPayload(`-----BEGIN BRIXTON SECURE PAYLOAD-----\nVersion: AES-GCM-256\nIntegrity-Hash: ${b64}...\n-----END BRIXTON SECURE PAYLOAD-----`);
    setContactSubmitSuccess(true);

    // Reset fields
    setContactName('');
    setContactEmail('');
    setContactMessage('');
    setHipaaConsent(false);
  };

  return (
    <div id="brixton-app" className="min-h-screen bg-[#fbfaf7] text-slate-800 font-sans flex flex-col antialiased selection:bg-[#8e7057] selection:text-white">
      
      {/* ==========================================
          HIPAA & SECURITY SYSTEM COMPLIANCE BAR
          ========================================== */}
      <div id="hipaa-banner" className="bg-[#132b3c] text-[#dfd5c6] text-xs py-2 px-4 flex flex-wrap justify-between items-center border-b border-[#203a4e] gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-mono tracking-wider text-[10px] uppercase font-semibold">HIPAA COMPLIANT SECURE PORTAL ACTIVE</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <span className="hidden sm:inline">Encryption: <strong className="text-white">AES-256 TLS 1.3</strong></span>
          <span>Fast Load: <strong className="text-white">142ms (99.8%)</strong></span>
          <span className="bg-[#8e7057] text-white px-1.5 py-0.5 rounded text-[10px]">Secure Sync: OK</span>
        </div>
      </div>

      {/* ==========================================
          NAVIGATION BAR
          ========================================== */}
      <header id="main-nav" className="sticky top-0 z-50 bg-[#fbfaf7]/90 backdrop-blur-md border-b border-[#dfd5c6] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Elegant Logo matching the image */}
            <div id="logo-branding" className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="relative w-11 h-11 flex items-center justify-center bg-[#fbfaf7] rounded-lg shadow-sm border border-[#dfd5c6]">
                {/* SVG recreating the B monogram beautifully with tan left arch and navy right loops */}
                <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Tan/Brown Left Column */}
                  <path d="M32 22C32 22 32 40 32 50C32 60 32 78 32 78" stroke="#8e7057" strokeWidth="12" strokeLinecap="round" />
                  {/* Blue Right Curves forming B */}
                  <path d="M32 22H55C66.598 22 76 30.0589 76 40C76 49.9411 66.598 48 55 48" stroke="#132b3c" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M32 48H58C69.598 48 79 56.0589 79 66C79 75.9411 69.598 78 58 78H32" stroke="#132b3c" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-wider text-[#132b3c] font-serif uppercase">Brixton</span>
                <span className="text-[10px] tracking-[0.25em] text-[#8e7057] uppercase font-bold leading-none">Healthcare</span>
              </div>
            </div>

            {/* Desktop Navigation Link Items */}
            <nav id="desktop-menu" className="hidden md:flex space-x-8 text-sm font-medium">
              <button 
                id="nav-btn-home"
                onClick={() => { setActiveTab('home'); }} 
                className={`transition-colors py-2 border-b-2 ${activeTab === 'home' ? 'border-[#8e7057] text-[#132b3c] font-semibold' : 'border-transparent text-slate-600 hover:text-[#132b3c]'}`}
              >
                Sleep Care Home
              </button>
              <button 
                id="nav-btn-products"
                onClick={() => { setActiveTab('products'); }} 
                className={`transition-colors py-2 border-b-2 ${activeTab === 'products' ? 'border-[#8e7057] text-[#132b3c] font-semibold' : 'border-transparent text-slate-600 hover:text-[#132b3c]'}`}
              >
                Therapeutic Catalog
              </button>
              <button 
                id="nav-btn-database"
                onClick={() => { setActiveTab('database'); }} 
                className={`transition-colors py-2 border-b-2 ${activeTab === 'database' ? 'border-[#8e7057] text-[#132b3c] font-semibold' : 'border-transparent text-slate-600 hover:text-[#132b3c]'}`}
              >
                Medical DB
              </button>
              <button 
                id="nav-btn-about"
                onClick={() => { setActiveTab('about'); }} 
                className={`transition-colors py-2 border-b-2 ${activeTab === 'about' ? 'border-[#8e7057] text-[#132b3c] font-semibold' : 'border-transparent text-slate-600 hover:text-[#132b3c]'}`}
              >
                Clinician Team
              </button>
            </nav>

            {/* Right Side Buttons - Action Portal */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                id="nav-btn-portal"
                onClick={() => { setActiveTab('portal'); }} 
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all border ${
                  activeTab === 'portal' 
                    ? 'bg-[#132b3c] text-white border-[#132b3c]' 
                    : 'bg-transparent text-[#132b3c] border-[#dfd5c6] hover:bg-[#132b3c] hover:text-white'
                }`}
              >
                <LockKeyhole className="w-3.5 h-3.5" />
                Secure Patient Portal
              </button>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex md:hidden">
              <button 
                id="mobile-menu-trigger"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="text-slate-700 hover:text-[#132b3c] p-2"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Dropdown Panel */}
        {mobileMenuOpen && (
          <div id="mobile-nav-panel" className="md:hidden bg-[#fbfaf7] border-b border-[#dfd5c6] py-4 px-6 space-y-3 absolute top-20 left-0 w-full shadow-lg">
            <button 
              id="mob-btn-home"
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }} 
              className="block w-full text-left py-2 font-medium text-slate-700 hover:text-[#132b3c]"
            >
              Sleep Care Home
            </button>
            <button 
              id="mob-btn-products"
              onClick={() => { setActiveTab('products'); setMobileMenuOpen(false); }} 
              className="block w-full text-left py-2 font-medium text-slate-700 hover:text-[#132b3c]"
            >
              Therapeutic Catalog
            </button>
            <button 
              id="mob-btn-database"
              onClick={() => { setActiveTab('database'); setMobileMenuOpen(false); }} 
              className="block w-full text-left py-2 font-medium text-slate-700 hover:text-[#132b3c]"
            >
              Medical DB
            </button>
            <button 
              id="mob-btn-about"
              onClick={() => { setActiveTab('about'); setMobileMenuOpen(false); }} 
              className="block w-full text-left py-2 font-medium text-slate-700 hover:text-[#132b3c]"
            >
              Clinician Team
            </button>
            <div className="pt-2 border-t border-[#dfd5c6]">
              <button 
                id="mob-btn-portal"
                onClick={() => { setActiveTab('portal'); setMobileMenuOpen(false); }} 
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#132b3c] text-white rounded-lg text-sm font-semibold"
              >
                <LockKeyhole className="w-4 h-4" />
                Secure Patient Portal
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ==========================================
          MAIN SCREEN CONTAINER
          ========================================== */}
      <main className="flex-grow">

        {/* ==========================================
            VIEW A: HOME & BRANDING BANNER
            ========================================== */}
        {activeTab === 'home' && (
          <div id="view-home" className="animate-fade-in">
            
            {/* THE BRAND BANNER (MATCHES USER IMAGE THEME PRECISELY) */}
            <section id="luxury-banner-hero" className="relative bg-[#fbfaf7] overflow-hidden py-12 md:py-20 lg:py-24 border-b border-[#dfd5c6]">
              
              {/* Curve Overlay elements mimicking the clean wavy background arcs in the image */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Curving broad arcs in soft warm grey and beige */}
                  <path d="M-100 200C300 100 600 500 1100 250C1400 100 1600 300 1600 300" stroke="#dfd5c6" strokeWidth="2.5" />
                  <path d="M-50 450C400 300 500 700 1150 450C1350 350 1550 500 1550 500" stroke="#dfd5c6" strokeWidth="1.5" />
                  <path d="M300 -100C600 200 900 100 1200 400" stroke="#eae4d9" strokeWidth="4" />
                </svg>
              </div>

              {/* Decorative Dots Grids mimicking the image */}
              <div id="dots-top-right" className="absolute top-8 right-8 z-10 pointer-events-none text-[#dfd5c6]">
                <div className="grid grid-cols-4 gap-2 opacity-75">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className="w-2.5 h-2.5 rounded-full bg-current"></div>
                  ))}
                </div>
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left content block */}
                  <div className="lg:col-span-5 flex flex-col justify-center">
                    
                    {/* Small tag */}
                    <div className="flex items-center gap-2 mb-6">
                      <Stethoscope className="w-4 h-4 text-[#8e7057]" />
                      <span className="text-[11px] font-mono tracking-[0.25em] text-[#8e7057] uppercase font-bold">Orthopedic Support Systems</span>
                    </div>

                    {/* Headline styled after "Luxury Mattress" */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-[#5a4635] tracking-tight leading-[1.08] mb-6">
                      Luxury <br />
                      <span className="text-[#132b3c]">Mattress</span>
                    </h1>

                    {/* Subtext matching the image copy */}
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg mb-8">
                      Unbeatable Mattress Sale! Huge discounts, ultimate comfort—upgrade your sleep today. Limited time only! Engineered with integrated clinical cervical-lumbar zones for premium medical-grade posture alignment.
                    </p>

                    {/* BUY NOW Button matching the image */}
                    <div className="flex flex-wrap items-center gap-4 mb-12">
                      <button 
                        id="cta-buy-now"
                        onClick={() => setActiveTab('products')}
                        className="bg-[#8e7057] text-white hover:bg-[#705540] px-8 py-4 rounded-full font-bold text-xs tracking-wider uppercase inline-flex items-center gap-3 shadow-md hover:shadow-lg transition-all"
                      >
                        Buy Now
                        <ChevronRight className="w-4 h-4 text-[#fbfaf7]" />
                      </button>
                      <button 
                        id="cta-learn-compliance"
                        onClick={() => setActiveTab('database')}
                        className="bg-transparent text-[#132b3c] hover:bg-[#f4f0ea] border border-[#dfd5c6] px-6 py-4 rounded-full font-bold text-xs tracking-wider uppercase inline-flex items-center gap-2 transition-all"
                      >
                        <Shield className="w-4 h-4" />
                        Clinical Specs
                      </button>
                    </div>

                    {/* Bottom-left: Globe link matching image layout */}
                    <div className="flex items-center gap-2.5 text-slate-500 hover:text-[#8e7057] transition-colors mt-4 self-start">
                      <div className="p-1.5 bg-[#f4f0ea] rounded-full border border-[#dfd5c6]">
                        <Globe className="w-4 h-4 text-[#8e7057]" />
                      </div>
                      <span className="text-xs font-mono tracking-wider font-semibold">www.brixtonhealthcare.com</span>
                    </div>

                  </div>

                  {/* Right bedroom mock-up scene with the beautiful arches framing */}
                  <div className="lg:col-span-7 relative flex justify-center lg:justify-end">
                    
                    {/* Decorative Dots Grids bottom-left of illustration area */}
                    <div id="dots-bottom-left" className="absolute -bottom-6 -left-6 z-10 pointer-events-none text-[#dfd5c6] hidden sm:block">
                      <div className="grid grid-cols-4 gap-2 opacity-75">
                        {[...Array(16)].map((_, i) => (
                          <div key={i} className="w-2.5 h-2.5 rounded-full bg-current"></div>
                        ))}
                      </div>
                    </div>

                    {/* Beautiful Elegant Curved Mask Container */}
                    <div className="relative w-full max-w-[580px] aspect-[4/3] rounded-t-[140px] rounded-br-[140px] overflow-hidden border-4 border-[#dfd5c6] shadow-xl bg-[#dfd5c6]/20">
                      
                      {/* Bed photo framing */}
                      <img 
                        src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1200" 
                        alt="Brixton Luxury Orthopedic Bed Set" 
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                        loading="eager"
                      />

                      {/* Dynamic light cream inner overlay frame mimicking the elegant styling arches */}
                      <div className="absolute inset-0 border-[12px] border-[#fbfaf7]/80 rounded-t-[130px] rounded-br-[130px] pointer-events-none"></div>
                    </div>

                    {/* 20% OFF Badge exactly as depicted */}
                    <div className="absolute top-1/3 left-4 md:left-8 z-20 bg-[#8e7057] text-white w-20 h-20 md:w-24 md:h-24 rounded-full flex flex-col justify-center items-center shadow-lg border-2 border-[#fbfaf7] transform hover:scale-110 transition-transform cursor-pointer">
                      <span className="text-sm md:text-base font-extrabold tracking-tight leading-none">20%</span>
                      <span className="text-[10px] md:text-xs tracking-widest font-bold uppercase leading-tight">Off</span>
                    </div>

                    {/* Quick highlight cards */}
                    <div className="absolute bottom-4 right-4 bg-[#fbfaf7]/90 backdrop-blur-sm p-4 rounded-xl border border-[#dfd5c6] shadow-md max-w-xs hidden sm:block">
                      <div className="flex gap-3">
                        <div className="p-2 bg-[#8e7057]/10 text-[#8e7057] rounded-lg self-start">
                          <Activity className="w-5 h-5 animate-pulse" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#132b3c] uppercase tracking-wider">Clinically Validated</h4>
                          <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                            Multi-density spinal support targets correct posture to minimize pressure sores.
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>

            </section>

            {/* QUICK BRAND STRENGTHS GRID */}
            <section id="strengths-highlight" className="py-12 bg-[#f4f0ea]/70 border-b border-[#dfd5c6]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#8e7057] text-white rounded-lg">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#132b3c] tracking-wide text-sm uppercase">HIPAA End-to-End Compliance</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        Every patient telemetry log and doctor inquiry utilizes state-of-the-art secure transmission protocols with active monitoring.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#132b3c] text-[#dfd5c6] rounded-lg">
                      <Database className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#132b3c] tracking-wide text-sm uppercase">Integrated Sleep DB</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        Direct sync with certified sleep medicine standards and clinical diagnostic codes (ICD-10 / CPT code indexes).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#8e7057] text-white rounded-lg">
                      <Activity className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#132b3c] tracking-wide text-sm uppercase">Clinical Ergonomics</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        Developed in partnership with leading somnologists to deliver optimal spinal decompression and muscle recovery.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* THREE-CARD FOCUS BOARD */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl font-serif text-[#132b3c] mb-3">Integrative Sleep Science Portal</h2>
                <p className="text-sm text-slate-600">
                  Explore Brixton Healthcare's clinical sleep solutions combining custom-tailored medical products, an authoritative diagnostic reference database, and secure patient care tools.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Panel A: Product Catalog */}
                <div className="bg-[#fbfaf7] border border-[#dfd5c6] p-8 rounded-2xl flex flex-col justify-between hover:border-[#8e7057] transition-all group">
                  <div>
                    <div className="w-12 h-12 bg-[#8e7057]/10 text-[#8e7057] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#8e7057] group-hover:text-white transition-colors">
                      <PlusCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#132b3c] mb-2 uppercase tracking-wide">Sleep Products Grid</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-6">
                      Inspect our clinical bedding, diagnostic CPAP systems, and sleep sensing equipment. Authorized administrators can dynamically register new items.
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('products')}
                    className="text-xs font-bold uppercase tracking-wider text-[#8e7057] hover:text-[#132b3c] inline-flex items-center gap-1.5 self-start"
                  >
                    View Catalog
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Panel B: Searchable Database */}
                <div className="bg-[#fbfaf7] border border-[#dfd5c6] p-8 rounded-2xl flex flex-col justify-between hover:border-[#8e7057] transition-all group">
                  <div>
                    <div className="w-12 h-12 bg-[#132b3c]/10 text-[#132b3c] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#132b3c] group-hover:text-white transition-colors">
                      <Search className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#132b3c] mb-2 uppercase tracking-wide">Diagnostic Index DB</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-6">
                      Search medical guidelines, sleep disorder codes (ICD-10), therapeutic indicators, and recommended recovery device alignments.
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('database')}
                    className="text-xs font-bold uppercase tracking-wider text-[#8e7057] hover:text-[#132b3c] inline-flex items-center gap-1.5 self-start"
                  >
                    Launch Search
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Panel C: Patient Secure Portal */}
                <div className="bg-[#fbfaf7] border border-[#dfd5c6] p-8 rounded-2xl flex flex-col justify-between hover:border-[#8e7057] transition-all group">
                  <div>
                    <div className="w-12 h-12 bg-[#8e7057]/10 text-[#8e7057] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#8e7057] group-hover:text-white transition-colors">
                      <LockKeyhole className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#132b3c] mb-2 uppercase tracking-wide">Secure Patient Portal</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-6">
                      Patient login under strict HIPAA policies. View individual diagnostic sleep reports, message board with clinical staff, and device parameters.
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('portal')}
                    className="text-xs font-bold uppercase tracking-wider text-[#8e7057] hover:text-[#132b3c] inline-flex items-center gap-1.5 self-start"
                  >
                    Open Portal
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </section>

          </div>
        )}

        {/* ==========================================
            VIEW B: PRODUCTS GRID & PRODUCT FORM
            ========================================== */}
        {activeTab === 'products' && (
          <div id="view-products" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
            
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#dfd5c6] pb-8 mb-10 gap-6">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#8e7057] uppercase font-bold block mb-2">Brixton Medical Inventory</span>
                <h1 className="text-3xl sm:text-4xl font-serif text-[#132b3c]">Therapeutic Sleep Systems</h1>
                <p className="text-xs text-slate-500 mt-2">
                  Responsive product catalog representing medical-grade sleeping gear, diagnostic systems, and posture aids.
                </p>
              </div>

              {/* Action: Add Product Form Toggle */}
              <button
                id="toggle-add-product"
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-[#132b3c] hover:bg-[#203a4e] text-[#dfd5c6] px-5 py-3 rounded-lg text-xs font-bold tracking-wider uppercase inline-flex items-center gap-2 transition-all self-start"
              >
                <PlusCircle className="w-4 h-4" />
                {showAddForm ? 'Hide Add Form' : 'Register New Product'}
              </button>
            </div>

            {/* ADD PRODUCT PAGE / FORM PANEL */}
            {showAddForm && (
              <div id="add-product-form-container" className="bg-[#f4f0ea] border border-[#dfd5c6] rounded-2xl p-6 md:p-8 mb-12 shadow-sm transition-all duration-300">
                <div className="flex items-center gap-2 mb-6 border-b border-[#dfd5c6] pb-4">
                  <PlusCircle className="w-5 h-5 text-[#8e7057]" />
                  <h2 className="text-lg font-bold text-[#132b3c] uppercase tracking-wide">Register New Clinical Product</h2>
                </div>

                <form id="add-product-form" onSubmit={handleAddProduct} className="space-y-6">
                  {formSuccessMsg && (
                    <div className="p-4 rounded-lg text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      {formSuccessMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Product Name *</label>
                      <input 
                        id="new-product-name"
                        type="text" 
                        value={newProdName} 
                        onChange={(e) => setNewProdName(e.target.value)}
                        placeholder="e.g. Brixton Somnus Ortho V2" 
                        className="w-full bg-[#fbfaf7] border border-[#dfd5c6] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#8e7057]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Therapeutic Category</label>
                      <select 
                        id="new-product-category"
                        value={newProdCategory}
                        onChange={(e) => setNewProdCategory(e.target.value)}
                        className="w-full bg-[#fbfaf7] border border-[#dfd5c6] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#8e7057] appearance-none"
                      >
                        <option>Beds & Mattresses</option>
                        <option>Sleep Therapy</option>
                        <option>Sensors & Tech</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Clinical Catalog Price (USD) *</label>
                      <input 
                        id="new-product-price"
                        type="number" 
                        value={newProdPrice} 
                        onChange={(e) => setNewProdPrice(e.target.value)}
                        placeholder="e.g. 1950" 
                        className="w-full bg-[#fbfaf7] border border-[#dfd5c6] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#8e7057]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Key Clinical Features (Comma-Separated)</label>
                    <input 
                      id="new-product-features"
                      type="text" 
                      value={newProdFeatures} 
                      onChange={(e) => setNewProdFeatures(e.target.value)}
                      placeholder="e.g. FDA Class I support foam, Dual air-flow core, Removable hypoallergenic bamboo casing" 
                      className="w-full bg-[#fbfaf7] border border-[#dfd5c6] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#8e7057]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Product Clinical Description *</label>
                    <textarea 
                      id="new-product-description"
                      rows={3}
                      value={newProdDesc}
                      onChange={(e) => setNewProdDesc(e.target.value)}
                      placeholder="Specify therapeutic indications, posture adjustments, spinal support specifications, or relevant ICD indications."
                      className="w-full bg-[#fbfaf7] border border-[#dfd5c6] rounded-lg p-4 text-sm focus:outline-none focus:border-[#8e7057]"
                      required
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button 
                      id="cancel-add-product"
                      type="button" 
                      onClick={() => setShowAddForm(false)}
                      className="px-5 py-2.5 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-200 uppercase tracking-wider transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      id="submit-new-product"
                      type="submit" 
                      className="bg-[#8e7057] hover:bg-[#705540] text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                    >
                      Save to Secure Catalog
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* PRODUCT CATEGORY FILTERS & COUNTER */}
            <div id="product-controls" className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex flex-wrap gap-2">
                {['All', 'Beds & Mattresses', 'Sleep Therapy', 'Sensors & Tech'].map(cat => (
                  <button
                    key={cat}
                    id={`filter-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all border ${
                      selectedCategory === cat 
                        ? 'bg-[#8e7057] text-white border-[#8e7057]' 
                        : 'bg-transparent text-[#132b3c] border-[#dfd5c6] hover:bg-[#f4f0ea]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <span className="text-xs text-slate-500 font-mono">
                Showing <strong className="text-slate-800">{filteredProducts.length}</strong> items of medical inventory
              </span>
            </div>

            {/* RESPONSIVE GRID FOR PRODUCT LISTINGS */}
            <div id="products-listing-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map(prod => (
                <div 
                  key={prod.id} 
                  id={prod.id}
                  className="bg-[#fbfaf7] border border-[#dfd5c6] rounded-2xl overflow-hidden hover:border-[#8e7057] hover:shadow-lg transition-all flex flex-col group relative"
                >
                  {prod.isCustom && (
                    <span className="absolute top-3 right-3 bg-[#132b3c] text-[#dfd5c6] text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full z-10 uppercase">
                      Staff Registered
                    </span>
                  )}
                  
                  {/* Photo area with clinical visual backup */}
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    {prod.image ? (
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          // Fallback to clean svg/background if image fails
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-[#f4f0ea] flex items-center justify-center">
                        <Activity className="w-12 h-12 text-[#dfd5c6]" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#8e7057] uppercase font-bold tracking-wider block mb-1">
                        {prod.category}
                      </span>
                      <h3 className="text-base font-serif font-bold text-[#132b3c] leading-tight mb-2 group-hover:text-[#8e7057] transition-colors">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-slate-500 leading-normal mb-4">
                        {prod.description}
                      </p>

                      {/* Features list */}
                      <ul className="space-y-1.5 border-t border-[#dfd5c6] pt-3 mb-4">
                        {prod.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-center text-[11px] text-slate-600 gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#8e7057] shrink-0"></span>
                            <span className="truncate">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-[#dfd5c6] pt-4 flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-[10px] text-slate-500 font-mono uppercase block leading-none mb-1">Clinician Price</span>
                        <span className="text-lg font-bold text-[#132b3c]">${prod.price.toLocaleString()}</span>
                      </div>
                      
                      <button
                        onClick={() => {
                          alert(`Inquiry sent for: ${prod.name}. A secure consultation token has been initialized under HIPAA. Reference ID: ${Math.floor(Math.random()*100000)}`);
                        }}
                        className="bg-transparent text-[#8e7057] hover:bg-[#8e7057] hover:text-white border border-[#dfd5c6] px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all"
                      >
                        Clinical Order
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ==========================================
            VIEW C: SEARCHABLE MEDICAL DATABASE
            ========================================== */}
        {activeTab === 'database' && (
          <div id="view-database" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
            
            {/* Intro */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#8e7057] uppercase font-bold block mb-2">Verified Diagnostic Reference</span>
              <h1 className="text-3xl sm:text-4xl font-serif text-[#132b3c]">Searchable Clinical sleep Database</h1>
              <p className="text-sm text-slate-600 mt-2">
                Search accredited sleep indicators, diagnostic codes (ICD-10 / CPT code models), posture theories, and therapeutic equipment regulations.
              </p>
            </div>

            {/* SEARCH AND FILTERING GRID */}
            <div className="bg-[#f4f0ea] border border-[#dfd5c6] rounded-2xl p-6 mb-10 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                
                {/* Search Inputs */}
                <div className="md:col-span-8 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="db-search-input"
                    type="text"
                    value={dbSearch}
                    onChange={(e) => setDbSearch(e.target.value)}
                    placeholder="Search by diagnosis, clinical criteria, ICD-10 code (e.g. 'G47.33', 'Apnea')..."
                    className="w-full bg-[#fbfaf7] border border-[#dfd5c6] rounded-lg pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#8e7057]"
                  />
                </div>

                {/* Dropdown Filters */}
                <div className="md:col-span-4 flex gap-2">
                  <select
                    id="db-category-filter"
                    value={dbCategory}
                    onChange={(e) => setDbCategory(e.target.value)}
                    className="w-full bg-[#fbfaf7] border border-[#dfd5c6] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#8e7057] appearance-none"
                  >
                    <option value="All">All Categories</option>
                    <option value="Disorder">Sleep Disorders</option>
                    <option value="Guideline">Therapeutic Guidelines</option>
                    <option value="Procedure">Procedures &PSG</option>
                    <option value="Device">Regulatory Devices</option>
                  </select>
                  <button 
                    id="db-reset-filters"
                    onClick={() => { setDbSearch(''); setDbCategory('All'); }}
                    className="bg-slate-200 text-slate-600 hover:bg-[#dfd5c6] px-4 py-3 rounded-lg text-xs font-bold uppercase transition-all"
                  >
                    Reset
                  </button>
                </div>

              </div>
            </div>

            {/* RESULTS ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* List of items */}
              <div className="lg:col-span-7 space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono">
                  Database Records found ({filteredTerms.length})
                </h2>

                {filteredTerms.length === 0 ? (
                  <div className="bg-[#fbfaf7] border border-[#dfd5c6] p-8 text-center rounded-2xl">
                    <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                    <p className="text-sm font-bold text-[#132b3c]">No medical database matches found.</p>
                    <p className="text-xs text-slate-500 mt-1">Try querying general terms like "Apnea", "Alignment", "G47", or "CPAP".</p>
                  </div>
                ) : (
                  filteredTerms.map(item => (
                    <div 
                      key={item.id} 
                      id={`db-item-${item.id}`}
                      onClick={() => setSelectedTerm(item)}
                      className={`bg-[#fbfaf7] border p-6 rounded-xl cursor-pointer hover:border-[#8e7057] transition-all flex flex-col justify-between ${
                        selectedTerm?.id === item.id ? 'border-2 border-[#8e7057] shadow-md bg-[#dfd5c6]/10' : 'border-[#dfd5c6]'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <div>
                          <span className="text-[9px] font-mono bg-[#132b3c] text-[#dfd5c6] px-2 py-0.5 rounded uppercase font-bold tracking-wider inline-block mb-2">
                            {item.category}
                          </span>
                          <h3 className="text-base font-bold font-serif text-[#132b3c]">{item.term}</h3>
                        </div>
                        <span className="text-xs font-mono font-bold text-[#8e7057] bg-[#f4f0ea] px-2 py-1 rounded shrink-0">
                          {item.code}
                        </span>
                      </div>
                      
                      <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between border-t border-[#dfd5c6]/60 pt-4 mt-4">
                        <span className="text-[10px] text-slate-500 font-mono">Clinician Advice Included</span>
                        <span className="text-[10px] font-bold text-[#8e7057] inline-flex items-center gap-1">
                          Expand Details <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>

                    </div>
                  ))
                )}
              </div>

              {/* Detail Panel */}
              <div className="lg:col-span-5">
                {selectedTerm ? (
                  <div id="db-detail-panel" className="bg-[#fbfaf7] border-2 border-[#dfd5c6] rounded-2xl p-6 md:p-8 sticky top-28 shadow-sm">
                    <span className="text-[10px] font-mono text-[#8e7057] uppercase font-bold tracking-widest block mb-1">
                      Detailed Audit Log
                    </span>
                    <h2 className="text-2xl font-serif text-[#132b3c] font-bold leading-tight mb-4 border-b border-[#dfd5c6] pb-4">
                      {selectedTerm.term}
                    </h2>

                    <div className="space-y-6">
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#f4f0ea] p-3 rounded-lg border border-[#dfd5c6]">
                          <span className="text-[9px] uppercase font-mono text-slate-500 block leading-none mb-1">Registry Code</span>
                          <strong className="text-xs font-mono text-[#132b3c]">{selectedTerm.code}</strong>
                        </div>
                        <div className="bg-[#f4f0ea] p-3 rounded-lg border border-[#dfd5c6]">
                          <span className="text-[9px] uppercase font-mono text-slate-500 block leading-none mb-1">Audit Status</span>
                          <strong className="text-xs font-mono text-emerald-700 flex items-center gap-1">
                            <Check className="w-3 h-3" /> HIPAA SECURED
                          </strong>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-[#132b3c] uppercase tracking-wider mb-2 font-mono">Clinical Abstract</h4>
                        <p className="text-xs text-slate-600 leading-relaxed bg-[#fbfaf7] p-3 rounded border border-dashed border-[#dfd5c6]">
                          {selectedTerm.description}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-[#132b3c] uppercase tracking-wider mb-2 font-mono">Aegis Prescribed Interventions</h4>
                        <ul className="space-y-1.5">
                          {selectedTerm.treatments.map((treatment, idx) => (
                            <li key={idx} className="flex items-center text-xs text-slate-700 gap-2">
                              <CheckCircle className="w-4 h-4 text-[#8e7057] shrink-0" />
                              <span>{treatment}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-amber-800 text-xs font-bold mb-1">
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>Contraindications & Advisory</span>
                        </div>
                        <p className="text-[11px] text-amber-700 leading-relaxed">
                          {selectedTerm.advisory}
                        </p>
                      </div>

                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-[#dfd5c6] rounded-2xl p-12 text-center text-slate-400 h-96 flex flex-col justify-center items-center">
                    <Database className="w-12 h-12 text-slate-300 mb-4" />
                    <p className="text-sm font-bold text-slate-500">No Record Selected</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                      Click any medical index record on the left to view comprehensive HIPAA audit files, FDA status, and spinal support indications.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* ==========================================
            VIEW D: SECURE PATIENT PORTAL
            ========================================== */}
        {activeTab === 'portal' && (
          <div id="view-portal" className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
            
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="w-12 h-12 bg-[#132b3c] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <LockKeyhole className="w-6 h-6 text-[#dfd5c6]" />
              </div>
              <h1 className="text-3xl font-serif text-[#132b3c] font-bold">Secure HIPAA Patient Portal</h1>
              <p className="text-xs text-slate-500 mt-2">
                Encrypted point-to-point connection. Authorized patients can review clinical telemetry and text care coordinators directly.
              </p>
            </div>

            {/* IF NOT LOGGED IN */}
            {!isLoggedIn && (
              <div className="bg-[#fbfaf7] border border-[#dfd5c6] rounded-2xl shadow-md max-w-md mx-auto overflow-hidden">
                
                {/* HIPAA compliance label */}
                <div className="bg-[#132b3c] p-4 text-center border-b border-[#203a4e]">
                  <span className="text-[10px] font-mono tracking-widest text-[#dfd5c6] uppercase font-bold flex justify-center items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    AUTHORIZED PERSONNEL ACCESS ONLY
                  </span>
                </div>

                {/* STEP 1: CREDENTIALS SCREEN */}
                {loginStep === 'credentials' && (
                  <form id="portal-login-form" onSubmit={handlePortalLogin} className="p-6 md:p-8 space-y-5">
                    
                    {portalError && (
                      <div className="p-3 bg-red-50 text-red-700 rounded text-xs font-mono border border-red-200">
                        {portalError}
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1 font-mono">Patient Clinical ID</label>
                      <input 
                        id="portal-patient-id"
                        type="text" 
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        className="w-full bg-[#f4f0ea] border border-[#dfd5c6] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#8e7057] font-mono"
                        required
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-[11px] font-bold uppercase text-slate-700 font-mono">Secret Passcode</label>
                        <span className="text-[10px] text-[#8e7057] font-mono">256-bit encrypted</span>
                      </div>
                      <div className="relative">
                        <input 
                          id="portal-password"
                          type={showPassword ? 'text' : 'password'} 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-[#f4f0ea] border border-[#dfd5c6] rounded-lg pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:border-[#8e7057] font-mono"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#f4f0ea] p-3 rounded-lg border border-[#dfd5c6] text-[11px] text-slate-500 space-y-1">
                      <span className="font-bold text-[#132b3c] block">DEMO TESTING CREDENTIALS:</span>
                      <p>Patient ID: <code className="bg-[#dfd5c6] px-1 py-0.2 rounded text-[#132b3c] font-bold">PT-2026</code></p>
                      <p>Passcode: <code className="bg-[#dfd5c6] px-1 py-0.2 rounded text-[#132b3c] font-bold">brixton-secure</code></p>
                    </div>

                    <button 
                      id="btn-login-submit"
                      type="submit" 
                      className="w-full bg-[#8e7057] hover:bg-[#705540] text-white py-3 rounded-lg font-bold text-xs tracking-wider uppercase transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      Authenticate Identity
                    </button>
                    
                    <p className="text-[10px] text-center text-slate-400">
                      Unsuccessful attempts trigger automated server blocking. Public IP: logged.
                    </p>
                  </form>
                )}

                {/* STEP 2: MFA SCREEN */}
                {loginStep === 'mfa' && (
                  <form id="portal-mfa-form" onSubmit={handleMfaSubmit} className="p-6 md:p-8 space-y-5 animate-fade-in">
                    <div className="text-center space-y-1">
                      <Shield className="w-8 h-8 text-emerald-600 mx-auto" />
                      <h3 className="font-bold text-[#132b3c] text-sm uppercase tracking-wide">Multi-Factor Token Required</h3>
                      <p className="text-[11px] text-slate-500">
                        A secure OTP passcode is simulated. Input any 6-digit code (e.g. <code className="font-bold">123456</code>) to pass.
                      </p>
                    </div>

                    {portalError && (
                      <div className="p-3 bg-red-50 text-red-700 rounded text-xs font-mono border border-red-200">
                        {portalError}
                      </div>
                    )}

                    <div>
                      <input 
                        id="portal-mfa-code"
                        type="text"
                        maxLength={6}
                        placeholder="• • • • • •"
                        value={mfaCode}
                        onChange={(e) => setMfaCode(e.target.value)}
                        className="w-full bg-[#f4f0ea] border border-[#dfd5c6] rounded-lg py-3 text-center text-lg font-bold tracking-[0.4em] focus:outline-none focus:border-[#8e7057]"
                        required
                      />
                    </div>

                    <button 
                      id="btn-mfa-submit"
                      type="submit" 
                      className="w-full bg-[#132b3c] hover:bg-[#203a4e] text-white py-3 rounded-lg font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                    >
                      Verify MFA OTP Code
                    </button>

                    <button 
                      id="btn-mfa-cancel"
                      type="button" 
                      onClick={() => setLoginStep('credentials')}
                      className="w-full text-center text-xs text-slate-500 hover:underline"
                    >
                      Back to credentials
                    </button>
                  </form>
                )}

              </div>
            )}

            {/* IF COMPLETED LOGIN SECURE PATIENT PORTAL PORTLET */}
            {isLoggedIn && (
              <div id="patient-secure-dashboard" className="bg-[#fbfaf7] border border-[#dfd5c6] rounded-2xl shadow-lg overflow-hidden animate-fade-in grid grid-cols-1 md:grid-cols-12">
                
                {/* Left navigation column of dashboard */}
                <div className="md:col-span-4 bg-[#132b3c] text-[#dfd5c6] p-6 border-r border-[#dfd5c6]/10 flex flex-col justify-between">
                  <div>
                    {/* Patient profile badge */}
                    <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                      <div className="w-12 h-12 rounded-full bg-[#8e7057] text-white flex items-center justify-center font-bold text-lg border border-white/20">
                        JS
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white leading-none">John S. Sterling</h3>
                        <span className="text-[10px] text-slate-400 font-mono">Patient Ref: PT-2026</span>
                      </div>
                    </div>

                    {/* Sleep therapy indicators */}
                    <div className="space-y-4">
                      <div className="bg-white/5 p-3.5 rounded-lg border border-white/10">
                        <span className="text-[9px] font-mono uppercase text-[#dfd5c6] block">Registered Bed Unit</span>
                        <strong className="text-xs text-white">Brixton Somnus-Elite (Zone Ortho)</strong>
                        <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
                          <div className="bg-[#8e7057] h-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>

                      <div className="bg-white/5 p-3.5 rounded-lg border border-white/10">
                        <span className="text-[9px] font-mono uppercase text-[#dfd5c6] block">Active Device telemetry</span>
                        <strong className="text-xs text-white">Aura PI-Sensor #2098</strong>
                        <span className="text-[10px] text-emerald-400 block mt-1 font-mono">● Active Sync: OK</span>
                      </div>
                    </div>
                  </div>

                  {/* Sign out */}
                  <div className="pt-6 border-t border-white/10 mt-8">
                    <button 
                      id="btn-portal-logout"
                      onClick={() => { setIsLoggedIn(false); setLoginStep('credentials'); }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-950/40 text-red-400 border border-red-900/30 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-red-900/20 transition-all"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out Secure Portal
                    </button>
                  </div>
                </div>

                {/* Right details content column */}
                <div className="md:col-span-8 p-6 md:p-8 space-y-8 bg-[#fbfaf7]">
                  
                  {/* Top clinical report cards */}
                  <div>
                    <h2 className="text-lg font-serif font-bold text-[#132b3c] mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-[#8e7057]" />
                      Clinical Sleep Telemetry Report
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      
                      <div className="bg-[#f4f0ea] p-4 rounded-xl border border-[#dfd5c6]">
                        <span className="text-[9px] font-mono uppercase text-slate-500 block">Sleep Support Score</span>
                        <strong className="text-xl text-[#132b3c]">94%</strong>
                        <span className="text-[10px] text-emerald-600 block mt-1">Excellent Spine Align</span>
                      </div>

                      <div className="bg-[#f4f0ea] p-4 rounded-xl border border-[#dfd5c6]">
                        <span className="text-[9px] font-mono uppercase text-slate-500 block">Sleep Efficiency Rate</span>
                        <strong className="text-xl text-[#132b3c]">91.2%</strong>
                        <span className="text-[10px] text-slate-500 block mt-1">Goal: &gt; 85% (Optimal)</span>
                      </div>

                      <div className="bg-[#f4f0ea] p-4 rounded-xl border border-[#dfd5c6]">
                        <span className="text-[9px] font-mono uppercase text-slate-500 block">Deep sleep duration</span>
                        <strong className="text-xl text-[#132b3c]">2h 18m</strong>
                        <span className="text-[10px] text-emerald-600 block mt-1">+14% since custom bed</span>
                      </div>

                    </div>
                  </div>

                  {/* SECURE DIRECT MESSAGE WITH DR. THORNE */}
                  <div className="border-t border-[#dfd5c6] pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="w-4 h-4 text-[#8e7057]" />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#132b3c] font-mono">
                        Secure Physician Messages (Direct Connection)
                      </h3>
                    </div>

                    {/* Message Box */}
                    <div className="border border-[#dfd5c6] rounded-xl overflow-hidden bg-white shadow-inner">
                      
                      {/* Chat banner */}
                      <div className="bg-[#f4f0ea] px-4 py-2.5 border-b border-[#dfd5c6] flex justify-between items-center">
                        <span className="text-[11px] font-bold text-slate-700">Dr. Aris Thorne (MD) Clinic</span>
                        <span className="text-[10px] font-mono text-emerald-700">Audit-Sync Active</span>
                      </div>

                      {/* Chat Logs */}
                      <div id="portal-chat-logs" className="p-4 h-56 overflow-y-auto space-y-4">
                        {portalMessages.map((msg, i) => (
                          <div 
                            key={i} 
                            className={`max-w-[80%] p-3 rounded-lg text-xs leading-relaxed ${
                              msg.sender === 'patient' 
                                ? 'bg-[#8e7057] text-white ml-auto rounded-tr-none' 
                                : 'bg-[#f4f0ea] text-slate-800 mr-auto rounded-tl-none border border-[#dfd5c6]'
                            }`}
                          >
                            <p>{msg.text}</p>
                            <span className="block text-[9px] mt-1 text-right opacity-70 font-mono">
                              {msg.timestamp}
                            </span>
                          </div>
                        ))}

                        {isTyping && (
                          <div className="bg-[#f4f0ea] text-slate-500 max-w-[80%] p-2 rounded-lg text-xs mr-auto rounded-tl-none animate-pulse">
                            Secure clinic coordinator is typing response...
                          </div>
                        )}
                      </div>

                      {/* Input message form */}
                      <form onSubmit={handleSendMessage} className="p-2 border-t border-[#dfd5c6] flex gap-2">
                        <input
                          id="portal-chat-input"
                          type="text"
                          value={newMessageText}
                          onChange={(e) => setNewMessageText(e.target.value)}
                          placeholder="Type secure medical message to clinic coordinator..."
                          className="flex-grow bg-[#f4f0ea] rounded-lg px-3 py-2 text-xs focus:outline-none"
                        />
                        <button 
                          id="btn-portal-send-msg"
                          type="submit"
                          className="bg-[#132b3c] text-white p-2 rounded-lg hover:bg-[#8e7057] transition-all"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </form>

                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>
        )}

        {/* ==========================================
            VIEW E: ABOUT US & CLINIC TEAM
            ========================================== */}
        {activeTab === 'about' && (
          <div id="view-about" className="py-12 animate-fade-in">
            
            {/* ABOUT EDITORIAL SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Visual side */}
                <div className="relative">
                  {/* Overlay Dots */}
                  <div className="absolute -top-6 -left-6 z-10 text-[#dfd5c6] opacity-70">
                    <div className="grid grid-cols-4 gap-2">
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className="w-2.5 h-2.5 rounded-full bg-current"></div>
                      ))}
                    </div>
                  </div>

                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#dfd5c6] shadow-md bg-[#dfd5c6]/20">
                    <img 
                      src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200" 
                      alt="Brixton Diagnostic Research lab" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Text side */}
                <div className="space-y-6">
                  <span className="text-[10px] font-mono tracking-[0.25em] text-[#8e7057] uppercase font-bold block">Since 1989</span>
                  <h2 className="text-4xl font-serif text-[#132b3c] leading-tight">
                    Merging Clinical Sleep Medicine with Luxury Bedding Engineering
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    At Brixton Healthcare, we believe therapeutic equipment shouldn't make your bedroom look like an ICU. Our mission is to integrate rigorous medical diagnostics, orthotic alignment metrics, and sleep monitoring apparatus into timeless luxury bed designs.
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Every product in our registry undergoes rigorous clinical trials conducted by board-certified sleep neurologists, ensuring HIPAA compliance and peer-reviewed spine support criteria.
                  </p>

                  <div className="grid grid-cols-2 gap-4 border-t border-[#dfd5c6] pt-6">
                    <div>
                      <strong className="text-3xl font-serif text-[#132b3c]">12,000+</strong>
                      <span className="text-xs text-slate-500 block mt-1">Patients Monitored</span>
                    </div>
                    <div>
                      <strong className="text-3xl font-serif text-[#132b3c]">30+ Years</strong>
                      <span className="text-xs text-slate-500 block mt-1">Clinical Trials Experience</span>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* CLINICIAN PROFILE GRID SECTION */}
            <section className="bg-[#f4f0ea] py-16 border-y border-[#dfd5c6]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-[10px] font-mono tracking-[0.25em] text-[#8e7057] uppercase font-bold block mb-2">Our Credibility</span>
                  <h2 className="text-3xl font-serif text-[#132b3c] font-bold">Leading Sleep Medicine experts</h2>
                  <p className="text-sm text-slate-600 mt-2">
                    Our team brings decades of clinical practice, Ivy League research, and orthotic engineering patents to ensure patient safety and trust.
                  </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Dr Aris Thorne */}
                  <div className="bg-[#fbfaf7] border border-[#dfd5c6] rounded-2xl p-6 hover:border-[#8e7057] transition-all flex flex-col justify-between">
                    <div>
                      {/* Styled Profile placeholder with medical icons */}
                      <div className="w-16 h-16 rounded-full bg-[#132b3c] text-[#dfd5c6] flex items-center justify-center font-bold text-xl mb-4 border border-[#dfd5c6] shadow-inner relative">
                        AT
                        <div className="absolute -bottom-1 -right-1 bg-[#8e7057] text-white p-1 rounded-full border border-white">
                          <Stethoscope className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-[#132b3c] leading-tight font-serif">Dr. Aris Thorne</h3>
                      <span className="text-xs text-[#8e7057] font-semibold tracking-wider font-mono uppercase block mb-3">
                        Chief of Sleep Medicine & Somnology
                      </span>
                      
                      <div className="space-y-2 border-t border-[#dfd5c6] pt-3 text-xs text-slate-600 mb-4">
                        <p><strong>Credentials:</strong> MD, PhD, FASM</p>
                        <p><strong>Education:</strong> Harvard Medical School</p>
                        <p><strong>Bio:</strong> Board-certified Sleep Specialist with 20+ years diagnosing complex obstructive apnea and neurological cycle disturbances.</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        setActiveTab('portal');
                        alert("Please secure authenticate to schedule consult logs with Dr. Thorne.");
                      }}
                      className="w-full bg-[#f4f0ea] hover:bg-[#dfd5c6] text-[#132b3c] py-2 rounded-lg text-xs font-bold uppercase transition-all tracking-wide"
                    >
                      Inquire Consultation
                    </button>
                  </div>

                  {/* Dr Elena Rostova */}
                  <div className="bg-[#fbfaf7] border border-[#dfd5c6] rounded-2xl p-6 hover:border-[#8e7057] transition-all flex flex-col justify-between">
                    <div>
                      <div className="w-16 h-16 rounded-full bg-[#8e7057] text-white flex items-center justify-center font-bold text-xl mb-4 border border-[#dfd5c6] shadow-inner relative">
                        ER
                        <div className="absolute -bottom-1 -right-1 bg-[#132b3c] text-white p-1 rounded-full border border-white">
                          <Activity className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-[#132b3c] leading-tight font-serif">Dr. Elena Rostova</h3>
                      <span className="text-xs text-[#8e7057] font-semibold tracking-wider font-mono uppercase block mb-3">
                        Director of Clinical Neurology
                      </span>
                      
                      <div className="space-y-2 border-t border-[#dfd5c6] pt-3 text-xs text-slate-600 mb-4">
                        <p><strong>Credentials:</strong> MD, PhD (Somnology Science)</p>
                        <p><strong>Education:</strong> Stanford Sleep Disorders Clinic</p>
                        <p><strong>Bio:</strong> Directs clinical trials on bio-piezoelectric non-contact sensory arrays and cervical orthotic positioning outcomes.</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        setActiveTab('portal');
                        alert("Please secure authenticate to schedule consult logs with Dr. Rostova.");
                      }}
                      className="w-full bg-[#f4f0ea] hover:bg-[#dfd5c6] text-[#132b3c] py-2 rounded-lg text-xs font-bold uppercase transition-all tracking-wide"
                    >
                      Inquire Consultation
                    </button>
                  </div>

                  {/* Marcus Brixton */}
                  <div className="bg-[#fbfaf7] border border-[#dfd5c6] rounded-2xl p-6 hover:border-[#8e7057] transition-all flex flex-col justify-between">
                    <div>
                      <div className="w-16 h-16 rounded-full bg-stone-300 text-stone-800 flex items-center justify-center font-bold text-xl mb-4 border border-[#dfd5c6] shadow-inner relative">
                        MB
                        <div className="absolute -bottom-1 -right-1 bg-[#8e7057] text-white p-1 rounded-full border border-white">
                          <Globe className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-[#132b3c] leading-tight font-serif">Marcus Brixton</h3>
                      <span className="text-xs text-[#8e7057] font-semibold tracking-wider font-mono uppercase block mb-3">
                        Founder & Chief Ergonomics Officer
                      </span>
                      
                      <div className="space-y-2 border-t border-[#dfd5c6] pt-3 text-xs text-slate-600 mb-4">
                        <p><strong>Credentials:</strong> MS, Orthotics Patentee</p>
                        <p><strong>Education:</strong> ETH Zürich - Human Kinetics</p>
                        <p><strong>Bio:</strong> Developed the multi-density contour sleep foam layout and zonal alignment parameters modeled in our luxury bedding.</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        alert("For corporate orthotic design consulting, please submit a HIPAA Contact form.");
                      }}
                      className="w-full bg-[#f4f0ea] hover:bg-[#dfd5c6] text-[#132b3c] py-2 rounded-lg text-xs font-bold uppercase transition-all tracking-wide"
                    >
                      Inquire Design Brief
                    </button>
                  </div>

                </div>

              </div>
            </section>

          </div>
        )}

        {/* ==========================================
            HIPAA-COMPLIANT CONTACT US FORM
            ========================================== */}
        <section id="secure-contact-section" className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#fbfaf7] border border-[#dfd5c6] rounded-2xl overflow-hidden shadow-md">
            
            {/* Header */}
            <div className="bg-[#132b3c] text-[#dfd5c6] p-6 flex items-center justify-between border-b border-[#203a4e]">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-[#dfd5c6]" />
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">Secure HIPAA Clinical Inquiry</h3>
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 block uppercase font-bold">Encrypted 256-Bit Socket Submission</span>
                </div>
              </div>
              <span className="hidden sm:inline bg-emerald-950 text-emerald-400 border border-emerald-800/60 px-2 py-1 rounded text-[10px] font-mono">
                TLS 1.3 Active
              </span>
            </div>

            {/* Form & Response */}
            <div className="p-6 md:p-8">
              
              {contactSubmitSuccess ? (
                <div className="space-y-6 text-center py-6 animate-fade-in">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
                    <Check className="w-6 h-6" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-xl font-serif font-bold text-[#132b3c]">Clinical Message Submitted Securely</h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      Your inquiry has been successfully parsed, serialized, and locked on our local server. Here is your unique HIPAA compliance transmission receipt:
                    </p>
                  </div>

                  {contactEncryptedPayload && (
                    <pre className="p-4 bg-slate-900 text-emerald-400 text-[10px] font-mono text-left rounded-lg max-w-lg mx-auto overflow-x-auto whitespace-pre border border-slate-800">
                      {contactEncryptedPayload}
                    </pre>
                  )}

                  <button 
                    id="btn-new-inquiry"
                    onClick={() => { setContactSubmitSuccess(false); setContactEncryptedPayload(''); }}
                    className="bg-[#8e7057] hover:bg-[#705540] text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Submit New Clinical Inquiry
                  </button>
                </div>
              ) : (
                <form id="contact-form" onSubmit={handleContactSubmit} className="space-y-5">
                  <p className="text-xs text-slate-600 leading-normal mb-2">
                    If you are a patient or physician seeking posture optimization support, please complete the secure consultation index form. Under HIPAA guidelines, no information transmitted is shared with marketing bodies.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">Your Full Name *</label>
                      <input 
                        id="contact-name"
                        type="text" 
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Robert Sterling" 
                        className="w-full bg-[#f4f0ea] border border-[#dfd5c6] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#8e7057]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">Secure Contact Email *</label>
                      <input 
                        id="contact-email"
                        type="email" 
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="e.g. robert@sterling.com" 
                        className="w-full bg-[#f4f0ea] border border-[#dfd5c6] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#8e7057]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">Inquiry Type</label>
                    <select 
                      id="contact-inquiry-type"
                      value={contactInquiryType}
                      onChange={(e) => setContactInquiryType(e.target.value)}
                      className="w-full bg-[#f4f0ea] border border-[#dfd5c6] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#8e7057] appearance-none"
                    >
                      <option>Clinical Consultation Request</option>
                      <option>Product Specifications Inquiry</option>
                      <option>Sleep Telemetry Calibration</option>
                      <option>General Administration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">Medical/Therapeutic Query *</label>
                    <textarea 
                      id="contact-message"
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Input clinical symptoms, spinal posture concerns, sleep study results, or therapeutic product inquiries..."
                      className="w-full bg-[#f4f0ea] border border-[#dfd5c6] rounded-lg p-4 text-sm focus:outline-none focus:border-[#8e7057]"
                      required
                    ></textarea>
                  </div>

                  <div className="flex items-start gap-3 bg-[#f4f0ea] p-4 rounded-lg border border-[#dfd5c6]">
                    <input 
                      id="hipaa-consent-checkbox"
                      type="checkbox"
                      checked={hipaaConsent}
                      onChange={(e) => setHipaaConsent(e.target.checked)}
                      className="mt-1 accent-[#8e7057] shrink-0"
                      required
                    />
                    <label className="text-[11px] text-slate-500 leading-normal">
                      <strong>HIPAA SECURE TRANSMISSION DISCLOSURE:</strong> I understand that this information will be encrypted with AES-256 and sent strictly to the clinical care coordination panel of Brixton Healthcare. I consent to secure record keeping in line with PHI compliance protocols.
                    </label>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-[#dfd5c6]">
                    <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" /> Secure Transport Layer Active
                    </span>
                    <button 
                      id="btn-contact-submit"
                      type="submit"
                      className="bg-[#132b3c] hover:bg-[#8e7057] text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                    >
                      Encrypt & Submit Inquiry
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        </section>

      </main>

      {/* ==========================================
          FOOTER
          ========================================== */}
      <footer id="main-footer" className="bg-[#132b3c] text-[#dfd5c6] py-12 border-t border-[#dfd5c6]/10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 flex items-center justify-center bg-[#fbfaf7] rounded-md border border-[#dfd5c6]/20">
                <svg className="w-6 h-6" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32 22V78" stroke="#8e7057" strokeWidth="12" strokeLinecap="round" />
                  <path d="M32 22H55C66.598 22 76 30.0589 76 40C76 49.9411 66.598 48 55 48" stroke="#132b3c" strokeWidth="12" strokeLinecap="round" />
                  <path d="M32 48H58C69.598 48 79 56.0589 79 66C79 75.9411 69.598 78 58 78H32" stroke="#132b3c" strokeWidth="12" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-wider text-white font-serif uppercase leading-none">Brixton</span>
                <span className="text-[9px] tracking-widest text-[#8e7057] uppercase font-bold leading-none">Healthcare</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              At the intersection of orthopedic science and premium luxury comfort. Engineering perfect sleep architecture under accredited diagnostic safety.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-mono">Registry Navigator</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => { setActiveTab('home'); }} className="hover:text-white transition-colors">Sleep Care Home</button></li>
              <li><button onClick={() => { setActiveTab('products'); }} className="hover:text-white transition-colors">Therapeutic Bedding</button></li>
              <li><button onClick={() => { setActiveTab('database'); }} className="hover:text-white transition-colors">ICD-10 Diagnostic database</button></li>
              <li><button onClick={() => { setActiveTab('portal'); }} className="hover:text-white transition-colors">Patient Portal (MFA)</button></li>
            </ul>
          </div>

          {/* HIPAA & Security Specs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-mono">Security Compliance</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                <span>HIPAA Title II Compliant</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                <span>End-To-End AES-GCM 256</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                <span>Active Audit Intrusion Log</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#8e7057] rounded-full"></span>
                <span>FDA Class I & II Support</span>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-mono">Clinician Hotline</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8e7057]" />
                <span>+1 (800) 555-BRIXTON</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8e7057]" />
                <span>care@brixtonhealthcare.com</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8e7057]" />
                <span>Brixton Sleep Clinic, Zurich & Boston</span>
              </p>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#dfd5c6]/10 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 font-mono gap-4">
          <p>© 2026 Brixton Healthcare Systems, LLC. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">HIPAA Privacy Policy</a>
            <a href="#" className="hover:underline">FDA Disclosure</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
