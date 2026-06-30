---
title: "The eval harness matters more than the model call"
date: "2026-06-29"
author: "Leelakrishna Ravuri"
---

[net-triage](https://github.com/LeelaKrishna-R/net-triage) reads a network log or a device config, tells you what is probably wrong, and points at the exact lines that gave it away. Under the hood it asks a language model. That part is easy. Anyone can wire up an API call and get a confident answer back.

The part I actually care about is knowing whether that answer is any good.

## Confident is not the same as correct

A language model will happily give you a wrong diagnosis in the same calm, authoritative tone it uses for a right one. For something like network triage, that is dangerous. A confident wrong answer can send you chasing the wrong fix for an hour. So "it sounds right" is not good enough. I wanted "it is right this often, and here is the number."

## Structured output, not freeform text

The first thing net-triage does is refuse to deal in loose prose. Instead of asking the model to "describe the problem," it asks for a strict, typed result: a category for the failure, a short explanation, and the specific evidence lines from the input that support it. I use the Anthropic SDK's native structured outputs with a Zod schema, so the model's answer is validated against that shape before my code ever touches it. If it does not fit the schema, it does not pass.

That alone makes the tool more useful. You get a diagnosis you can act on and the receipts to check it, not a paragraph you have to interpret.

## The eval is the real project

The center of net-triage is not the prompt. It is the eval harness around it.

It works like this. I keep a set of fixtures, each one a realistic log or config paired with the diagnosis I already know is correct. The harness runs the agent across all of them and scores how often it lands on the right category. That turns a vague "trust me, it works" into a measured number. On the cases it ships with, it gets 6 out of 6.

I will be honest about that number: six is a small sample, and a real production system would want far more fixtures across far more failure modes. But the point is the method, not the score. The harness is what lets the score grow later without me fooling myself in the meantime.

## The boring engineering around it

A few things I am quietly proud of, because they are the parts that make it real software rather than a demo:

- It tracks token usage and cost for every run, computed straight from the API response, so I always know what a diagnosis actually costs.
- It runs directly off the TypeScript source with no build step, using Node's native type stripping, so there is nothing to compile and nothing to fall out of sync.
- It ships with 18 tests, including a fake model client, so the logic can be tested without spending API credits.

## Why it changes how you work

Without an eval you are just vibing. You tweak a prompt, it feels better, you ship it, and you genuinely do not know if you improved anything or just moved the failure somewhere you were not looking. With an eval, every change either moves the number or it does not. That is the whole difference between guessing and engineering.

The eval is the headline feature. The model call is just the part everyone already knows how to do. The code is on GitHub: [github.com/LeelaKrishna-R/net-triage](https://github.com/LeelaKrishna-R/net-triage).
