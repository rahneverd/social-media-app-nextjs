import { APIROUTES, Backend_URL } from './contants';

export function register(username: string, email: string, password: string) {
  return new Promise(async (resolve, reject) => {
    const response: any = await fetch(Backend_URL + APIROUTES.REGISTER, {
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
    // return response;
    if (!response.ok) {
      const error: any = await response.json();
      // throw new Error(error);
      reject(new Error(error));
    } else {
      resolve(response);
    }
  });
}
