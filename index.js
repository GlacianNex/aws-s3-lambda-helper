const AWS = require('aws-sdk');
const Q = require('q');

class S3 {
  constructor(bucket, awsRegion, profile) {
    const region = awsRegion || process.env.AWS_DEFAULT_REGION;
    const params = { region };

    if (profile) {
      const SharedIniFileCredentials = AWS.SharedIniFileCredentials;
      params.credentials = new SharedIniFileCredentials({ profile });
    }

    this.serviceBucket = bucket;
    this.s3 = new AWS.S3(params);
  }

  doesExist(key) {
    const deferred = Q.defer();
    const params = {
      Bucket: this.serviceBucket,
      MaxKeys: 1,
      Prefix: key
    };
    this.s3.listObjectsV2(params, (err, data) => {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(Object.keys(data.Contents).length > 0);
      }
    });
    return deferred.promise;
  }

  delete(key) {
    const deferred = Q.defer();
    const param = {
      Bucket: this.serviceBucket,
      Key: key
    };
    this.s3.deleteObject(param, err => {
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
      Body: data
    };

    this.s3.putObject(param, err => {
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
      Key: key
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
