# Settings Form Documentation

## Overview

The AI Lead Generation Widget includes a comprehensive, fully-validated settings form that allows users to configure the lead generation widget with ease. The form features real-time validation, character counting, responsive design, and persistent storage using localStorage.

## Features

### ✨ Core Features

- **Comprehensive Configuration**: Configure all aspects of the lead generation widget
- **Real-Time Validation**: Immediate feedback as users type
- **Character Counting**: Visual feedback for maximum character limits
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Professional appearance in light and dark themes
- **localStorage Integration**: Settings persist between browser sessions
- **Accessible**: Follows WCAG standards for keyboard and screen reader support
- **Error Handling**: Clear, actionable error messages

### 🎯 Form Sections

#### 1. Form Configuration
Configure the appearance and text of the lead generation form:

- **Form Title** (Required, 5-100 characters)
  - Text shown at the top of the lead form
  - Example: "Get Your Free Consultation"
  
- **Form Description** (Optional, max 500 characters)
  - Detailed explanation of what users will receive
  - Supports longer text with character counting

- **Submit Button Text** (Required, 3-50 characters)
  - Call-to-action button label
  - Example: "Get Started", "Submit", "Send Request"

#### 2. Contact Information
Customize which fields appear in the lead form:

- **Include Email Field**: Always required in the lead form (checked by default)
- **Include Phone Field**: Optional toggle for phone number collection
- **Include Company Field**: Optional toggle for company name collection
- **Name Field Requirement**: Dropdown to set name field as Required, Optional, or Hidden

#### 3. Email Settings
Configure lead submission email behavior:

- **Recipient Email Address** (Required)
  - Where lead submissions will be sent
  - Format validation ensures valid email address
  - Example: `leads@yourcompany.com`

- **Sender Email Address** (Required)
  - The "from" address for lead notification emails
  - Should be a company email or noreply address
  - Example: `noreply@yourcompany.com`

- **Email Subject Line** (Required, 5-100 characters)
  - Subject line for lead notification emails
  - Example: "New Lead Submission", "Incoming Lead"

#### 4. User Feedback Messages
Customize messages shown to users:

- **Success Message** (Required, 10-250 characters)
  - Displayed after successful form submission
  - Example: "Thank you for your interest! We'll be in touch soon."

- **Error Message** (Required, 10-250 characters)
  - Shown when form validation fails
  - Example: "Please fill out all required fields correctly."

#### 5. Appearance
Customize the visual design of the widget:

- **Primary Color**: Choose the brand color for buttons and accents
  - Default: #007bff (Blue)
  - Supports full HTML5 color picker

- **Button Style**: Select the button appearance
  - **Filled**: Solid background with white text (default)
  - **Outline**: Transparent with colored border
  - **Ghost**: Minimal style with only text

- **Dark Mode**: Enable CSS support for dark color scheme
  - Allows users' system dark mode preferences to be honored

## Validation Rules

### Form Title
- Required field
- Minimum 5 characters
- Maximum 100 characters
- Trimmed of whitespace

### Form Description
- Optional field
- Maximum 500 characters
- Trimmed of whitespace

### Submit Button Text
- Required field
- Minimum 3 characters
- Maximum 50 characters
- Trimmed of whitespace

### Name Field Requirement
- Required field
- Must select one option: Required, Optional, or Hidden

### Email Fields (Recipient & Sender)
- Required fields
- Must be valid email format
- Format: `username@domain.com`
- Email regex validation: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

### Email Subject
- Required field
- Minimum 5 characters
- Maximum 100 characters
- Trimmed of whitespace

### Success Message
- Required field
- Minimum 10 characters
- Maximum 250 characters
- Trimmed of whitespace

### Error Message
- Required field
- Minimum 10 characters
- Maximum 250 characters
- Trimmed of whitespace

### Button Style
- Required field
- Must select one option: Filled, Outline, or Ghost

## User Experience

### Validation Feedback

**Visual Indicators:**
- ✅ Green border: Field passes validation
- ❌ Red border: Field fails validation
- Error message displays below invalid field
- Error clears when field receives focus

