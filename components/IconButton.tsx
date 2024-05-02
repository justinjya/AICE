import { View, StyleSheet} from "react-native";
import { ReactNode } from "react";

interface ButtonProps {
  style?: object;
  onPress?: () => void;
  icon: ReactNode;
}

import { TouchableOpacity } from 'react-native';

export default function Button({
  style,
  onPress,
  icon,
}: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.content, style]}>
        {icon}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});