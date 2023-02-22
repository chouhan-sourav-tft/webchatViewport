const { request } = require('playwright');

const simulatorBaseURL = `${global.BASE_URL}/simulator_fs/`;

exports.apiHelper = class apiHelper {
  /**
   *
   * @param {string} endpoint : request type endpoint
   * @param {json} body : request json body
   * @returns response body
   */
  async goContactPOST(endpoint, body) {
    const inboundCall = await request.newContext({
      baseURL: simulatorBaseURL,
    });

    let response = inboundCall.post(endpoint, {
      data: body,
    });

    let callResponse = (await (await response).body()).toString();
    return callResponse;
  }

  /**
   * function to make delete request
   * @param  {string} endpoint - request type endpoint
   * @param {json} body : request json body
   * @param {json} header : headers required for api endpoint
   * @returns response body
   */
  async goContactDelete(endpoint, body, header){
    const deleteCall = await request.newContext({
      baseURL: global.BASE_URL,
    });
    let redisCall = await deleteCall.delete(endpoint, {
      headers: header,
      data: body,
    });
    return redisCall;
  }
};
