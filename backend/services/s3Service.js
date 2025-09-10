import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import "dotenv/config";

// The S3 client will automatically use the AWS credentials from your .env file
const s3Client = new S3Client({ region: process.env.AWS_REGION });

export async function uploadFileToS3(key, content) {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: content,
  });

  try {
    await s3Client.send(command);
    console.log(`Successfully uploaded to S3: ${key}`);
  } catch (err) {
    console.error("Error uploading to S3:", err);
    throw err; // Re-throw error to be handled by the controller
  }
}

export async function getFileStreamFromS3(key) {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  });

  try {
    const response = await s3Client.send(command);
    return response.Body;
  } catch (err) {
    console.error("Error downloading from S3:", err);
    throw err;
  }
}

export async function deleteFilesFromS3(keys) {
  if (keys.length === 0) return;

  const command = new DeleteObjectsCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Delete: {
      Objects: keys.map((key) => ({ Key: key })),
    },
  });

  try {
    await s3Client.send(command);
    console.log(`Successfully deleted ${keys.length} files from S3.`);
  } catch (err) {
    console.error("Error deleting from S3:", err);
    throw err;
  }
}
