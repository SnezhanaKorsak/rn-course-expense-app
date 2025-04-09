import { useContext, useLayoutEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

import { ManageExpenseScreenRouteProp } from '../navigation/types';
import { GlobalStyles } from '../theme/styles';
import { ExpensesContext } from '../store/expenses-context';
import { Expense } from '../types';

import { IconButton } from '../components/ui/IconButton';
import { ExpenseForm } from '../components/ExpenseForm';
import { StatisticsService } from '../api/expenses-service';
import { ErrorOverlay } from '../components/ui/ErrorOverlay';

export const ManageExpense = () => {
  const { params } = useRoute<ManageExpenseScreenRouteProp>();
  const navigation = useNavigation();

  const expensesCtx = useContext(ExpensesContext);

  const [error, setError] = useState('');

  const expenseId = params?.expenseId;
  const isEditing = !!expenseId;

  const foundExpense = expensesCtx.expenses.find((expense) => expense.id === expenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const goBackHandler = () => navigation.goBack();

  const deleteExpenseHandler = async () => {
    try {
      if (expenseId) {
        await StatisticsService.deleteExpense(expenseId);
        expensesCtx.deleteExpense(expenseId);
      }
      goBackHandler();
    } catch (error) {
      setError('Could not delete expense - please try again later!');
    }
  };

  const cancelHandler = () => {
    goBackHandler();
  };

  const confirmHandler = async (expenseData: Omit<Expense, 'id'>) => {
    try {
      if (isEditing && expenseId) {
        expensesCtx.updateExpense(expenseId, expenseData);
        await StatisticsService.updateExpense(expenseId, expenseData);
      } else {
        const id = await StatisticsService.addExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id });
      }
      goBackHandler();
    } catch (error) {
      setError('Could not save data - please try again later!');
    }
  };

  if (error) {
    return <ErrorOverlay message={error} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        foundExpense={foundExpense}
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