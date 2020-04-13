/* eslint-disable no-param-reassign */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let valueTotalInCome = 0;
    let valueTotalOutCome = 0;

    this.transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        valueTotalInCome += transaction.value;
      } else if (transaction.type === 'outcome') {
        valueTotalOutCome += transaction.value;
      }
    });

    const balance = {
      income: valueTotalInCome,
      outcome: valueTotalOutCome,
      total: valueTotalInCome - valueTotalOutCome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
