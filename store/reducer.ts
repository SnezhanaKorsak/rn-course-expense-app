import { Expense } from '../types';

type ActionType = AddAction | UpdateAction | DeleteAction;

type AddAction = {
  type: 'ADD',
  payload: Omit<Expense, 'id'>;
}

type UpdateAction = {
  type: 'UPDATE',
  payload: { id: string, data: Omit<Expense, 'id'> };

}

type DeleteAction = {
  type: 'DELETE',
  payload: string;
}

export const expensesReducer = (state: Expense[], action: ActionType) => {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();

      return [{ ...action.payload, id: id }, ...state];

    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;

      return updatedExpenses;

    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}