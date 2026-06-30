---
title: "Building lazarus, a monitor that won't make things worse"
date: "2026-06-27"
author: "Leelakrishna Ravuri"
---

Most monitoring tools are good at telling you something is down. [lazarus](https://github.com/LeelaKrishna-R/lazarus) is my attempt at a small one that can also do something about it, without turning a small outage into a big one.

## Where it came from

The idea is boring on purpose. A service in my homelab would die, I would get an alert, I would SSH in, and I would run the same two or three commands to bring it back. Same problem, same fix, over and over. That is exactly the kind of repetitive, well-understood task a tool should own.

So the restarting itself was never the hard part. The hard part was trusting it.

## How it actually works

lazarus reads a single YAML config that lists the hosts and services to watch and the checks to run against them. There are three kinds of check:

- **TCP**: can I open a connection to this host and port?
- **HTTP**: does this URL come back with a healthy status code?
- **SSH service**: is this systemd service actually active on the host?

On every poll it runs the checks, decides the status of each target, and writes the result to an atomic JSON state file, so nothing gets half-written if it is interrupted mid-run. It also follows a clear exit-code contract: 0 if everything is healthy, 1 if something is down, 2 on a config or runtime error. That makes it easy to drop into a cron job or a systemd timer and alert on the exit code alone.

## The guardrails

A monitor that can run commands on your hosts is also a monitor that can do real damage if it gets something wrong. So the recovery path is wrapped in guardrails:

- **Whitelisted commands only.** Remediation can only run actions you have explicitly allowed in the config. It cannot improvise a fix.
- **Flap debounce.** One bad ping does not count. A target has to fail consistently before lazarus treats it as down, so a momentary blip never triggers a restart.
- **Attempt limits and cooldown.** It will try to recover a service a fixed number of times, then back off for a cooldown window instead of hammering a host that is genuinely broken.
- **Dry-run mode.** You can run the whole thing with side effects turned off and watch exactly what it would do. Nothing touches your machines until you are satisfied.

## Why it is so small

lazarus is deliberately tiny: Python, a single runtime dependency (PyYAML), and 42 tests. The small dependency surface is a feature, not laziness, and the tests are the real point. If I am going to let a piece of software act on its own against my machines, I want a lot of evidence that it does the right thing in the cases that matter, including the ugly ones like a flapping host or a remediation that itself fails.

It is not trying to replace a real observability stack. It is trying to handle the boring, repeatable recoveries safely, so I do not have to be the one SSHing in at 2am.

The full code, config examples, and tests are in the repo: [github.com/LeelaKrishna-R/lazarus](https://github.com/LeelaKrishna-R/lazarus).
