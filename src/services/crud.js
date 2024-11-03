const crud = (url, method, body) => {
  const headers = { "Content-Type": "application/json" };
  switch (method) {
    case "GET":
      return fetch(url)
        .then((response) => {
          if (!response.ok) throw new Error("Error fetching data");
          return response.json();
        })
        .then((data) => data)
        .catch((error) => console.error("GET error:", error));

    case "POST":
      const userWithId = { ...body, id: Date.now().toString() };
      return fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(userWithId),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Error posting data");
          return response.json();
        })
        .then((data) => data)
        .catch((error) => console.log(`POST error: ${error}`));

    case "POST-post":
      return fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Error posting data");
          return response;
        })
        .then((data) => data)
        .catch((error) => console.log(`POST error: ${error}`));

    default:
      console.log("Default");
      return;
  }
};

export default crud;
