import { useContext } from "react";

import { DatabaseContext } from "../app/_layout";

export default function useDB() {
  return useContext(DatabaseContext);
}
