import assert from 'assert';

it('Has a text input', async () => {
  const dom = await render('index.html');

  const input = dom.window.document.querySelector('input');
  assert(input);
});

it('Shows a success message for a valid email', async () => {
  const dom = await render('index.html');

  const input = dom.window.document.querySelector('input');
  input.value = 'dsakld@fnsjkl';

  dom.window.document
    .querySelector('form')
    .dispatchEvent(new dom.window.Event('submit'));

  const h1 = dom.window.document.querySelector('h1');

  assert.strictEqual(h1.innerHTML, 'Looks good');
});

it('Shows a fail message for an invalid email', async () => {
  const dom = await render('index.html');

  const input = dom.window.document.querySelector('input');
  input.value = 'dsaklfnsjkl';

  dom.window.document
    .querySelector('form')
    .dispatchEvent(new dom.window.Event('submit'));

  const h1 = dom.window.document.querySelector('h1');

  assert.strictEqual(h1.innerHTML, 'Not a valid email address');
});
