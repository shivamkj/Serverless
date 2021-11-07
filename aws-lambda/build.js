import esbuild from "esbuild";

esbuild.buildSync({
  entryPoints: ["db.js"],
  target: "es2019",
  bundle: true,
  minify: true,
  outfile: "dist/out.js",
  format: "esm",
});
