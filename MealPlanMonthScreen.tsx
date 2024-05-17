import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { Spacings, Sizes } from '@values';
import { Calendar } from '@components';

export default function MealPlanMonthScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Meal Plan</Text>
      <Calendar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacings.m,
  },
  title: {
    fontSize: Sizes.h1,
    marginBottom: Spacings.xxl,
  }
});
