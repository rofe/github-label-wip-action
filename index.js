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
const core = require('@actions/core');
const github = require('@actions/github');

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
