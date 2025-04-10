import { Text, TextInput, TextInputProps, View, StyleSheet } from 'react-native';
import { GlobalStyles } from '../theme/styles';

type Props = {
  label: string;
  textInputConfig: TextInputProps;
  style?: TextInputProps['style'];
}

export const InputField = ({ label, textInputConfig, style }: Props) => {
  let inputStyles: TextInputProps['style'] = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles = [styles.input, styles.inputMultiline];
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top'
  }
});