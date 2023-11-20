# Reproduction for https://github.com/n1ru4l/envelop/issues/2004

This repo attempts to be a minimal reproduction for the issue described in https://github.com/n1ru4l/envelop/issues/2004.

## How to run

1. Clone this repo
2. Run `pnpm install`
3. Run `docker-compose up` to start Redis + Postgres
4. Run `pnpm start` to start the server
5. Run `pnpm reproduce` to run the script that might be causing the issue
