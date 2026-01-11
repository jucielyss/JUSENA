
import React, { useState, useEffect, useMemo } from 'react';
import { UserRole, Job, Application, AppNotification } from './types';
import { MOCK_JOBS } from './constants';
import JobMap from './components/JobMap';
import JobList from './components/JobList';
import BottomNav from './components/BottomNav';
import EmployerPortal from './components/EmployerPortal';
import Profile from './components/Profile';
import Header from './components/Header';
import JobDetail from './components/JobDetail';
import AuthFlow from './components/AuthFlow';
import MyApplications from './components/MyApplications';
import EmployerCandidates from './components/EmployerCandidates';
import Notifications from './components/Notifications';
import { geminiService } from './services/gemini';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<UserRole>('candidate');
  const [activeTab, setActiveTab] = useState<'map' | 'list' | 'profile' | 'employer' | 'candidaturas' | 'candidatos'>('map');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  
  // App state
  const [applications, setApplications] = useState<Application[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // Authentication check
  useEffect(() => {
    const session = localStorage.getItem('session_simulated');
    const storedRole = localStorage.getItem('user_type') as UserRole;
    if (session === 'true' && storedRole) {
      setRole(storedRole);
      setIsAuthenticated(true);
    }
  }, []);

  // Simulate Push Notifications Logic
  useEffect(() => {
    if (isAuthenticated && role === 'candidate' && notifications.length === 0) {
      // Simulate an AI-driven job match alert 3 seconds after login
      const timer = setTimeout(async () => {
        const profileStr = localStorage.getItem('candidate_profile');
        if (profileStr) {
          const profile = JSON.parse(profileStr);
          const matchJob = jobs[0];
          const aiMessage = await geminiService.generateMatchAlert(profile, matchJob);
          
          const newNotif: AppNotification = {
            id: 'match-1',
            type: 'job_alert',
            title: 'Match Perfeito!',
            message: aiMessage,
            timestamp: 'Agora',
            read: false,
            relatedId: matchJob.id
          };
          setNotifications([newNotif]);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, role, jobs]);

  // Sync tab on role change
  useEffect(() => {
    if (isAuthenticated) {
      if (role === 'employer') {
        if (activeTab === 'map' || activeTab === 'list' || activeTab === 'candidaturas') {
          setActiveTab('employer');
        }
      } else {
        if (activeTab === 'employer' || activeTab === 'candidatos') {
          setActiveTab('map');
        }
      }
    }
  }, [role, isAuthenticated]);

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [jobs, searchQuery]);

  const handleApply = (job: Job) => {
    if (applications.find(a => a.jobId === job.id)) {
      alert("Você já se candidatou a esta vaga!");
      return;
    }
    const newApp: Application = {
      id: Math.random().toString(36).substr(2, 9),
      jobId: job.id,
      candidateId: 'me',
      status: 'pending',
      appliedAt: new Date().toISOString()
    };
    setApplications([...applications, newApp]);
    setSelectedJob(null);
  };

  const handleToggleSave = (jobId: string) => {
    setSavedJobIds(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const handleLogin = (userRole: UserRole) => {
    setRole(userRole);
    setIsAuthenticated(true);
    localStorage.setItem('session_simulated', 'true');
    localStorage.setItem('user_type', userRole);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('session_simulated');
    localStorage.removeItem('user_type');
    setNotifications([]);
    setActiveTab('map');
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  if (!isAuthenticated) {
    return <AuthFlow onAuthenticated={handleLogin} />;
  }

  const renderContent = () => {
    if (showNotifications) {
      return (
        <Notifications 
          notifications={notifications} 
          onBack={() => setShowNotifications(false)}
          onMarkRead={markRead}
          onClearAll={() => setNotifications([])}
        />
      );
    }

    if (selectedJob) {
      return (
        <JobDetail 
          job={selectedJob} 
          isApplied={!!applications.find(a => a.jobId === selectedJob.id)}
          isSaved={savedJobIds.includes(selectedJob.id)}
          onClose={() => setSelectedJob(null)} 
          onApply={() => handleApply(selectedJob)}
          onToggleSave={() => handleToggleSave(selectedJob.id)}
        />
      );
    }

    if (activeTab === 'profile') {
      return (
        <Profile 
          role={role} 
          stats={{
            applications: applications.length,
            saved: savedJobIds.length
          }}
          onRoleSwitch={(r) => { setRole(r); localStorage.setItem('user_type', r); }} 
          onLogout={handleLogout} 
        />
      );
    }

    if (activeTab === 'candidaturas' && role === 'candidate') {
      return (
        <MyApplications 
          applications={applications} 
          savedJobIds={savedJobIds} 
          jobs={jobs} 
          onSelectJob={setSelectedJob} 
        />
      );
    }

    if (activeTab === 'candidatos' && role === 'employer') {
      return <EmployerCandidates jobs={jobs} />;
    }

    if (activeTab === 'employer' && role === 'employer') {
      return <EmployerPortal jobs={jobs} onAddJob={(newJob) => setJobs([newJob, ...jobs])} />;
    }

    return (
      <div className="flex flex-col h-full overflow-hidden">
        <Header 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          unreadNotifications={unreadCount}
          onOpenNotifications={() => setShowNotifications(true)}
        />
        <main className="flex-1 relative overflow-hidden">
          {viewMode === 'map' ? (
            <JobMap jobs={filteredJobs} onSelectJob={setSelectedJob} />
          ) : (
            <div className="h-full overflow-y-auto pb-20 no-scrollbar px-4 pt-4">
              <JobList jobs={filteredJobs} onSelectJob={setSelectedJob} />
            </div>
          )}
        </main>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-slate-950 flex flex-col shadow-2xl relative overflow-hidden border-x border-slate-900">
      {renderContent()}
      {!showNotifications && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} role={role} />}
    </div>
  );
};

export default App;
