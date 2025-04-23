const path = require('path');

module.exports = {
  webpack: (config) => {
    // Elimina cualquier loader de CSS/PostCSS residual
    config.module.rules.forEach(rule => {
      if (rule.oneOf) {
        rule.oneOf = rule.oneOf.filter(loader => {
          if (loader.use) {
            return !loader.use.some(u => 
              u.loader?.includes('postcss-loader') || 
              u.loader?.includes('css-loader')
          }
          return true;
        });
      }
    });

    // Configuración de alias
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };

    return config;
  },
  // Otras configuraciones de Next.js
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  }
};