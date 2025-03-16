export const USER_TYPES = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  ARTIST: "ARTIST",
};

export const ROLES = {
  USER: {
    CREATE: "user.create",
    VIEW: "user.view",
    UPDATE: "user.update",
    DELETE: "user.delete",
  },
  ARTIST: {
    CREATE: "artist.create",
    VIEW: "artist.view",
    UPDATE: "artist.update",
    DELETE: "artist.delete",
  },
  SONG: {
    CREATE: "song.create",
    VIEW: "song.view",
    UPDATE: "song.update",
    DELETE: "song.delete",
  },
};

export const ADMIN_ROLES = [
  ROLES.SONG.VIEW,
  ROLES.ARTIST.VIEW,
  ...Object.values(ROLES.USER),
];

export const MANAGER_ROLES = [ROLES.SONG.VIEW, ...Object.values(ROLES.ARTIST)];

export const ARTIST_ROLES = [...Object.values(ROLES.SONG)];
