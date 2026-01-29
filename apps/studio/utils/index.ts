export const getTitleCase = (name: string) => {
  const titleTemp = name.replace(/([A-Z])/g, " $1");
  return titleTemp.charAt(0).toUpperCase() + titleTemp.slice(1);
};

import OAuth from "oauth-1.0a";
import crypto from "crypto";

export const twitterOAuth = new OAuth({
  consumer: {
    key: process.env.TWITTER_CONSUMER_KEY!,
    secret: process.env.TWITTER_CONSUMER_SECRET!,
  },
  signature_method: "HMAC-SHA1",
  hash_function(baseString, key) {
    return crypto
      .createHmac("sha1", key)
      .update(baseString)
      .digest("base64");
  },
});