# AWS-S3-Lambda-Helper

This library is used as a helper to reduce the amount of code needed to perform simple interactions with AWS Simple Storage Servce (S3). 

## Motivation

I write a lot of lambdas and in many cases I need access to S3 service. In most cases it I need simple operations like list, store and delete. 

I found myself writing same piece of code over and over again. This library is the result of the effort to wrap that boiler plate code in a single, simple to use library.

It is specifically designed to be used with AWS Lambdas, however can be used in any project.

## Usage

###Constructor:

``` js
const S3 = require('aws-s3-lambda-helper');
const s3 = new S3(bucket, profile, awsRegion);
```

* bucket - Name of the bucket that you will be interacting with (required).
* profile - profile that will be used to get your AWS credentials. If none provided it will use `AWS.EnvironmentCredentials` with 'AWS' prefix (default in lambda environments) to get credentials (optional)
* awsRegion - region in which your ElasticSearch is located, default: `process.env.AWS_DEFAULT_REGION`. (optional)

###Methods:
Library supports following operations.

#### delete
`s3.delete(key)`

* key - key of the item you want to delete.

Returns a promise.

#### get
`s3.get(key)`

* key - key of the item you want to get.

Returns a promise that resolves with string representation of the item content.


#### store
`s3.store(key, data)`

* key - that data will be stored under.
* data - data that you want to store.

Returns a promise.

## Example

``` js
exports.handler = (event, context, callback) => {
    const S3 = require('aws-s3-lambda-helper');
    const s3 = new S3('my-bucket');

    s3.get('text/helloworld.text').
    then((text) => console.log(text)).
    then(() => callback()).
    catch((err) => callback(err));
}
```