"use client";

import { createContext, useContext, useReducer } from "react";

const NotificationContext = createContext(null);

const initialState = {
  notifications: [],
  unreadCount: 0,
  isOpen: false,
};

function notificationReducer(state, action) {
  switch (action.type) {
    case "SET_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload,
        unreadCount: action.payload.filter((n) => !n.read).length,
      };
    case "MARK_ALL_READ":
      return {
        ...state,
        unreadCount: 0,
        notifications: action.payload.filter((n) => ({ ...n, read: true })),
      };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };
    case "TOGGLE_PANEL":
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
}

export function NotificationProvider({ children, initialNotifications }) {
  const [state, dispatch] = useReducer(notificationReducer, {
    ...initialState,
    notifications: initialNotifications || [],
    unreadCount: initialNotifications?.filter((n) => !n.read).length || 0,
  });

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider",
    );
  }

  return context;
}
