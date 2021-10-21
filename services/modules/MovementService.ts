import {axios} from 'utils';
import {AxiosResponse, AxiosError} from 'axios'
import { Movement, DefaultResponse, MovementParams } from 'models';
const END_POINT = 'movements'
class MovementService {

  static getAll = (): Promise<Movement[]> => {
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

  static save = (form: MovementParams): Promise<DefaultResponse> => {
    return new Promise((resolve, reject) => {
      axios
      .post(END_POINT, form)
      .then(
        (response: AxiosResponse) =>
          resolve(response.data),
        (error: AxiosError) =>
          reject(error)
      );
    });
  }

  static update = (form: MovementParams): Promise<DefaultResponse> => {
    return new Promise((resolve, reject) => {
      axios
      .patch(END_POINT, form)
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
      .delete(END_POINT+'/'+id)
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
    MovementService
};
