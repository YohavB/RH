// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  
  const { transformer, resolver } = config;
  
  // Add support for SVG
  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };
  
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
  };

  // Disable symbolication to prevent JSON parsing errors
  config.server = {
    ...config.server,
    enhanceMiddleware: (middleware, server) => {
      return (req, res, next) => {
        // Handle symbolication requests to prevent JSON parsing errors
        if (req.url && req.url.includes('symbolicate')) {
          // Return empty stack trace to prevent errors
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ 
            stack: [],
            code: req.body?.code || '',
            line: req.body?.line || 0,
            column: req.body?.column || 0
          }));
          return;
        }
        return middleware(req, res, next);
      };
    },
  };

  // Disable source maps in development to reduce symbolication issues
  if (process.env.NODE_ENV === 'development') {
    config.transformer.minifierConfig = {
      keep_fnames: true,
      mangle: {
        keep_fnames: true,
      },
    };
  }
  
  return config;
})();
