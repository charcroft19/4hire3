import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Filter from 'bad-words';
import { useAuth } from './AuthContext';

interface SafetyContextType {
  reportUser: (userId: string, reason: string) => void;
  isUserReported: (userId: string) => boolean;
  filterInappropriateContent: (content: string) => string;
  getReportedUsers: () => ReportedUser[];
  emergencyContacts: EmergencyContact[];
  addEmergencyContact: (contact: EmergencyContact) => void;
  removeEmergencyContact: (id: string) => void;
}

interface ReportedUser {
  id: string;
  reportedBy: string;
  reason: string;
  timestamp: Date;
  status: 'pending' | 'reviewed' | 'resolved';
}

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

const SafetyContext = createContext<SafetyContextType | undefined>(undefined);

const wordFilter = new Filter();

export const SafetyProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [reportedUsers, setReportedUsers] = useState<ReportedUser[]>([]);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);

  useEffect(() => {
    const storedReports = localStorage.getItem('reportedUsers');
    const storedContacts = localStorage.getItem('emergencyContacts');
    
    if (storedReports) {
      const parsedReports = JSON.parse(storedReports);
      setReportedUsers(parsedReports.map((report: any) => ({
        ...report,
        timestamp: new Date(report.timestamp)
      })));
    }
    
    if (storedContacts) {
      setEmergencyContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('reportedUsers', JSON.stringify(reportedUsers));
    localStorage.setItem('emergencyContacts', JSON.stringify(emergencyContacts));
  }, [reportedUsers, emergencyContacts]);

  const reportUser = (userId: string, reason: string) => {
    if (!user) return;
    
    const newReport: ReportedUser = {
      id: userId,
      reportedBy: user.id,
      reason,
      timestamp: new Date(),
      status: 'pending'
    };
    
    setReportedUsers(prev => [...prev, newReport]);
  };

  const isUserReported = (userId: string) => {
    return reportedUsers.some(report => report.id === userId);
  };

  const filterInappropriateContent = (content: string) => {
    try {
      return wordFilter.clean(content);
    } catch {
      return content;
    }
  };

  const getReportedUsers = () => {
    return reportedUsers;
  };

  const addEmergencyContact = (contact: EmergencyContact) => {
    setEmergencyContacts(prev => [...prev, contact]);
  };

  const removeEmergencyContact = (id: string) => {
    setEmergencyContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return (
    <SafetyContext.Provider value={{
      reportUser,
      isUserReported,
      filterInappropriateContent,
      getReportedUsers,
      emergencyContacts,
      addEmergencyContact,
      removeEmergencyContact
    }}>
      {children}
    </SafetyContext.Provider>
  );
};

export const useSafety = () => {
  const context = useContext(SafetyContext);
  if (context === undefined) {
    throw new Error('useSafety must be used within a SafetyProvider');
  }
  return context;
};