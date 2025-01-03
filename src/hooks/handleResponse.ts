const handleResponse = async (response) => {
  const data = await response.json();
  console.log(data);

  if (data.errors) {
    const errorMessages = data.errors.map((error) => error.msg);
    const validationError = new Error('Validation Errors');
    validationError.errors = errorMessages;
    throw validationError;
  } else if (response.status === 401) {
    throw new Error(`${data.message}. Sign in to complete this action`);
  } else if (!response.ok) {
    throw new Error(`An unexpected error occured: ${data.error}`);
  }
  return data;
};

export default handleResponse;
