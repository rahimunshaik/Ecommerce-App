// This function performs an asynchronous HTTP request using the Fetch API
const customFetch = async (url, { body, ...rest }) => {
  // Create a configuration object for the request
  const config = {
    ...rest,
    headers: {
      "Content-type": "application/json; charset=UTF-8", // Set the request headers to specify that the content type is JSON
    },
  };

  // If a request body is provided, convert it to JSON string and assign it to the config body
  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    // Make the HTTP request using fetch() function with the provided URL and configuration
    let response = await fetch(url, config);

    // Parse the response as JSON
    let data = await response.json();

    // If the data is successfully parsed, return the data
    if (data) {
      return data;
    } else {
      throw new Error("data not fetched");
    }
  } catch (error) {
    console.log(error); // Log any errors that occur during the request
  }
};

export default customFetch;
