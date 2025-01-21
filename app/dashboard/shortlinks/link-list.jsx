"use client";

import React, { useEffect, useState } from "react";
import LinkCard from "@/components/link-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LinkList() {
  const [linksData, setLinksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLinks = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/links`);
      const data = await response.json();
      setLinksData(data.data || []);
    } catch (err) {
      console.error("Failed to fetch links:", err);
      setError("Failed to fetch links.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  if (loading) {
    return (
      <>
        <Skeleton className="sm:min-w-full md:min-w-full lg:min-w-[900px] lg:h-[150px] bg-stone-200" />
        <Skeleton className="sm:min-w-full md:min-w-full lg:min-w-[900px] lg:h-[150px] bg-stone-200" />
        <Skeleton className="sm:min-w-full md:min-w-full lg:min-w-[900px] lg:h-[150px] bg-stone-200" />
      </>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {linksData.map((linkData, index) => (
        <LinkCard key={index} data={linkData} />
      ))}
    </>
  );
}
