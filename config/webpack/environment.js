const { environment } = require("@rails/webpacker");

// Set a new entry point for application.tsx
environment.entry.set("application", "./app/javascript/packs/application.tsx");

environment.config.merge({
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
});

module.exports = environment;
