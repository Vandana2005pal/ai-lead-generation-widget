# Settings Form Testing Guide

## Overview
The AI Lead Generation Widget Settings Form includes comprehensive validation to ensure all configuration values meet requirements.

## Form Sections

### 1. Form Configuration
- **Form Title** (Required)
  - Min: 5 characters
  - Max: 100 characters
  - Real-time character count display

- **Form Description** (Optional)
  - Max: 500 characters
  - Real-time character count display

- **Submit Button Text** (Required)
  - Min: 3 characters
  - Max: 50 characters

### 2. Contact Information
- **Include Email Field** (Checkbox)
  - Enabled by default
  - Makes email field required in the lead form

- **Include Phone Field** (Checkbox)
  - Disabled by default
  - Makes phone field optional in the lead form

- **Include Company Field** (Checkbox)
  - Disabled by default
  - Makes company field optional in the lead form

- **Name Field Requirement** (Required dropdown)
  - Options: Required, Optional, or Hide
  - Determines how the name field behaves

### 3. Email Settings
- **Recipient Email Address** (Required)
  - Valid email format required
  - Example: leads@yourcompany.com

- **Sender Email Address** (Required)
  - Valid email format required
  - Example: noreply@yourcompany.com

- **Email Subject Line** (Required)
  - Min: 5 characters
  - Max: 100 characters

### 4. User Feedback Messages
- **Success Message** (Required)
  - Min: 10 characters
  - Max: 250 characters
  - Real-time character count display

- **Error Message** (Required)
  - Min: 10 characters
  - Max: 250 characters
  - Real-time character count display

### 5. Appearance
- **Primary Color** (Color picker)
  - Default: #007bff (Blue)

- **Button Style** (Required dropdown)
  - Options: Filled, Outline, Ghost

- **Dark Mode** (Checkbox)
  - Disabled by default
  - Enables dark mode CSS support

## Validation Features

### Real-Time Validation
- Field validation occurs as user types
- Visual feedback: Green border (valid), Red border (invalid)
- Error messages appear below each field

### Error Messaging
- Specific error messages for each validation rule
- Errors clear when field receives focus
- Form-level error alert appears on submit failure

### Success Feedback
- Success alert appears for 5 seconds after save
- Settings are persisted to localStorage
- Auto-scroll to top to show feedback

### Dirty State Tracking
- Form tracks unsaved changes
- Warning appears if user tries to leave with unsaved changes
- State resets after successful save or form reset

## Testing Scenarios

### Test Case 1: Valid Form Submission
1. Fill all required fields with valid data
2. Click "Save Settings"
3. Verify success alert appears
4. Refresh page to confirm settings persist

### Test Case 2: Email Validation
1. Leave recipient email empty
2. Tab out or submit
3. Verify error: "Recipient email is required"
4. Enter invalid email (e.g., "notanemail")
5. Verify error: "Please enter a valid recipient email address"

### Test Case 3: Character Count Limits
1. Enter Form Title with >100 characters
2. Verify error: "Form title cannot exceed 100 characters"
3. Verify character count display updates in real-time

### Test Case 4: Required Field Validation
1. Clear Form Title field
2. Tab out
3. Verify error: "Form title is required"

### Test Case 5: Form Reset
1. Fill form with data
2. Click "Reset to Defaults"
3. Verify all fields cleared
4. Verify all validation states removed

### Test Case 6: Unsaved Changes Warning
1. Fill some form fields
2. Try to navigate away
3. Verify browser shows unsaved changes warning
4. Fill more fields and save
5. Navigate away - no warning should appear

### Test Case 7: Dark Mode
1. Enable dark mode support (checkbox)
2. Save settings
3. Verify form works correctly in dark color scheme

## Browser Compatibility
- Tested on modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design works on desktop and mobile
- Print stylesheet hides buttons and alerts

## Accessibility Features
- Semantic HTML with proper labels and fieldsets
- ARIA labels and roles for alerts
- Keyboard navigation support
- Color contrast meets WCAG standards
- Error messages associated with form fields

## Performance Notes
- localStorage is used for persistence (no server calls)
- Validation runs client-side only
- Form loads previously saved settings on page load
- Character counts update efficiently with debouncing potential
