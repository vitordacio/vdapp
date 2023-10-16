interface IResponse {
  token: string;
  user: object;
}

const SignIn = (): Promise<IResponse> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: 'abc',
        user: {
          name: 'Teste',
          username: 'teste',
        },
      });
    }, 1000);
  });
};

export { SignIn };
