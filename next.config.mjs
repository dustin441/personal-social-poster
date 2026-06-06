import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  outputFileTracingIncludes: {
    "/api/download": ["./private/profilepilot-kit.zip"],
  },
};

export default nextConfig;
