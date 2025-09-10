import Redis from "ioredis";

let redisClient: Redis | null = null;

export const getRedisClient = (): Redis => {
  if (!redisClient) {
    const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
    redisClient = new Redis(redisUrl, {
      lazyConnect: true,
      maxRetriesPerRequest: 2,
    });

    redisClient.on("error", (err) => {
      console.error("Redis error:", err);
    });

    redisClient.on("connect", () => {
      console.log("Redis connected");
    });

    redisClient.on("reconnecting", () => {
      console.log("Redis reconnecting...");
    });
  }

  return redisClient;
};

export const connectRedis = async (): Promise<void> => {
  const client = getRedisClient();
  if (client.status === "ready" || client.status === "connecting") return;
  await client.connect();
};

export const disconnectRedis = async (): Promise<void> => {
  if (redisClient) {
    try {
      await redisClient.quit();
      console.log("Redis disconnected");
    } catch (err) {
      console.error("Error disconnecting Redis:", err);
    }
  }
};


