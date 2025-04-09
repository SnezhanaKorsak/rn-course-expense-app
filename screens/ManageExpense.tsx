import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

import { ManageExpenseScreenRouteProp } from '../navigation/types';
import { GlobalStyles } from '../theme/styles';

import { IconButton } from '../components/ui/IconButton';
import { Button } from '../components/ui/Button';

export const ManageExpense = () => {
  const { params } = useRoute<ManageExpenseScreenRouteProp>();
  const navigation = useNavigation();

  const expenseId = params?.expenseId;
  const isEditing = !!expenseId;

  navigation.setOptions({
    title: isEditing ? 'Edit Expense' : 'Add Expense',
  });

  const goBackHandler = () => navigation.goBack();

  const deleteExpenseHandler = () => {
    goBackHandler();
  };

  const cancelHandler = () => {
    goBackHandler();
  };

  const confirmHandler = () => {
    goBackHandler();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});