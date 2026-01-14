self.addEventListener("push", function (event) {
  const data = event.data?.json() || {};
  const title = data.notification?.title || "Helper update";
  const options = {
    body: data.notification?.body || "New activity",
    icon: "/favicon.ico",
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});

