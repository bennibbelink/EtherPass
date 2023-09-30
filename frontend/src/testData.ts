export type Password = {
  id: number;
  passwordText: string;
  nickname: string;
  username: string;
  domain: string;
  tag: number;
};

export const testPasswords = [
  {
    id: 1,
    passwordText: "123456",
    username: "tonadr1022",
    nickname: "Google",
    domain: "google.com",
    tag: 2,
  },
  {
    id: 2,
    passwordText: "123456",

    username: "tonadr1022",
    nickname: "ESPN",
    domain: "google.com",
    tag: 2,
  },
  {
    id: 3,
    passwordText: "234234234",
    username: "tonadr1022",
    nickname: "Yahoo",
    domain: "espn.com",
    tag: 1,
  },
  {
    id: 4,
    passwordText: "123456",
    username: "adflsdf",
    nickname: "Google2",
    domain: "yahoo.com",
    tag: 1,
  },
  // {
  //   id: 5,
  //   passwordText: "123456",
  //   username: "tonadr1022",
  //   nickname: "Google",
  //   domain: "google.com",
  //   tag: 2,
  // },
  // {
  //   id: 6,
  //   passwordText: "123456",

  //   username: "tonadr1022",
  //   nickname: "ESPN",
  //   domain: "google.com",
  //   tag: 2,
  // },
  // {
  //   id: 7,
  //   passwordText: "234234234",
  //   username: "tonadr1022",
  //   nickname: "Yahoo",
  //   domain: "espn.com",
  //   tag: 1,
  // },
  // {
  //   id: 8,
  //   passwordText: "123456",
  //   username: "adflsdf",
  //   nickname: "Google2",
  //   domain: "yahoo.com",
  //   tag: 1,
  // },
];
