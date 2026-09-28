import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Profile = {
  name: string;
  email: string;
  language: string;
  level: string;
  goal: number;
  categories: string[];
  notifications: {
    enabled: boolean;
    time: string;
    perDay: number;
    content: string;
  };
};

type State = {
  signedIn: boolean;
  profile: Profile;
  liked: string[];
  saved: string[];
  seen: string[];
};

const defaultState: State = {
  signedIn: false,
  profile: {
    name: "",
    email: "",
    language: "Angličtina",
    level: "Mierne pokročilá",
    goal: 5,
    categories: [],
    notifications: {
      enabled: true,
      time: "09:00",
      perDay: 1,
      content: "Slovo dňa s príkladom",
    },
  },
  liked: [],
  saved: [],
  seen: [],
};

const KEY = "slovodna-state-v1";

type Ctx = State & {
  ready: boolean;
  signIn: (email: string, name?: string) => void;
  signOut: () => void;
  updateProfile: (patch: Partial<Profile>) => void;
  setNotifications: (patch: Partial<Profile["notifications"]>) => void;
  toggleLike: (id: string) => void;
  toggleSave: (id: string) => void;
  moveSaved: (id: string, direction: -1 | 1) => void;
  markSeen: (id: string) => void;
  reset: () => void;
};

const StoreContext = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(defaultState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as State;
        setState({
          ...defaultState,
          ...parsed,
          profile: {
            ...defaultState.profile,
            ...parsed.profile,
            notifications: {
              ...defaultState.profile.notifications,
              ...parsed.profile?.notifications,
            },
          },
        });
      }
    } catch {
      /* ignore corrupted storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable */
    }
  }, [state, ready]);

  const signIn = useCallback((email: string, name?: string) => {
    setState((s) => ({
      ...s,
      signedIn: true,
      profile: { ...s.profile, email, name: name || s.profile.name },
    }));
  }, []);

  const signOut = useCallback(() => setState({ ...defaultState }), []);

  const updateProfile = useCallback((patch: Partial<Profile>) => {
    setState((s) => ({ ...s, profile: { ...s.profile, ...patch } }));
  }, []);

  const setNotifications = useCallback((patch: Partial<Profile["notifications"]>) => {
    setState((s) => ({
      ...s,
      profile: { ...s.profile, notifications: { ...s.profile.notifications, ...patch } },
    }));
  }, []);

  const toggleIn = (list: string[], id: string) =>
    list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

  const toggleLike = useCallback((id: string) => {
    setState((s) => ({ ...s, liked: toggleIn(s.liked, id) }));
  }, []);

  const toggleSave = useCallback((id: string) => {
    setState((s) => ({ ...s, saved: toggleIn(s.saved, id) }));
  }, []);

  const moveSaved = useCallback((id: string, direction: -1 | 1) => {
    setState((s) => {
      const list = [...s.saved];
      const i = list.indexOf(id);
      const j = i + direction;
      if (i < 0 || j < 0 || j >= list.length) return s;
      const tmp = list[i]!; list[i] = list[j]!; list[j] = tmp;
      return { ...s, saved: list };
    });
  }, []);

  const markSeen = useCallback((id: string) => {
    setState((s) => (s.seen.includes(id) ? s : { ...s, seen: [...s.seen, id] }));
  }, []);

  const reset = useCallback(() => setState({ ...defaultState }), []);

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      ready,
      signIn,
      signOut,
      updateProfile,
      setNotifications,
      toggleLike,
      toggleSave,
      moveSaved,
      markSeen,
      reset,
    }),
    [
      state,
      ready,
      signIn,
      signOut,
      updateProfile,
      setNotifications,
      toggleLike,
      toggleSave,
      moveSaved,
      markSeen,
      reset,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  utter.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}
