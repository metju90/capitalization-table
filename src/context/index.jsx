import { createContext } from "react";

// I only need to share the `dispatch` function across nested components
export default createContext(null);
