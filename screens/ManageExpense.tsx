import { useRoute } from '@react-navigation/native';
import { View, Text } from 'react-native';

import { ManageExpenseScreenRouteProp } from '../navigation/types';

export const ManageExpense = () => {
  const { params } = useRoute<ManageExpenseScreenRouteProp>();

  console.log(params.expenseId);

  return (
    <View>
      <Text>Manage Expense</Text>
    </View>
  );
};