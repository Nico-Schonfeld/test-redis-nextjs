"use server";

import revalidateCache from "@/utils/cache/revalidateCache";
import redis from "@/lib/redis";

export async function getComments() {
  try {
    const cacheKey = "comments";
    const cachedComments = await redis.get(cacheKey);

    if (cachedComments) {
      console.log("Cache hit");
      return JSON.parse(cachedComments);
    }

    console.log("Cache miss");
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`, {
      method: "GET",
      next: {
        tags: ["comments-tag"],
      },
    });
    const data = await res.json();

    // Cache the response in Redis
    await redis.set(cacheKey, JSON.stringify(data), "EX", 3600); // Cache for 1 hour

    revalidateCache("comments-tag");
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
}
