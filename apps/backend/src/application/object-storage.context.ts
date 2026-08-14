import { Context } from "effect"
import type { ObjectStoragePort } from "@/application/ports/object-storage.port"

export class ObjectStorage extends Context.Tag("@gmbovinos/ObjectStorage")<
  ObjectStorage,
  ObjectStoragePort
>() {}
