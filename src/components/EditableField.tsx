import { Text, StyleSheet, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Colors, Sizes, Spacings } from "@values";
import InputField from "./InputField";
import IconButton from "./IconButton";

interface EditableFieldProps {
  title?: string;
  attribute: string;
  password?: boolean;
  isEditingProps?: { isEditing: boolean; setIsEditing: React.Dispatch<React.SetStateAction<boolean>> };
  tempValueProps?: { tempValue: string; setTempValue: React.Dispatch<React.SetStateAction<string>> };
  style?: object;
  inputFieldStyle?: object;
  disabled?: boolean;
}

export default function EditableField({
  title,
  attribute,
  password,
  isEditingProps,
  tempValueProps,
  style,
  inputFieldStyle,
  disabled,
}: EditableFieldProps) {
  const { isEditing, setIsEditing = () => {}} = isEditingProps || {};
  const { tempValue = '', setTempValue = () => {}} = tempValueProps || {};

  return (
    <>
      <Text style={[styles.title, { marginBottom: isEditing ? Spacings.xxs : Spacings.m }]}>{title}</Text>
      {isEditing ? (
        <InputField
          placeholder={title} 
          password={password}
          inputProps={{ inputText: tempValue, setInputText: setTempValue }} 
          style={[inputFieldStyle, { color: disabled ? Colors.secondary : Colors.primary }]}
        />
      ) : (
        <>
          <View style={[styles.textContainer, style]}>
            {password ? (
              <Text style={[styles.text, { opacity: disabled ? 0.4 : 1 }]}>{'•'.repeat(attribute.length)}</Text>
            ) : (
              <Text style={[styles.text, { opacity: disabled ? 0.4 : 1 }]}>{attribute}</Text>
            )}
            {disabled ? null : (
              <IconButton
                icon={
                  <Feather
                    name="edit"
                    size={20}
                    color={Colors.secondary}
                    style={{ marginRight: Spacings.l }}
                  />
                }
                onPress={() => setIsEditing(true)} />
            )}
          </View>
        </>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: Sizes.l,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: Sizes.h3,
    marginRight: Spacings.s,
  },
});