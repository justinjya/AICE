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