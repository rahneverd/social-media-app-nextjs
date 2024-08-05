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
