import { Text, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors, Sizes, Spacings } from '@values';
import InputField from './InputField';
import IconButton from './IconButton';

interface EditableFieldProps {
  title?: string;
  attribute: string;
  password?: boolean;
  isEditingProps: { isEditing: boolean; setIsEditing: React.Dispatch<React.SetStateAction<boolean>> };
  tempValueProps: { tempValue: string; setTempValue: React.Dispatch<React.SetStateAction<string>> };
  style?: object;
  inputFieldStyle?: object;
}

export default function EditableField({
  title,
  attribute,
  password,
  isEditingProps,
  tempValueProps,
  style,
  inputFieldStyle,
}: EditableFieldProps) {
  const { isEditing, setIsEditing } = isEditingProps;
  const { tempValue, setTempValue } = tempValueProps;

  return (
    <>
      <Text style={[styles.title, { marginBottom: isEditing ? Spacings.s : Spacings.m }]}>{title}</Text>
      {isEditing ? (
        <InputField
          placeholder={title} 
          password={password}
          inputProps={{ inputText: tempValue, setInputText: setTempValue }} 
          style={inputFieldStyle}
        />
      ) : (
        <>
          <View style={[styles.textContainer, style]}>
            {password ? (
              <Text style={styles.text}>{'•'.repeat(attribute.length)}</Text>
            ) : (
              <Text style={styles.text}>{attribute}</Text>
            )}
            <IconButton
              icon={
                <Feather
                  name='edit'
                  size={20}
                  color={Colors.secondary}
                  style={{ marginRight: Spacings.l }}
                />
              }
              onPress={() => setIsEditing(true)} />
          </View>
        </>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: Sizes.h3,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: Sizes.h2,
    marginRight: Spacings.s,
  },
});