async function checkConnection(url = "https://www.google.com") {
  // Record the start time for response time calculation
  const startTime = Date.now();

  try {
    // Setup abort controller for timeout handling
    const controller = new AbortController();
    // Set 5 second timeout for the request
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    // Attempt to fetch the URL with no-cors mode and timeout handling
    const response = await fetch(url, {
      mode: "no-cors",
      signal: controller.signal,
    });

    // Clear the timeout since request completed
    clearTimeout(timeoutId);

    // Calculate total response time
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // Determine connection quality based on response time
    if (responseTime <= 500) {
      return "good";
    } else if (responseTime <= 5000) {
      return "fine";
    }
  } catch (error) {
    return "terrible"; // Connection failed or timed out
  }
}

// Example usage: Test connection to Google's servers
checkConnection("https://www.google.com")
  .then(console.log)
  .catch(console.error);
