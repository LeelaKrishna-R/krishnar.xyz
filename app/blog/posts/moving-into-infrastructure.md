---
title: "Moving from AI into infrastructure"
date: "2026-06-25"
author: "Leelakrishna Ravuri"
---

I did my master's in AI, but the part that actually holds my attention is not the models. It is everything around them. The boxes they run on, the network they talk over, and what happens at 2am when one of those quietly falls over.

This post is me being honest about where I am heading and why.

## The homelab is where I actually learn

I run a homelab. It started as a place to self-host a few things and turned into the way I learn best. There is no abstraction layer between me and the problem. When a service dies, nobody files a ticket and no professor hands me the answer. I notice it is broken, I dig into why, and I fix it. Then I usually build something small so I do not have to fix that same thing by hand again.

Most of the tools on my projects page came out of exactly that loop. [lazarus](https://github.com/LeelaKrishna-R/lazarus) exists because I got tired of SSHing in to restart the same service. [net-triage](https://github.com/LeelaKrishna-R/net-triage) exists because reading logs to work out what broke is a pattern worth speeding up. [agent-budget](https://github.com/LeelaKrishna-R/agent-budget) came out of wanting to know what my LLM tools were actually costing me.

## Why the CCNA

I am studying for the CCNA because I do not want the network to be a black box that either works or does not. I want to understand what is actually happening underneath: how a packet gets from one machine to another, what a switch is really doing, why traffic took the path it took, how subnets carve things up.

A lot of that is unglamorous. Subnetting drills are not exciting. But it is the foundation everything I care about sits on top of, and I would rather understand it properly than memorize workarounds.

## How I actually use AI

I still use AI every day, and I am not going to pretend otherwise or pretend it does the hard part. It helps me move faster on the tooling I build, especially in languages I am still getting comfortable in. The judgment calls are mine: deciding what to build, scoping it down, and making sure it is safe to run on real hardware. The model is a fast pair of hands, not the engineer.

That is the honest version of where I am. An AI background, pointed at infrastructure and networking, learning the fundamentals properly instead of faking them.

If you want to see the output, the projects are one click away.
