import { createProxyMiddleware } from 'http-proxy-middleware';
import { Application } from 'express';

export default function setupProxy(app: Application) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
}
