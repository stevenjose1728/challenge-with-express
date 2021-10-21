import {axios} from 'utils';
import {AxiosResponse, AxiosError} from 'axios'
import { Account, DefaultResponse } from 'models';
class AccountService {

  static getAll = (): Promise<Account[]> => {
    return new Promise((resolve, reject) => {
      axios
      .get('accounts')
      .then(
        (response: AxiosResponse) =>
          resolve(response.data),
        (error: AxiosError) =>
          reject(error)
      );
    });
  }

  static save = (form: Account): Promise<DefaultResponse> => {
    return new Promise((resolve, reject) => {
      axios
      .post('accounts', form)
      .then(
        (response: AxiosResponse) =>
          resolve(response.data),
        (error: AxiosError) =>
          reject(error)
      );
    });
  }

  static update = (form: Account): Promise<DefaultResponse> => {
    return new Promise((resolve, reject) => {
      axios
      .patch('accounts', form)
      .then(
        (response: AxiosResponse) =>
          resolve(response.data),
        (error: AxiosError) =>
          reject(error)
      );
    });
  }

  static delete = (id: number): Promise<DefaultResponse> => {
    return new Promise((resolve, reject) => {
      axios
      .delete('accounts/'+id)
      .then(
        (response: AxiosResponse) =>
          resolve(response.data),
        (error: AxiosError) =>
          reject(error)
      );
    });
  }

}

export {
    AccountService
};
