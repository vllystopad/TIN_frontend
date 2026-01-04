import type { Config } from "@react-router/dev/config";

export default {
  // SPA Mode: Disables runtime server rendering
  // The root route is pre-rendered at build time to generate index.html
  // Learn more: https://reactrouter.com/how-to/spa
  ssr: false,
} satisfies Config;
