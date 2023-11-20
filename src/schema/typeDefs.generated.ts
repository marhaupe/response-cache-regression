import type { DocumentNode } from 'graphql';
export const typeDefs = {
  kind: 'Document',
  definitions: [
    {
      kind: 'DirectiveDefinition',
      name: {
        kind: 'Name',
        value: 'cacheControl',
        loc: { start: 11, end: 23 },
      },
      arguments: [
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'maxAge', loc: { start: 24, end: 30 } },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'Int', loc: { start: 32, end: 35 } },
            loc: { start: 32, end: 35 },
          },
          directives: [],
          loc: { start: 24, end: 35 },
        },
      ],
      repeatable: false,
      locations: [
        {
          kind: 'Name',
          value: 'FIELD_DEFINITION',
          loc: { start: 40, end: 56 },
        },
        { kind: 'Name', value: 'OBJECT', loc: { start: 59, end: 65 } },
      ],
      loc: { start: 0, end: 65 },
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'MutationResult',
        loc: { start: 72, end: 86 },
      },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'success', loc: { start: 91, end: 98 } },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Boolean',
                loc: { start: 100, end: 107 },
              },
              loc: { start: 100, end: 107 },
            },
            loc: { start: 100, end: 108 },
          },
          directives: [],
          loc: { start: 91, end: 108 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'message',
            loc: { start: 111, end: 118 },
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
              loc: { start: 120, end: 126 },
            },
            loc: { start: 120, end: 126 },
          },
          directives: [],
          loc: { start: 111, end: 126 },
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'code', loc: { start: 129, end: 133 } },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
              loc: { start: 135, end: 141 },
            },
            loc: { start: 135, end: 141 },
          },
          directives: [],
          loc: { start: 129, end: 141 },
        },
      ],
      loc: { start: 67, end: 143 },
    },
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'Product', loc: { start: 149, end: 156 } },
      interfaces: [],
      directives: [
        {
          kind: 'Directive',
          name: {
            kind: 'Name',
            value: 'cacheControl',
            loc: { start: 158, end: 170 },
          },
          arguments: [
            {
              kind: 'Argument',
              name: {
                kind: 'Name',
                value: 'maxAge',
                loc: { start: 171, end: 177 },
              },
              value: {
                kind: 'IntValue',
                value: '3600000',
                loc: { start: 179, end: 186 },
              },
              loc: { start: 171, end: 186 },
            },
          ],
          loc: { start: 157, end: 187 },
        },
      ],
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'id', loc: { start: 192, end: 194 } },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'ID',
                loc: { start: 196, end: 198 },
              },
              loc: { start: 196, end: 198 },
            },
            loc: { start: 196, end: 199 },
          },
          directives: [],
          loc: { start: 192, end: 199 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'totalRating',
            loc: { start: 202, end: 213 },
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ProductTotalRating',
              loc: { start: 215, end: 233 },
            },
            loc: { start: 215, end: 233 },
          },
          directives: [],
          loc: { start: 202, end: 233 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'userRating',
            loc: { start: 236, end: 246 },
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'userId',
                loc: { start: 247, end: 253 },
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                  loc: { start: 255, end: 261 },
                },
                loc: { start: 255, end: 261 },
              },
              directives: [],
              loc: { start: 247, end: 261 },
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ProductUserRating',
              loc: { start: 264, end: 281 },
            },
            loc: { start: 264, end: 281 },
          },
          directives: [],
          loc: { start: 236, end: 281 },
        },
      ],
      loc: { start: 144, end: 283 },
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'ProductUserRating',
        loc: { start: 290, end: 307 },
      },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'id', loc: { start: 312, end: 314 } },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'ID',
                loc: { start: 316, end: 318 },
              },
              loc: { start: 316, end: 318 },
            },
            loc: { start: 316, end: 319 },
          },
          directives: [],
          loc: { start: 312, end: 319 },
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'type', loc: { start: 322, end: 326 } },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'ProductRatingType',
                loc: { start: 328, end: 345 },
              },
              loc: { start: 328, end: 345 },
            },
            loc: { start: 328, end: 346 },
          },
          directives: [],
          loc: { start: 322, end: 346 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'timestamp',
            loc: { start: 349, end: 358 },
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Float',
                loc: { start: 360, end: 365 },
              },
              loc: { start: 360, end: 365 },
            },
            loc: { start: 360, end: 366 },
          },
          directives: [],
          loc: { start: 349, end: 366 },
        },
      ],
      loc: { start: 285, end: 368 },
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'ProductTotalRating',
        loc: { start: 375, end: 393 },
      },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'id', loc: { start: 398, end: 400 } },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'ID',
                loc: { start: 402, end: 404 },
              },
              loc: { start: 402, end: 404 },
            },
            loc: { start: 402, end: 405 },
          },
          directives: [],
          loc: { start: 398, end: 405 },
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'score', loc: { start: 408, end: 413 } },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Int',
                loc: { start: 415, end: 418 },
              },
              loc: { start: 415, end: 418 },
            },
            loc: { start: 415, end: 419 },
          },
          directives: [],
          loc: { start: 408, end: 419 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'likesCount',
            loc: { start: 422, end: 432 },
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Int',
                loc: { start: 434, end: 437 },
              },
              loc: { start: 434, end: 437 },
            },
            loc: { start: 434, end: 438 },
          },
          directives: [],
          loc: { start: 422, end: 438 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'dislikesCount',
            loc: { start: 441, end: 454 },
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Int',
                loc: { start: 456, end: 459 },
              },
              loc: { start: 456, end: 459 },
            },
            loc: { start: 456, end: 460 },
          },
          directives: [],
          loc: { start: 441, end: 460 },
        },
      ],
      loc: { start: 370, end: 462 },
    },
    {
      kind: 'EnumTypeDefinition',
      name: {
        kind: 'Name',
        value: 'ProductRatingType',
        loc: { start: 469, end: 486 },
      },
      directives: [],
      values: [
        {
          kind: 'EnumValueDefinition',
          name: { kind: 'Name', value: 'LIKE', loc: { start: 491, end: 495 } },
          directives: [],
          loc: { start: 491, end: 495 },
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'DISLIKE',
            loc: { start: 498, end: 505 },
          },
          directives: [],
          loc: { start: 498, end: 505 },
        },
      ],
      loc: { start: 464, end: 507 },
    },
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'Query', loc: { start: 514, end: 519 } },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'product',
            loc: { start: 524, end: 531 },
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
                loc: { start: 532, end: 534 },
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'String',
                    loc: { start: 536, end: 542 },
                  },
                  loc: { start: 536, end: 542 },
                },
                loc: { start: 536, end: 543 },
              },
              directives: [],
              loc: { start: 532, end: 543 },
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Product',
              loc: { start: 546, end: 553 },
            },
            loc: { start: 546, end: 553 },
          },
          directives: [],
          loc: { start: 524, end: 553 },
        },
      ],
      loc: { start: 509, end: 555 },
    },
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'Mutation', loc: { start: 562, end: 570 } },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'productRate',
            loc: { start: 575, end: 586 },
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
                loc: { start: 587, end: 589 },
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'String',
                    loc: { start: 591, end: 597 },
                  },
                  loc: { start: 591, end: 597 },
                },
                loc: { start: 591, end: 598 },
              },
              directives: [],
              loc: { start: 587, end: 598 },
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'rating',
                loc: { start: 600, end: 606 },
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ProductRatingType',
                    loc: { start: 608, end: 625 },
                  },
                  loc: { start: 608, end: 625 },
                },
                loc: { start: 608, end: 626 },
              },
              directives: [],
              loc: { start: 600, end: 626 },
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'UserProductRatingMutationResult',
                loc: { start: 629, end: 660 },
              },
              loc: { start: 629, end: 660 },
            },
            loc: { start: 629, end: 661 },
          },
          directives: [],
          loc: { start: 575, end: 661 },
        },
      ],
      loc: { start: 557, end: 663 },
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'UserProductRatingMutationResult',
        loc: { start: 670, end: 701 },
      },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'result',
            loc: { start: 706, end: 712 },
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'MutationResult',
                loc: { start: 714, end: 728 },
              },
              loc: { start: 714, end: 728 },
            },
            loc: { start: 714, end: 729 },
          },
          directives: [],
          loc: { start: 706, end: 729 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'product',
            loc: { start: 732, end: 739 },
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Product',
              loc: { start: 741, end: 748 },
            },
            loc: { start: 741, end: 748 },
          },
          directives: [],
          loc: { start: 732, end: 748 },
        },
      ],
      loc: { start: 665, end: 750 },
    },
  ],
  loc: { start: 0, end: 751 },
} as unknown as DocumentNode;
