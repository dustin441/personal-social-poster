import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  outputFileTracingIncludes: {
    "/api/download": [join(__dirname, "private/personal-profile-posting-kit.zip")],
  },
};

export default nextConfig;
