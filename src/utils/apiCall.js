export const apiCall = async (url, method = "GET", body = null) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });

    console.log(response);

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
};
