import { Knex } from './../node_modules/knex/types/index.d';
import knex from "knex";
import config from "../knexfile.js";

/**
 * Global is used here to ensure the connection
 * is cached across hot-reloads in development
 *
 * see https://github.com/vercel/next.js/discussions/12229#discussioncomment-83372
 */
let cached = global.connection;
if (!cached) cached = global.connection = {};

export default function getKnex():Knex {
  if (!cached.instance) cached.instance = knex(config);
  return cached.instance;
}
