'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { DEFAULT_HOUR, getHour, type Hour, type HourId } from '@/data/visit';

type VisitContextValue = {
  hour: Hour;
  /** True once the visitor has picked an hour themselves. */
  chosen: boolean;
  chooseHour: (id: HourId) => void;
};

const VisitContext = createContext<VisitContextValue | null>(null);

/** Shares the hour the visitor asks for across the drawing, the timetable and every WhatsApp link. */
export function VisitProvider({ children }: { children: React.ReactNode }) {
  const [hourId, setHourId] = useState<HourId>(DEFAULT_HOUR);
  const [chosen, setChosen] = useState(false);

  const chooseHour = useCallback((id: HourId) => {
    setHourId(id);
    setChosen(true);
  }, []);

  const value = useMemo(
    () => ({ hour: getHour(hourId), chosen, chooseHour }),
    [hourId, chosen, chooseHour]
  );

  return <VisitContext.Provider value={value}>{children}</VisitContext.Provider>;
}

export function useVisit(): VisitContextValue {
  const context = useContext(VisitContext);
  if (!context) throw new Error('useVisit must be used inside VisitProvider');
  return context;
}

/** For shared components that may render outside the provider. */
export const useOptionalVisit = () => useContext(VisitContext);
