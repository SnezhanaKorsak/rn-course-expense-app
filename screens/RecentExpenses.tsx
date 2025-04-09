import { useContext, useEffect, useState } from 'react';

import { getDateMinusDays } from '../utils';
import { StatisticsService } from '../api/expenses-service';
import { ExpensesContext } from '../store/expenses-context';

import { ExpensesOutput } from '../components/ExpensesOutput';
import { LoadingOverlay } from '../components/ui/LoadingOverlay';
import { ErrorOverlay } from '../components/ui/ErrorOverlay';

export const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');

  const getExpenses = async () => {
    setIsFetching(true);

    try {
      const response = await StatisticsService.fetchExpenses();
      expensesCtx.setExpenses(response);
    } catch (error) {
      console.log(error);
      setError('Could not fetch expenses!');
    }

    setIsFetching(false);
  };

  useEffect(() => {
    getExpenses();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return (expense.date >= date7DaysAgo) && (expense.date <= today);
  });

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 Days"
      expenses={recentExpenses}
      fallbackText="No expenses registered for the last 7 days."
    />
  );
};