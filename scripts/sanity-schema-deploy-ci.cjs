/**
 * Runs `sanity schema deploy` before `next build` only when:
 * - SANITY_AUTH_TOKEN is set, and
 * - Vercel deploy (VERCEL=1), or CI (CI=true), or explicit SANITY_SCHEMA_DEPLOY_ON_BUILD=1
 *
 * That way a weak / wrong token in your shell or .env does not break local `pnpm build`.
 * Push schema locally anytime: `pnpm sanity:schema:deploy` (uses `sanity login`).
 *
 * Force skip: SANITY_SKIP_SCHEMA_DEPLOY=1
 */
const { execSync } = require("node:child_process");

if (process.env.SANITY_SKIP_SCHEMA_DEPLOY === "1") {
  console.log("[sanity] SANITY_SKIP_SCHEMA_DEPLOY=1 — skipping schema deploy.");
  process.exit(0);
}

if (!process.env.SANITY_AUTH_TOKEN) {
  console.log(
    "[sanity] SANITY_AUTH_TOKEN not set — skipping schema deploy (Vercel should set this).",
  );
  process.exit(0);
}

const shouldRunSchemaDeploy =
  process.env.VERCEL === "1" ||
  process.env.CI === "true" ||
  process.env.SANITY_SCHEMA_DEPLOY_ON_BUILD === "1";

if (!shouldRunSchemaDeploy) {
  console.log(
    "[sanity] Local build: skipping schema deploy (token present but deploy runs on Vercel/CI only, or set SANITY_SCHEMA_DEPLOY_ON_BUILD=1). Push schema: pnpm sanity:schema:deploy",
  );
  process.exit(0);
}

try {
  execSync("pnpm exec sanity schema deploy --verbose", {
    stdio: "inherit",
    env: process.env,
  });
} catch {
  console.error(`
[sanity] Schema deploy failed. The token needs deploy rights on project swis517n.

Use an API token from: https://www.sanity.io/manage/project/swis517n/api
Role: Administrator (or Developer if it includes schema / Studio deploy).

Sanity error was above — usually: missing grant sanity.project/deployStudio (wrong role or personal token without project access).

Debug: pnpm exec sanity schema deploy --verbose
`);
  process.exit(1);
}
