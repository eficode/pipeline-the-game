export function generateRandomEmail() {
  return `testEmail${Math.floor(Math.random() * 10000)}@email.com`.toLocaleLowerCase();
}

export function generateRandomPassword() {
  const length = 8;
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const alphabet = `${letters}${uppercaseLetters}${numbers}`;
  let password = "";
  password += letters.charAt(Math.floor(Math.random() * letters.length));
  password += uppercaseLetters.charAt(Math.floor(Math.random() * uppercaseLetters.length));
  password += numbers.charAt(Math.floor(Math.random() * numbers.length));
  for (let i = 0; i < length - 3; ++i) {
    password += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return password;
}

export function generateRandomCredentials() {
  return {
    email: generateRandomEmail(),
    password: generateRandomPassword(),
  }
}
