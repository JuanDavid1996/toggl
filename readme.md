# Toggle clone

Api rest con funcionamiento similar a "Toggle track",  a continuacion el paso a paso de de configuracion de ambiente de desarrollo.

**Nota**: asumo que previamente han clonado el proyecto y se encuentran en el directoruo del proyecto, tambien asumo que va a ejecutar el proyecto localmente y cuenta con mongodb instalado en su maquina.

Primero instalamos las dependecias de node, en mi caso use npm, asi que el primer comando a ejecutar es `npm i`

antes de ejecutar el proyecto asegurese de crear el archivo de variables de entorno, el archivo tiene por nombre .env, y su contenido es el siguiente:

    #DB_USER="prod"  
    DB_NAME="toogle"  
    #DB_PASS="12345"  
    DB_HOST="localhost"  
    PRIVATE_KEY="ssh-rsa MIIEpAIBAAKCAQEAwjtNmSf4nbKLidXVnYQN01Qcct/7+2lErIQLGk+/AVADBamfq3c5ObVmQ5CDWzqMd1Nge9HnAsP5H9Ioi2Mrnz//cA1YPKPPIxKDsxkRN6cXlWvVCUUA9wVwxOn33j5wDHtHlHW1DZbqTNNWYVPrgz5zH1+IrbGGtNnh102auV68MBNGe5g7mLHzmZ/2IddiR5WtPVmT7cKoTbG7+kduANfAK2hlNMMCSPm7UOvabserx+LNt2r/ufGJeUgVM+97FnDBLULRh/XaKYgKN7dSlphBQMuXfKNWQgWnrEP11LpmRVx4x7bb1dX+NrA+5iAT84reVaa6GTMklPYL2fhuUQIDAQABAoIBAG0dRaWht+BXml5Pm5bGxcGPwf+i5vtBEwxbjaU1YZdKLLh0pzd7XdGWn6GbQL/yb1DlrRFCRSXflEeVF6PejXYETOrVBFnkqIwKbaQik/KQ0wXlMyPm+PjMvKJS0iWvK+FHLFoxmgnNW0jXfPJmY6syXRgl4jG5xnQ45s++UAqMPB3SBB4dW3c6HswhsCIgEqwi54Cuu4o++kbXwW+HPaUQySfB8tPuxet4IIpowIt7PkQYgKVG7QqfMI1Q4Skgfk9xFwlKCWQ3zcb3Gijm96+Gw4CY96UqPA6PcImDIhUDH58NtvJjFbXfVJVK4VlJHczCfWgstoIavQY4cy9w2HUCgYEA6VW0HgxU7tlMHCsUCKdZDd3zmcdFSv6PjsJ5AjJP2XhYGMVGBuKJlkJi0TkNCCJoII2otc3De15k66mmB4Z6QXKBL4bdRRSjORrcrDgCyvXRdkU7tC0IvM9e9fYhb5NHfGJSloxkRDGhr/DwvIx4Y6OMg7Gj4xK/AlcjOeAHt8MCgYEA1Rk6jJicZT121dLoRAjapnXReOfslHfkIJ3Zai17EOs3/55oGyct3BHW8ofkpEeazwUVmq9lQ4ASyxLXONnChaW/ct87hmnJ1jIzn5UaZg3UQRpcqUVQV+2hgZ9p6rkX0iPcqpVsY3F3OmqatvqJmB2mS9NT2SPpwUqyn6KXtFsCgYEAi9uU9JXLqsaQeinP/kfgdxFcXAY3IHZosdcbFRf3CJC7rU1BZgsPEQOFm4aoqwGEjE6cmyxUSXQQ5bhwDf6q9OOfT090/V0bYLUbJBcGhYTGIi/pU1vS6ukZMDBxZiFPLdz5R8eqqb1d/slaYomH96EmLiGh7A9mcg6szJndxmUCgYEAoPJPEEVrSeOkT1bd6hSt3694qFKykmgCuse9n73+BwdA4iVoB6oNrvsiV0df3tveBqGWcaArYVHn38y5FM0TaBGJiV8k/B4GPWrpJoxcxduIBiu89HPPfLmTk+0s+AUYArTnQ0db97eJD2vYsn6DUYqDQR25ZHUFZeHfC0aoQaUCgYAO0LD06/Jz7IbFvsxGcANbTWoO/x0M4KXsNzphpk2ewKSRgJMrBpb6DfiAMZcHmaT+8kympgz1Nm4Rx253fZnZlX+769RVOMTcnbpO/8c/7UTI/fnCOxHfpF9oM2fbU1NXHGdEMCHrCUikW30BaIxoVi61HCPjDIoSqNb4Ck88QQ=="

Por ùltimo ya deberìa de poder ejecutar el proyecto a travez de la linea de comando.

Documentaciòn  de Postman: [https://documenter.getpostman.com/view/6696713/TzY3BFz5](https://documenter.getpostman.com/view/6696713/TzY3BFz5)

Los usuario que estàn creado tienen por clave: 12345678

El Proyecto se està ejecutando desde una instancia de ec2, la url es: http://18.130.197.24:4000

Deploy del server:
https://docs.google.com/document/d/1VJAUFf-rNDBsIL-LM7vrIYgwthrQP3o2C2VZVhuucBk/edit?usp=sharing