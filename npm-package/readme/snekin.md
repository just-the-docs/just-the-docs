# Snekin

Snekin requires a configuration file to function.

Save this to `~/.snekin.json`:

```json
{
  "host": "127.0.0.1",
  "port": 8080,
  "coc": "OPTIONAL URL to Code of Conduct page",
  "slack_domain": "my-slack-team-name",
  "slack_token": "MY_SLACK_TOKEN"
}
```

Fill in the details then run this command:

```bash
$ snekin ~/.snekin.json
```
