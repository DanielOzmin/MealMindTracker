using Amazon;
using Amazon.Internal;
using Amazon.S3;
using Amazon.S3.Model;

namespace Backend.Services;

public class S3Service
{
    private readonly AmazonS3Client _s3Client;
    private readonly string _bucketName;

    public S3Service(IConfiguration configuration)
    {
        var accessKey = configuration["AWSKeys:AWS_ACCESS_KEY"];
        var secretKey = configuration["AWSKeys:AWS_SECRET_KEY"];
        var region = configuration["AWSKeys:AWS_REGION"];
        _bucketName = configuration["AWSKeys:S3_BUCKET_NAME"];
        if (string.IsNullOrEmpty(accessKey) || string.IsNullOrEmpty(secretKey))
        {
            throw new ArgumentException("AWS Access Key | Secret Key are missing!");
        }
        _s3Client = new AmazonS3Client(accessKey, secretKey, RegionEndpoint.GetBySystemName(region));
    }

    public async Task<string> UploadFileAsync(IFormFile file)
    {
        string fileName = $"{Guid.NewGuid()}_{file.FileName}";
        using var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);

        var putRequest = new PutObjectRequest
        {
            BucketName = _bucketName,
            Key = fileName,
            InputStream = memoryStream,
            ContentType = file.ContentType
        };
        await _s3Client.PutObjectAsync(putRequest);

        return $"https://{_bucketName}.s3.eu-north-1.amazonaws.com/{fileName}";
    }
}