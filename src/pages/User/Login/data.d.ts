declare namespace UserLogin {
  type LoginParams = {
    username: string;
    password: string;
    autoLogin?: boolean;
    type?: string;
  };

  type AuthParams = {
    email: string;
    password: string;
    device?: string;
  };
}
