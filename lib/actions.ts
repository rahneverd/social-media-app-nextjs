import { APIROUTES } from './contants';

export function register(username: string, email: string, password: string) {
  return new Promise(async (resolve, reject) => {
    const response: any = await fetch('/api/' + APIROUTES.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        username,
        password
      })
    });
    console.log(response);
    // return response;
    if (!response.ok) {
      const error: any = await response.json();
      console.log(response);
      // throw new Error(error);
      reject(new Error(error));
    } else {
      const resJson = await response.json();
      if (resJson?.error) {
        console.log(resJson);
        reject(new Error(resJson?.error));
      }
      resolve(response);
    }
  });
}

export function upload(file: File) {
  return new Promise(async (resolve, reject) => {
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    // formData.append('title', title);
    // formData.append('body', body);
    // formData.append('token', appState.user.token);
    console.log(formData);
    const response: any = await fetch('/api/' + APIROUTES.UPLOAD, {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded'
      // },
      body: formData
    });
    console.log(response);
    // return response;
    if (!response.ok) {
      const error: any = await response.json();
      console.log(response);
      // throw new Error(error);
      reject(new Error(error));
    } else {
      const resJson = await response.json();
      console.log(resJson);
      if (resJson?.error) {
        console.log(resJson);
        reject(new Error(resJson?.error));
      } else {
        resolve(resJson);
      }
    }
  });
}
