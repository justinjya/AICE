<<<<<<< HEAD
import { TouchableOpacity } from 'react-native';
import React from 'react';

interface IconButtonProps {
  icon: React.ReactElement;
  style?: object;
  onPress?: () => void;
}

export default function IconButton({ icon, style, onPress }: IconButtonProps) {
  return (
    <TouchableOpacity style={style} onPress={onPress} >
      {icon}
    </TouchableOpacity>
  )
}
=======
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
>>>>>>> bottom-nav-bar
