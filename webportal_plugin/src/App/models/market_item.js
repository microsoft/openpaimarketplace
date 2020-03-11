// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import uuid4 from "uuid/v4";

export class MarketItem {
  constructor(
    id = uuid4(),
    name = null,
    author = null,
    createdAt = null,
    updatedAt = null,
    category = null,
    tags = [],
    introduction = null,
    description = null,
    jobConfig = null,
    submits = 0,
    starNumber = 0,
    status = "pending"
  ) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.category = category;
    this.tags = tags;
    this.introduction = introduction;
    this.description = description;
    this.jobConfig = jobConfig;
    this.submits = submits;
    this.starNumber = starNumber;
    this.status = status;
  }
}