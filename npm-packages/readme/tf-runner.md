# tf-runner

tf-runner is a wrapper around [terraform](https://www.terraform.io/) that makes running terraform in multiple environments and storing the remote state in [S3](https://www.terraform.io/docs/state/remote/s3.html) easier.

### Directory structure

tf-runner expects a directory named **environments** with a directory for each environment in it. The terraform commands will run in the appropriate environment directory based on the specified `env` option.

For e.g. running `tf --env staging apply` would run terraform's apply wrapper inside `./environments/staging`.

### Bootstraping

`tf bootstrap` will create a versioned S3 bucket to store terraform's remote state in.
