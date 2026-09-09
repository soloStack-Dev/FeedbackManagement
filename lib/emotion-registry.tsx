// EmotionRegistry — MUI/emotion SSR + hydration reconciliation for the App Router.
//
// Why this exists: without a CacheProvider + useServerInsertedHTML flush, emotion
// renders its <style> tags inline at point-of-use on the server. That leaks a
// <style data-emotion="css-global ..."> into the body where the client instead
// expects the real element (e.g. <header>), producing a hydration mismatch.
// This registry buffers inserted styles per request, re-injects them into the
// <head> via useServerInsertedHTML, and shares one emotion cache with the client.
"use client";

import { CacheProvider, type EmotionCache } from "@emotion/react";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";

type InsertedNames = string[];

function makeRegistry(): { cache: EmotionCache; flush: () => InsertedNames } {
  const cache = createCache({ key: "css" });
  cache.compat = true;

  let inserted: InsertedNames = [];
  const prevInsert = cache.insert;
  cache.insert = (...args) => {
    const serialized = args[1];
    // Only buffer styles that aren't already in the cache so each rule is
    // emitted exactly once per request.
    if (cache.inserted[serialized.name] === undefined) {
      inserted.push(serialized.name);
    }
    return prevInsert(...args);
  };

  const flush = () => {
    const names = inserted;
    inserted = [];
    return names;
  };

  return { cache, flush };
}

export function EmotionRegistry({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = useState(makeRegistry);

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}