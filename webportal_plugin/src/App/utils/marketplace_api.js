import { MARKETPLACE_API } from "./constants";
import { MarketItem } from "../models/market_item";

export async function getApprovedItems() {
  const url = `${MARKETPLACE_API}/items?status=approved`;
  const res = await fetch(url);
  if (res.ok) {
    const items = await res.json();
    // order by updateDate
    items.sort(function(a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return items;
  } else {
    throw new Error(res.statusText);
  }
}

export async function getPendingItems() {
  const url = `${MARKETPLACE_API}/items?status=pending`;
  const res = await fetch(url);
  if (res.ok) {
    const items = await res.json();
    // order by updateDate
    items.sort(function(a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return items;
  } else {
    throw new Error(res.statusText);
  }
}

export async function deleteItem(itemId) {
  const url = `${MARKETPLACE_API}/items/${itemId}`;
  const res = await fetch(url, {
    method: "DELETE"
  });
  if (res.ok) {
    return true;
  } else {
    throw new Error(text);
  }
}

export async function updateItem(
  itemId,
  name,
  author,
  category,
  introduction,
  description,
  jobConfig,
  submits,
  starNumber,
  tags
) {
  const url = `${MARKETPLACE_API}/items/${itemId}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      author: author,
      category: category,
      introduction: introduction,
      description: description,
      jobConfig: jobConfig,
      submits: submits,
      starNumber: starNumber,
      tags: tags
    })
  });
  const text = await res.text();
  if (res.ok) {
    return text;
  } else {
    throw new Error(text);
  }
}

export async function getItemById(itemId) {
  const url = `${MARKETPLACE_API}/items/${itemId}`;
  const res = await fetch(url);
  if (res.ok) {
    const result = await res.json();
    const marketItem = new MarketItem({
      id: result.id,
      name: result.name,
      author: result.author,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      category: result.category,
      tags: result.tags,
      introduction: result.introduction,
      description: result.description,
      jobConfig: result.jobConfig,
      submits: result.submits,
      starNumber: result.starNumber,
      status: result.status
    });
    return marketItem;
  } else {
    throw new Error(res.statusText);
  }
}

export async function approveItem(itemId) {
  const url = `${MARKETPLACE_API}/items/${itemId}/status`;
  const res = await fetch(url, {
    method: "Put",
    headers: {
      "Content-Type": "text/plain"
    },
    body: "approved"
  });
  if (res.ok) {
    return true;
  } else {
    throw new Error(res.statusText);
  }
}

export async function rejectItem(itemId) {
  const url = `${MARKETPLACE_API}/items/${itemId}/status`;
  const res = await fetch(url, {
    method: "Put",
    headers: {
      "Content-Type": "text/plain"
    },
    body: "rejected"
  });
  console.log(res)
  if (res.ok) {
    return true;
  } else {
    throw new Error(res.statusText);
  }
}

// create if user not exist
export async function ensureUser(user) {
  const url = `${MARKETPLACE_API}/users`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain"
    },
    body: user
  });
  if (res.ok) {
    return true;
  } else if (res.status === 409) {
    return false;
  } else {
    throw new Error(res.statusText);
  }
}

export async function getStarStatus(username, itemId) {
  const url = `${MARKETPLACE_API}/users/${username}/starItems/${itemId}`;
  const res = await fetch(url);
  if (res.ok) {
    return true;
  } else if (res.status === 404) {
    return false;
  } else {
    throw new Error(res.statusText);
  }
}

export async function addStar(username, itemId) {
  const url = `${MARKETPLACE_API}/users/${username}/starItems/${itemId}`;
  const res = await fetch(url, {
    method: "PUT"
  });
  if (res.ok) {
    return true;
  } else if (res.status === 409) {
    return false;
  } else {
    throw new Error(res.statusText);
  }
}

export async function deleteStar(username, itemId) {
  const url = `${MARKETPLACE_API}/users/${username}/starItems/${itemId}`;
  const res = await fetch(url, {
    method: "DELETE"
  });
  if (res.ok) {
    return true;
  } else if (res.status === 404) {
    return false;
  } else {
    throw new Error(res.statusText);
  }
}
