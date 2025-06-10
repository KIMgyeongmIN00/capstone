'use client';

import { useRef } from "react";
import { useMaintenanceTypeStore } from "@/store/maintenance-type-store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialized = useRef(false);

  if (!initialized.current) {
    useMaintenanceTypeStore.persist.rehydrate();
    initialized.current = true;
  }

  return <>{children}</>;
} 