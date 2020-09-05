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
  core.info(`Checking for '${rejectLabels}'`);
  const { payload }  = github.context;
  // console.log(`The event payload: ${JSON.stringify(payload, undefined, 2)}`);
  const labels = payload.pull_request.labels.map((l) => l.name);
  core.info(`Current labels: ${labels}`);
  const intersect = rejectLabels.filter((l) => labels.includes(l));

  if (intersect.length) {
    core.setFailed(`rejecting PR due to label: '${intersect}'`);
    return;
  }
  core.info(`OK: None of '${rejectLabels}' defined.`);
}

run().catch((error) => {
  console.error(error);
  core.setFailed(error.message);
});

