// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) return "Email is required";
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return "";
};

// Password validation with strength checking
export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  if (password.length < 8)
    return "Password should be at least 8 characters for better security";
  if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password))
    return "Password should contain both uppercase and lowercase letters";
  if (!/(?=.*\d)/.test(password))
    return "Password should contain at least one number";
  return "";
};

// Name validation
export const validateName = (name) => {
  if (!name.trim()) return "Name is required";
  if (name.trim().length < 2) return "Name must be at least 2 characters";
  if (!/^[a-zA-Z\s]+$/.test(name))
    return "Name can only contain letters and spaces";
  return "";
};

// Password confirmation validation
export const validatePasswordConfirm = (password, confirmPassword) => {
  if (!confirmPassword) return "Please confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";
  return "";
};

// Amount validation
export const validateAmount = (amount) => {
  if (!amount) return "Amount is required";
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount)) return "Please enter a valid amount";
  if (numAmount <= 0) return "Amount must be greater than 0";
  if (numAmount > 1000000) return "Amount cannot exceed ₹10,00,000";
  return "";
};

// Get password strength
export const getPasswordStrength = (password) => {
  if (!password) return { strength: 0, label: "", color: "" };

  let score = 0;
  let feedback = [];

  // Length check
  if (password.length >= 8) score += 2;
  else if (password.length >= 6) score += 1;
  else feedback.push("Use at least 6 characters");

  // Character variety checks
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push("Add lowercase letters");

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push("Add uppercase letters");

  if (/\d/.test(password)) score += 1;
  else feedback.push("Add numbers");

  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  else feedback.push("Add special characters");

  // Return strength assessment
  if (score <= 2) return { strength: 1, label: "Weak", color: "red", feedback };
  if (score <= 4)
    return { strength: 2, label: "Fair", color: "orange", feedback };
  if (score <= 5)
    return { strength: 3, label: "Good", color: "yellow", feedback };
  return { strength: 4, label: "Strong", color: "green", feedback: [] };
};
