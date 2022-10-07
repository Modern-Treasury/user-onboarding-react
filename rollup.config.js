import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";

export default [
  {
    input: "src/index.tsx",
    external: ["react", "prop-types"],
    output: [
      {
        file: pkg.main,
        format: "cjs",
      },
      {
        file: pkg.module,
        format: "es",
      },
    ],
    plugins: [
      typescript(),
      babel({
        exclude: "node_modules/**",
        babelHelpers: "bundled",
        extensions: [".ts", ".js", ".tsx", ".jsx"],
      }),
      resolve(),
      commonjs(),
      terser(),
    ],
  },
  // UMD build with inline PropTypes
  {
    input: "src/index.tsx",
    external: ["react"],
    output: [
      {
        name: "MTOnboardingReact",
        file: pkg.browser,
        format: "umd",
        globals: { react: "React" },
      },
    ],
    plugins: [
      typescript(),
      resolve(),
      babel({
        exclude: "node_modules/**",
        babelHelpers: "bundled",
        extensions: [".ts", ".js", ".tsx", ".jsx"],
      }),
      commonjs(),
    ],
  },
  // Minified UMD Build without PropTypes
  {
    input: "src/index.tsx",
    external: ["react"],
    output: [
      {
        name: "MTOnboardingReact",
        file: pkg["browser:min"],
        format: "umd",
        globals: { react: "React" },
      },
    ],
    plugins: [
      typescript(),
      resolve(),
      babel({
        exclude: "node_modules/**",
        babelHelpers: "bundled",
        extensions: [".ts", ".js", ".tsx", ".jsx"],
      }),
      commonjs(),
      terser(),
    ],
  },
];
