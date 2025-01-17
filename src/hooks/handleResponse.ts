const handleResponse = async (response) => {
  if (response.status === 401) {
    throw new Error(`${response.statusText}. Sign in to complete this action`);
  } else if (!response.ok) {
    throw new Error(`${response.statusText}`);
  }
  const data = await response.json();
  return data;
};

export default handleResponse;
