module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://threadhive.onrender.com/:path*',
          },
        ]
      },
  };