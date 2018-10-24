"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const algoliasearch = require("algoliasearch");
const common_1 = require("../../common");
const models_1 = require("../../models");
const ALGOLIA_ID = process.env.ALGOLIA_ID;
const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY;
const ALGOLIA_SEARCH_KEY = process.env.ALGOLIA_SEARCH_KEY;
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_SEARCH_KEY);
async function searchSuggestService(request, response, db) {
  // Search query
  const query = request.params.searchQuery;
  // Search all indexes
  const queries = [
    {
      indexName: "users",
      query,
      params: {
        hitsPerPage: 3
      }
    },
    {
      indexName: "pixels",
      facets: "*",
      query,
      params: {
        hitsPerPage: 3
      }
    }
  ];
  const index = client.initIndex("pixels");
  const facetResults = await index.searchForFacetValues({
    facetName: "topics",
    facetQuery: query
  });
  const searchResults = await client.search(queries);
  const userResults = searchResults.results[0].hits;
  const pixelsResults = searchResults.results[1].hits;
  let data = [];
  if (facetResults.facetHits.length) {
    data = [
      { label: "Topics", value: "topics", disabled: true },
      ...facetResults.facetHits.map(result => ({
        value: result.value,
        label: result.value
      }))
    ];
  }
  if (pixelsResults.length) {
    data = [
      ...data,
      { label: "Pixels", value: "pixels", disabled: true },
      ...pixelsResults.map(result => ({
        value: result.title,
        label: result.title,
        category: "pixels",
        data: result
      }))
    ];
  }
  if (userResults.length) {
    data = [
      ...data,
      { label: "Users", value: "users", disabled: true },
      ...userResults.map(result => ({
        value: result.username,
        label: result.displayName,
        category: "users",
        data: result
      }))
    ];
  }
  common_1.responseHandler({
    response,
    code: models_1.ApiResponseCodes.Success,
    status: models_1.ApiResponseTypes.Success,
    context: "suggest",
    data
  });
}
exports.default = searchSuggestService;
//# sourceMappingURL=search-suggest.service.js.map
