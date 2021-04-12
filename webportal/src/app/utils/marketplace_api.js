// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import queryString from 'query-string';
import { cloneDeep, isEmpty } from 'lodash';
import { MARKETPLACE_API_URL } from './constants';
import yaml from 'js-yaml';

export async function getConnectionString(
  username,
  storageAccount,
  containerName,
  type = 'blob',
) {
  const queryStr = queryString.stringify({
    username,
    storageAccount,
    containerName,
    type,
  });
  const url = `${MARKETPLACE_API_URL}/storages/blobs?${queryStr}`;
  const token = cookies.get('token');
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) {
    const blobs = await res.json();
    if (isEmpty(blobs)) {
      throw new Error('Error no available connectionString!');
    }
    return blobs[0].connectionStrings[0];
  } else if (res.status === 404) {
    return false;
  } else {
    throw new Error(res.statusText);
  }
}

export async function listItems(type, author, keyword) {
  const queryOptions = {};
  if (type) {
    queryOptions.type = type;
  }
  if (author) {
    queryOptions.author = author;
  }
  if (keyword) {
    queryOptions.keyword = keyword;
  }
  const queryStr = queryString.stringify(queryOptions);
  const url = `${MARKETPLACE_API_URL}/items?${queryStr}`;
  const token = cookies.get('token');
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
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

export async function getItem(itemId) {
  const url = `${MARKETPLACE_API_URL}/items/${itemId}`;
  try {
    const token = cookies.get('token');
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
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

export async function createItem(marketItem) {
  const token = cookies.get('token');

  const url = `${MARKETPLACE_API_URL}/items`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: marketItem.name,
      author: marketItem.author,
      type: marketItem.type,
      source: marketItem.source,
      isPublic: marketItem.isPublic,
      isPrivate: marketItem.isPrivate,
      groupList: marketItem.groupList,
      dataType: marketItem.dataType,
      dataUrl: marketItem.dataUrl,
      category: marketItem.category,
      summary: marketItem.summary,
      description: marketItem.description,
      protocol: marketItem.protocol,
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

export async function updateItem(marketItem, itemId) {
  const token = cookies.get('token');

  const url = `${MARKETPLACE_API_URL}/items/${itemId}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: marketItem.name,
      author: marketItem.author,
      type: marketItem.type,
      source: marketItem.source,
      isPublic: marketItem.isPublic,
      isPrivate: marketItem.isPrivate,
      groupList: marketItem.groupList,
      dataType: marketItem.dataType,
      dataUrl: marketItem.dataUrl,
      category: marketItem.category,
      summary: marketItem.summary,
      description: marketItem.description,
      protocol: marketItem.protocol,
      tags: marketItem.tags,
      status: marketItem.status,
    }),
  });
  if (res.ok) {
    alert(`Update item ${itemId} successed.`);
  } else {
    throw new Error(res.statusText);
  }
}

export async function deleteItem(itemId) {
  const url = `${MARKETPLACE_API_URL}/items/${itemId}`;

  const token = cookies.get('token');

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) {
    alert(`Delete item ${itemId} successed.`);
  } else {
    throw new Error(res.statusText);
  }
}
