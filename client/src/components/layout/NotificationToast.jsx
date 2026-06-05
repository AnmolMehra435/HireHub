import { useEffect } from "react";
import useUIStore from "@/store/uiStore";

function NotificationToast() {
  const notifications = useUIStore(
    (state) => state.notifications
  );

  const removeNotification = useUIStore(
    (state) => state.removeNotification
  );

  useEffect(() => {
    notifications.forEach((notification) => {
      const timer = setTimeout(() => {
        removeNotification(notification.id);
      }, 4000);

      return () => clearTimeout(timer);
    });
  }, [notifications, removeNotification]);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`px-4 py-3 rounded shadow text-white
          ${
            notification.type === "success"
              ? "bg-green-500"
              : notification.type === "error"
              ? "bg-red-500"
              : "bg-blue-500"
          }`}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
}

export default NotificationToast;