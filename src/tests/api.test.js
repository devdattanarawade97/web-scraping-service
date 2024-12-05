import axios from 'axios';

describe('API Endpoints with Axios', () => {
  const baseUrl = 'http://localhost:8000/api/jobs';

  // Test the POST endpoint
  it('should create a job successfully with a POST request', async () => {
    const payload = { url: 'https://google.com' };
    
    const response = await axios.post(baseUrl, payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    // Ensure the response has the correct status and structure
    expect(response.status).toBe(201); // Assuming 201 Created
    expect(response.data).toHaveProperty('id'); // Verify job ID is returned
    expect(response.data.url).toBe(payload.url); // Verify the URL is stored correctly

    // Store the job ID for subsequent tests
    const jobId = response.data.id;

    
    // Make the jobId available to other tests (if needed)
    global.jobId = jobId;
  });

  // Test the GET endpoint
  it('should retrieve a job successfully with a GET request', async () => {
    const jobId = global.jobId || '64f7a9bf29208f77683c7c88'; // Use existing ID or fallback for testing

    const response = await axios.get(`${baseUrl}/${jobId}`);

    // Ensure the response has the correct status and data
    //log response
    console.log("GET request", response.data);
    expect(response.status).toBe(200); // Assuming 200 OK
    expect(response.data).toHaveProperty('id'); // Verify the job ID exists
    expect(response.data.id).toBe(jobId); // Verify the job ID matches
    expect(response.data).toHaveProperty('url'); // Ensure the URL field exists
  });
});
