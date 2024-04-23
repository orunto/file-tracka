/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        AUTH0_REG_ID: process.env.AUTH0_REG_ID,
        AUTH0_GROUPA_ID: process.env.AUTH0_GROUPA_ID,
        AUTH0_GROUPB_ID: process.env.AUTH0_GROUPB_ID,
        AUTH0_GROUPC_ID: process.env.AUTH0_GROUPC_ID,
        AUTH0_GROUPD_ID: process.env.AUTH0_GROUPD_ID,
        AUTH0_DIRECTOR_ID: process.env.AUTH0_DIRECTOR_ID,
        AUTH0_PS_ID: process.env.AUTH0_PS_ID,
        AUTH0_COM_ID: process.env.AUTH0_COM_ID,
      }
};

export default nextConfig;
