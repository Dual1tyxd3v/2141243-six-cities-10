const USER_INFO_NAME = 'user_info';

export type UserInfo = string;

export const getTUserInfo = (): UserInfo => {
  const userInfo = localStorage.getItem(USER_INFO_NAME);
  return userInfo ?? '';
};

export const saveUserInfo = (userInfo: UserInfo): void => {
  localStorage.setItem(USER_INFO_NAME, userInfo);
};

export const dropUserInfo = (): void => {
  localStorage.removeItem(USER_INFO_NAME);
};
