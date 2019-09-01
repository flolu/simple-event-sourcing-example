# Event Sourcing

### Small example node.js application to better understand how event sourcing works

> Note, that this is by no means a production-ready project, but rather something to understand the fundamental concepts of event sourcing

## 1. Setup

```
git clone https://github.com/flolude/simple-event-sourcing-example
cd simple-event-sourcing-example
yarn install
yarn start:watch
```

open browser: http://localhost:3333 (all endpoints are displayed in `/src/index.ts`)

## 2. Features

### 2.1 Event Store

> I am using an in-memory event store in this case.

#### 2.1.1 Streams

Events are stored inside streams (each aggregate has its own stream, e.g. stream: `idea-1234`). All events corresponding to `idea-1234` are stored in one stream.

#### 2.1.2 Snapshots

Additionally, the event store supports snapshots. Snapshots are like check points for events. Rather than looping through all the events from day zero to compute the latest state, we only have to go through all events after the check point. Snapshots are similarly stored as streams: Each aggregate (e.g. `idea-1234`) get its own list of snapshots.

### 2.2 Event Versioning

As upcasters are very hard to maintain I decided to go with the following strategy for event versioning: "_The new version must be constructible from the previous version. Otherwise it is a new event_" ~[David Schmitz](https://youtu.be/GzrZworHpIk?t=1355)

---

_in progress_

### 2.3 Deleting Events

> for the sake of the users' right to be forgotten

When a stream should be deleted we first of all remove all events inside the stream and append a tombstone event. Other services such as the query side can listen to the tombstone event and clear up its data.

_TODO_ splitting public / private data (because some information just can't be deleted)

### 2.4 Command Query Responsibility Segregation

To handle CQRS, I have to services: one that mutates the event store and one that just consumes events that happened in the past to update a materialized view of the current state.

### 2.5 Optimistic Concurrency

https://youtu.be/GzrZworHpIk?t=1028

When processing a new command, we perform validation with the latest, computed aggregate. In the time frame between computing the latest aggregate and actually committing the event(s), new events might be appended to the event stream. That's why we keep track of the `latestEventId`. When adding the event, the `latestEventId` of the aggregate used for validation and the actual last event in the stream have to match. Otherwise the command handler throws an error.

### 2.6 Event Schema

### 2.7 Compensations
