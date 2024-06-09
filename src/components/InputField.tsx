import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacings, Sizes } from '@values';
import { AntDesign } from '@expo/vector-icons';

interface InputFieldProps {
  title?: string;
  placeholder?: string;
  inputProps: {
    inputText: string;
    setInputText: React.Dispatch<React.SetStateAction<string>>;
  };
  password?: boolean;
  style?: object;
  isError?: boolean;
  errorMessage?: string;
}

export default function InputField({
  title,
  placeholder,
  inputProps,
  password,
  style,
  isError,
  errorMessage
}: InputFieldProps) {
  return (
    <>
      {title ? (
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: isError ? Colors.error : Colors.text_dark, marginRight: Spacings.s }]}>{title}</Text>
          {isError ? (
            <>
              <AntDesign
                name='exclamationcircle'
                size={Sizes.h3}
                color={Colors.error}
                style={{ marginRight: Spacings.s }} />
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            </>
          ) : null }
        </View>
      ) : null}
      <View style={[styles.inputContainer, { borderColor: isError ? Colors.error : Colors.gray_200 } , style]}>
        <TextInput
          style={[styles.inputText, { color: isError ? Colors.error : Colors.text_dark}]}
          placeholder={placeholder}
          value={inputProps.inputText}
          onChangeText={inputProps.setInputText}
          secureTextEntry={password}
          autoCorrect={false}
          autoCapitalize='none'
        />
        {inputProps.inputText ? (
          <TouchableOpacity onPress={() => inputProps.setInputText('')}>
            <AntDesign name='closecircle' size={Sizes.h2} color={Colors.onBackground} style={{ opacity: 0.5 }} />
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 8
  },
  title: {
    fontSize: Sizes.h3,
    alignSelf: 'flex-start',
  },
  errorMessage: {
    fontSize: Sizes.l,
    color: Colors.error,
  },
  inputContainer: {
    height: 42,
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    borderColor: Colors.gray_200,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacings.m,
  },
  inputText: {
    width: '90%',
    height: '100%',
  },
});