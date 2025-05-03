const handleResponse = async (response) => {
  if (response.status === 401) {
    throw new Error(`${response.statusText}. Sign in to complete this action`);
  } else if (response.status === 400) {
    const data = await response.json();
    const errorMessages = data.errors?.map(
      (err: { msg: string }) => err.msg,
    ) || ['Bad Request'];
    throw errorMessages;
  } else if (!response.ok) {
    const data = await response.json();

    throw new Error(`${data.error}`);
  }
  const data = await response.json();
  return data;
};

export default handleResponse;
