export const requestSchema = {
  type: "object",
  additionalProperties: false,
  required: ["startDate", "endDate", "minCount", "maxCount"],
  properties: {
    startDate: {
      type: "string",
      format: "date",
    },
    endDate: {
      type: "string",
      format: "date",
    },
    minCount: {
      type: "number",
      minimum: 0,
    },
    maxCount: {
      type: "number",
      minimum: 0,
    },
  },
} as any;
