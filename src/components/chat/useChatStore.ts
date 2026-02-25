"use client";

import { useReducer, useCallback, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { trackEvent } from "@/lib/analytics";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatState {
  sessionId: string | null;
  messages: ChatMessage[];
  isLoading: boolean;
  isOpen: boolean;
  error: string | null;
}

type ChatAction =
  | { type: "TOGGLE" }
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "ADD_MESSAGE"; message: ChatMessage }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_SESSION"; sessionId: string }
  | { type: "SET_ERROR"; error: string | null }
  | { type: "RESTORE_SESSION"; sessionId: string };

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "TOGGLE":
      return { ...state, isOpen: !state.isOpen };
    case "OPEN":
      return { ...state, isOpen: true };
    case "CLOSE":
      return { ...state, isOpen: false };
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.message] };
    case "SET_LOADING":
      return { ...state, isLoading: action.loading };
    case "SET_SESSION":
      return { ...state, sessionId: action.sessionId };
    case "SET_ERROR":
      return { ...state, error: action.error };
    case "RESTORE_SESSION":
      return { ...state, sessionId: action.sessionId };
    default:
      return state;
  }
}

const initialState: ChatState = {
  sessionId: null,
  messages: [],
  isLoading: false,
  isOpen: false,
  error: null,
};

const SESSION_KEY = "lm_chat_session";

export function useChatStore() {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Restore session from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      dispatch({ type: "RESTORE_SESSION", sessionId: stored });
    }
  }, []);

  // Persist sessionId to sessionStorage
  useEffect(() => {
    if (state.sessionId) {
      sessionStorage.setItem(SESSION_KEY, state.sessionId);
    }
  }, [state.sessionId]);

  const toggle = useCallback(() => dispatch({ type: "TOGGLE" }), []);
  const open = useCallback(() => dispatch({ type: "OPEN" }), []);
  const close = useCallback(() => dispatch({ type: "CLOSE" }), []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || state.isLoading) return;

      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: trimmed,
      };
      dispatch({ type: "ADD_MESSAGE", message: userMsg });
      dispatch({ type: "SET_LOADING", loading: true });
      dispatch({ type: "SET_ERROR", error: null });
      trackEvent("chat_message_sent", { page_location: window.location.pathname });

      try {
        const { data, error } = await supabase.functions.invoke("chat", {
          body: {
            session_id: state.sessionId,
            message: trimmed,
            page_url: typeof window !== "undefined" ? window.location.href : undefined,
          },
        });

        if (error) throw error;

        if (data.session_id && !state.sessionId) {
          dispatch({ type: "SET_SESSION", sessionId: data.session_id });
        }

        const assistantMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.response,
        };
        dispatch({ type: "ADD_MESSAGE", message: assistantMsg });
      } catch (err) {
        const errorMsg =
          "Przepraszam, wystapil blad. Umow rozmowe: https://cal.com/bartłomiej-chudzik-2en6pt";
        dispatch({ type: "SET_ERROR", error: errorMsg });
        dispatch({
          type: "ADD_MESSAGE",
          message: { id: crypto.randomUUID(), role: "assistant", content: errorMsg },
        });
      } finally {
        dispatch({ type: "SET_LOADING", loading: false });
      }
    },
    [state.sessionId, state.isLoading]
  );

  const userMessageCount = state.messages.filter((m) => m.role === "user").length;

  return {
    ...state,
    userMessageCount,
    toggle,
    open,
    close,
    sendMessage,
  };
}
