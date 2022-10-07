#!/bin/bash
set -euo pipefail

npm config set '//registry.npmjs.org/:_authToken' "${NPM_TOKEN}"
yarn build
npm pack
npm publish --access public
