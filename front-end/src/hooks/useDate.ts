import { useCallback } from "react";
import { format as formatDateFn } from "date-fns";
import { fr } from "date-fns/locale";

export const useDate = () => {
  const formatDate = useCallback(
    (date: string, format: string = "dd/MM/yyyy") => {
      try {
        return formatDateFn(new Date(date), format, { locale: fr });
      } catch (error) {
        console.error("Formatting error: ", error);
        return date;
      }
    },
    []
  );

  return { formatDate };
};
