## Create a local project
- copy local.dist.yml to local.yml
- open local.yml and change %stage-name% to your name (alexandrov for instance)

##  Deploy the stack 
`yarn tsc && AWS_PROFILE=dh-fridge-stg AWS_REGION=eu-west-1 yarn serverless deploy` 

##  Deploy production stack 
`yarn tsc && AWS_PROFILE=dh-fridge-stg AWS_REGION=eu-west-1 yarn serverless deploy --environment=environments/prod.yml` 

## Local/offline development
`yarn tsc && AWS_PROFILE=dh-fridge-stg AWS_REGION=eu-west-1 yarn serverless offline -c`
