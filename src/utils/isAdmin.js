export const ADMIN_EMAIL = 'admin1234@gmail.com';

export const isAdmin = (user) => !!user?.email && user.email === ADMIN_EMAIL;
