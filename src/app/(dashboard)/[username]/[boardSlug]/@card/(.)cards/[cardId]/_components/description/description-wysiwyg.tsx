"use client";

import { FC, FormEvent, useState, useTransition } from "react";
import { useCardContext } from "@/context/card-context";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/ui/loading-button";
import RichTextEditor from "@/components/wysiwyg/rich-text-editor";
import { updateCard } from "@/app/(dashboard)/[username]/[boardSlug]/actions";

interface DescriptionWysiwygProps {
  onReturn: () => void;
}

const DescriptionWysiwyg: FC<DescriptionWysiwygProps> = ({ onReturn }) => {
  const { card, revalidateCard } = useCardContext();
  const [isSubmitting, startTransition] = useTransition();
  const [content, setContent] = useState(card.description ?? "");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      await updateCard(card.id, { description: content });
      await revalidateCard();
      onReturn();
    });
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <RichTextEditor value={content} onChange={setContent} />

      <div className="flex items-center gap-2">
        <LoadingButton type="submit" loading={isSubmitting}>
          Save
        </LoadingButton>
        <Button variant="ghost" onClick={onReturn}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default DescriptionWysiwyg;
