import { Connection } from 'typeorm'

export type DID = string
export type Key = string
export type CID = string
export type Content = string

export type SavedContent = { id: CID, content: Content }
export type Backup = { key: Key, id: CID }[]

export interface MetadataManager {
  save(did: DID, key: Key, id: CID, contentSize: number): Promise<boolean>
  find(did: DID, key: Key): Promise<CID[]>
  delete(did: DID, key: Key, id: CID): Promise<boolean>
  getKeys (did: DID): Promise<Key[]>
  getUsedStorage (did: DID): Promise<number>
  getUsedStorageByDidKeyAndCid (did: DID, key: Key, cid: CID): Promise<number>
  getBackupByDid (did: DID): Promise<Backup>
}

export interface IpfsClient {
  put(content: Content): Promise<CID>
  get(cid: CID): Promise<Content>
}

export interface IpfsPinner {
  pin(cid: CID): Promise<boolean>
  unpin(cid: CID): Promise<boolean>
}

export type Config = {
  dbConnection: Connection
  ipfsApiUrl?: string
  maxStorage?: number
}
