const { Stack, CfnOutput } = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
// const sqs = require('aws-cdk-lib/aws-sqs');

class HelloCdkJavascriptStack extends Stack {
	/**
	 *
	 * @param {Construct} scope
	 * @param {string} id
	 * @param {StackProps=} props
	 */
	constructor(scope, id, props) {
		super(scope, id, props);

		// Define the Lambda function resource
		const myFunction = new lambda.Function(this, "HelloWorldFunction", {
			runtime: lambda.Runtime.NODEJS_20_X, // Provide any supported Node.js runtime
			handler: "index.handler",
			code: lambda.Code.fromInline(`
        exports.handler = async function(event) {
          return {
            statusCode: 200,
            body: JSON.stringify('Hello CDK!'),
          };
        };
      `),
		});

		// Define the Lambda function URL resource
		const myFunctionUrl = myFunction.addFunctionUrl({
			authType: lambda.FunctionUrlAuthType.NONE,
		});

		// Define a CloudFormation output for your URL
		new CfnOutput(this, "myFunctionUrlOutput", {
			value: myFunctionUrl.url,
		});
	}
}

module.exports = { HelloCdkJavascriptStack };
