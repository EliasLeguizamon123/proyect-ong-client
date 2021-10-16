import S3 from 'react-aws-s3'

export const uploadFile = (file) => {
  const config = {
    bucketName: process.env.REACT_APP_AWS_S3_BUCKET,
    region: process.env.REACT_APP_AWS_S3_REGION,
    s3Url: process.env.REACT_APP_AWS_S3_URL,
    accessKeyId: process.env.REACT_APP_AWS_S3_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET,
  }

  const ReactS3Client = new S3(config)
  return ReactS3Client.uploadFile(file)
  // .then((data) => console.log(data))
  // .catch((err) => console.log(err))
}

// FYI: this is the response you will get from S3 after upload a file
// {
//   Response: {
//     bucket: "myBucket",
//     key: "image/test-image.jpg",
//     location: "https://myBucket.s3.amazonaws.com/media/test-file.jpg"
//   }
// }
