import { container } from "tsyringe";
import { pool } from "@/database";

container.register("PgPool", { useValue: pool });

export default container;
