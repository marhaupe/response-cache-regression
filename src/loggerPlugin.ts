import { Context } from './context';
import { logger } from './logger';
import { isAsyncIterable, Plugin } from '@envelop/core';

const isIntrospectionSymbol = Symbol('IS_INTROSPECTION');
function isIntrospectionOperationString(operation: any) {
  return (
    (typeof operation === 'string' ? operation : operation.body).indexOf(
      '__schema',
    ) !== -1
  );
}

export const loggerPlugin: Plugin<
  Context & { [isIntrospectionSymbol]: boolean }
> = {
  onParse({ extendContext, params }) {
    if (isIntrospectionOperationString(params.source)) {
      extendContext({
        [isIntrospectionSymbol]: true,
      });
    }
  },
  onExecute({ args }) {
    if (args.contextValue[isIntrospectionSymbol]) {
      return;
    }
    const start = process.hrtime.bigint();
    const operationName = args.operationName ?? 'Anonymous Operation';
    return {
      onExecuteDone({ result }) {
        if (isAsyncIterable(result)) {
          logger.warn(
            `'loggerPlugin' encountered an AsyncIterator which is not supported yet, so tracing data is not available for the operation.`,
          );
          return;
        }

        const end = process.hrtime.bigint();
        const duration = Math.round(Number(end - start) / 1000000);
        const cacheHit = (result.extensions?.responseCache as any)?.hit;

        const hasErrors = (result?.errors?.length ?? 0) > 0;
        const logData = {
          operationName,
          hasErrors,
          duration,
          cacheHit,
          ...(hasErrors && {
            variables: args.variableValues,
            errors: result.errors,
          }),
        };

        if (hasErrors) {
          args.contextValue.log.error(
            logData,
            'operation finished executing with errors',
          );
        } else {
          if (process.env.NODE_ENV !== 'test') {
            args.contextValue.log.info(logData, 'operation finished executing');
          }
        }
      },
    };
  },
};
