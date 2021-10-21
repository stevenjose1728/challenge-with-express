import {axios} from 'utils';
import {AxiosResponse, AxiosError} from 'axios'
import { DefaultResponse, Team } from 'models';

const END_POINT = 'teams'
class TeamService {

  static getAll = (): Promise<Team[]> => {
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

  static save = (name: string): Promise<DefaultResponse> => {
    return new Promise((resolve, reject) => {
      axios
      .post(END_POINT, {name})
      .then(
        (response: AxiosResponse) =>
          resolve(response.data),
        (error: AxiosError) =>
          reject(error)
      );
    });
  }

  static update = (name: string, id: number): Promise<DefaultResponse> => {
    return new Promise((resolve, reject) => {
      axios
      .patch(END_POINT, {
        name,
        id
      })
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
    TeamService
};
