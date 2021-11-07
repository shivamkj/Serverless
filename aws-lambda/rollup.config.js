import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";

export default {
  input: "orignal.js",
  output: {
    file: "dist/bundle.js",
    format: "cjs",
  },
  plugins: [
    resolve(),
    commonjs(),
    json(),
    terser({
      module: true,
      ecma: 2015,
      format: {
        comments: false,
      },
    }),
    // babel({
    //   exclude: "node_modules/**",
    // }),
  ],
};
