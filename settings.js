/**
 * Settings Form Validation
 * Handles form validation, user feedback, and settings management
 */

class SettingsForm {
  constructor(options = {}) {
    this.form = options.form || (typeof document !== "undefined" ? document.getElementById("settingsForm") : null);
    this.successAlert = options.successAlert || (typeof document !== "undefined" ? document.getElementById("successAlert") : null);
    this.errorAlert = options.errorAlert || (typeof document !== "undefined" ? document.getElementById("errorAlert") : null);
    this.storage = options.storage || (typeof localStorage !== "undefined" ? localStorage : null);
    this.isDirty = false;
    this.submitButtonText = "Save Settings";

    this.charCountElements = options.charCountElements || {
      formTitle: typeof document !== "undefined" ? document.getElementById("formTitleCount") : null,
      formDescription: typeof document !== "undefined" ? document.getElementById("formDescriptionCount") : null,
      successMessage: typeof document !== "undefined" ? document.getElementById("successMessageCount") : null,
      errorMessage: typeof document !== "undefined" ? document.getElementById("errorMessageCount") : null,
    };

    this.validationRules = {
      formTitle: [
        {
          rule: (value) => value.trim().length > 0,
          message: "Form title is required",
        },
        {
          rule: (value) => value.trim().length >= 5,
          message: "Form title must be at least 5 characters",
        },
        {
          rule: (value) => value.trim().length <= 100,
          message: "Form title cannot exceed 100 characters",
        },
      ],
      formDescription: [
        {
          rule: (value) => value.trim().length <= 500,
          message: "Description cannot exceed 500 characters",
        },
      ],
      submitButtonText: [
        {
          rule: (value) => value.trim().length > 0,
          message: "Submit button text is required",
        },
        {
          rule: (value) => value.trim().length >= 3,
          message: "Button text must be at least 3 characters",
        },
        {
          rule: (value) => value.trim().length <= 50,
          message: "Button text cannot exceed 50 characters",
        },
      ],
      nameRequirement: [
        {
          rule: (value) => value.length > 0,
          message: "Please select a name field requirement",
        },
      ],
      recipientEmail: [
        {
          rule: (value) => value.trim().length > 0,
          message: "Recipient email is required",
        },
        {
          rule: (value) => this.isValidEmail(value),
          message: "Please enter a valid recipient email address",
        },
      ],
      senderEmail: [
        {
          rule: (value) => value.trim().length > 0,
          message: "Sender email is required",
        },
        {
          rule: (value) => this.isValidEmail(value),
          message: "Please enter a valid sender email address",
        },
      ],
      emailSubject: [
        {
          rule: (value) => value.trim().length > 0,
          message: "Email subject is required",
        },
        {
          rule: (value) => value.trim().length >= 5,
          message: "Subject must be at least 5 characters",
        },
        {
          rule: (value) => value.trim().length <= 100,
          message: "Subject cannot exceed 100 characters",
        },
      ],
      successMessage: [
        {
          rule: (value) => value.trim().length > 0,
          message: "Success message is required",
        },
        {
          rule: (value) => value.trim().length >= 10,
          message: "Success message must be at least 10 characters",
        },
        {
          rule: (value) => value.trim().length <= 250,
          message: "Success message cannot exceed 250 characters",
        },
      ],
      errorMessage: [
        {
          rule: (value) => value.trim().length > 0,
          message: "Error message is required",
        },
        {
          rule: (value) => value.trim().length >= 10,
          message: "Error message must be at least 10 characters",
        },
        {
          rule: (value) => value.trim().length <= 250,
          message: "Error message cannot exceed 250 characters",
        },
      ],
      buttonStyle: [
        {
          rule: (value) => value.length > 0,
          message: "Please select a button style",
        },
      ],
    };

    if (this.form) {
      this.init();
    }
  }

  getErrorElement(fieldName) {
    if (typeof document === "undefined") {
      return null;
    }

    return document.getElementById(`${fieldName}Error`);
  }

  /**
   * Initialize form event listeners
   */
  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    this.form.addEventListener("reset", () => this.handleReset());

    this.form.querySelectorAll("input, textarea, select").forEach((field) => {
      field.addEventListener("input", (e) => {
        this.markDirty();
        this.updateCharCount(e.target);
        this.validateField(e.target);
      });

      field.addEventListener("blur", (e) => {
        this.validateField(e.target);
      });

      field.addEventListener("change", (e) => {
        this.markDirty();
        this.validateField(e.target);
      });

      field.addEventListener("focus", (e) => {
        this.clearFieldError(e.target);
      });
    });

