/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { WelcomeScreen } from './pages/WelcomeScreen';
import { IdentityBuilder } from './pages/IdentityBuilder';
import { DisciplineCreator } from './pages/DisciplineCreator';
import { VowScreen } from './pages/VowScreen';
import { TodayDashboard } from './pages/TodayDashboard';
import { TrainingLogScreen } from './pages/TrainingLogScreen';
import { TrainingManagementScreen } from './pages/TrainingManagementScreen';
import { ProgressScreen } from './pages/ProgressScreen';
import { DailyReflectionScreen } from './pages/DailyReflectionScreen';
import { WeeklyEvaluationScreen } from './pages/WeeklyEvaluationScreen';
import { ProfileScreen } from './pages/ProfileScreen';
import { useStore } from './store/useStore';

export default function App() {
  const { 
    hasStartedTrial, 
    isIdentityConfirmed, 
    disciplines, 
    isFirstVowSpoken,
    isCreatingDiscipline,
    editingDisciplineId,
    selectedDisciplineId,
    isReflectingDaily,
    isReflectingWeekly,
    activeTab
  } = useStore();

  const [showExitModal, setShowExitModal] = useState(false);

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [
    hasStartedTrial, 
    isIdentityConfirmed, 
    isFirstVowSpoken,
    isCreatingDiscipline,
    editingDisciplineId,
    selectedDisciplineId,
    isReflectingDaily,
    isReflectingWeekly,
    activeTab
  ]);

  // Back button behavior
  useEffect(() => {
    // Push initial state to trap the back button
    window.history.pushState({ isApp: true }, '');

    const handlePopState = (e: PopStateEvent) => {
      const state = useStore.getState();
      
      const isDashboard = state.hasStartedTrial && 
                          state.isIdentityConfirmed && 
                          state.isFirstVowSpoken && 
                          !state.isCreatingDiscipline && 
                          !state.editingDisciplineId && 
                          !state.selectedDisciplineId && 
                          !state.isReflectingDaily && 
                          !state.isReflectingWeekly && 
                          state.activeTab === 'today';

      if (!isDashboard) {
        // Prevent exit
        window.history.pushState({ isApp: true }, '');
        
        // Navigate to dashboard
        if (state.selectedDisciplineId) state.setSelectedDisciplineId(null);
        if (state.isReflectingDaily) state.setIsReflectingDaily(false);
        if (state.isReflectingWeekly) state.setIsReflectingWeekly(false);
        if (state.isCreatingDiscipline) state.setIsCreatingDiscipline(false);
        if (state.editingDisciplineId) state.setEditingDisciplineId(null);
        if (state.activeTab !== 'today') state.setActiveTab('today');
      } else {
        // On dashboard, show modal
        window.history.pushState({ isApp: true }, '');
        setShowExitModal(true);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderContent = () => {
    if (!hasStartedTrial) {
      return (
        <Layout>
          <WelcomeScreen />
        </Layout>
      );
    }

    if (!isIdentityConfirmed) {
      return (
        <Layout>
          <IdentityBuilder />
        </Layout>
      );
    }

    if (disciplines.length === 0 || isCreatingDiscipline || editingDisciplineId) {
      return (
        <Layout>
          <DisciplineCreator />
        </Layout>
      );
    }

    if (!isFirstVowSpoken) {
      // Vow Screen doesn't use the standard Layout (no nav bars)
      return <VowScreen />;
    }

    if (selectedDisciplineId) {
      // Training Log Screen doesn't use the standard Layout
      return <TrainingLogScreen />;
    }

    if (isReflectingDaily) {
      return <DailyReflectionScreen />;
    }

    if (isReflectingWeekly) {
      return <WeeklyEvaluationScreen />;
    }

    if (activeTab === 'training') {
      return (
        <Layout>
          <TrainingManagementScreen />
        </Layout>
      );
    }

    if (activeTab === 'progress') {
      return (
        <Layout>
          <ProgressScreen />
        </Layout>
      );
    }

    if (activeTab === 'profile') {
      return (
        <Layout>
          <ProfileScreen />
        </Layout>
      );
    }

    // Final State: The Main App
    return (
      <Layout>
        <TodayDashboard />
      </Layout>
    );
  };

  return (
    <>
      {renderContent()}
      {showExitModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background-dark/80 backdrop-blur-sm p-4">
          <div className="bg-slate-800 border border-primary/30 rounded-2xl p-6 shadow-2xl w-full max-w-sm animate-in zoom-in-95">
            <h3 className="text-xl font-bold text-slate-100 mb-2">Leave 1 Daily?</h3>
            <p className="text-slate-300 mb-6">Are you sure you want to exit the app?</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowExitModal(false)}
                className="flex-1 bg-primary/10 text-primary hover:bg-primary/20 font-bold py-3 rounded-xl transition-colors"
              >
                Stay
              </button>
              <button 
                onClick={() => {
                  setShowExitModal(false);
                  window.history.go(-2);
                }}
                className="flex-1 bg-primary text-background-dark hover:bg-primary/90 font-bold py-3 rounded-xl transition-colors shadow-lg shadow-primary/20"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
