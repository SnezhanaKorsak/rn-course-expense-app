import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Expense } from '../types';
import { getFormattedDate } from '../utils';
import { GlobalStyles } from '../theme/styles';

import { Button } from './ui/Button';
import { InputField } from './InputField';

type Props = {
  foundExpense?: Expense;
  submitButtonLabel: string;
  onCancel: () => void;
  onSubmit: (expenseData: Omit<Expense, 'id'>) => void;
}

export const ExpenseForm = ({ foundExpense, submitButtonLabel, onCancel, onSubmit }: Props) => {
  const [inputValues, setInputValues] = useState({
    amount: {
      value: String(foundExpense?.amount) || '',
      isValid: true,
    },
    date: {
      value: foundExpense ? getFormattedDate(foundExpense.date) : '',
      isValid: true,
    },
    description: {
      value: foundExpense?.description || '',
      isValid: true,
    },
  });

  const inputChangedHandler = (identifier: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [identifier]: { value, isValid: true } }));
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputValues.amount.value,
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //Alert.alert('Invalid input', 'Please check your input values');
      setInputValues((prev) => {
        return {
          amount: { value: prev.amount.value, isValid: amountIsValid },
          date: { value: prev.date.value, isValid: dateIsValid },
          description: {
            value: prev.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <InputField
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            value: inputValues.amount.value,
            keyboardType: 'decimal-pad',
            onChangeText: (value) => inputChangedHandler('amount', value),
          }}
        />
        <InputField
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            value: inputValues.date.value,
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
          value: inputValues.description.value,
          onChangeText: (value) => inputChangedHandler('description', value),
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
        }}
      />

      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}

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
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
    fontSize: 20,
  },
});