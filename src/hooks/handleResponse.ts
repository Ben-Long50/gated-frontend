const handleResponse = async (response) => {
  if (response.status === 401) {
    throw new Error(`${response.statusText}. Sign in to complete this action`);
  } else if (!response.ok) {
    console.log(response);
    const data = await response.json();
    throw new Error(`${data.error}`);
  }
  const data = await response.json();
  return data;
};

export default handleResponse;
