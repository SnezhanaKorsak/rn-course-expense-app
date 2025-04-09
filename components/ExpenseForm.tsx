import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { InputField } from './InputField'
import { Button } from './ui/Button';
import { Expense } from '../types';

type Props = {
  submitButtonLabel: string;
  onCancel: () => void;
  onSubmit: (expenseData: Omit<Expense, 'id'>) => void;
}

export const ExpenseForm = ({ submitButtonLabel, onCancel, onSubmit }: Props) => {
  const [inputValues, setInputValues] = useState({
    amount: '',
    date: '',
    description: '',
  });

  const inputChangedHandler = (identifier: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [identifier]: value }));
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description
    };

    onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <InputField
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            value: inputValues.amount,
            keyboardType: 'decimal-pad',
            onChangeText: (value) => inputChangedHandler('amount', value),
          }}
        />
        <InputField
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            value: inputValues.date,
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: (value) => inputChangedHandler('date', value),
          }}
        />
      </View>
      <InputField
        label="Description"
        textInputConfig={{
          multiline: true,
          value: inputValues.description,
          onChangeText: (value) => inputChangedHandler('description', value),
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
        }}
      />

      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center'
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
    minWidth: 200
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});