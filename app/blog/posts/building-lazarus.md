---
title: "Why I built lazarus"
date: "2026-06-27"
author: "Leelakrishna Ravuri"
---

Restarting a stuck service in my homelab was always the same routine: get the alert, SSH in, run the same two commands, go back to what I was doing. That's exactly the kind of job a script should do.

Restarting a service is easy. The scary part is giving a script permission to run commands on your machines, so most of [lazarus](https://github.com/LeelaKrishna-R/lazarus) is about doing exactly what it's allowed to and nothing more.

## What it checks

You list your hosts in a YAML file and give each one some checks: can it open a TCP port, does a URL come back healthy, is a systemd service running, and are disk, memory, load and swap within limits.

## What keeps it from making things worse

- It only runs commands I've put in the config. It can't come up with its own fix.
- One failed check doesn't count. A host has to keep failing before lazarus calls it down.
- It tries a few times, then backs off instead of hammering a box that stays down.
- There's a dry-run mode, so I can see what it would do before it touches anything.

## Small on purpose

It's Python with one dependency (PyYAML) and 98 tests. The exit code is 0 when everything's fine, 1 when something's down and 2 for a config problem, so it drops straight into cron.

The code is on [GitHub](https://github.com/LeelaKrishna-R/lazarus).
