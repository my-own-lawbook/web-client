# MOL Web App
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=my-own-lawbook_web-client&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=my-own-lawbook_web-client) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=my-own-lawbook_web-client&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=my-own-lawbook_web-client) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=my-own-lawbook_web-client&metric=coverage)](https://sonarcloud.io/summary/new_code?id=my-own-lawbook_web-client)

This is the repository for the web app to connect to the MOL-Server.

## Features
This web app allows a user to connect to a (configurable) MOL-backend and perform common operations, such as:

- Authentication actions (Logging in, Signing up, Logging out)
- Viewing, creating, updating and deleting law-resources (books, entries, sections) you have access to
- Managing members of law-books by sending out invitations and setting permissions
- Interacting with other users by being invited to a foreign law-book

## Deployment

### Configuration

Independent of the deployment method, the app is configured via environment variables.

| Name         | Description              | Default | Format      | Example              |
|--------------|--------------------------|---------|-------------|----------------------|
| VITE_API_URL | Endpoint for the backend | -       | String, URL | https://example.com/ |

### Container

The web app is best deployed as a container. The following shows an example of how to configure a `docker-compose.yml`
file to run the client. `host_port` is a placeholder for the port the docker container will be exposing.

```yaml
services:
  web-app:
    image: ghcr.io/my-own-lawbook/web-client:<version>
    ports:
      "<host_port>:80"
    environment:
      VITE_API_URL: <api_url>
```