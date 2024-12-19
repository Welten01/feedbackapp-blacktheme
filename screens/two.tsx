import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useGoals } from '../context/GoalsContext';
import { Button } from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  const { goals, removeGoal } = useGoals();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>My Goals</Text>
        
        {goals.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No goals yet. Create one!</Text>
          </View>
        ) : (
          goals.map((goal) => (
            <View key={goal.id} style={styles.goalCard}>
              <Text style={styles.goalTitle}>{goal.title}</Text>
              
              <View style={styles.goalSection}>
                <Text style={styles.sectionTitle}>Actions:</Text>
                <Text style={styles.sectionContent}>{goal.actions}</Text>
              </View>
              
              <View style={styles.goalSection}>
                <Text style={styles.sectionTitle}>Deadline:</Text>
                <Text style={styles.sectionContent}>
                  {goal.deadline.toLocaleDateString()}
                </Text>
              </View>
              
              <View style={styles.goalSection}>
                <Text style={styles.sectionTitle}>Expectations:</Text>
                <Text style={styles.sectionContent}>{goal.expectations}</Text>
              </View>
              
              <View style={styles.cardFooter}>
                <Text style={styles.createdAt}>
                  Created: {goal.createdAt.toLocaleDateString()}
                </Text>
                <Button
                  onPress={() => removeGoal(goal.id)}
                  title="Delete"
                  style={styles.deleteButton}
                />
              </View>
            </View>
          ))
        )}
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
  },
  goalCard: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  goalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#fff',
  },
  goalSection: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#2196F3',
  },
  sectionContent: {
    fontSize: 16,
    color: '#ddd',
  },
  createdAt: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
  },
  emptyState: {
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#888',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
});
