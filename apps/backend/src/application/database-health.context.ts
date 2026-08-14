import { Context } from "effect"
import type { DatabaseHealthPort } from "@/application/ports/database-health.port"

export class DatabaseHealth extends Context.Tag("@gmbovinos/DatabaseHealth")<
  DatabaseHealth,
  DatabaseHealthPort
>() {}
