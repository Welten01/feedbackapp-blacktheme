import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { Button } from '../components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Goal } from '../types/goals';
import { useGoals } from '../context/GoalsContext';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';

export default function TabOneScreen() {
  const { addGoal } = useGoals();
  const [goal, setGoal] = useState({
    title: '',
    actions: '',
    deadline: new Date(),
    expectations: '',
  });

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setGoal({ ...goal, deadline: selectedDate });
    }
  };

  const handleSubmit = () => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      ...goal,
      createdAt: new Date(),
    };
    
    addGoal(newGoal);
    
    // Reset form
    setGoal({
      title: '',
      actions: '',
      deadline: new Date(),
      expectations: '',
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Create New Goal</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={goal.title}
            onChangeText={(text) => setGoal({ ...goal, title: text })}
            placeholder="Enter goal title"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Actions</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={goal.actions}
            onChangeText={(text) => setGoal({ ...goal, actions: text })}
            placeholder="What actions will you take?"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Deadline</Text>
          <DateTimePicker
            value={goal.deadline}
            mode="date"
            onChange={handleDateChange}
            style={styles.datePicker}
            textColor="#fff"
            accentColor="#2196F3"
            themeVariant="dark"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Expectations</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={goal.expectations}
            onChangeText={(text) => setGoal({ ...goal, expectations: text })}
            placeholder="What do you expect to achieve?"
            multiline
            numberOfLines={4}
          />
        </View>

        <Button
          onPress={handleSubmit}
          title="Create Goal"
          disabled={!goal.title || !goal.actions || !goal.expectations}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2196F3',
    marginTop: 10,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#333',
    color: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  datePicker: {
    backgroundColor: '#333',
    borderRadius: 8,
    width: '100%',
    height: 40,
    marginTop: 8,
  },
});
