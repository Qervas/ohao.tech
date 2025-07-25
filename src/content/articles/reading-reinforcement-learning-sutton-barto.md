---
title: "RL Book Series - Part 1: Foundations and Finite MDPs"
description: "Starting my journey through Sutton & Barto's RL textbook - Chapter 3 notes on Finite Markov Decision Processes"
publishedAt: 2025-01-22
type: "reading"
status: "published"
tags: ["books", "ai", "machine-learning", "reinforcement-learning", "mdp"]
readingTime: 6
series:
  name: "Reinforcement Learning: An Introduction"
  part: 1
  total: 17
session:
  slug: "reinforcement-learning-sutton-barto"
  part: 3
  title: "Chapter 3: Finite Markov Decision Processes"
book:
  title: "Reinforcement Learning: An Introduction"
  subtitle: "Second Edition"
  author: "Richard S. Sutton and Andrew G. Barto"
  cover: "/images/books/rl-sutton-barto-generated.svg"
  status: "reading"
---

*Part 3 of my [Reinforcement Learning journey](/sessions/reinforcement-learning-sutton-barto)*

Working through Chapter 3 of Sutton & Barto - the chapter that lays the mathematical foundation for everything that follows. This is where the book transitions from intuitive concepts to formal mathematical framework.

## Chapter 3: Finite Markov Decision Processes

Currently working through the formal framework that underlies all of reinforcement learning. The beauty is in how they build up complexity gradually:

**The Agent-Environment Interface**: Every timestep t, the agent receives state S_t, takes action A_t, receives reward R_{t+1}, and transitions to S_{t+1}. Simple on the surface, but this abstraction captures everything from game playing to robot control.

**The Markov Property**: The key insight that the future depends only on the current state, not the entire history. Mathematically elegant, practically powerful, but also a strong assumption that often doesn't hold in real systems.

**Returns and Value Functions**: 
- G_t = R_{t+1} + γR_{t+2} + γ²R_{t+3} + ...
- The discount factor γ makes infinite sums converge and captures our preference for immediate vs. delayed rewards

## What's Clicking

The connection between value functions and dynamic programming is starting to make sense. When they write:

v_π(s) = E_π[G_t | S_t = s]

It's not just mathematical notation - it's a way of thinking about what makes states valuable under a given policy.

## Current Struggles

The Bellman equations feel fundamental but I'm still building intuition for when they're useful vs. when direct methods work better. The recursive relationship is beautiful:

v_π(s) = Σ_a π(a|s) Σ_{s',r} p(s',r|s,a)[r + γv_π(s')]

But moving from this equation to actual algorithms feels like a big step.

## Programming Connection

I've been implementing some of the examples in Python as I read. There's something about seeing the grid world problems in code that makes the mathematical concepts concrete. Planning to work through the full tabular methods once I finish this chapter.

## Next Steps

- Finish Chapter 3 exercises (the ones involving manual computation are actually helpful)
- Start implementing basic policy evaluation
- Maybe try applying these concepts to a simple graphics optimization problem

The book promises that everything builds on these foundations. Given how much thought went into just defining the MDP framework, I believe them.

---

*Progress: Chapter 3 of 17 - The mathematical foundations are solid, now for the algorithms...*