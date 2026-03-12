export function calculateXP(completions: Record<string, string[]>, dailyReflections: any[], weeklyReflections: any[]) {
  let totalCompletions = 0;
  Object.values(completions).forEach(dates => {
    totalCompletions += dates.length;
  });
  
  const xpFromDisciplines = totalCompletions * 50;
  const xpFromDaily = dailyReflections.length * 100;
  const xpFromWeekly = weeklyReflections.length * 250;
  const totalXp = xpFromDisciplines + xpFromDaily + xpFromWeekly;

  // Level scaling: 500 XP for Level 2, 2000 XP for Level 3, 4500 XP for Level 4...
  // Formula: XP = 500 * (Level - 1)^2  =>  Level = sqrt(XP / 500) + 1
  const level = Math.floor(Math.sqrt(totalXp / 500)) + 1;
  
  const currentLevelBaseXp = 500 * Math.pow(level - 1, 2);
  const nextLevelBaseXp = 500 * Math.pow(level, 2);
  
  const xpIntoCurrentLevel = totalXp - currentLevelBaseXp;
  const xpNeededForNextLevel = nextLevelBaseXp - currentLevelBaseXp;
  const progressPercent = (xpIntoCurrentLevel / xpNeededForNextLevel) * 100;

  return {
    totalXp,
    level,
    currentLevelBaseXp,
    nextLevelBaseXp,
    xpIntoCurrentLevel,
    xpNeededForNextLevel,
    progressPercent
  };
}