    this.loadSettings();

    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", (e) => {
        if (this.isDirty) {
          e.preventDefault();
          e.returnValue = "";
          return "";
        }
      });
    }
  }

  markDirty() {
    this.isDirty = true;
  }

  markClean() {
    this.isDirty = false;
  }

  clearFieldError(field) {
    const errorElement = this.getErrorElement(field.name);
    if (errorElement) {
      errorElement.classList.remove("show");
      errorElement.textContent = "";
    }
  }

  updateCharCount(field) {
    const fieldName = field.name;
    const countElement = this.charCountElements[fieldName];

    if (countElement && (field.tagName === "TEXTAREA" || field.type === "text")) {
      countElement.textContent = field.value.length;
    }
  }

  isValidEmail(email) {
    const normalizedEmail = String(email ?? "").trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(normalizedEmail);
  }

  validateField(field) {
    const rules = this.validationRules[field.name];
    const errorElement = this.getErrorElement(field.name);

    if (!rules) {
      return true;
    }

    if (field.classList && typeof field.classList.remove === "function") {
      field.classList.remove("is-invalid", "is-valid");
    }

    if (errorElement) {
      errorElement.classList.remove("show");
      errorElement.textContent = "";
    }

    for (const { rule, message } of rules) {
      if (!rule(field.value)) {
        if (field.classList && typeof field.classList.add === "function") {
          field.classList.add("is-invalid");
        }
        if (errorElement) {
          errorElement.textContent = message;
          errorElement.classList.add("show");
        }
        return false;
      }
    }

    if (field.classList && typeof field.classList.add === "function") {
      field.classList.add("is-valid");
    }
    return true;
  }

  validateForm() {
    if (!this.form || !this.form.querySelectorAll) {
      return false;
    }

    const fields = this.form.querySelectorAll("input, textarea, select");
    let isValid = true;

    fields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.successAlert || !this.errorAlert) {
      return;
    }

    this.successAlert.setAttribute("hidden", "");
    this.errorAlert.setAttribute("hidden", "");

    if (!this.validateForm()) {
      this.showErrorAlert();
      if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const formData = new FormData(this.form);
    const settings = Object.fromEntries(formData);
    settings.emailField = this.form.querySelector("#emailField").checked;
    settings.phoneField = this.form.querySelector("#phoneField").checked;
    settings.companyField = this.form.querySelector("#companyField").checked;
    settings.enableDarkMode = this.form.querySelector("#enableDarkMode").checked;

    this.saveSettings(settings);
    this.markClean();
    this.showSuccessAlert();

    if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  handleReset() {
    if (!this.form) {
      return;
    }

    this.form.querySelectorAll("input, textarea, select").forEach((field) => {
      if (field.classList && typeof field.classList.remove === "function") {
        field.classList.remove("is-invalid", "is-valid");
      }
    });

    const errorMessages = this.form.querySelectorAll(".error-message");
    if (errorMessages) {
      errorMessages.forEach((error) => {
        error.classList.remove("show");
        error.textContent = "";
      });
    }

    Object.values(this.charCountElements).forEach((element) => {
      if (element) {
        element.textContent = "0";
      }
    });

    if (this.successAlert) {
      this.successAlert.setAttribute("hidden", "");
    }

    if (this.errorAlert) {
      this.errorAlert.setAttribute("hidden", "");
    }

    this.markClean();
  }

  saveSettings(settings) {
    if (!this.storage || typeof this.storage.setItem !== "function") {
      return false;
    }

    try {
      const dataToSave = {
        ...settings,
        savedAt: new Date().toISOString(),
      };
      this.storage.setItem("widgetSettings", JSON.stringify(dataToSave));
      return true;
    } catch (error) {
      console.error("Error saving settings:", error);
      return false;
    }
  }

  loadSettings() {
    if (!this.storage || typeof this.storage.getItem !== "function") {
      return;
    }

    try {
      const saved = this.storage.getItem("widgetSettings");
      if (saved) {
        const settings = JSON.parse(saved);
        this.populateForm(settings);
        this.markClean();
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  }

  populateForm(settings) {
    if (!this.form) {
      return;
    }

    Object.keys(settings).forEach((key) => {
      const field = this.form.querySelector(`[name="${key}"]`);
      if (!field) return;

      if (field.type === "checkbox") {
        field.checked = settings[key];
      } else {
        field.value = settings[key];
        this.updateCharCount(field);
      }
    });
  }

  showSuccessAlert() {
    if (this.successAlert) {
      this.successAlert.removeAttribute("hidden");
      setTimeout(() => {
        if (this.successAlert) {
          this.successAlert.setAttribute("hidden", "");
        }
      }, 5000);
    }
  }

  showErrorAlert() {
    if (this.errorAlert) {
      this.errorAlert.removeAttribute("hidden");
    }
  }
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    new SettingsForm();
  });
}

if (typeof module !== "undefined") {
  module.exports = { SettingsForm };
}
