declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      NODE_ENV: "development" | "production" | "test";
      // Add other variables as needed
    }
  }
}

export {};
