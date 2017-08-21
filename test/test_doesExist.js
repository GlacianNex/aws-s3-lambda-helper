const assert = require('chai').assert;

const S3 = require('../index.js');

describe('S3', () => {
  const s3 = new S3('adi-cbm-dev-artifacts');

  it('doesExist', () => {
    const key = 's3Test/testKey.txt';
    return s3.store(key, 'testFile').then(() =>
      s3.doesExist(key).then(result => {
        assert.isTrue(result);
      })
    );
  });
});
