import {axios} from 'utils';
import {AxiosResponse, AxiosError} from 'axios'
import { User, DefaultResponse, DefaultError } from 'models';
type UserForm = User & {
  password: string,
  password_confirmation: string
}
class UserService {

  static getAll = (): Promise<User[]> => {
    return new Promise((resolve, reject) => {
      axios
      .get('users')
      .then(
        (response: AxiosResponse) =>
          resolve(response.data),
        (error: AxiosError) =>
          reject(error)
      );
    });
  }

  static create = (user: UserForm): Promise<DefaultResponse> => {
    return new Promise((resolve, reject) => {
      axios
      .post('users', user)
      .then(
        (response: AxiosResponse) =>
          resolve(response.data),
        (error: AxiosError<DefaultError>) =>
          reject(error?.response?.data)
      );
    });
  }

  static update = (user: UserForm): Promise<DefaultResponse> => {
    return new Promise((resolve, reject) => {
      axios
      .patch(`users/${user.id}`, user)
      .then(
        (response: AxiosResponse) =>
          resolve(response.data),
        (error: AxiosError<DefaultError>) =>
          reject(error?.response?.data)
      );
    });
  }

  static delete = (user: User): Promise<DefaultResponse> => {
    return new Promise((resolve, reject) => {
      axios
      .delete(`users/${user.id}`)
      .then(
        (response: AxiosResponse) =>
          resolve(response.data),
        (error: AxiosError<DefaultError>) =>
          reject(error?.response?.data)
      );
    });
  }

}

export {
    UserService
};
