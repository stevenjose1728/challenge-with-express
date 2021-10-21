import {axios} from 'utils';
import {AxiosResponse, AxiosError} from 'axios'
import { Log } from 'models';
const END_POINT = 'logs'
class LogService {

  static getAll = (): Promise<Log[]> => {
    return new Promise((resolve, reject) => {
      axios
      .get(END_POINT)
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
    LogService
};
