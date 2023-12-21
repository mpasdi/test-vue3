/*
 * @Author: lisongming
 * @Date: 2023-12-21 17:23:11
 * @LastEditors: lisongming
 * @Description: 描述
 */

/**
 * @description:  contentType
 */
enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8'
}

export { ContentTypeEnum }
