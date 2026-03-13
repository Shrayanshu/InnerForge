import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Discipline {
  id: string;
  name: string;
  action: string;
  cue: string;
  location: string;
  createdAt: number;
  status: 'active' | 'paused' | 'retired';
}

export interface DailyReflection {
  id: string;
  date: string;
  honored: string;
  struggle: string;
  improve: string;
}

export interface WeeklyReflection {
  id: string;
  date: string;
  reflection: string;
}

interface AppState {
  hasStartedTrial: boolean;
  isIdentityConfirmed: boolean;
  isFirstVowSpoken: boolean;
  isCreatingDiscipline: boolean;
  editingDisciplineId: string | null;
  identityStatement: string;
  coreValues: string[];
  mainFocus: string;
  disciplines: Discipline[];
  completions: Record<string, string[]>;
  completionValues: Record<string, Record<string, number>>;
  skipped: Record<string, string[]>;
  
  dailyReflections: DailyReflection[];
  weeklyReflections: WeeklyReflection[];
  
  activeTab: 'today' | 'progress' | 'training' | 'profile';
  selectedDisciplineId: string | null;
  isReflectingDaily: boolean;
  isReflectingWeekly: boolean;
  
  startTrial: () => void;
  confirmIdentity: () => void;
  speakFirstVow: () => void;
  setIsCreatingDiscipline: (isCreating: boolean) => void;
  setEditingDisciplineId: (id: string | null) => void;
  setIdentityStatement: (statement: string) => void;
  toggleCoreValue: (value: string) => void;
  setMainFocus: (focus: string) => void;
  addDiscipline: (discipline: Omit<Discipline, 'id' | 'createdAt' | 'status'>) => void;
  updateDiscipline: (id: string, updates: Partial<Omit<Discipline, 'id' | 'createdAt' | 'status'>>) => void;
  honorDiscipline: (id: string) => void;
  honorDisciplineWithValue: (id: string, value: number) => void;
  skipDiscipline: (id: string) => void;
  
  addDailyReflection: (reflection: Omit<DailyReflection, 'id' | 'date'>) => void;
  addWeeklyReflection: (reflection: Omit<WeeklyReflection, 'id' | 'date'>) => void;
  
