const STORAGE_KEY = 'portfolio-tarefas';
const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const list = document.querySelector('#task-list');
const emptyState = document.querySelector('#empty-state');
let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
let currentFilter = 'all';

function createId() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function visibleTasks() {
  if (currentFilter === 'pending') return tasks.filter((task) => !task.completed);
  if (currentFilter === 'completed') return tasks.filter((task) => task.completed);
  return tasks;
}

function render() {
  list.replaceChildren();
  const filtered = visibleTasks();

  filtered.forEach((task) => {
    const item = document.createElement('li');
    item.className = task.completed ? 'completed' : '';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', `Concluir ${task.text}`);
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      save();
      render();
    });

    const text = document.createElement('span');
    text.className = 'task-text';
    text.textContent = task.text;

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'remove';
    removeButton.textContent = '×';
    removeButton.setAttribute('aria-label', `Excluir ${task.text}`);
    removeButton.addEventListener('click', () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      save();
      render();
    });

    item.append(checkbox, text, removeButton);
    list.appendChild(item);
  });

  const pending = tasks.filter((task) => !task.completed).length;
  document.querySelector('#task-count').textContent = `${pending} ${pending === 1 ? 'tarefa pendente' : 'tarefas pendentes'}`;
  emptyState.hidden = filtered.length > 0;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  tasks.unshift({ id: createId(), text: input.value.trim(), completed: false });
  save();
  render();
  form.reset();
  input.focus();
});

document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    document.querySelectorAll('.filter').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    render();
  });
});

document.querySelector('#clear-completed').addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  save();
  render();
});

render();
