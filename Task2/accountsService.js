//accountsService.js
const accounts = [];

function generateAccountNumber() {
  return Math.floor(Math.random() * 1000000000).toString();
}

function openAccount(holder, type, balance) {
  // Check if account holder already has 2 accounts of the same type
  const existingAccounts = accounts.filter(account => account.holder === holder && account.type === type);
  if (existingAccounts.length > 0) {
    return { error: 'Account limit reached for this account type' };
  }

  // Generate a unique account number
  const accountNumber = generateAccountNumber();

  // Create a new account object
  const newAccount = {
    accountNumber,
    holder,
    type,
    status: 'pending',
    balance
  };
  accounts.push(newAccount);

  return newAccount;
}

function getAllAccounts() {
  return accounts;
}

function activateAccount(accountNumber) {
  const accountIndex = accounts.findIndex(account => account.accountNumber === accountNumber);

  if (accountIndex === -1) {
    return { error: 'Account not found' };
  }

  // Change account status to 'active'
  accounts[accountIndex].status = 'active';

  return { message: 'Account activated successfully' };
}

module.exports = {
  openAccount,
  getAllAccounts,
  activateAccount
};
