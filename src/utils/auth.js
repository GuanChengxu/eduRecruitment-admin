import Cookies from 'js-cookie'


export function getUserId () {
  return Cookies.get()
}

export function setUserId (data) {
  return Cookies.set()
}

export function removeUserId () {
  return Cookies.remove()
}

export function setExamTime (data) {
  return localStorage.setItem()
}

export function getExamTime () {
  return localStorage.getItem()
}

export function removeExamTime () {
  return localStorage.removeItem()
}
