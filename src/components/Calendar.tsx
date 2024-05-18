import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Colors, Spacings, Sizes } from '@values';

interface CalendarMonthProps {
  mealPlans: Array<any>;
  year: number;
  month: number;
  onPress?: () => void;
};

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

export default function Calendar({ mealPlans, year, month, onPress }: CalendarMonthProps) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const totalDays = firstDayOfMonth + daysInMonth;
  const paddingDaysStart = Array.from({ length: firstDayOfMonth }, () => null);
  const paddingDaysEndLength = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);
  const paddingDaysEnd = Array.from({ length: paddingDaysEndLength }, () => null);
  
  const allDays = [...paddingDaysStart, ...days, ...paddingDaysEnd];

  const isDateEqual = (date1: Date, date2: Date) => 
    date1.getDate() === date2.getDate() && 
    date1.getMonth() === date2.getMonth() && 
    date1.getFullYear() === date2.getFullYear();

  const isMealPlanned = (date: Date) => {
    return mealPlans.some(meal => 
      meal.date instanceof Date && 
      isDateEqual(meal.date, date)
    );
  };

  return (
    <>
      <Text style={styles.monthTitle}>{`${monthNames[month]} ${year}`}</Text>
      <View style={styles.daysContainer}>
        {daysOfWeek.map((day) => (
          <Text style={styles.dayOfWeek} key={day}>
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.monthContainer}>
        {allDays.map((day, index) => {
          const isPlanned = isMealPlanned(new Date(year, month, day as number));

          return(
            <TouchableOpacity
              key={index}
              style={[styles.day, day !== null ? { backgroundColor: Colors.gray_100 } : { backgroundColor: 'transparent' }]}
              onPress={onPress}
            >
              <Text style={day !== null ? styles.dayText : {}}>{day}</Text>
              {isPlanned ? 
                <View style={[styles.dot, { backgroundColor: Colors.primary }]}/>
                : 
                <View style={[styles.dot, { backgroundColor: 'transparent' }]}/>
              }
            </TouchableOpacity>
          )
        }
        )}
      </View>
    </>
  );
};

const screenWidth = Dimensions.get('window').width;
const magicSpacing = 11; // it just works hahaha

const styles = StyleSheet.create({
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacings.s,
  },
  monthContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Spacings.l,
  },
  monthTitle: {
    fontSize: Sizes.h2,
    marginBottom: Spacings.m,
  },
  dayOfWeek: {
    width: 45.2,
    fontSize: Sizes.m,
    textAlign: 'center',
    justifyContent: 'center'
  },
  day: {
    width: screenWidth / 7 - magicSpacing,
    height: screenWidth / 7 - magicSpacing,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacings.s,
  },
  dayText: {
    fontSize: Sizes.h3,
    marginBottom: Spacings.xxs,
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: Colors.primary,
    borderRadius: 50
  },
});
  