const form = document.querySelector('#budget-form');
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const area = Number(document.querySelector('#area').value);
  const materialPrice = Number(document.querySelector('#materials').value);
  const laborPrice = Number(document.querySelector('#labor').value);
  const reservePercent = Number(document.querySelector('#reserve').value);

  const materialsTotal = area * materialPrice;
  const laborTotal = area * laborPrice;
  const subtotal = materialsTotal + laborTotal;
  const reserveTotal = subtotal * (reservePercent / 100);
  const grandTotal = subtotal + reserveTotal;

  document.querySelector('#materials-total').textContent = currency.format(materialsTotal);
  document.querySelector('#labor-total').textContent = currency.format(laborTotal);
  document.querySelector('#reserve-total').textContent = currency.format(reserveTotal);
  document.querySelector('#grand-total').textContent = currency.format(grandTotal);
});
