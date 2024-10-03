export type User = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  re_password: string;
};

export type JWTAccess = {
  access: string;
};
