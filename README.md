# Civoris Web App

[![Quality Gate Status](https://sonar.bumiller.me/api/project_badges/measure?project=civoris_web-client_c89ee087-026c-4578-b835-32b544f0b642&metric=alert_status&token=sqb_3f2cf2d7be6feee5a3ee8bbf211b732bfadebcbe)](https://sonar.bumiller.me/dashboard?id=civoris_web-client_c89ee087-026c-4578-b835-32b544f0b642) [![Lines of Code](https://sonar.bumiller.me/api/project_badges/measure?project=civoris_web-client_c89ee087-026c-4578-b835-32b544f0b642&metric=ncloc&token=sqb_3f2cf2d7be6feee5a3ee8bbf211b732bfadebcbe)](https://sonar.bumiller.me/dashboard?id=civoris_web-client_c89ee087-026c-4578-b835-32b544f0b642)

This is the repository for the web app to connect to the Civoris-Server.

## Features

This web app allows a user to connect to a (configurable) Civoris-backend and perform common operations, such as:

- Authentication actions (Logging in, Signing up, Logging out)
- Viewing, creating, updating and deleting law-resources (books, entries, sections) you have access to
- Managing members of law-books by sending out invitations and setting permissions
- Interacting with other users by being invited to a foreign law-book

## Deployment

### Configuration

Independent of the deployment method, the app is configured via environment variables.

| Name       | Description              | Default | Format      | Example              |
|------------|--------------------------|---------|-------------|----------------------|
| apiBaseUrl | Endpoint for the backend | -       | String, URL | https://example.com/ |

### Container

The web app is best deployed as a container. The following shows an example of how to configure a `docker-compose.yml`
file to run the client. `host_port` is a placeholder for the port the docker container will be exposing.

```yaml
services:
  web-app:
    image: ghcr.io/civoris/web-client:<version>
    ports:
      "<host_port>:80"
    environment:
      apiBaseUrl: <api_url>
```