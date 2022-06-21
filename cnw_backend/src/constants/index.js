import yenv from 'yenv';

const env = yenv('../env_cnw.yaml', { env: 'development' });

export const HOSTING_URI = env.HOSTING_URI;
export const DATABASE_NAME = env.DATABASE_NAME;
export const DATABASE_USER = env.DATABASE_USER;
export const DATABASE_PASS = env.DATABASE_PASS;
export const DATABASE_PORT = env.DATABASE_PORT;
export const DATABASE_DIALECT = env.DATABASE_DIALECT;

export const SERVICE_HOST = env.SERVICE_HOST;
export const SERVICE_USER = env.SERVICE_USER;
export const SERVICE_PASS = env.SERVICE_PASS;
export const TYPE_ENV = env.TYPE_ENV;
export const SITE_NAME = env.SITE_NAME;
export const JWT_KEY = env.JWT_KEY;

export const PORT_SERVICE_API = env.PORT_SERVICE_API;

// export const HOSTING_URI = process.env.HOSTING_URI;
// export const DATABASE_NAME = process.env.DATABASE_NAME;
// export const DATABASE_USER = process.env.DATABASE_USER;
// export const DATABASE_PASS = process.env.DATABASE_PASS;
// export const DATABASE_PORT = process.env.DATABASE_PORT;
// export const DATABASE_DIALECT = process.env.DATABASE_DIALECT;

// export const SERVICE_HOST = process.env.SERVICE_HOST;
// export const SERVICE_USER = process.env.SERVICE_USER;
// export const SERVICE_PASS = process.env.SERVICE_PASS;
// export const TYPE_ENV = process.env.TYPE_ENV;
// export const SITE_NAME = process.env.SITE_NAME;
// export const JWT_KEY = process.env.JWT_KEY;

// export const PORT_SERVICE_API = process.env.PORT_SERVICE_API;
