import React, { createContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { fetchUser } from './api';

interface AuthContextProps {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
  name: string | null;
  setName: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextProps>({ session: null, setSession: () => {}, name: null, setName: () => {} });

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchUser(session).then((data) => {
          setName(data.name);
        });
      };
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchUser(session).then((data) => {
          setName(data.name);
        });
      };
    });
  
  }, []);

  return (
    <AuthContext.Provider value={{ session, setSession, name, setName }}>
      {children}
    </AuthContext.Provider>
  );
};