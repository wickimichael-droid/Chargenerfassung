const { onSchedule } = require('firebase-functions/v2/scheduler');
const { initializeApp } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');

initializeApp();
const DAY = 24 * 60 * 60 * 1000;

exports.deleteOldHistory = onSchedule({ schedule: 'every day 03:00', timeZone: 'Europe/Zurich' }, async () => {
  const history = getDatabase().ref('materialbahnhof/history');
  const cutoff = Date.now() - 14 * DAY;
  const snapshot = await history.orderByChild('timestamp').endAt(cutoff - 1).get();
  const updates = {};
  snapshot.forEach(child => {
    // Legacy records without a numeric timestamp require separate migration.
    if (typeof child.val()?.timestamp === 'number' && child.val().timestamp < cutoff) updates[child.key] = null;
  });
  if (Object.keys(updates).length) await history.update(updates);
});
