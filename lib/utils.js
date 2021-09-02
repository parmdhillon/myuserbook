import Router from 'next/router';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
const JWT_KEY = process.env.JWT_KEY;

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_KEY);
  } catch (e) {
    console.log('Invalid Token');
    return null;
  }
}

export function getCookieToken(req) {
  try {
    const allCookies = req.headers.cookie.split('; ');
    let token;
    for (let cookieItem of allCookies) {
      const cookieArray = cookieItem.split('=');
      if (cookieArray[0] == 'token') {
        token = decodeURI(cookieArray[1]);
        token = token.split(' ')[1];
        break;
      }
    }
    if (token) {
      return token;
    } else {
      return null;
    }
  } catch (error) {
    console.log('No Cookies');
    return null;
  }
}

export function signoutUser() {
  Cookies.remove('token');
  Router.push('/');
}

export async function getUser() {
  const getUserApi = await fetch('/api/user/getUser', {
    method: 'GET',
  }).catch((error) => {
    console.log(error);
    signoutUser();
  });
  const result = await getUserApi.json();
  return result.data;
}
