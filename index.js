// === state ===
// the number the user inputs into the form
let userNumbers = [];
let oddNumbers = [];
let evenNumbers = [];

// isOddOrEven
function isOddOrEven(n) { 
  if(n % 2 === 0) {
    evenNumbers.push(n)
  } else {
    oddNumbers.push(n)
  }
}

function addToBank(n) {
  userNumbers.push(n);
  render();
}


// === components ===
  // user inputs
function Form() {
  const $form = document.createElement(`form`);
  $form.innerHTML = `
    <label>
      Add a number to the bank:
      <input name="user-input" type="number" min="1" />
    </label>
    <button name="add">Add number</button>
    <button name="sort-one">Sort 1</button>
    <button name="sort-all">Sort All</button>
  `;

  // add an event listener to button named add
  $form.querySelector(`button[name="add"]`).addEventListener(`click`, () => {
    const formData = new FormData($form);
    const userNumbers = Number(formData.get("user-input"));
    addToBank(userNumbers);
  });

  // add an event listener to button named sort-one
  $form.querySelector(`button[name="sort-one"]`).addEventListener(`click`, () => {
    isOddOrEven(userNumbers[0]);
    userNumbers.shift();
    render()
  });
  
  // add an event listener to button named sort-all
  $form.querySelector(`button[name="sort-all"]`).addEventListener(`click`, () => {
    for (let i = 0; i <= userNumbers.length; i++) {
      isOddOrEven(userNumbers[i]);
    }
    console.log(userNumbers);
    userNumbers=[];
    render()
  });

  return $form;
}
  // bank 
function Bank() {
  const $bank = document.createElement(`span`);
  $bank.classList.add(`bank`);
  $bank.textContent = userNumbers;
  return $bank;
}

// odds 
function Odds() {
  const $odds = document.createElement(`span`);
  $odds.classList.add(`odds`);
  $odds.textContent = oddNumbers;
  return $odds;
}

// evens
function Evens() {
  const $evens = document.createElement(`span`);
  $evens.classList.add(`evens`);
  $evens.textContent = evenNumbers;
  return $evens;
}


// === render ===
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
  <main>
    <header>
      <h1>Odds and Events</h1>
      <Form></Form>
    </header>
    <section>
      <h2>Bank</h2>
      <Bank></Bank>
      <h2>Odds</h2>
      <Odds></Odds>
      <h2>Evens</h2>
      <Evens></Evens>
    </section>
  </main>
  `;

  $app.querySelector(`Form`).replaceWith(Form());
  $app.querySelector(`Bank`).replaceWith(Bank());
  $app.querySelector(`Odds`).replaceWith(Odds());
  $app.querySelector(`Evens`).replaceWith(Evens());
}

render()
