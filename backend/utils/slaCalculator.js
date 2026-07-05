const calculateSLA = (priority) => {
  const deadline = new Date();

  switch (priority) {
    case "Critical":
      deadline.setHours(deadline.getHours() + 4);
      break;

    case "High":
      deadline.setHours(deadline.getHours() + 24);
      break;

    case "Medium":
      deadline.setDate(deadline.getDate() + 3);
      break;

    default:
      deadline.setDate(deadline.getDate() + 7);
  }

  return deadline;
};

module.exports = calculateSLA;