const getFormattedDate = (date: Date) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  export {getFormattedDate};