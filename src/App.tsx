/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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

  // Routing Logic
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
}
