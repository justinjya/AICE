import { View, StyleSheet } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { Colors } from '@values';

interface PaginationProps {
  activeIndex: number;
  arr: any[];
  style: object;
}

export default function Pagination({ activeIndex, arr, style }: PaginationProps) {
  return (
    <View style={[styles.pagination, style]}>
      {arr.map((_, index) => (
        <Octicons
          key={index}
          name="dot-fill"
          size={index === activeIndex ? 20 : 16}
          color={index === activeIndex ? Colors.secondary : Colors.gray_300}
          style={{ marginTop: index === activeIndex ? -2 : 0}}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
});