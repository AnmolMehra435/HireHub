import { create } from "zustand";

const useUIStore = create((set) => ({
  notifications: [],

  addNotification: (message, type = "info") =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          id: Date.now(),
          message,
          type,
        },
      ],
    })),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      ),
    })),
}));

export default useUIStore;