**Character Counting:**
- Shows current characters / maximum allowed
- Updates in real-time as user types
- Prevents exceeding maximum via `maxlength` attribute

**Form State:**
- Form tracks unsaved changes (dirty state)
- Browser warning if user tries to leave with unsaved changes
- State resets after successful save or form reset

### Success & Error Alerts

**Success Alert:**
- Displays for 5 seconds after successful save
- Shows: "Success! Your settings have been saved."
- Auto-dismisses

**Error Alert:**
- Displayed immediately if validation fails
- Shows: "Error! Please check the form for errors."
- Stays visible until user makes corrections
- Page auto-scrolls to top to show alert

### Form Actions

- **Save Settings**: Validates and saves to localStorage
- **Reset to Defaults**: Clears all fields and validation states

## Technical Implementation

### HTML Structure
- Semantic HTML with fieldsets and legends
- Proper label associations with form controls
- ARIA labels for alerts and accessibility
- `novalidate` attribute allows custom validation

### CSS Styling
- CSS Variables for theming and consistency
- Media queries for responsive design
- Supports dark color scheme via `prefers-color-scheme`
- Print stylesheet for clean printing

### JavaScript Validation
- Custom validation class: `SettingsForm`
- Declarative validation rules object
- Event-driven validation (input, blur, change)
- localStorage API for persistence

### Storage

**localStorage Key:** `widgetSettings`

**Stored Data:**
```javascript
{
  formTitle: "string",
  formDescription: "string",
  submitButtonText: "string",
  nameRequirement: "required|optional|hidden",
  emailField: boolean,
  phoneField: boolean,
  companyField: boolean,
  recipientEmail: "email@example.com",
  senderEmail: "email@example.com",
  emailSubject: "string",
  successMessage: "string",
  errorMessage: "string",
  primaryColor: "#007bff",
  buttonStyle: "filled|outline|ghost",
  enableDarkMode: boolean,
  savedAt: "ISO8601 timestamp"
}
```

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Features Requiring Modern Browsers
- CSS Grid and Flexbox
- CSS Custom Properties (Variables)
- localStorage API
- HTML5 Form Validation APIs
- CSS `prefers-color-scheme` media query

## Accessibility

### Keyboard Navigation
- All form fields accessible via Tab key
- Buttons clickable with Enter/Space
- Form submission with Enter key
- Dropdowns navigable with arrow keys

### Screen Reader Support
- Proper `<label>` elements associated with inputs
- Fieldsets group related fields with legend
- Error messages associated with fields
- Alerts have `role="alert"` for announcement

### Color Contrast
- All text meets WCAG AA standards
- Error states clearly visible in light and dark modes
- Color not sole indicator of state

### Form Design
- Clear, descriptive labels
- Helpful placeholder text
- Error messages explain what went wrong
- Required fields clearly marked

## Troubleshooting

### Settings Not Saving
- Clear browser cache and localStorage
- Check browser console for JavaScript errors
- Ensure localStorage is enabled (not in Private/Incognito mode)

### Validation Not Working
- Ensure JavaScript is enabled
- Check that settings.js loads without errors
- Verify form element ID is "settingsForm"

### Styling Issues
- Clear browser cache
- Check that settings.css loads properly
- Verify CSS file path is correct in HTML

### localStorage Quota Exceeded
- Clear old browser data
- localStorage limit typically 5-10MB per domain
- Check browser console for QuotaExceededError

## Future Enhancements

Potential improvements for future versions:
- Server-side persistence via API
- Export/import settings
- Settings versioning and history
- Multi-language support
- Advanced customization options
- Template presets
- Analytics integration
- A/B testing configuration

## Conventions Used

### Naming
- BEM-style CSS class names (`form-section`, `form-group`)
- camelCase for JavaScript variables and functions
- kebab-case for CSS custom properties (`--color-primary`)

### Code Style
- ESLint-compatible JavaScript
- Comments for complex logic
- Clear separation of concerns
- Consistent indentation (2 spaces)

### Responsive Breakpoints
- Desktop: 1024px and up
- Tablet: 768px to 1023px
- Mobile: Below 768px
- Small mobile: 480px and below
