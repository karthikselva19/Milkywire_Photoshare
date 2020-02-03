export function formatListing(values) {
  const formData = new FormData();

  for (const key in values) {
    if (key === 'uploadPhoto') {
      formData.append(key, values[key][0]);
    } else {
      formData.append(key, values[key]);
    }
  }

  return formData;
}
