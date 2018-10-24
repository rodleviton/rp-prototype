"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const algoliasearch = require("algoliasearch");
const common_1 = require("../../common");
const models_1 = require("../../models");
const ALGOLIA_ID = "66YQVB3O7P";
const ALGOLIA_ADMIN_KEY = "521f72b37e83a825b823c3f152636c48";
const ALGOLIA_SEARCH_KEY = "1e772bc7c32f9689cbab3edb374521f9";
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_SEARCH_KEY);
const index = client.initIndex("pixels");
function searchPixelsService(request, response, db) {
  // Search query
  const query = request.params.searchQuery;
  // Perform an Algolia search:
  // https://www.algolia.com/doc/api-reference/api-methods/search/
  index
    .search({
      query
    })
    .then(responses => {
      // Response from Algolia:
      // https://www.algolia.com/doc/api-reference/api-methods/search/#response-format
      common_1.responseHandler({
        response,
        code: models_1.ApiResponseCodes.Success,
        status: models_1.ApiResponseTypes.Success,
        context: "search pixels",
        data: responses.hits
      });
    })
    .catch(error =>
      common_1.responseHandler({
        response,
        code: models_1.ApiResponseCodes.FatalError,
        status: models_1.ApiResponseTypes.FatalError,
        context: "pixels",
        raw: JSON.stringify(error)
      })
    );
}
exports.default = searchPixelsService;
//# sourceMappingURL=search-pixels.service.js.map
