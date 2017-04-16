'use strict';

const AWS = require('aws-sdk');
const Q = require('q');

class S3 {
  constructor(bucket, profile, awsRegion) {
    const credentials = profile ? new AWS.SharedIniFileCredentials({ profile })
            : new AWS.EnvironmentCredentials('AWS');
    const region = (awsRegion || process.env.AWS_DEFAULT_REGION);

    this.serviceBucket = bucket;
    this.s3 = new AWS.S3({
      region,
      credentials,
    });
  }

  delete(key) {
    const deferred = Q.defer();
    const param = {
      Bucket: this.serviceBucket,
      Key: key,
    };
    this.s3.deleteObject(param, (err) => {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve();
      }
    });
    return deferred.promise;
  }

  store(key, data) {
    const deferred = Q.defer();
    const param = {
      Bucket: this.serviceBucket,
      Key: key,
      Body: data,
    };

    this.s3.putObject(param, (err) => {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve();
      }
    });
    return deferred.promise;
  }

  get(key) {
    const deferred = Q.defer();
    const param = {
      Bucket: this.serviceBucket,
      Key: key,
    };

    this.s3.getObject(param, (err, data) => {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(data.Body.toString());
      }
    });
    return deferred.promise;
  }
}

module.exports = S3;
