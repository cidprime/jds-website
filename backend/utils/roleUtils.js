const getRoleName = (roleValue) => {
  const roleNames = {
    4181: 'student',
    2584: 'admin',
    1597: 'editor',
    4987: 'professor'
  };
  return roleNames[roleValue] || 'Unknown role';
};

module.exports = { getRoleName };
