const characterSets = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%&*+-_=?.'
};

const lengthInput = document.querySelector('#length');
const passwordOutput = document.querySelector('#password');
const message = document.querySelector('#message');

function secureRandom(max) {
  const limit = Math.floor(0x100000000 / max) * max;
  const values = new Uint32Array(1);
  do crypto.getRandomValues(values); while (values[0] >= limit);
  return values[0] % max;
}

function updateStrength(length, types) {
  const score = Math.min(4, (length >= 10 ? 1 : 0) + (length >= 16 ? 1 : 0) + (types >= 3 ? 1 : 0) + (types === 4 && length >= 20 ? 1 : 0));
  const labels = ['Muito fraca', 'Fraca', 'Média', 'Forte', 'Muito forte'];
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4'];
  document.querySelector('#strength-label').textContent = labels[score];
  const bar = document.querySelector('#strength-bar');
  bar.style.width = `${(score + 1) * 20}%`;
  bar.style.background = colors[score];
}

function generatePassword() {
  const selectedSets = Object.keys(characterSets).filter((key) => document.querySelector(`#${key}`).checked);
  if (!selectedSets.length) {
    message.textContent = 'Selecione pelo menos um tipo de caractere.';
    return;
  }

  message.textContent = '';
  const length = Number(lengthInput.value);
  const required = selectedSets.map((key) => characterSets[key][secureRandom(characterSets[key].length)]);
  const pool = selectedSets.map((key) => characterSets[key]).join('');

  while (required.length < length) required.push(pool[secureRandom(pool.length)]);
  for (let index = required.length - 1; index > 0; index -= 1) {
    const randomIndex = secureRandom(index + 1);
    [required[index], required[randomIndex]] = [required[randomIndex], required[index]];
  }

  passwordOutput.textContent = required.join('');
  updateStrength(length, selectedSets.length);
}

lengthInput.addEventListener('input', () => {
  document.querySelector('#length-value').textContent = lengthInput.value;
});

document.querySelector('#generate').addEventListener('click', generatePassword);
document.querySelector('#copy').addEventListener('click', async () => {
  if (passwordOutput.textContent === 'Clique em gerar') return;
  try {
    await navigator.clipboard.writeText(passwordOutput.textContent);
    message.style.color = '#67e8f9';
    message.textContent = 'Senha copiada.';
  } catch {
    message.style.color = '#fda4af';
    message.textContent = 'Não foi possível copiar automaticamente. Selecione a senha e copie manualmente.';
  }
  setTimeout(() => { message.textContent = ''; message.style.color = ''; }, 1600);
});

generatePassword();
