import { defineConfig } from "tsup";

export default defineConfig((options) => {
  return {
    clean: true,
    splitting: true,
    outDir: "dist",
    format: ["cjs"],
    entry: ["src/index.ts"],
    noExternal: ["pretty-bytes", "mem"],
    sourcemap: true,
    minify: !options.watch,
  };
});
