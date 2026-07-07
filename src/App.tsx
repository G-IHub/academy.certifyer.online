import { useState, useEffect, useMemo } from 'react';
import { mockCourses } from './data/courses';
import type { Lesson, Exercise } from './data/courses';
import { getCookie, setCookie, deleteCookie } from './utils/cookieUtils';
import { 
  Award, 
  Flame, 
  LogIn, 
  LogOut, 
  CheckCircle, 
  Lock, 
  BookOpen, 
  ChevronRight, 
  Trophy,
  BookOpenCheck,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import './App.css';
import logo from "./assets/logo.png";

interface UserSession {
  email: string;
  points: number;
  streak: number;
  completedLessons: string[];
  unlockedBadges: string[];
  isDemo: boolean;
}

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  size: number;
}

const BADGES = [
  { id: 'first_quiz', name: 'First Quiz', description: 'Solve your first academy exercise', icon: '🎯' },
  { id: 'streak_3', name: 'Hot Streak', description: 'Maintain a 3-day learning streak', icon: '🔥' },
  { id: 'api_master', name: 'API Master', description: 'Complete the Developer API Integration course', icon: '💻' },
  { id: 'points_100', name: 'Centurion', description: 'Accumulate over 100 points', icon: '👑' }
];

function App() {
  // SSO Authentication & Session State
  const [session, setSession] = useState<UserSession | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Learning Navigation State
  const [selectedCourseId, setSelectedCourseId] = useState<string>('certifyer-bootcamp');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Quiz Engine State
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [blankAnswer, setBlankAnswer] = useState<string>('');
  const [quizStatus, setQuizStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  // Confetti Animation State
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  // Initialize Course details
  const activeCourse = useMemo(() => {
    return mockCourses.find(c => c.id === selectedCourseId) || mockCourses[0];
  }, [selectedCourseId]);

  const activeLesson = useMemo(() => {
    if (!activeLessonId) return null;
    for (const mod of activeCourse.modules) {
      const found = mod.lessons.find(l => l.id === activeLessonId);
      if (found) return found;
    }
    return null;
  }, [activeLessonId, activeCourse]);

  // Check shared cookie on component mount
  useEffect(() => {
    const token = getCookie('accessToken');
    if (token) {
      // Decode JWT locally for display purposes
      try {
        let email = 'student@certifyer.online';
        if (token.startsWith('admin-bypass-')) {
          email = atob(token.replace('admin-bypass-', '')).split(':')[0];
        } else {
          const parts = token.split('.');
          if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
            email = payload.email || email;
          }
        }
        
        // Mock profile statistics fetched from the server using the token
        setSession({
          email,
          points: 40,
          streak: 2,
          completedLessons: ['mod1-l1'],
          unlockedBadges: [],
          isDemo: false
        });
      } catch (err) {
        console.error('Failed to parse active token', err);
      }
    }
    setCheckingAuth(false);
  }, []);

  // Handle responsive sidebar collapsing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync token to cookie helper (Simulating a main-app sign-in locally)
  const handleLoginDemo = () => {
    // Generate a secure mock session
    const mockToken = 'admin-bypass-' + btoa('developer@certifyer.online:bypass');
    setCookie('accessToken', mockToken);
    
    setSession({
      email: 'developer@certifyer.online',
      points: 0,
      streak: 1,
      completedLessons: [],
      unlockedBadges: [],
      isDemo: true
    });
  };

  useEffect(() => {
    (window as any).triggerGuestSSO = handleLoginDemo;
    return () => {
      delete (window as any).triggerGuestSSO;
    };
  }, []);

  const handleLogout = () => {
    deleteCookie('accessToken');
    setSession(null);
    setActiveLessonId(null);
    setQuizStatus('idle');
  };

  // Determine if a lesson is unlocked
  const isLessonUnlocked = (_lessonId: string): boolean => {
    return true; // Always unlocked for free browsing
  };

  // Check exercise answer
  const handleSubmitAnswer = (exercise: Exercise) => {
    if (!session) return;

    let isCorrect = false;
    const cleanUserAns = exercise.type === 'fill-in-the-blank' 
      ? blankAnswer.trim().toLowerCase() 
      : selectedOption.trim().toLowerCase();
    
    const cleanCorrectAns = exercise.correctAnswer.trim().toLowerCase();

    if (cleanUserAns === cleanCorrectAns) {
      isCorrect = true;
    }

    if (isCorrect) {
      setQuizStatus('correct');
      setFeedbackMessage(`Correct! You have earned +${exercise.points} XP!`);
      triggerConfetti();

      // Update session statistics
      const updatedCompleted = session.completedLessons.includes(activeLessonId!)
        ? session.completedLessons
        : [...session.completedLessons, activeLessonId!];

      const newPoints = session.points + exercise.points;
      
      // Update badge unlock logic
      const newlyUnlockedBadges = [...session.unlockedBadges];
      if (!newlyUnlockedBadges.includes('first_quiz')) {
        newlyUnlockedBadges.push('first_quiz');
      }
      if (newPoints >= 100 && !newlyUnlockedBadges.includes('points_100')) {
        newlyUnlockedBadges.push('points_100');
      }
      // Simulate streak unlock badge
      if (session.streak >= 3 && !newlyUnlockedBadges.includes('streak_3')) {
        newlyUnlockedBadges.push('streak_3');
      }

      setSession({
        ...session,
        points: newPoints,
        completedLessons: updatedCompleted,
        unlockedBadges: newlyUnlockedBadges
      });

    } else {
      setQuizStatus('incorrect');
      setFeedbackMessage('Incorrect answer. Please review the material and try again.');
    }
  };

  const handleNextLesson = () => {
    const allCourseLessons: Lesson[] = [];
    activeCourse.modules.forEach(mod => {
      allCourseLessons.push(...mod.lessons);
    });

    const currIndex = allCourseLessons.findIndex(l => l.id === activeLessonId);
    if (currIndex !== -1 && currIndex < allCourseLessons.length - 1) {
      const nextId = allCourseLessons[currIndex + 1].id;
      setActiveLessonId(nextId);
      setSelectedOption('');
      setBlankAnswer('');
      setQuizStatus('idle');
      setFeedbackMessage('');
    }
  };

  // Generate success confetti
  const triggerConfetti = () => {
    const colors = ['#ea580c', '#10b981', '#f59e0b', '#ef4444', '#a855f7'];
    const newConfetti = Array.from({ length: 45 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.5,
      size: Math.random() * 8 + 6
    }));
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 3500);
  };

  // Computed Leaderboard rankings incorporating user dynamically
  const leaderboardData = useMemo(() => {
    const defaultRankings = [
      { name: 'emmanuel@certifyer.online', points: 180 },
      { name: 'tunde_dev', points: 140 },
      { name: 'student_tester', points: 70 }
    ];

    if (session) {
      const list = [...defaultRankings, { name: session.email, points: session.points }];
      return list.sort((a, b) => b.points - a.points);
    }
    return defaultRankings;
  }, [session]);

  if (checkingAuth) {
    return (
      <div className="flex h-screen justify-center items-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-foreground">Loading Academy Platform...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      
      {/* Confetti Particle Layer */}
      {confetti.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {confetti.map(c => (
            <div
              key={c.id}
              className="animate-confetti-fall absolute"
              style={{
                left: `${c.left}%`,
                backgroundColor: c.color,
                animationDelay: `${c.delay}s`,
                width: `${c.size}px`,
                height: `${c.size}px`,
                top: '-10px',
                borderRadius: '50%',
              }}
            />
          ))}
        </div>
      )}

      {/* Top SSO Navigation */}
      <nav className="flex justify-between items-center px-6 md:px-8 h-[70px] bg-card border-b border-border sticky top-0 z-40 backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 -ml-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            <Menu className="w-5 h-5" />
          </button>
          <img src={logo} alt="Logo" className='w-10 h-10' />
          <span className="font-extrabold text-sm md:text-2xl text-black bg-clip-text tracking-tight">
            Certifyer Academy
          </span>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {session ? (
            <>
              {/* DESKTOP LAYOUT (visible md and up) */}
              <div className="hidden md:flex items-center gap-3">
                {/* Gamification Stats */}
                <div className="flex gap-3">
                  <div className="flex items-center gap-1.5 bg-card border border-border px-3.5 py-1.5 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>{session.points} XP</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-card border border-border px-3.5 py-1.5 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                    <Flame className="w-4 h-4 text-amber-500 animate-flame" />
                    <span>{session.streak} Days</span>
                  </div>
                </div>

                {/* User Account Info */}
                <div className="flex items-center gap-2.5 bg-card border border-border px-3.5 py-1 rounded-full shadow-sm">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-400 to-rose-450 flex items-center justify-center text-white font-bold text-xs">
                    {session.email.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-medium max-w-[130px] truncate text-foreground">
                    {session.email}
                  </span>
                </div>

                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 bg-transparent border border-border hover:bg-muted text-muted-foreground hover:text-foreground px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>

              {/* MOBILE DROPDOWN LAYOUT (visible below md) */}
              <div className="flex md:hidden items-center relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-rose-450 flex items-center justify-center text-white font-bold text-sm shadow-md cursor-pointer transition-transform duration-200 active:scale-95"
                  title="Profile Menu"
                >
                  {session.email.charAt(0).toUpperCase()}
                </button>

                {isProfileDropdownOpen && (
                  <>
                    {/* Backdrop to close the dropdown when clicking outside */}
                    <div 
                      onClick={() => setIsProfileDropdownOpen(false)} 
                      className="fixed inset-0 z-40 bg-transparent"
                    />
                    
                    <div className="absolute right-0 top-12 z-50 bg-card border border-border rounded-xl p-4 shadow-lg flex flex-col gap-3 min-w-[220px] text-left">
                      <div className="pb-2 border-b border-border">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Logged in as</span>
                        <span className="text-xs font-semibold text-foreground block truncate">{session.email}</span>
                      </div>
                      
                      {/* Stats */}
                      <div className="flex flex-col gap-2 py-1">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="flex items-center gap-1.5 text-muted-foreground">
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                            XP Points
                          </span>
                          <span className="text-foreground font-bold">{session.points} XP</span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="flex items-center gap-1.5 text-muted-foreground">
                            <Flame className="w-3.5 h-3.5 text-amber-500 animate-flame" />
                            Streak
                          </span>
                          <span className="text-foreground font-bold">{session.streak} Days</span>
                        </div>
                      </div>

                      {/* Sign Out */}
                      <button 
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center justify-center gap-1.5 bg-muted hover:bg-border border border-border text-foreground py-2 rounded-lg text-xs font-bold cursor-pointer transition-all duration-200"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex gap-1.5 md:gap-2">
              <button 
                onClick={() => {
                  const parentLogin = window.location.hostname.includes('localhost') 
                    ? 'http://localhost:5173' 
                    : 'https://certifyer.online';
                  window.location.href = parentLogin;
                }}
                className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-white px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold cursor-pointer shadow-md shadow-primary/10 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </button>
              
              {/* <button 
                onClick={handleLoginDemo}
                className="bg-transparent border border-border hover:bg-muted text-muted-foreground px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold cursor-pointer transition-all duration-200"
              >
                Demo Guest
              </button> */}
            </div>
          )}
        </div>
      </nav>

      {/* Main Split Layout */}
      <div className="flex flex-1 overflow-hidden relative" style={{ height: 'calc(100vh - 70px)' }}>
        
        {/* Sidebar Backdrop Overlay on Mobile */}
        {isSidebarOpen && (
          <div 
            onClick={() => setIsSidebarOpen(false)} 
            className="fixed top-[70px] inset-x-0 bottom-0 bg-black/45 z-25 transition-opacity duration-300 lg:hidden"
          />
        )}
        
        {/* Left Sidebar Navigation */}
        <aside className={`
          fixed lg:static top-[70px] lg:top-0 bottom-0 left-0 z-35
          flex flex-col h-full bg-muted border-r border-border overflow-y-auto
          transition-all duration-300 ease-in-out
          ${isSidebarOpen 
            ? 'w-80 translate-x-0 opacity-100 shadow-xl lg:shadow-none' 
            : 'w-0 -translate-x-full lg:translate-x-0 opacity-0 overflow-hidden pointer-events-none'
          }
        `}>
          
          {/* Active Course Select */}
          <div className="p-4 border-b border-border bg-background flex items-center justify-between gap-2">
            <select
              value={selectedCourseId}
              onChange={(e) => {
                setSelectedCourseId(e.target.value);
                setActiveLessonId(null);
                setQuizStatus('idle');
              }}
              className="flex-1 p-2.5 rounded-lg border border-border bg-card text-foreground text-sm font-semibold shadow-sm focus:border-primary outline-none cursor-pointer"
            >
              {mockCourses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              title="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Module list */}
          <div className="flex-1 py-4">
            {activeCourse.modules.map(mod => (
              <div key={mod.id} className="mb-4">
                <div className="text-xs font-bold text-muted-foreground uppercase px-6 py-2 tracking-wider">
                  {mod.title}
                </div>
                <div>
                  {mod.lessons.map(les => {
                    const unlocked = isLessonUnlocked(les.id);
                    const active = activeLessonId === les.id;
                    const completed = session?.completedLessons.includes(les.id);

                    return (
                      <div
                        key={les.id}
                        onClick={() => unlocked && setActiveLessonId(les.id)}
                        className={`flex items-center justify-between px-6 py-3 border-l-4 transition-all duration-150 text-sm font-medium cursor-pointer ${
                          active 
                            ? 'bg-primary-glow text-primary border-l-primary font-semibold' 
                            : 'border-l-transparent text-muted-foreground hover:bg-background/50 hover:text-foreground'
                        } ${!unlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <span className="truncate pr-2">{les.title}</span>
                        <div className="flex items-center">
                          {completed && <CheckCircle className="w-4 h-4 text-emerald-550" />}
                          {!unlocked && <Lock className="w-3.5 h-3.5 text-muted-foreground" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Gamification badging & mini-leaderboard */}
          {session && (
            <div className="p-5 border-t border-border bg-background flex flex-col gap-5 mt-auto">
              
              {/* Badges list */}
              <div>
                <h3 className="text-xs font-bold text-muted-foreground uppercase mb-3 tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-primary" />
                  Unlocked Badges
                </h3>
                <div className="flex gap-2.5 flex-wrap">
                  {BADGES.map(badge => {
                    const unlocked = session.unlockedBadges.includes(badge.id);
                    return (
                      <div
                        key={badge.id}
                        className={`group relative flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-200 ${
                          unlocked 
                            ? 'bg-accent-glow border-amber-300 dark:border-amber-800/50 text-amber-600 scale-105' 
                            : 'bg-card border-border opacity-30 grayscale'
                        }`}
                      >
                        <span className="text-xl">{badge.icon}</span>
                        
                        {/* Tooltip */}
                        <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute bottom-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg border border-slate-800 z-50 transition-all duration-200 whitespace-nowrap">
                          <strong className="block text-amber-400">{badge.name}</strong>
                          <span className="text-slate-300 text-[10px]">{badge.description}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Leaderboard stats */}
              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  Weekly Leaderboard
                </h3>
                <div className="flex flex-col gap-1.5">
                  {leaderboardData.slice(0, 3).map((item, index) => {
                    const isCurrentUser = item.name === session.email;
                    return (
                      <div 
                        key={item.name} 
                        className={`flex justify-between items-center text-xs py-1.5 px-3 rounded-lg border ${
                          isCurrentUser 
                            ? 'bg-primary-glow border-primary/30 font-semibold' 
                            : 'bg-card border-border'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-muted-foreground">#{index + 1}</span>
                          <span className="truncate max-w-[120px] text-foreground">
                            {item.name.split('@')[0]}
                          </span>
                        </div>
                        <span className="font-bold text-primary">{item.points} XP</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}
        </aside>

        {/* Right Content panel */}
        <main className="flex-1 overflow-y-auto bg-background p-6 md:p-10 flex flex-col gap-8">
          
          {activeLesson ? (
            <>
              {/* Lesson body markdown */}
              <article className="prose dark:prose-invert max-w-none bg-card border border-border rounded-xl p-6 md:p-10 shadow-sm text-foreground">
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: activeLesson.contentMarkdown
                      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-extrabold text-foreground tracking-tight mb-6 pb-3 border-b border-border">$1</h1>')
                      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-foreground mt-8 mb-4">$1</h2>')
                      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-foreground mt-6 mb-3">$1</h3>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>')
                      .replace(/`([^`]+)`/g, '<code class="bg-muted text-primary font-mono text-xs px-1.5 py-0.5 rounded font-semibold">$1</code>')
                      .replace(/> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-4 py-1 italic my-4 text-muted-foreground bg-muted rounded-r-lg">$1</blockquote>')
                      .replace(/\n\s*-\s*(.*)/g, '<li class="ml-5 list-disc mb-1">$1</li>')
                      .trim()
                  }} 
                />
                
                {!activeLesson.exercise && (
                  <div className="flex justify-end mt-8 pt-6 border-t border-border">
                    <button
                      onClick={handleNextLesson}
                      className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-6 py-2.5 rounded-lg cursor-pointer transition-all duration-200 shadow-md shadow-primary/15"
                    >
                      Next Lesson
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </article>

              {/* Inline Interactive quiz box */}
              {activeLesson.exercise && (
                <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
                  <div className="flex justify-between items-center border-b border-border pb-4">
                    <h3 className="flex items-center gap-2 font-bold text-foreground text-base">
                      <BookOpenCheck className="w-5 h-5 text-primary" />
                      Practice Exercise
                    </h3>
                    <span className="text-xs font-bold text-primary bg-primary-glow border border-primary/20 px-2.5 py-1 rounded-lg">
                      +{activeLesson.exercise.points} XP
                    </span>
                  </div>

                  <div className="text-sm font-semibold text-foreground">
                    {activeLesson.exercise.question}
                  </div>

                  {activeLesson.exercise.type === 'multiple-choice' ? (
                    <div className="flex flex-col gap-3">
                      {activeLesson.exercise.options?.map(opt => {
                        const isSelected = selectedOption === opt;
                        return (
                          <div
                            key={opt}
                            onClick={() => setSelectedOption(opt)}
                            className={`flex items-center gap-3 border rounded-xl px-5 py-4 cursor-pointer transition-all duration-150 font-medium ${
                              isSelected 
                                ? 'border-primary bg-primary-glow text-primary font-semibold shadow-sm' 
                                : 'border-border hover:bg-muted text-foreground'
                            }`}
                          >
                            <input
                              type="radio"
                              name="exercise-option"
                              checked={isSelected}
                              onChange={() => setSelectedOption(opt)}
                              className="accent-primary w-4.5 h-4.5"
                            />
                            <span className="text-sm">{opt}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div>
                      <input
                        type="text"
                        placeholder="Type correct answer..."
                        value={blankAnswer}
                        onChange={(e) => setBlankAnswer(e.target.value)}
                        className="w-full max-w-md p-3 rounded-lg border border-border bg-muted text-foreground font-semibold text-sm outline-none focus:border-primary focus:bg-card focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  )}

                  <div className="flex gap-3 items-center pt-2">
                    <button
                      disabled={
                        activeLesson.exercise.type === 'multiple-choice'
                          ? !selectedOption
                          : !blankAnswer
                      }
                      onClick={() => handleSubmitAnswer(activeLesson.exercise!)}
                      className="bg-primary hover:bg-primary/90 active:scale-[0.98] text-white font-semibold text-sm px-6 py-2.5 rounded-lg cursor-pointer transition-all duration-200 shadow-md shadow-primary/15 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                      Submit Answer
                    </button>

                    <button 
                      onClick={handleNextLesson}
                      className="flex items-center gap-1 bg-muted hover:bg-border text-foreground font-semibold text-sm px-6 py-2.5 rounded-lg cursor-pointer transition-all duration-200 border border-border"
                    >
                      Next Lesson
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Feedback Message */}
                  {quizStatus !== 'idle' && (
                    <div className={`flex items-center gap-2 p-4 rounded-lg font-semibold text-sm border ${
                      quizStatus === 'correct' 
                        ? 'bg-success-glow text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                        : 'bg-error-glow text-destructive border-destructive/20'
                    }`}>
                      <span>{quizStatus === 'correct' ? '✅' : '❌'}</span>
                      <p>{feedbackMessage}</p>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="max-w-3xl mx-auto my-12 text-center flex flex-col items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center text-4xl shadow-inner animate-bounce">
                <img src={logo} alt="Logo" className='w-14 h-14' />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                Certifyer Academy Bootcamp
              </h1>
              <p className="text-base text-muted-foreground max-w-xl">
                {session 
                  ? 'Select a course from the sidebar and get started with your first interactive lesson!' 
                  : 'Start your journey to package your skills, build templates, and sell digital assets. Sign in with your Certifyer account to track stats.'}
              </p>

              {/* {!session && (
                <div className="flex gap-3 mt-2">
                  <button 
                    onClick={() => {
                      const parentLogin = window.location.hostname.includes('localhost') 
                        ? 'http://localhost:5173' 
                        : 'https://certifyer.online';
                      window.location.href = parentLogin;
                    }}
                    className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white px-5 py-3 rounded-lg text-sm font-semibold shadow-md shadow-primary/10 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <LogIn className="w-4 h-4" />
                    Authenticate Session
                  </button>
                  <button 
                    onClick={handleLoginDemo}
                    className="bg-transparent border border-border hover:bg-muted text-muted-foreground px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-200"
                  >
                    Browse as Guest (Demo SSO)
                  </button>
                </div>
              )} */}

              {/* Course Catalog display */}
              <div className="w-full mt-10 border-t border-border pt-10">
                <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6 flex items-center justify-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-primary" />
                  Active Curriculums
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  {mockCourses.map(c => (
                    <div
                      key={c.id}
                      onClick={() => {
                        setSelectedCourseId(c.id);
                        if (session) {
                          setActiveLessonId(c.modules[0].lessons[0].id);
                        }
                      }}
                      className="group bg-card border border-border hover:border-primary rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between shadow-sm"
                    >
                      <div>
                        <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          c.difficulty === 'Beginner' 
                            ? 'bg-orange-100 text-orange-600 border border-orange-400' 
                            : 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-200/50'
                        }`}>
                          {c.difficulty}
                        </span>
                        <h3 className="font-bold text-base text-foreground mt-3 group-hover:text-primary transition-all">
                          {c.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                          {c.description}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-primary mt-4 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-all">
                        Begin Bootcamp
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}

export default App;
