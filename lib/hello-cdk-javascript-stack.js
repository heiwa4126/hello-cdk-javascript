// import { CfnOutput, Stack } from "aws-cdk-lib";
import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class HelloCdkJavascriptStack extends cdk.Stack {
	/**
	 * いろいろ実験するためのスタック
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
		new cdk.CfnOutput(this, "myFunctionUrlOutput", {
			value: myFunctionUrl.url,
		});
	}
}
