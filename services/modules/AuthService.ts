import {axios} from 'utils';
import {AxiosResponse, AxiosError} from 'axios'
import { User, AuthParams } from 'models';
class AuthService {

  static login = (form: AuthParams): Promise<{user: User, token: string}> => {
    return new Promise((resolve, reject) => {
      axios
      .post('auth/login', form)
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
