const callBackend = async (path) => {
  const response = await fetch(path);
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};

export { callBackend };
