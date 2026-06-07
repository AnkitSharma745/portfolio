export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  date: string;
}

export const GUESTBOOK_STORAGE_KEY = "guestbook-entries";
export const GUESTBOOK_UPDATED_EVENT = "guestbook-updated";

export const initialGuestbookEntries: GuestbookEntry[] = [
  {
    id: "1",
    name: "Ankit Sharma",
    message:
      "Welcome to my portfolio! Feel free to look around and leave a message.",
    date: "November 29, 2025",
  },
];

const isGuestbookEntry = (entry: unknown): entry is GuestbookEntry => {
  if (!entry || typeof entry !== "object") {
    return false;
  }

  const candidate = entry as Partial<Record<keyof GuestbookEntry, unknown>>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.message === "string" &&
    typeof candidate.date === "string"
  );
};

export const writeGuestbookEntries = (
  entries: readonly GuestbookEntry[],
): void => {
  localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(entries));
};

export const readGuestbookEntries = (): GuestbookEntry[] => {
  const saved = localStorage.getItem(GUESTBOOK_STORAGE_KEY);

  if (!saved) {
    writeGuestbookEntries(initialGuestbookEntries);
    return initialGuestbookEntries;
  }

  try {
    const parsed: unknown = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.every(isGuestbookEntry)) {
      return parsed;
    }
  } catch {
    // Fall back to the known-good initial entry below.
  }

  writeGuestbookEntries(initialGuestbookEntries);
  return initialGuestbookEntries;
};
