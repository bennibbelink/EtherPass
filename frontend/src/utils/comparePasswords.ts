import { Password } from "../testData";

const getPasswordsEqual = (password1: Password, password2: Password) =>
  password1.domain === password2.domain &&
  password1.id === password2.id &&
  password1.nickname === password2.nickname &&
  password1.username === password2.username &&
  password1.passwordText === password2.passwordText &&
  password1.tag === password2.tag;

export const getPasswordListsEqual = (
  passwordList1: Password[],
  passwordList2: Password[]
) => {
  if (passwordList1.length !== passwordList2.length) return false;
  for (let i = 0; i < passwordList1.length; i++) {
    if (!getPasswordsEqual(passwordList1[i], passwordList2[i])) return false;
  }
  return true;
};
