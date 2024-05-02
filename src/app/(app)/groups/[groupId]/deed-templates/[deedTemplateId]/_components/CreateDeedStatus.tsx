"use client";
import { IconButton } from "@/components/IconButton";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { DeedStatusForm } from "@/deeds/components/DeedStatusForm";
import { useDeedTemplateById } from "@/deeds/hooks/useDeedTemplateById";
import { useDeedTemplatesByGroupId } from "@/deeds/hooks/useDeedTemplatesByGroupId";
import type { DeedStatusInsert, DeedTemplateInsert } from "@/deeds/models";
import { createDeedStatus, createDeedTemplate } from "@/deeds/service";
import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export const CreateDeedStatus = () => {
  const { deedTemplateId } = useParams<{ deedTemplateId: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const { refetch } = useDeedTemplateById(Number(deedTemplateId));

  const mutation = useMutation({
    mutationFn: async (deedStatus: DeedStatusInsert) =>
      await createDeedStatus(deedStatus),
    onSuccess: async () => {
      await refetch();
      setIsOpen(false);
    },
  });

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <IconButton>
          <Plus className="text-primary" />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent>
        <div className="p-4">
          <DeedStatusForm
            onSubmit={(values) =>
              mutation.mutate({
                ...values,
                deedTemplateId: Number(deedTemplateId),
              })
            }
            isLoading={mutation.isPending}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
