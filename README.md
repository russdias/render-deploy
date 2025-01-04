# 🚀 Render Deploy

[![GitHub Super-Linter](https://github.com/russdias/render-deploy/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/russdias/render-deploy/actions/workflows/ci.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A GitHub Action to automate deployments to Render.com services. This action
allows you to trigger deployments and manage your Render services directly from
your GitHub workflows.

## Features

- 🚀 Trigger deployments to Render.com services
- 🔄 Automated deployment status tracking
- 💬 GitHub deployment comments integration
- 🔒 Secure API key handling
- ⚡️ Fast Node.js runtime with minimal dependencies

## Prerequisites

1. A Render API key (get it from your
   [Render Dashboard](https://dashboard.render.com/settings/api-keys))
1. Your Render service ID (found in the service URL or settings)

## Usage

Add this action to your workflow:

```yaml
steps:
  - name: Deploy to Render
    uses: russdias/render-deploy@v1
    with:
      RENDER_API_KEY: ${{ secrets.RENDER_API_KEY }}
      RENDER_SERVICE_ID: ${{ secrets.RENDER_SERVICE_ID }}
      GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Inputs

| Input               | Description                               | Required |
| ------------------- | ----------------------------------------- | -------- |
| `RENDER_API_KEY`    | 🔑 Your Render API key                    | Yes      |
| `RENDER_SERVICE_ID` | 🆔 The ID of the Render service to deploy | Yes      |
| `GH_TOKEN`          | 🔒 GitHub token for posting comments      | No       |

## Outputs

| Output   | Description                                |
| -------- | ------------------------------------------ |
| `status` | 📊 The deployment status. Possible values: |
|          | - created                                  |
|          | - build_in_progress                        |
|          | - update_in_progress                       |
|          | - live                                     |
|          | - deactivated                              |
|          | - build_failed                             |
|          | - update_failed                            |
|          | - canceled                                 |
|          | - pre_deploy_in_progress                   |
|          | - pre_deploy_failed                        |

## Example Workflow

```yaml
name: Deploy to Render
on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Render
        uses: russdias/render-deploy@v1
        with:
          RENDER_API_KEY: ${{ secrets.RENDER_API_KEY }}
          RENDER_SERVICE_ID: ${{ secrets.RENDER_SERVICE_ID }}
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Development

1. Install dependencies:

   ```bash
   npm install
   ```

1. Bundle the action:

   ```bash
   npm run bundle
   ```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
