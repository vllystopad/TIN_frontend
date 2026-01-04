import { reactRouter } from "@react-router/dev/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [reactRouter(), tsconfigPaths()],
    server: {
      port: Number(env.PORT!),
    },
    optimizeDeps: {
      include: [
        "@mui/material",
        "@mui/material/styles",
        "@mui/material/CssBaseline",
      ],
    },
  };
});
