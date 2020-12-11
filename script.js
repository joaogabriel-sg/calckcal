class CaloriesCalculator {
  constructor(form, resultContainer) {
    this.form = form;
    this.resultContainer = resultContainer;
    this.whenTheFormIsSubmitted = this.whenTheFormIsSubmitted.bind(this);
  }

  showResult() {
    this.resultContainer.innerHTML = `
      <h2>Aqui está seu resultado:</h2>
      <div class="result-content">
        <ul>
          <li>Seu metabolismo basal é de <strong>${this.tmb} calorias</strong>.</li>
          <li>Para manter o seu peso, você precisa consumir em média <strong>${this.keepWeight} calorias</strong>.</li>
          <li>Para perder peso, você precisa consumir em média <strong>${this.loseWeight} calorias</strong>.</li>
          <li>Para ganhar peso, você precisa consumir em média <strong>${this.gainWeight} calorias</strong>.</li>
        </ul>
      </div>
    `;
  }

  weightMaintenance(activity) {
    this.keepWeight = Math.round(this.tmb * activity);
    this.loseWeight = this.keepWeight - 200;
    this.gainWeight = this.keepWeight + 200;
  }

  calcTMB(gender, age, weight, height) {
    if (gender === 'male')
      this.tmb = Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age));
    else
      this.tmb = Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age));
  }

  getFieldValue(fieldName) {
    return this.form[fieldName].value;
  }

  whenTheFormIsSubmitted(e) {
    e.preventDefault();

    const gender = this.getFieldValue('gender');
    const age = Number(this.getFieldValue('age'));
    const weight = Number(this.getFieldValue('weight'));
    const height = Number(this.getFieldValue('height'));
    const activity = Number(this.getFieldValue('activity'));

    this.calcTMB(gender, age, weight, height);
    this.weightMaintenance(activity);
    this.showResult();
  }

  init() {
    if (this.form && this.resultContainer) {
      this.form.addEventListener('submit', this.whenTheFormIsSubmitted);
    }
    return this;
  }
}

const calcKcalForm = document.forms[0];
const resultContainer = document.querySelector('.result-container');

const caloriesCalculator = new CaloriesCalculator(calcKcalForm, resultContainer);
caloriesCalculator.init();
