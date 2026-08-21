const STORAGE_KEY = 'portfolio-transacoes';
const form = document.querySelector('#transaction-form');
const list = document.querySelector('#transaction-list');
const emptyState = document.querySelector('#empty-state');
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
let transactions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

function createId() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function render() {
  list.replaceChildren();
  let income = 0;
  let expense = 0;

  transactions.forEach((transaction) => {
    transaction.type === 'income' ? income += transaction.amount : expense += transaction.amount;
    const item = document.createElement('li');
    item.className = transaction.type;

    const details = document.createElement('div');
    details.className = 'details';
    const title = document.createElement('strong');
    title.textContent = transaction.description;
    const category = document.createElement('small');
    category.textContent = transaction.category;
    details.append(title, category);

    const amount = document.createElement('strong');
    amount.className = `amount ${transaction.type}`;
    amount.textContent = `${transaction.type === 'income' ? '+' : '-'} ${currency.format(transaction.amount)}`;

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'remove';
    removeButton.textContent = '×';
    removeButton.setAttribute('aria-label', `Excluir ${transaction.description}`);
    removeButton.addEventListener('click', () => {
      transactions = transactions.filter((item) => item.id !== transaction.id);
      save();
      render();
    });

    item.append(details, amount, removeButton);
    list.appendChild(item);
  });

  document.querySelector('#income').textContent = currency.format(income);
  document.querySelector('#expense').textContent = currency.format(expense);
  document.querySelector('#balance').textContent = currency.format(income - expense);
  emptyState.hidden = transactions.length > 0;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  transactions.unshift({
    id: createId(),
    description: document.querySelector('#description').value.trim(),
    category: document.querySelector('#category').value,
    type: document.querySelector('#type').value,
    amount: Number(document.querySelector('#amount').value)
  });
  save();
  render();
  form.reset();
});

render();
