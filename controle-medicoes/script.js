const STORAGE_KEY = 'portfolio-medicoes';
const form = document.querySelector('#measurement-form');
const list = document.querySelector('#measurement-list');
const emptyState = document.querySelector('#empty-state');
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
let measurements = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

function createId() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(measurements));
}

function render() {
  list.replaceChildren();
  let contractedTotal = 0;
  let measuredTotal = 0;

  measurements.forEach((measurement) => {
    const measuredValue = measurement.contractValue * measurement.progress / 100;
    contractedTotal += measurement.contractValue;
    measuredTotal += measuredValue;

    const row = document.createElement('tr');
    [measurement.service, currency.format(measurement.contractValue), `${measurement.progress}%`, currency.format(measuredValue)].forEach((value) => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    });

    const actionCell = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'remove';
    removeButton.textContent = 'Excluir';
    removeButton.addEventListener('click', () => {
      measurements = measurements.filter((item) => item.id !== measurement.id);
      save();
      render();
    });
    actionCell.appendChild(removeButton);
    row.appendChild(actionCell);
    list.appendChild(row);
  });

  document.querySelector('#services-count').textContent = measurements.length;
  document.querySelector('#contracted-total').textContent = currency.format(contractedTotal);
  document.querySelector('#measured-total').textContent = currency.format(measuredTotal);
  emptyState.hidden = measurements.length > 0;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  measurements.unshift({
    id: createId(),
    service: document.querySelector('#service').value.trim(),
    contractValue: Number(document.querySelector('#contract-value').value),
    progress: Number(document.querySelector('#progress').value)
  });
  save();
  render();
  form.reset();
  document.querySelector('#service').focus();
});

render();
