export interface ICreateUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface IUpdateBio {
  bio: string;
}

export interface IUpdateEmail {
  email: string;
}

export interface IUpdateGender {
  gender: string;
}

export interface IUpdateLocation {
  location: string;
}

export interface IUpdateName {
  name: string;
}

export interface IUpdatePassword {
  password: string;
  new_password: string;
}

export interface IUpdatePrivacy {
  private: boolean;
}

export interface IUpdateSocial {
  social: string;
  username: string;
}

export interface IUpdateUsername {
  username: string;
}
