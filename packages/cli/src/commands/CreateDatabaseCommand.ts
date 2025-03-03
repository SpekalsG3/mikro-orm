import type { ArgumentsCamelCase } from 'yargs';
import type { MikroORM } from '@mikro-orm/core';
import type { AbstractSqlDriver } from '@mikro-orm/knex';
import type { BaseArgs, BaseCommand } from '../CLIConfigurator';
import { CLIHelper } from '../CLIHelper';

export class CreateDatabaseCommand implements BaseCommand {

  command = 'database:create';
  describe = 'Create your database if it does not exist';

  /**
   * @inheritDoc
   */
  async handler(args: ArgumentsCamelCase<BaseArgs>) {
    const orm = await CLIHelper.getORM() as MikroORM<AbstractSqlDriver>;

    const schemaGenerator = orm.getSchemaGenerator();
    await schemaGenerator.ensureDatabase();

    await orm.close(true);
  }

}
