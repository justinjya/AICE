import { TouchableOpacity, Text, View, StyleSheet} from "react-native";
import { ReactNode } from "react";

interface ButtonProps {
  title?: string;
  style?: object;
  textStyle?: object;
  onPress?: () => void;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function Button({
  title,
  style,
  textStyle,
  onPress,
  disabled,
  leftIcon,
  rightIcon
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[style, { opacity: disabled ? 0.5 : 1 }]}
      onPress={onPress}
      disabled={disabled} >
      <View style={styles.content}>
        {leftIcon && <View>{leftIcon}</View>}
        <Text style={textStyle}>{title}</Text>
        {rightIcon && <View>{rightIcon}</View>}
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