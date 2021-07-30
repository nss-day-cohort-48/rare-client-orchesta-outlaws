export const HumanDate = ({ date }) => {
  return new Date(date.replace(/-/g, "/")).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago",
  });
};

export const dateConvert = (ISOdate) => {
  const date = ISOdate.split("-");
  const year = date.shift();
  date[0] = `${date[0]}/`;
  date.push(`/${year}`);
  return date.join("");
};
