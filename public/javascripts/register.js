document.addEventListener('DOMContentLoaded', () => {
  const phoneField = document.querySelector('input[name=phone]');
  const birthdayField = document.querySelector('input[name=birthday]');
  const phoneMaskOptions = { mask: '(000) 000-00-00' };
  const birthdayMaskOptions = {
    mask: Date,
    pattern: 'Y-`m-`d',
    blocks: {
      d: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 31,
        maxLength: 2,
      },
      m: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
        maxLength: 2,
      },
      Y: {
        mask: IMask.MaskedRange,
        from: 1900,
        to: 9999,
      },
    },
    format: function (date) {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        const year = date.getFullYear();

        if (day < 10) day = "0" + day;
        if (month < 10) month = "0" + month;

        return [year, month, day].join('-');
    },
    parse: function (str) {
        const yearMonthDay = str.split('-');
        return new Date(yearMonthDay[0], yearMonthDay[1] - 1, yearMonthDay[2]);
    },
    min: new Date(1930, 0, 1),
    max: new Date(2019, 0, 1),
};
  const phoneMask = new IMask(phoneField, phoneMaskOptions);
  const birthdayMask = new IMask(birthdayField, birthdayMaskOptions);

  const formElement = document.querySelector('form');
  const emailField = document.querySelector('input[name=email]');

  formElement.addEventListener('submit', () => {
      localStorage.setItem('userEmail', emailField.value);
  });
});
