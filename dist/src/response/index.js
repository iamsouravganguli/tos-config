"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var response_exports = {};
__export(response_exports, {
  ResponseServices: () => ResponseServices
});
module.exports = __toCommonJS(response_exports);
class ResponseServices {
  props;
  constructor(text) {
    this.props = text;
  }
  handler = (services) => {
    return async (req, res, next) => {
      try {
        await services(req, res);
      } catch (error) {
        next(error);
      }
    };
  };
  error = (response, error) => {
    if (error.cause === "invalid_id") {
      return response.status(404).json({ message: `${this.props} not found` });
    } else {
      return response.status(500).json({ message: `Error`, error });
    }
  };
  success = (response, type, data, message) => {
    if (type === "create") {
      return response.status(200).json({ message: `${this.props} created` });
    }
    if (type === "update") {
      return response.status(200).json({ message: `${this.props} updated` });
    }
    if (type === "delete") {
      return response.status(200).json({ message: `${this.props} deleted` });
    }
    if (type === "all") {
      return response.status(200).json(data);
    }
    if (type === "detail") {
      return response.status(200).json(data);
    }
    if (type === "other") {
      return response.status(200).json({ message });
    } else {
      return response.status(200).json(data);
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ResponseServices
});
//# sourceMappingURL=index.js.map
