/**
 * Settings Form Validation
 * Handles form validation, user feedback, and settings management
 */

class SettingsForm {
  constructor() {
    this.form = document.getElementById("settingsForm");
    this.successAlert = document.getElementById("successAlert");
    this.errorAlert = document.getElementById("errorAlert");
    this.isDirty = false;
    this.submitButtonText = "Save Settings";

    this.charCountElements = {
      formTitle: document.getElementById("formTitleCount"),
      formDescription: document.getElementById("formDescriptionCount"),
      successMessage: document.getElementById("successMessageCount"),
      errorMessage: document.getElementById("errorMessageCount"),
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

    this.init();
  }

  /**
   * Initialize form event listeners
   */
  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    this.form.addEventListener("reset", () => this.handleReset());

    // Add input event listeners for real-time validation and character counting
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

    // Load saved settings on page load
    this.loadSettings();

    // Setup before unload warning for unsaved changes
    window.addEventListener("beforeunload", (e) => {
      if (this.isDirty) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    });
  }

  /**
   * Mark form as having unsaved changes
   */
  markDirty() {
    this.isDirty = true;
  }

  /**
   * Mark form as clean (all changes saved)
   */
  markClean() {
    this.isDirty = false;
  }

  /**
   * Clear error message for a specific field
   */
  clearFieldError(field) {
    const errorElement = document.getElementById(`${field.name}Error`);
    if (errorElement) {
      errorElement.classList.remove("show");
      errorElement.textContent = "";
    }
  }

  /**
   * Update character count for text areas and inputs
   */
  updateCharCount(field) {
    const fieldName = field.name;
    const countElement = this.charCountElements[fieldName];

    if (countElement && (field.tagName === "TEXTAREA" || field.type === "text")) {
      countElement.textContent = field.value.length;
    }
  }

  /**
   * Validate email format
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate a single field
   */
  validateField(field) {
    const rules = this.validationRules[field.name];
    const errorElement = document.getElementById(`${field.name}Error`);

    if (!rules) {
      return true;
    }

    // Clear previous validation states
    field.classList.remove("is-invalid", "is-valid");
    if (errorElement) {
      errorElement.classList.remove("show");
      errorElement.textContent = "";
    }

    // Run validation rules
    for (const { rule, message } of rules) {
      if (!rule(field.value)) {
        field.classList.add("is-invalid");
        if (errorElement) {
          errorElement.textContent = message;
          errorElement.classList.add("show");
        }
        return false;
      }
    }

    // Mark as valid if all rules pass
    field.classList.add("is-valid");
    return true;
  }

  /**
   * Validate entire form
   */
  validateForm() {
    const fields = this.form.querySelectorAll("input, textarea, select");
    let isValid = true;

    fields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  /**
   * Handle form submission
   */
  handleSubmit(e) {
    e.preventDefault();

    // Hide alerts
    this.successAlert.setAttribute("hidden", "");
    this.errorAlert.setAttribute("hidden", "");

    if (!this.validateForm()) {
      this.showErrorAlert();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Collect form data
    const formData = new FormData(this.form);
    const settings = Object.fromEntries(formData);

    // Handle checkboxes explicitly (they're only included if checked)
    settings.emailField = this.form.querySelector("#emailField").checked;
    settings.phoneField = this.form.querySelector("#phoneField").checked;
    settings.companyField = this.form.querySelector("#companyField").checked;
    settings.enableDarkMode = this.form.querySelector("#enableDarkMode")
      .checked;

    // Save settings
    this.saveSettings(settings);
    this.markClean();
    this.showSuccessAlert();

    // Log settings (in a real app, this would be sent to a server)
    console.log("Settings saved successfully:", settings);

    // Scroll to top to show success message
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /**
   * Handle form reset
   */
  handleReset() {
    // Clear all validation states
    this.form.querySelectorAll("input, textarea, select").forEach((field) => {
      field.classList.remove("is-invalid", "is-valid");
    });

    // Clear all error messages
    this.form.querySelectorAll(".error-message").forEach((error) => {
      error.classList.remove("show");
      error.textContent = "";
    });

    // Reset character counts
    Object.values(this.charCountElements).forEach((element) => {
      element.textContent = "0";
    });

    // Hide alerts
    this.successAlert.setAttribute("hidden", "");
    this.errorAlert.setAttribute("hidden", "");

    // Mark as clean after reset
    this.markClean();
    console.log("Form reset to defaults");
  }

  /**
   * Save settings to localStorage
   */
  saveSettings(settings) {
    try {
      const dataToSave = {
        ...settings,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem("widgetSettings", JSON.stringify(dataToSave));
      return true;
    } catch (error) {
      console.error("Error saving settings:", error);
      if (error.name === "QuotaExceededError") {
        console.warn("localStorage quota exceeded");
      }
      return false;
    }
  }

  /**
   * Load settings from localStorage
   */
  loadSettings() {
    try {
      const saved = localStorage.getItem("widgetSettings");
      if (saved) {
        const settings = JSON.parse(saved);
        this.populateForm(settings);
        this.markClean();
        const savedDate = settings.savedAt
          ? new Date(settings.savedAt).toLocaleString()
          : "unknown";
        console.log("Settings loaded from", savedDate);
      }
    } catch (error) {
      console.error("Error loading settings:", error);
      if (error instanceof SyntaxError) {
        console.warn("Corrupted settings data, starting fresh");
        localStorage.removeItem("widgetSettings");
      }
    }
  }
  }

  /**
   * Populate form with saved settings
   */
  populateForm(settings) {
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

  /**
   * Show success alert
   */
  showSuccessAlert() {
    this.successAlert.removeAttribute("hidden");
    setTimeout(() => {
      this.successAlert.setAttribute("hidden", "");
    }, 5000);
  }

  /**
   * Show error alert
   */
  showErrorAlert() {
    this.errorAlert.removeAttribute("hidden");
  }
}

// Initialize the form when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new SettingsForm();
});
