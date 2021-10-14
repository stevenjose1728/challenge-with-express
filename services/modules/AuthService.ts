import {axios} from 'utils';
import {AxiosResponse, AxiosError} from 'axios'
import { User, AuthParams } from 'models';
class AuthService {

  static login = (form: AuthParams): Promise<User> => {
    return new Promise((resolve, reject) => {
      axios
      .post('login', form)
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
    AuthService
};
