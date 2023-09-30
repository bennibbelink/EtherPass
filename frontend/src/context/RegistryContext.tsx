// import { createContext, useState } from "react";

// interface RegistryContextValue {
//   hasRegistry: boolean;
//   setHasRegistry: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const RegistryContext = createContext<RegistryContextValue>({
//   hasRegistry: false,
//   setHasRegistry: () => {},
// });

// const RegistryContextProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [hasRegistry, setHasRegistry] = useState(false);
//   return (
//     <RegistryContext.Provider value={{ hasRegistry, setHasRegistry }}>
//       {children}
//     </RegistryContext.Provider>
//   );
// };
// export { RegistryContext, RegistryContextProvider };
