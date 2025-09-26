import { HttpInterceptorFn } from '@angular/common/http';

function getLs(k: string): string {
  try { return localStorage.getItem(k) ?? ''; } catch { return ''; }
}

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const token = getLs('token');

  const isLogin = /\/sisprecario-api\/authenticate\/login$/i.test(req.url);
  if (isLogin) {
    return next(req);
  }

  let cloned = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;
  return next(cloned);
};
