export const getFilterCountsByKey = (data, key = "type") => {
  const counts = { All: data.length };
  data.forEach((item) => {
    const value = item[key];
    counts[value] = (counts[value] || 0) + 1;
  });
  return counts;
};
