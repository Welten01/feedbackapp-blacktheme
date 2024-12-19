import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStack from './navigation';
import { GoalsProvider } from './context/GoalsContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <GoalsProvider>
        <RootStack />
      </GoalsProvider>
    </SafeAreaProvider>
  );
}
