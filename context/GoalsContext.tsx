import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Goal } from '../types/goals';

interface GoalsContextType {
  goals: Goal[];
  addGoal: (goal: Goal) => void;
  removeGoal: (id: string) => void;
  isLoading: boolean;
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

const STORAGE_KEY = '@goals';

export function GoalsProvider({ children }: { children: React.ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load goals from storage on mount
  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const storedGoals = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedGoals) {
        const parsedGoals = JSON.parse(storedGoals);
        // Convert string dates back to Date objects
        const goalsWithDates = parsedGoals.map((goal: any) => ({
          ...goal,
          deadline: new Date(goal.deadline),
          createdAt: new Date(goal.createdAt),
        }));
        setGoals(goalsWithDates);
        console.log('Goals loaded:', goalsWithDates);
      }
    } catch (error) {
      console.error('Error loading goals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveGoals = async (newGoals: Goal[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newGoals));
      console.log('Goals saved:', newGoals);
    } catch (error) {
      console.error('Error saving goals:', error);
    }
  };

  const addGoal = async (goal: Goal) => {
    const newGoals = [...goals, goal];
    setGoals(newGoals);
    await saveGoals(newGoals);
  };

  const removeGoal = async (id: string) => {
    const newGoals = goals.filter((goal) => goal.id !== id);
    setGoals(newGoals);
    await saveGoals(newGoals);
  };

  return (
    <GoalsContext.Provider value={{ goals, addGoal, removeGoal, isLoading }}>
      {children}
    </GoalsContext.Provider>
  );
}

export function useGoals() {
  const context = useContext(GoalsContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalsProvider');
  }
  return context;
} 