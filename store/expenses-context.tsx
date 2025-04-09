import React, { useReducer } from 'react';
import { createContext } from 'react';

import { expensesReducer } from './reducer';
import { Expense } from '../types';

type Props = {
  children: React.ReactNode;
}

type ExpenseDataType = Omit<Expense, 'id'>;

export const ExpensesContext = createContext({
  expenses: [] as Expense[],
  addExpense: (data: Expense) => {
  },
  setExpenses: (data: Expense[]) => {
  },
  updateExpense: (id: string, data: ExpenseDataType) => {
  },
  deleteExpense: (id: string) => {
  },
});

export const ExpensesContextProvider = ({ children }: Props
) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const addExpense = (expenseData: Expense) => {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  const setExpenses = (expenses: Expense[]) => {
    dispatch({ type: 'SET', payload: expenses });
  };

  function deleteExpense(id: string) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id: string, expenseData: ExpenseDataType) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};