// import { createRouter } from '@jquad-group/plugin-tekton-pipelines-backend';
// import { Router } from 'express';
// import { PluginEnvironment } from '../types';

// export default async function createPlugin(
//   env: PluginEnvironment,
// ): Promise<Router> {

//   return await createRouter({
//     logger: env.logger,
//     config: env.config,
    
    
//   });
// }

// function getBearerTokenFromAuthorizationHeader(authorizationHeader: unknown): string | undefined {
//   if (typeof authorizationHeader === 'string') {
//     const parts = authorizationHeader.split(' ');
//     if (parts.length === 2 && parts[0] === 'Bearer') {
//       const token = parts[1];
//       console.log('Token:', token); // Mostrar el token en la consola o puedes realizar cualquier otra acción con él
//       return token;
//     }
//   }
//   return undefined;
// }

import { createRouter } from '@jquad-group/plugin-tekton-pipelines-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { Request } from 'express';

interface RequestWithToken extends Request {
  token?: string;
}

// Esta es la función que extrae el token del encabezado de autorización
function getBearerTokenFromAuthorizationHeader(authorizationHeader: unknown): string | undefined {
  if (typeof authorizationHeader !== 'string') {
    return undefined;
  }

  const parts = authorizationHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return undefined;
  }

  return parts[1];
}

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const router = await createRouter({
    logger: env.logger,
    config: env.config,
  });

  // Middleware para extraer el token Bearer de la cabecera de autorización
  router.use((req: RequestWithToken, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    const token = getBearerTokenFromAuthorizationHeader(authorizationHeader);

    if (!token) {
      res.status(401).send('Unauthorized: No token provided');
      return;
    }

    // Aquí puedes hacer algo con el token, por ejemplo, adjuntarlo al objeto de la solicitud.
    req.token = token;
    
    next();  // Continúa con la siguiente función de middleware o la función de manejo de la ruta
  });

  // Tus rutas aquí

  return router;
}