  setActiveTab: (tab: 'today' | 'progress' | 'training' | 'profile') => void;
  setSelectedDisciplineId: (id: string | null) => void;
  setIsReflectingDaily: (isReflecting: boolean) => void;
  setIsReflectingWeekly: (isReflecting: boolean) => void;
  pauseDiscipline: (id: string) => void;
  resumeDiscipline: (id: string) => void;
  retireDiscipline: (id: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      hasStartedTrial: false,
      isIdentityConfirmed: false,
      isFirstVowSpoken: false,
      isCreatingDiscipline: false,
      editingDisciplineId: null,
      identityStatement: '',
      coreValues: [],
      mainFocus: '',
      disciplines: [],
      completions: {},
      completionValues: {},
      skipped: {},
      
      dailyReflections: [],
      weeklyReflections: [],
      
      activeTab: 'today',
      selectedDisciplineId: null,
      isReflectingDaily: false,
      isReflectingWeekly: false,
      
      startTrial: () => set({ hasStartedTrial: true }),
      confirmIdentity: () => set({ isIdentityConfirmed: true }),
      speakFirstVow: () => set({ isFirstVowSpoken: true }),
      setIsCreatingDiscipline: (isCreating) => set({ isCreatingDiscipline: isCreating }),
      setEditingDisciplineId: (id) => set({ editingDisciplineId: id }),
      setIdentityStatement: (statement) => set({ identityStatement: statement }),
      toggleCoreValue: (value) => set((state) => {
        if (state.coreValues.includes(value)) {
          return { coreValues: state.coreValues.filter((v) => v !== value) };
        }
        if (state.coreValues.length >= 3) return state; // Max 3 values
        return { coreValues: [...state.coreValues, value] };
      }),
      setMainFocus: (focus) => set({ mainFocus: focus }),
      addDiscipline: (discipline) => set((state) => ({
        disciplines: [
          ...state.disciplines,
          {
            ...discipline,
            id: crypto.randomUUID(),
            createdAt: Date.now(),
            status: 'active',
          }
        ],
        isCreatingDiscipline: false, // Auto-close creator after adding
      })),
      updateDiscipline: (id, updates) => set((state) => ({
        disciplines: state.disciplines.map(d => 
          d.id === id ? { ...d, ...updates } : d
        ),
        editingDisciplineId: null, // Auto-close editor after updating
      })),
      honorDiscipline: (id) => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        const current = state.completions[id] || [];
        if (!current.includes(today)) {
          return {
            completions: {
              ...state.completions,
              [id]: [...current, today]
            }
          };
        }
        return state;
      }),
      honorDisciplineWithValue: (id, value) => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        const currentCompletions = state.completions[id] || [];
        const currentValues = state.completionValues[id] || {};
        const currentSkipped = state.skipped[id] || [];
        
        return {
          completions: {
            ...state.completions,
            [id]: currentCompletions.includes(today) ? currentCompletions : [...currentCompletions, today]
          },
          completionValues: {
            ...state.completionValues,
            [id]: {
              ...currentValues,
              [today]: value
            }
          },
          skipped: {
            ...state.skipped,
            [id]: currentSkipped.filter(d => d !== today)
          }
        };
      }),
      skipDiscipline: (id) => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        const currentSkipped = state.skipped[id] || [];
        const currentCompletions = state.completions[id] || [];
        
        if (!currentSkipped.includes(today)) {
          return {
            skipped: {
              ...state.skipped,
              [id]: [...currentSkipped, today]
            },
            completions: {
              ...state.completions,
              [id]: currentCompletions.filter(d => d !== today)
            }
          };
        }
        return state;
      }),
      
      addDailyReflection: (reflection) => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        // Check if reflection for today already exists, if so update it
        const existingIndex = state.dailyReflections.findIndex(r => r.date === today);
        if (existingIndex >= 0) {
          const updated = [...state.dailyReflections];
          updated[existingIndex] = { ...updated[existingIndex], ...reflection };
          return { dailyReflections: updated };
        }
        return {
          dailyReflections: [
            ...state.dailyReflections,
            { ...reflection, id: crypto.randomUUID(), date: today }
          ]
        };
      }),
      
      addWeeklyReflection: (reflection) => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        // Check if reflection for today already exists, if so update it
        const existingIndex = state.weeklyReflections.findIndex(r => r.date === today);
        if (existingIndex >= 0) {
          const updated = [...state.weeklyReflections];
          updated[existingIndex] = { ...updated[existingIndex], ...reflection };
          return { weeklyReflections: updated };
        }
        return {
          weeklyReflections: [
            ...state.weeklyReflections,
            { ...reflection, id: crypto.randomUUID(), date: today }
          ]
        };
      }),
      
      setActiveTab: (tab) => set({ activeTab: tab }),
      setSelectedDisciplineId: (id) => set({ selectedDisciplineId: id }),
      setIsReflectingDaily: (isReflecting) => set({ isReflectingDaily: isReflecting }),
      setIsReflectingWeekly: (isReflecting) => set({ isReflectingWeekly: isReflecting }),
      pauseDiscipline: (id) => set((state) => ({
        disciplines: state.disciplines.map(d => d.id === id ? { ...d, status: 'paused' } : d)
      })),
      resumeDiscipline: (id) => set((state) => ({
        disciplines: state.disciplines.map(d => d.id === id ? { ...d, status: 'active' } : d)
      })),
      retireDiscipline: (id) => set((state) => ({
        disciplines: state.disciplines.map(d => d.id === id ? { ...d, status: 'retired' } : d)
      })),
    }),
    {
      name: 'innerforge-storage',
    }
  )
);

