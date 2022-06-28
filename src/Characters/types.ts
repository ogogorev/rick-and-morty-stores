export type Character = {
  id: number;
  name: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  fav: boolean;
};

export type Tab = "all" | "favs";
