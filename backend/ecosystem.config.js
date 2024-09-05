module.exports = {
    apps: [
      {
        name: 'backend',
        script: 'dist/backend/src/server.js', // Path to the compiled server file
        instances: '2', // Or a specific number of instances
        exec_mode: 'cluster', // Enables load balancing
        env: {
          NODE_ENV: 'development',
          PORT: 4000,
        },
        env_production: {
          NODE_ENV: 'production',
          PORT: 4000,
        },
      },
    ],
  };