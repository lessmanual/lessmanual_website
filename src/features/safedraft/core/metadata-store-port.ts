import type { SafeDraftMetadataRecord } from "./metadata-record";

export type SafeDraftMetadataStorePort = {
  save(record: SafeDraftMetadataRecord): Promise<void>;
};
