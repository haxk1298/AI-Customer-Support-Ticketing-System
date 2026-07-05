const updateSLAStatus = (ticket) => {
  const now = new Date();
  const deadline = new Date(ticket.slaDeadline);

  // Overdue
  if (now > deadline) {
    return "Overdue";
  }

  // Total SLA duration
  const totalDuration = deadline - new Date(ticket.createdAt);

  // Remaining time
  const remaining = deadline - now;

  // Less than 25% time remaining
  if (remaining <= totalDuration * 0.25) {
    return "Due Soon";
  }

  return "On Time";
};

module.exports = updateSLAStatus;