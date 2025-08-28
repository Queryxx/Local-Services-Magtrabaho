interface BaseTransaction {
  id: string;
  title: string;
  date: string;
  amount: string;
  status: string;
  type: "income" | "expense";
  avatar: string;
}

export interface ClientTransaction extends BaseTransaction {
  worker: string;
}

export interface WorkerTransaction extends BaseTransaction {
  client: string;
}

export type Transaction = ClientTransaction | WorkerTransaction;

export function isClientTransaction(transaction: Transaction): transaction is ClientTransaction {
  return 'worker' in transaction;
}

export function isWorkerTransaction(transaction: Transaction): transaction is WorkerTransaction {
  return 'client' in transaction;
}
