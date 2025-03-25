#!/bin/sh
# Replace placeholder values in appConfig.ts.template with actual environment variables
envsubst < ./public/appConfig.ts.template > ./src/appConfig.ts

# Start Nginx
exec nginx -g "daemon off;"