#!/bin/sh
# Replace placeholder values in config.js.template with actual environment variables
envsubst < /config.js.template > /config.js

# Start Nginx
exec nginx -g "daemon off;"