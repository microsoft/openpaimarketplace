// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { cloneDeep } from 'lodash';
import { MARKETPLACE_API_URL } from './constants';
import { MarketItem } from '../models/market_item';
import yaml from 'js-yaml';

export async function getConnectionString(
  username,
  storageAccount,
  containerName,
  type = 'blob',
) {
  const url = `${MARKETPLACE_API_URL}/storages/blobs?type=${type}&username=${username}&storageAccount=${storageAccount}&containerName=${containerName}`;
  const res = await fetch(url, {
    method: 'GET',
  });
  if (res.ok) {
    const blobs = await res.json();
    return blobs[0].connectionStrings[0];
  } else if (res.status === 404) {
    return false;
  } else {
    throw new Error(res.statusText);
  }
}

export async function listItems(type) {
  const url = `${MARKETPLACE_API_URL}/items`;
  const res = await fetch(url);
  if (res.ok) {
    const items = await res.json();
    // order by updateDate
    items
      .filter(item => item.type === type)
      .sort(function(a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    return items;
  } else {
    throw new Error(res.statusText);
  }
}

export async function getItem(itemId) {
  const url = `${MARKETPLACE_API_URL}/items/${itemId}`;
  try {
    const res = await fetch(url);
    let item;
    if (res.ok) {
      item = await res.json();
    } else {
      throw new Error(res.statusText);
    }

    const protocol = yaml.safeLoad(item.protocol);
    const newItem = cloneDeep(item);
    newItem.protocol = protocol;
    return newItem;
  } catch (error) {
    if (error.name === 'YAMLException') {
      alert(`wrong yaml file format of ${url}`);
      window.location.href = `http://localhost:9286/plugin.html?index=0`;
    } else {
      alert(`could not get marketplace item from uri ${url}`);
      window.location.href = `http://localhost:9286/plugin.html?index=0`;
    }
  }
}

export async function getApprovedItems() {
  const url = `${MARKETPLACE_API_URL}/items?status=approved`;
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
  const url = `${MARKETPLACE_API_URL}/items?status=pending`;
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
  const url = `${MARKETPLACE_API_URL}/items/${itemId}`;
  const res = await fetch(url, {
    method: 'DELETE',
  });
  if (res.ok) {
    return true;
  } else {
    throw new Error(res.statusText);
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
  tags,
) {
  const url = `${MARKETPLACE_API_URL}/items/${itemId}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
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
      tags: tags,
    }),
  });
  const text = await res.text();
  if (res.ok) {
    return text;
  } else {
    throw new Error(text);
  }
}

export async function createMarketItem(marketItem) {
  const url = `${MARKETPLACE_API_URL}/items`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: marketItem.name,
      author: marketItem.author,
      category: marketItem.category,
      introduction: marketItem.introduction,
      description: marketItem.description,
      jobConfig: marketItem.jobConfig,
      tags: marketItem.tags,
      status: marketItem.status,
    }),
  });
  if (res.ok) {
    const result = await res.json();
    return result.id;
  } else {
    throw new Error(res.statusText);
  }
}

export async function getItemById(itemId) {
  const url = `${MARKETPLACE_API_URL}/items/${itemId}`;
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
      status: result.status,
    });
    return marketItem;
  } else {
    throw new Error(res.statusText);
  }
}

export async function approveItem(itemId) {
  const url = `${MARKETPLACE_API_URL}/items/${itemId}/status`;
  const res = await fetch(url, {
    method: 'Put',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: 'approved',
  });
  if (res.ok) {
    return true;
  } else {
    throw new Error(res.statusText);
  }
}

export async function rejectItem(itemId) {
  const url = `${MARKETPLACE_API_URL}/items/${itemId}/status`;
  const res = await fetch(url, {
    method: 'Put',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: 'rejected',
  });
  if (res.ok) {
    return true;
  } else {
    throw new Error(res.statusText);
  }
}

export async function increaseSubmits(itemId) {
  const url = `${MARKETPLACE_API_URL}/items/${itemId}/submits`;
  const res = await fetch(url, {
    method: 'Put',
  });
  if (res.ok) {
    return true;
  } else {
    throw new Error(res.statusText);
  }
}

// create if user not exist
export async function ensureUser(user) {
  const url = `${MARKETPLACE_API_URL}/users`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: user,
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
  const url = `${MARKETPLACE_API_URL}/users/${username}/starItems/${itemId}`;
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
  const url = `${MARKETPLACE_API_URL}/users/${username}/starItems/${itemId}`;
  const res = await fetch(url, {
    method: 'PUT',
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
  const url = `${MARKETPLACE_API_URL}/users/${username}/starItems/${itemId}`;
  const res = await fetch(url, {
    method: 'DELETE',
  });
  if (res.ok) {
    return true;
  } else if (res.status === 404) {
    return false;
  } else {
    throw new Error(res.statusText);
  }
}
