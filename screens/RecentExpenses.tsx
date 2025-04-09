import { useContext, useEffect } from 'react';

import { getDateMinusDays } from '../utils';
import { StatisticsService } from '../api/expenses-service';

import { ExpensesOutput } from '../components/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

export const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return (expense.date >= date7DaysAgo) && (expense.date <= today);
  });

  const getExpenses = async () => {
    const response = await StatisticsService.fetchExpenses();
    expensesCtx.setExpenses(response);
  };

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 Days"
      expenses={recentExpenses}
      fallbackText="No expenses registered for the last 7 days."
    />
  );
};