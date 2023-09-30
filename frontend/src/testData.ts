export type Password = {
  id: string;
  passwordText: string;
  username: string;
  domain: string;
  tag: number;
};

export const testPasswords = [
  {
    id: "1",
    password: "123456",
    username: "tonadr1022",
    domain: "google.com",
    tag: 2,
  },
  {
    id: "2",
    password: "123456",
    username: "tonadr1022",
    domain: "google.com",
    tag: 2,
  },
  {
    id: "3",
    password: "234234234",
    username: "tonadr1022",
    domain: "espn.com",
    tag: 1,
  },
  {
    id: "4",
    password: "123456",
    username: "adflsdf",
    domain: "yahoo.com",
    tag: 1,
  },
];
