import instance from './interceptors';
import { Expense } from '../types';

export const StatisticsService = {
  async addExpense(body: Omit<Expense, 'id'>) {
    const response = await instance.post('/expenses.json', body)

    return  response.data.name;
  },

  async fetchExpenses() {
    const response = await instance.get<Expense[]>('/expenses.json')
    const expenses = [];

    for (const key in response.data) {
      const expenseObj = {
        id: key,
        amount: response.data[key].amount,
        date: new Date(response.data[key].date),
        description: response.data[key].description
      };
      expenses.push(expenseObj);
    }

    return expenses;
  },

  async updateExpense(id: string, body: Omit<Expense, 'id'>) {
    console.log();
   await instance.put(`/expenses/${id}.json`, body)
  },

  async deleteExpense(id: string) {
    await instance.delete(`/expenses/${id}.json`)
  },
};