---
title: "How I test net-triage"
date: "2026-06-29"
author: "Leelakrishna Ravuri"
---

[net-triage](https://github.com/LeelaKrishna-R/net-triage) reads a network log or a device config and tells you what's probably wrong, with the lines that gave it away. It uses Claude under the hood.

Getting an answer out of a model is one API call. The problem is that it sounds just as sure when it's wrong. With network problems that can send you after the wrong fix for an hour, so I wanted a number instead of a feeling.

## Answers in a fixed shape

net-triage asks the model for a fixed set of fields: the kind of fault, how bad it is, the root cause, the evidence lines, a fix and a confidence. The Anthropic SDK's structured outputs and a Zod schema check the answer before my code uses it. If it doesn't fit, it's rejected.

## The test set

I keep a folder of real Cisco IOS logs and show-command output, each with the answer I know is right. The eval runs net-triage over all of them and counts how many it gets right.

When I first wrote this in June there were 6 cases. Now there are 16, covering 10 kinds of failure, and it gets all 16 right for about 20 cents a run.

Sixteen clear-cut cases are the starting set, one or more for every kind of fault. What they give me is a way to tell whether a prompt or model change made things better or worse, without guessing. Adversarial and multi-fault cases come next.

## Smaller things

- Every run prints the tokens used and what they cost.
- It runs straight from the TypeScript source with Node's type stripping, so there's no build step.
- There are 36 tests, with a fake model client so running them costs nothing.

The code is on [GitHub](https://github.com/LeelaKrishna-R/net-triage).
