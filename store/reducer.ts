import { Expense } from '../types';

type ActionType = AddType | UpdateAction | DeleteAction | SetAction;

type AddType = {
  type: 'ADD',
  payload: Expense;
}

type SetAction = {
  type: 'SET',
  payload: Expense[];
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
      return [action.payload, ...state];

    case 'SET':
      return action.payload.sort((a, b) => b.date.getTime() - a.date.getTime());

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
};