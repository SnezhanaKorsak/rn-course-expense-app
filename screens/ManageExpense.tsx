import { useContext, useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

import { ManageExpenseScreenRouteProp } from '../navigation/types';
import { GlobalStyles } from '../theme/styles';
import { ExpensesContext } from '../store/expenses-context';

import { IconButton } from '../components/ui/IconButton';
import { Button } from '../components/ui/Button';
import { ExpenseForm } from '../components/ExpenseForm';
import { Expense } from '../types';

export const ManageExpense = () => {
  const { params } = useRoute<ManageExpenseScreenRouteProp>();
  const navigation = useNavigation();

  const expensesCtx = useContext(ExpensesContext);

  const expenseId = params?.expenseId;
  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const goBackHandler = () => navigation.goBack();

  const deleteExpenseHandler = () => {
    if (expenseId) expensesCtx.deleteExpense(expenseId);

    goBackHandler();
  };

  const cancelHandler = () => {
    goBackHandler();
  };

  const confirmHandler = (expenseData: Omit<Expense, 'id'>) => {
    if (isEditing && expenseId) {
      expensesCtx.updateExpense(expenseId, expenseData);
    } else {
      expensesCtx.addExpense(expenseData);
    }
    goBackHandler();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});