import { useState, useEffect, useMemo } from 'react';
import { mockCourses, Course, Lesson, Exercise } from './data/courses';
import { getCookie, setCookie, deleteCookie } from './utils/cookieUtils';
import './App.css';

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
  const [selectedCourseId, setSelectedCourseId] = useState<string>('certifyer-101');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

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
          completedLessons: ['lesson-welcome'],
          unlockedBadges: [],
          isDemo: false
        });
      } catch (err) {
        console.error('Failed to parse active token', err);
      }
    }
    setCheckingAuth(false);
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

  const handleLogout = () => {
    deleteCookie('accessToken');
    setSession(null);
    setActiveLessonId(null);
    setQuizStatus('idle');
  };

  // Determine if a lesson is unlocked
  const isLessonUnlocked = (lessonId: string): boolean => {
    if (!session) return false;
    
    // Find flattened list of lessons in active course
    const allCourseLessons: Lesson[] = [];
    activeCourse.modules.forEach(mod => {
      allCourseLessons.push(...mod.lessons);
    });

    const index = allCourseLessons.findIndex(l => l.id === lessonId);
    if (index === 0) return true; // First lesson is always unlocked

    // Unlocked if previous lesson is completed
    const prevLesson = allCourseLessons[index - 1];
    return session.completedLessons.includes(prevLesson.id);
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
      setFeedbackMessage(`Correct! You have earned +${exercise.points} points!`);
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
      
      // Check if API course is fully completed
      if (selectedCourseId === 'certifyer-api-201' && !newlyUnlockedBadges.includes('api_master')) {
        newlyUnlockedBadges.push('api_master');
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
    // Navigate to next lesson
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
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#a855f7'];
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
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--bg-main)' }}>
        <h3 style={{ color: 'var(--text-heading)', fontWeight: 600 }}>Loading Academy Platform...</h3>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Confetti Explosion Layer */}
      {confetti.length > 0 && (
        <div className="confetti-overlay">
          <style>{`
            @keyframes confetti-fall {
              0% { transform: translateY(-5vh) rotate(0deg); opacity: 1; }
              100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
            }
          `}</style>
          {confetti.map(c => (
            <div
              key={c.id}
              className="confetti-piece"
              style={{
                left: `${c.left}%`,
                backgroundColor: c.color,
                animationDelay: `${c.delay}s`,
                width: `${c.size}px`,
                height: `${c.size}px`,
                position: 'absolute',
                top: '-10px',
                borderRadius: '50%',
                animation: 'confetti-fall 3s linear forwards'
              }}
            />
          ))}
        </div>
      )}

      {/* Top SSO Navigation */}
      <nav className="top-nav">
        <div className="brand-section">
          <span className="brand-logo">Certifyer</span>
          <span className="brand-badge">Academy</span>
        </div>

        <div className="nav-right">
          {session ? (
            <>
              {/* Gamification stats */}
              <div className="stats-container">
                <div className="stat-pill points" title="Total Points Earned">
                  <span className="icon-points">✨</span>
                  <span>{session.points} XP</span>
                </div>
                <div className="stat-pill streak" title="Daily Streak Count">
                  <span className="icon-streak">🔥</span>
                  <span>{session.streak} Days</span>
                </div>
              </div>

              {/* Active Logged-in User */}
              <div className="user-widget">
                <div className="user-avatar">
                  {session.email.charAt(0).toUpperCase()}
                </div>
                <span className="user-email">{session.email}</span>
              </div>

              <button className="btn-auth logout" onClick={handleLogout}>
                Sign Out
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {/* Redirect triggers to parent certifyer.online */}
              <button 
                className="btn-auth login" 
                onClick={() => {
                  const parentLogin = window.location.hostname.includes('localhost') 
                    ? 'http://localhost:5173' 
                    : 'https://certifyer.online';
                  window.location.href = parentLogin;
                }}
              >
                Sign In with Certifyer
              </button>
              
              {/* Local Dev bypass sandbox */}
              <button className="btn-auth logout" onClick={handleLoginDemo}>
                Demo Guest SSO
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Core Split Layout */}
      <div className="main-layout">
        
        {/* Left Lesson Navigation Sidebar */}
        <aside className="sidebar">
          
          {/* Active Course Dropdown */}
          <div className="course-selector-container">
            <select
              className="course-select"
              value={selectedCourseId}
              onChange={(e) => {
                setSelectedCourseId(e.target.value);
                setActiveLessonId(null);
                setQuizStatus('idle');
              }}
            >
              {mockCourses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          {/* Module navigation list */}
          <div style={{ flex: 1 }}>
            {activeCourse.modules.map(mod => (
              <div key={mod.id} className="module-group">
                <div className="module-header">{mod.title}</div>
                {mod.lessons.map(les => {
                  const unlocked = isLessonUnlocked(les.id);
                  const active = activeLessonId === les.id;
                  const completed = session?.completedLessons.includes(les.id);

                  return (
                    <div
                      key={les.id}
                      className={`lesson-item ${active ? 'active' : ''} ${!unlocked ? 'locked' : ''}`}
                      onClick={() => unlocked && setActiveLessonId(les.id)}
                    >
                      <span>{les.title}</span>
                      <div className="lesson-meta">
                        {completed && <span style={{ color: 'var(--success)' }}>✔</span>}
                        {!unlocked && <span>🔒</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Mini-leaderboard widget & Badge overview */}
          {session && (
            <div className="sidebar-footer">
              <div className="badges-section" style={{ marginBottom: '1.25rem' }}>
                <h3>Badges</h3>
                <div className="badge-grid">
                  {BADGES.map(badge => {
                    const unlocked = session.unlockedBadges.includes(badge.id);
                    return (
                      <div
                        key={badge.id}
                        className={`badge-item ${unlocked ? 'unlocked' : 'locked'}`}
                      >
                        <span className="badge-icon">{badge.icon}</span>
                        <div className="badge-tooltip">
                          <strong>{badge.name}</strong>: {badge.description}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mini-leaderboard">
                <h4>Leaderboard</h4>
                {leaderboardData.slice(0, 3).map((item, index) => {
                  const isCurrentUser = item.name === session.email;
                  return (
                    <div key={item.name} className={`leader-row ${isCurrentUser ? 'highlight' : ''}`}>
                      <span className="leader-rank">#{index + 1}</span>
                      <span className="leader-name">{item.name.split('@')[0]}</span>
                      <span className="leader-pts">{item.points} XP</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </aside>

        {/* Right Active Lesson View */}
        <main className="content-area">
          {activeLesson ? (
            <>
              {/* Lesson body content */}
              <div className="lesson-markdown">
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: activeLesson.contentMarkdown
                      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/`([^`]+)`/g, '<code>$1</code>')
                      .replace(/\n\s*-\s*(.*)/g, '<li>$1</li>')
                      .trim()
                  }} 
                />
              </div>

              {/* Embed exercise checks */}
              {activeLesson.exercise && (
                <div className="exercise-box">
                  <div className="exercise-header">
                    <span className="exercise-title">📝 Practice Exercise</span>
                    <span className="exercise-points-badge">+{activeLesson.exercise.points} XP</span>
                  </div>
                  
                  <div className="exercise-question">
                    {activeLesson.exercise.question}
                  </div>

                  {activeLesson.exercise.type === 'multiple-choice' ? (
                    <div className="mc-options">
                      {activeLesson.exercise.options?.map(opt => (
                        <div
                          key={opt}
                          className={`mc-option ${selectedOption === opt ? 'selected' : ''}`}
                          onClick={() => setSelectedOption(opt)}
                        >
                          <input
                            type="radio"
                            name="exercise-option"
                            checked={selectedOption === opt}
                            onChange={() => setSelectedOption(opt)}
                          />
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <input
                        type="text"
                        className="fib-input"
                        placeholder="Type answer here..."
                        value={blankAnswer}
                        onChange={(e) => setBlankAnswer(e.target.value)}
                      />
                    </div>
                  )}

                  <div className="exercise-actions">
                    <button
                      className="btn-submit"
                      disabled={
                        activeLesson.exercise.type === 'multiple-choice'
                          ? !selectedOption
                          : !blankAnswer
                      }
                      onClick={() => handleSubmitAnswer(activeLesson.exercise!)}
                    >
                      Submit Answer
                    </button>

                    {quizStatus === 'correct' && (
                      <button className="btn-next" onClick={handleNextLesson}>
                        Next Lesson ➔
                      </button>
                    )}
                  </div>

                  {quizStatus !== 'idle' && (
                    <div className={`feedback-banner ${quizStatus === 'correct' ? 'correct' : 'incorrect'}`}>
                      {quizStatus === 'correct' ? '✅' : '❌'} {feedbackMessage}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="welcome-screen">
              <span className="welcome-logo">🎓</span>
              <h1>Welcome to Certifyer Academy</h1>
              <p>
                {session 
                  ? 'Select a course from the dropdown and select a lesson to start your journey.' 
                  : 'Please sign in with your Certifyer account to sync your progress, earn experience points (XP), and unlock credentials.'}
              </p>

              {!session && (
                <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                  <button 
                    className="btn-auth login"
                    onClick={() => {
                      const parentLogin = window.location.hostname.includes('localhost') 
                        ? 'http://localhost:5173' 
                        : 'https://certifyer.online';
                      window.location.href = parentLogin;
                    }}
                  >
                    Authenticate Now
                  </button>
                  <button className="btn-auth logout" onClick={handleLoginDemo}>
                    Browse as Guest (Demo SSO)
                  </button>
                </div>
              )}

              <div style={{ width: '100%', marginTop: '3rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-heading)' }}>
                  Available Academy Programs
                </h2>
                <div className="course-card-grid">
                  {mockCourses.map(c => (
                    <div
                      key={c.id}
                      className="course-card"
                      onClick={() => {
                        setSelectedCourseId(c.id);
                        if (session) {
                          // Auto open first lesson if unlocked
                          setActiveLessonId(c.modules[0].lessons[0].id);
                        }
                      }}
                    >
                      <div>
                        <span className={`course-difficulty-badge ${c.difficulty}`}>
                          {c.difficulty}
                        </span>
                        <h3 style={{ marginTop: '0.5rem' }}>{c.title}</h3>
                        <p>{c.description}</p>
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
                        Start Learning ➔
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
