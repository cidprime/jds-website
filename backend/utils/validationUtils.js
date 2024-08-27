/**
 * Validates an email address using a regular expression pattern.
 * 
 * @param {string} email - The email address to be validated.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
exports.validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a password based on specific criteria.
 *
 * @param {string} password - The password to be validated.
 * @returns {boolean} - True if the password meets the criteria, false otherwise.
 */
exports.validatePassword = (password) => {
  // Example criteria: at least 8 characters, at least one number, one special character
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}