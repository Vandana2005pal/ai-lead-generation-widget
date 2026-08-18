const test = require('node:test');
const assert = require('node:assert/strict');

const { SettingsForm } = require('../settings.js');

function createAlert() {
  return {
    hidden: true,
    setAttribute(name, value) {
      this[name] = value;
    },
    removeAttribute(name) {
      this[name] = false;
    },
  };
}

function createStorage() {
  return {
    data: {},
    setItem(key, value) {
      this.data[key] = String(value);
    },
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(this.data, key)
        ? this.data[key]
        : null;
    },
    removeItem(key) {
      delete this.data[key];
    },
  };
}

function createField({ name, value = '', type = 'text', checked = false, tagName = 'INPUT' }) {
  return {
    id: name,
    name,
    value,
    type,
    checked,
    tagName,
    required: false,
    classList: {
      add() {},
      remove() {},
      contains() { return false; },
    },
    setAttribute() {},
    getAttribute() { return null; },
    addEventListener() {},
  };
}

function createForm() {
  const formFields = [
    createField({ name: 'formTitle', value: 'Get Your Free Consultation' }),
    createField({ name: 'formDescription', value: 'Tell us about your needs.' }),
    createField({ name: 'submitButtonText', value: 'Get Started' }),
    createField({ name: 'nameRequirement', value: 'required' }),
    createField({ name: 'recipientEmail', value: 'leads@company.com', type: 'email' }),
    createField({ name: 'senderEmail', value: 'noreply@company.com', type: 'email' }),
    createField({ name: 'emailSubject', value: 'New Lead Submission' }),
    createField({ name: 'successMessage', value: 'Thanks for your time.' }),
    createField({ name: 'errorMessage', value: 'Please review the fields below.' }),
    createField({ name: 'buttonStyle', value: 'filled' }),
    createField({ name: 'emailField', checked: true, type: 'checkbox' }),
    createField({ name: 'phoneField', checked: false, type: 'checkbox' }),
    createField({ name: 'companyField', checked: false, type: 'checkbox' }),
    createField({ name: 'enableDarkMode', checked: false, type: 'checkbox' }),
  ];

  const form = {
    addEventListener() {},
    querySelectorAll() {
      return formFields;
    },
    querySelector(selector) {
      if (selector === '#emailField') return formFields.find((field) => field.name === 'emailField');
      if (selector === '#phoneField') return formFields.find((field) => field.name === 'phoneField');
      if (selector === '#companyField') return formFields.find((field) => field.name === 'companyField');
      if (selector === '#enableDarkMode') return formFields.find((field) => field.name === 'enableDarkMode');
      if (selector.startsWith('[name="')) {
        const name = selector.replace('[name="', '').replace('"]', '');
        return formFields.find((field) => field.name === name) || null;
      }
      return null;
    },
  };

  return { form, fields: formFields };
}

test('validates required form data and rejects empty values', () => {
  const { form, fields } = createForm();
  fields.forEach((field) => {
    if (field.name === 'formTitle') field.value = '';
    if (field.name === 'submitButtonText') field.value = '';
    if (field.name === 'recipientEmail') field.value = '';
    if (field.name === 'senderEmail') field.value = '';
  });

  const instance = new SettingsForm({
    form,
    successAlert: createAlert(),
    errorAlert: createAlert(),
    charCountElements: {},
    storage: createStorage(),
  });

  assert.equal(instance.validateForm(), false);
});

test('uses a strict email validation check', () => {
  const { form } = createForm();
  const instance = new SettingsForm({
    form,
    successAlert: createAlert(),
    errorAlert: createAlert(),
    charCountElements: {},
    storage: createStorage(),
  });

  assert.equal(instance.isValidEmail('invalid-email'), false);
  assert.equal(instance.isValidEmail('user@example.com'), true);
  assert.equal(instance.isValidEmail(' user@example.com '), true);
});

test('allows optional fields to stay empty when not enabled', () => {
  const { form, fields } = createForm();
  fields.forEach((field) => {
    if (field.name === 'phoneField') field.checked = false;
    if (field.name === 'companyField') field.checked = false;
    if (field.name === 'emailField') field.checked = false;
  });

  const instance = new SettingsForm({
    form,
    successAlert: createAlert(),
    errorAlert: createAlert(),
    charCountElements: {},
    storage: createStorage(),
  });

  assert.equal(instance.validateForm(), true);
});

test('persists valid settings data successfully', () => {
  const { form } = createForm();
  const storage = createStorage();
  const instance = new SettingsForm({
    form,
    successAlert: createAlert(),
    errorAlert: createAlert(),
    charCountElements: {},
    storage,
  });

  const settings = {
    formTitle: 'Get Your Free Consultation',
    formDescription: 'Tell us about your needs.',
    submitButtonText: 'Get Started',
    nameRequirement: 'required',
    emailField: true,
    phoneField: false,
    companyField: false,
    recipientEmail: 'leads@company.com',
    senderEmail: 'noreply@company.com',
    emailSubject: 'New Lead Submission',
    successMessage: 'Thanks for your time.',
    errorMessage: 'Please review the fields below.',
    buttonStyle: 'filled',
    enableDarkMode: false,
  };

  assert.equal(instance.saveSettings(settings), true);
  const saved = JSON.parse(storage.getItem('widgetSettings'));
  assert.ok(saved.savedAt);
  assert.equal(saved.formTitle, settings.formTitle);
  assert.equal(saved.submitButtonText, settings.submitButtonText);
});
