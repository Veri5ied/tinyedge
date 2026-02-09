export type Metrics = {
  deliveriesReceived: number;
  deliveriesDuplicate: number;
  deliveriesInvalid: number;
  deliveriesIgnored: number;
  deliveriesFailed: number;
  diffsOversized: number;
  llmFailures: number;
  commentsPosted: number;
  commentsUpdated: number;
  commentsSkipped: number;
};

export function createMetrics(): Metrics {
  return {
    deliveriesReceived: 0,
    deliveriesDuplicate: 0,
    deliveriesInvalid: 0,
    deliveriesIgnored: 0,
    deliveriesFailed: 0,
    diffsOversized: 0,
    llmFailures: 0,
    commentsPosted: 0,
    commentsUpdated: 0,
    commentsSkipped: 0,
  };
}
