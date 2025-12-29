import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Eye, EyeOff, Shield, Zap, Lock, AlertTriangle, Github } from 'lucide-react';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from 'recharts';

// GitHub Floating Button Component
interface GithubFloatingButtonProps {
  repoUrl: string;
}

const GithubFloatingButton: React.FC<GithubFloatingButtonProps> = ({ repoUrl }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open project GitHub repository"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-full shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500/50 hover:scale-105 transition-all duration-300 ease-out group focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900"
    >
      <Github className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'rotate-12' : ''}`} />
      <span className="text-sm font-medium text-gray-200 group-hover:text-cyan-400 transition-colors duration-300">
        GitHub
      </span>
    </a>
  );
};

// Animation wrapper component
interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (prefersReducedMotion.current) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Password Analysis Engine
interface PasswordAnalysis {
  length: number;
  hasLowercase: boolean;
  hasUppercase: boolean;
  hasNumbers: boolean;
  hasSymbols: boolean;
  entropy: number;
  charsetSize: number;
  repeatedChars: number;
  sequences: string[];
  dictionaryWords: string[];
  strength: 'Very Weak' | 'Weak' | 'Medium' | 'Strong' | 'Very Strong';
  strengthScore: number;
}

const commonWords = ['password', 'welcome', 'admin', 'letmein', 'monkey', 'dragon', 'master', 'sunshine', 'princess', 'qwerty', 'abc123', '123456', 'iloveyou'];

const analyzePassword = (password: string): PasswordAnalysis => {
  const length = password.length;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);

  let charsetSize = 0;
  if (hasLowercase) charsetSize += 26;
  if (hasUppercase) charsetSize += 26;
  if (hasNumbers) charsetSize += 10;
  if (hasSymbols) charsetSize += 32;

  const entropy = length > 0 ? length * Math.log2(charsetSize || 1) : 0;
  const repeatedChars = (password.match(/(.)\1{2,}/g) || []).length;

  const sequences: string[] = [];
  const seqPatterns = ['012', '123', '234', '345', '456', '567', '678', '789', 'abc', 'bcd', 'cde', 'def', 'efg', 'fgh', 'ghi', 'hij', 'ijk', 'jkl', 'klm', 'lmn', 'mno', 'nop', 'opq', 'pqr', 'qrs', 'rst', 'stu', 'tuv', 'uvw', 'vwx', 'wxy', 'xyz'];
  seqPatterns.forEach(seq => {
    if (password.toLowerCase().includes(seq)) sequences.push(seq);
  });

  const dictionaryWords = commonWords.filter(word => 
    password.toLowerCase().includes(word)
  );

  let strengthScore = 0;
  strengthScore += Math.min(length * 4, 40);
  if (hasUppercase) strengthScore += 10;
  if (hasLowercase) strengthScore += 10;
  if (hasNumbers) strengthScore += 10;
  if (hasSymbols) strengthScore += 15;
  strengthScore -= repeatedChars * 10;
  strengthScore -= sequences.length * 5;
  strengthScore -= dictionaryWords.length * 15;
  strengthScore = Math.max(0, Math.min(100, strengthScore));

  let strength: PasswordAnalysis['strength'];
  if (strengthScore < 20) strength = 'Very Weak';
  else if (strengthScore < 40) strength = 'Weak';
  else if (strengthScore < 60) strength = 'Medium';
  else if (strengthScore < 80) strength = 'Strong';
  else strength = 'Very Strong';

  return {
    length,
    hasLowercase,
    hasUppercase,
    hasNumbers,
    hasSymbols,
    entropy,
    charsetSize,
    repeatedChars,
    sequences,
    dictionaryWords,
    strength,
    strengthScore
  };
};

// Crack-Time Estimation
interface CrackTimeEstimate {
  seconds: number;
  display: string;
}

const estimateCrackTime = (entropy: number, attackModel: 'online' | 'offline' | 'gpu'): CrackTimeEstimate => {
  const guessRates = {
    online: 1000,
    offline: 1e9,
    gpu: 1e11
  };

  const rate = guessRates[attackModel];
  const combinations = Math.pow(2, entropy);
  const seconds = combinations / (2 * rate);

  let display: string;
  if (seconds < 1) display = 'Instant';
  else if (seconds < 60) display = `${Math.round(seconds)} seconds`;
  else if (seconds < 3600) display = `${Math.round(seconds / 60)} minutes`;
  else if (seconds < 86400) display = `${Math.round(seconds / 3600)} hours`;
  else if (seconds < 2592000) display = `${Math.round(seconds / 86400)} days`;
  else if (seconds < 31536000) display = `${Math.round(seconds / 2592000)} months`;
  else if (seconds < 3153600000) display = `${Math.round(seconds / 31536000)} years`;
  else display = 'Centuries';

  return { seconds, display };
};

// Generate security suggestions
const generateSuggestions = (analysis: PasswordAnalysis): string[] => {
  const suggestions: string[] = [];

  if (analysis.length < 12) {
    suggestions.push('Increase length to at least 12 characters');
  }
  if (!analysis.hasUppercase) {
    suggestions.push('Add uppercase letters (A-Z)');
  }
  if (!analysis.hasLowercase) {
    suggestions.push('Add lowercase letters (a-z)');
  }
  if (!analysis.hasNumbers) {
    suggestions.push('Include numbers (0-9)');
  }
  if (!analysis.hasSymbols) {
    suggestions.push('Add special symbols (!@#$%^&*)');
  }
  if (analysis.repeatedChars > 0) {
    suggestions.push('Avoid repeated characters (e.g., "aaa")');
  }
  if (analysis.sequences.length > 0) {
    suggestions.push('Avoid sequential patterns (e.g., "123", "abc")');
  }
  if (analysis.dictionaryWords.length > 0) {
    suggestions.push('Avoid common dictionary words');
  }

  if (suggestions.length === 0) {
    suggestions.push('Excellent! Your password is strong.');
  }

  return suggestions;
};

// Main Component
export default function PasswordAnalyzer() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [attackModel, setAttackModel] = useState<'online' | 'offline' | 'gpu'>('offline');
  const [entropyHistory, setEntropyHistory] = useState<Array<{ chars: number; entropy: number }>>([]);

  const analysis = useMemo(() => analyzePassword(password), [password]);
  const crackTime = useMemo(() => estimateCrackTime(analysis.entropy, attackModel), [analysis.entropy, attackModel]);
  const suggestions = useMemo(() => generateSuggestions(analysis), [analysis]);

  useEffect(() => {
    if (password.length > 0) {
      setEntropyHistory(prev => {
        const newHistory = [...prev, { chars: password.length, entropy: analysis.entropy }];
        return newHistory.slice(-50);
      });
    } else {
      setEntropyHistory([]);
    }
  }, [password.length, analysis.entropy]);

  const strengthColor = {
    'Very Weak': 'bg-red-500',
    'Weak': 'bg-orange-500',
    'Medium': 'bg-yellow-500',
    'Strong': 'bg-lime-500',
    'Very Strong': 'bg-green-500'
  }[analysis.strength];

  const strengthTextColor = {
    'Very Weak': 'text-red-400',
    'Weak': 'text-orange-400',
    'Medium': 'text-yellow-400',
    'Strong': 'text-lime-400',
    'Very Strong': 'text-green-400'
  }[analysis.strength];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8">
      {/* GitHub Floating Button */}
      <GithubFloatingButton repoUrl="https://github.com/yourusername/password-analyzer" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection delay={0}>
          <header className="mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Shield className="w-8 h-8 text-cyan-400" />
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent pb-1">
                Password Strength Analyzer
              </h1>
            </div>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Real-time entropy visualization & crack-time estimation • Privacy-first, client-side only
            </p>
          </header>
        </AnimatedSection>

        {/* Password Input Section */}
        <AnimatedSection delay={100}>
          <div className="mb-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-2xl transition-all duration-300 hover:shadow-cyan-500/10">
              <label htmlFor="password-input" className="block text-sm font-medium text-gray-300 mb-3">
                Enter Password to Analyze
              </label>
              <div className="relative">
                <input
                  id="password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-900/80 border border-gray-600 rounded-lg px-4 py-3 pr-24 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Type your password..."
                  aria-describedby="strength-badge"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-200 transition-all duration-200 hover:scale-110"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {password && (
                  <span
                    id="strength-badge"
                    className={`absolute right-14 top-1/2 -translate-y-1/2 px-2 py-1 rounded text-xs font-semibold ${strengthTextColor} animate-fade-in-scale`}
                    aria-live="polite"
                  >
                    {analysis.strength}
                  </span>
                )}
              </div>

              {/* Strength Bar */}
              {password && (
                <div className="mt-4 animate-fade-in">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${strengthColor} transition-all duration-500 ease-out`}
                      style={{ width: `${analysis.strengthScore}%` }}
                      role="progressbar"
                      aria-valuenow={analysis.strengthScore}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`Password strength: ${analysis.strengthScore}%`}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>

        {password && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Entropy & Strength Panel */}
            <AnimatedSection delay={200}>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-xl transition-all duration-300 hover:shadow-cyan-500/10 hover:border-gray-600/50">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <h2 className="text-xl font-semibold">Entropy & Strength</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Entropy</span>
                    <span className="text-2xl font-bold text-cyan-400">{analysis.entropy.toFixed(1)} bits</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Length</span>
                    <span className="font-semibold">{analysis.length} characters</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Character Set Size</span>
                    <span className="font-semibold">{analysis.charsetSize}</span>
                  </div>

                  <div className="border-t border-gray-700 pt-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Character Types</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'Lowercase', value: analysis.hasLowercase },
                        { label: 'Uppercase', value: analysis.hasUppercase },
                        { label: 'Numbers', value: analysis.hasNumbers },
                        { label: 'Symbols', value: analysis.hasSymbols }
                      ].map(({ label, value }) => (
                        <div key={label} className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${value ? 'bg-green-500 animate-pulse-subtle' : 'bg-gray-600'}`} />
                          <span className="text-sm text-gray-300">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {(analysis.repeatedChars > 0 || analysis.sequences.length > 0 || analysis.dictionaryWords.length > 0) && (
                    <div className="border-t border-gray-700 pt-4 animate-fade-in">
                      <h3 className="text-sm font-medium text-red-400 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Weaknesses Detected
                      </h3>
                      <ul className="text-sm text-gray-400 space-y-1">
                        {analysis.repeatedChars > 0 && <li>• {analysis.repeatedChars} repeated character pattern(s)</li>}
                        {analysis.sequences.length > 0 && <li>• Sequential patterns detected</li>}
                        {analysis.dictionaryWords.length > 0 && <li>• Contains common word(s)</li>}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </AnimatedSection>

            {/* Crack-Time Estimation */}
            <AnimatedSection delay={300}>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-xl transition-all duration-300 hover:shadow-red-500/10 hover:border-gray-600/50">
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="w-5 h-5 text-red-400" />
                  <h2 className="text-xl font-semibold">Crack-Time Estimation</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="attack-model" className="block text-sm text-gray-400 mb-2">
                      Attack Model
                    </label>
                    <select
                      id="attack-model"
                      value={attackModel}
                      onChange={(e) => setAttackModel(e.target.value as any)}
                      className="w-full bg-gray-900/80 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    >
                      <option value="online">Online Attack (1K guesses/sec)</option>
                      <option value="offline">Offline Attack (1B guesses/sec)</option>
                      <option value="gpu">GPU-Assisted (100B guesses/sec)</option>
                    </select>
                  </div>

                  <div className="bg-gray-900/60 rounded-lg p-4 border border-gray-700 transition-all duration-300 hover:border-cyan-500/30">
                    <div className="text-center">
                      <div className="text-sm text-gray-400 mb-1">Estimated Time to Crack</div>
                      <div className="text-3xl font-bold text-cyan-400 transition-all duration-300">{crackTime.display}</div>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mt-2">
                    * Estimates assume average-case scenario (50% of keyspace searched). Actual time may vary significantly based on attack sophistication and computational resources.
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Entropy Visualization */}
            <AnimatedSection delay={400} className="lg:col-span-2">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-xl transition-all duration-300 hover:shadow-blue-500/10 hover:border-gray-600/50">
                <h2 className="text-xl font-semibold mb-4">Real-Time Entropy Progression</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={entropyHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="chars" 
                        stroke="#9CA3AF"
                        label={{ value: 'Characters', position: 'insideBottom', offset: -5, fill: '#9CA3AF' }}
                      />
                      <YAxis 
                        stroke="#9CA3AF"
                        label={{ value: 'Entropy (bits)', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '0.5rem' }}
                        labelStyle={{ color: '#9CA3AF' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="entropy" 
                        stroke="#22D3EE" 
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </AnimatedSection>

            {/* Feedback & Suggestions */}
            <AnimatedSection delay={500} className="lg:col-span-2">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-xl transition-all duration-300 hover:shadow-green-500/10 hover:border-gray-600/50">
                <h2 className="text-xl font-semibold mb-4">Security Feedback & Suggestions</h2>
                <ul className="space-y-2">
                  {suggestions.map((suggestion, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-start gap-3 text-gray-300 animate-fade-in-up"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        )}

        {/* Privacy Notice */}
        <AnimatedSection delay={600}>
          <footer className="mt-8 text-center text-sm text-gray-500">
            <p>🔒 All analysis performed locally in your browser. No data is transmitted or stored.</p>
          </footer>
        </AnimatedSection>
      </div>
      
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }

        .animate-fade-in-scale {
          animation: fade-in-scale 0.3s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out both;
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in,
          .animate-fade-in-scale,
          .animate-fade-in-up,
          .animate-pulse-subtle {
            animation: none !important;
          }
          
          * {
            transition-duration: 0.01ms !important;
          }
        }

        /* Mobile responsive adjustments for GitHub button */
        @media (max-width: 640px) {
          .fixed.top-6.right-6 {
            top: 1rem;
            right: 1rem;
            padding: 0.5rem 0.75rem;
          }
          
          .fixed.top-6.right-6 span {
            display: none;
          }
          
          .fixed.top-6.right-6 svg {
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}