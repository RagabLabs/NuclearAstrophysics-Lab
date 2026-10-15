# GitHub review and deployment

No repository has been created, pushed, or published for this task. The suggested name is `NuclearAstrophysics-Lab`. Do not publish without the owner's explicit approval.

After reviewing the source and approving publication, create a repository with the desired visibility, upload/commit the extracted project, and run the CI workflow. This workflow uses npm ci, the scientific/unit suite, data validation, type checking, production build and Chromium desktop/mobile tests. A green run is required for an actual browser-verification claim; the delivered run skipped those checks because this environment lacked Chromium.

For GitHub Pages, choose Settings > Pages > Source: GitHub Actions. After public-publication approval, explicitly run the `Deploy GitHub Pages (manual approval)` workflow from Actions. It runs only with workflow_dispatch; push and pull_request never trigger a deployment. An optional GitHub Environment protection rule can require an additional reviewer.

`vite.config.ts` defaults to `/NuclearAstrophysics-Lab/`. If the repository name changes, set `VITE_BASE_PATH=/<new-name>/` in the build step. For a user/organization root Pages repository the base is `/`. The app uses hash navigation, so `/#thermal` and the other routes do not require server rewrites.

The public artifact is the contents of dist/, not node_modules or the source ZIP. An independent local standalone.html is also built for offline review. No secrets or API keys are required. Use only an appropriate database/data attribution policy when republishing; code MIT does not automatically relicense third-party nuclear data.
