module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 456:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __nccwpck_require__) => {

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
const core = __nccwpck_require__(105);
const github = __nccwpck_require__(82);

async function run() {
  const label = core.getInput('label');
  if (!label) {
    throw Error('configuration is missing input for: label');
  }
  const rejectLabels = label.split(',').map((l) => l.trim());
  const allowedBase = core.getInput('allowed_base');
  const allowBaseRefs = allowedBase ? allowedBase.split(',').map((l) => l.trim()) : null;
  const allowBaseRefsMsg = allowBaseRefs ? ` outside of '${allowBaseRefs}'` : ''

  core.info(`Checking for '${rejectLabels}'${allowBaseRefsMsg}'`);
  const { payload }  = github.context;
  const labels = payload.pull_request.labels.map((l) => l.name);
  core.info(`Current labels: ${labels}`);
  const labelIntersect = rejectLabels.find((l) => labels.includes(l));

  const baseRefMatch = true; // default is a match
  if (allowBaseRefs) {
    const baseRef = payload.pull_request.base.ref;
    baseRefMatch = allowBaseRefs.some((ref) => {
      return ref === baseRef || new RegExp(baseRef, 'iu').test(ref);
    });
  }

  if (labelIntersect && !baseRefMatch) {
    core.setFailed(`rejecting PR due to label: '${labelIntersect}'${allowBaseRefsMsg}`);
    return;
  }
  core.info(`OK: None of '${rejectLabels}' defined.`);
}

run().catch((error) => {
  console.error(error);
  core.setFailed(error.message);
});


/***/ }),

/***/ 105:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 82:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	__nccwpck_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __nccwpck_require__(456);
/******/ })()
;