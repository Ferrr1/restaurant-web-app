// This regex pattern is used to validate email addresses.
export const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
// ^[a-zA-Z0-9]+ : matches the local part of the email, allowing only alphanumeric characters
// @ : matches the @ symbol
// [a-zA-Z0-9]+ : matches the domain name, allowing only alphanumeric characters
// \.[a-zA-Z]{2,} : matches the top-level domain (TLD), requiring at least two alphabetic characters after the dot
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
// command line explanation
// ?=.*[a-z] : at least one lowercase
// ?=.*[A-Z] : at least one uppercase
// ?=.*\d    : at least one digit
// [a-zA-Z\d]{8,} : at least 8 characters long, only alphanumeric characters
