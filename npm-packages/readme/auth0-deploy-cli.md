# Auth0 Deploy CLI

Auth0 supports continuous integration and deployment (CI/CD) of Auth0 Tenants and integration into existing CI/CD pipelines by using this **auth0-deploy-cli** tool.

The `auth0-deploy-cli` tool supports the importing and exporting of Auth0 Tenant configuration data.

Supported Auth0 Management API resources
- [x] [Actions](https://auth0.com/docs/api/management/v2/#!/Actions/get_actions)
- [ ] [Branding](https://auth0.com/docs/api/management/v2/#!/Branding/get_branding)
- [x] [Clients (Applications)](https://auth0.com/docs/api/management/v2#!/Clients/get_clients)
- [x] [Client Grants](https://auth0.com/docs/api/management/v2#!/Client_Grants/get_client_grants)
- [x] [Connections](https://auth0.com/docs/api/management/v2#!/Connections/get_connections)
- [ ] [Custom Domains](https://auth0.com/docs/api/management/v2#!/Custom_Domains/get_custom_domains)
- [ ] [Device Credentials](https://auth0.com/docs/api/management/v2#!/Device_Credentials/get_device_credentials)
- [x] [Grants](https://auth0.com/docs/api/management/v2#!/Grants/get_grants)
- [x] [Hooks](https://auth0.com/docs/api/management/v2#!/Hooks/get_hooks)
- [x] [Hook Secrets](https://auth0.com/docs/api/management/v2/#!/Hooks/get_secrets)
- [ ] [Log Streams](https://auth0.com/docs/api/management/v2#!/Log_Streams/get_log_streams)
- [ ] [Logs](https://auth0.com/docs/api/management/v2#!/Logs/get_logs)
- [x] [Organizations](https://auth0.com/docs/api/management/v2#!/Organizations/get_organizations)
- [ ] [Prompts](https://auth0.com/docs/api/management/v2#!/Prompts/get_prompts)
- [x] [Resource Servers (APIs)](https://auth0.com/docs/api/management/v2#!/Resource_Servers/get_resource_servers)
- [x] [Roles](https://auth0.com/docs/api/management/v2#!/Roles)
- [x] [Rules](https://auth0.com/docs/api/management/v2#!/Rules/get_rules)
- [x] [Rules Configs](https://auth0.com/docs/api/management/v2#!/Rules_Configs/get_rules_configs)
- [ ] [User Blocks](https://auth0.com/docs/api/management/v2#!/User_Blocks/get_user_blocks)
- [ ] [Users](https://auth0.com/docs/api/management/v2#!/Users/get_users)
- [ ] [Users By Email](https://auth0.com/docs/api/management/v2#!/Users_By_Email/get_users_by_email)
- [ ] [Blacklists](https://auth0.com/docs/api/management/v2#!/Blacklists/get_tokens)
- [x] [Email Templates](https://auth0.com/docs/api/management/v2#!/Email_Templates/get_email_templates_by_templateName)
- [x] [Emails](https://auth0.com/docs/api/management/v2#!/Emails/get_provider)
- [x] [Guardian](https://auth0.com/docs/api/management/v2#!/Guardian/get_factors)
- [ ] [Jobs](https://auth0.com/docs/api/management/v2#!/Jobs/get_jobs_by_id)
- [ ] [Stats](https://auth0.com/docs/api/management/v2#!/Stats/get_active_users)
- [x] [Tenants (Pages and Migrations)](https://auth0.com/docs/api/management/v2#!/Tenants/get_settings)
- [ ] [Anomaly](https://auth0.com/docs/api/management/v2#!/Anomaly/get_ips_by_id)
- [ ] [Tickets](https://auth0.com/docs/api/management/v2#!/Tickets/post_email_verification)
- [ ] [Signing Keys](https://auth0.com/docs/api/management/v2#!/Keys/get_signing_keys)

# Before you begin

- This tool can be destructive to your Auth0 tenant. Please ensure you have read the documentation and tested the tool on a development tenant before using it in production.
- Entities created using this tool may share user data with or receive user data from 3rd parties. Please see the [documentation for the individual Management endpoints](https://auth0.com/docs/api/management/v2) for details.

# Documentation

Please visit Auth0 Doc for this [Deploy CLI Tool](https://auth0.com/docs/deploy/deploy-cli-tool)

# Integrating with popular CI/CD pipelines
Please visit Auth0 Marketplace Guide for:
- [Azure Pipelines](https://marketplace.auth0.com/integrations/azure-pipeline)
- [Bitbucket Pipelines](https://marketplace.auth0.com/integrations/bitbucket-pipeline)
- [GitLab Pipelines](https://marketplace.auth0.com/integrations/gitlab-pipeline)
- [GitHub Actions](https://marketplace.auth0.com/integrations/github-actions)

# Known issues

See https://github.com/auth0/auth0-deploy-cli/issues

# License

MIT
