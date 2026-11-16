// UI-only check (shows the admin link and route).
// The flag comes from the /admins/{uid} Firestore doc (see userProfile.js);
// actual write protection is enforced by firestore.rules.
export const isAdmin = (user) => user?.isAdmin === true;
