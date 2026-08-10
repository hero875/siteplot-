import React from "react";
import { prisma } from "@repo/db";
import ContentQueueClient from "./ContentQueueClient";

export default async function ContentQueuePage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Query actual database content items from Supabase
  const dbItems = id.startsWith("proj_") ? [] : await prisma.contentItem.findMany({
    where: { projectId: id },
    orderBy: { createdAt: "desc" },
  });

  const initialItems = dbItems.map((item) => ({
    id: item.id,
    title: item.title,
    status: item.status,
    keywordSeed: item.keywordSeed,
    slug: item.slug,
  }));

  return (
    <ContentQueueClient projectId={id} initialItems={initialItems} />
  );
}
