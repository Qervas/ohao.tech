---
title: "RL Book Series - Part 2: Dynamic Programming"
description: "Chapter 4 notes on Dynamic Programming - policy evaluation, improvement, and iteration algorithms"
publishedAt: 2025-01-25
type: "reading"
status: "draft"
tags: ["books", "ai", "machine-learning", "reinforcement-learning", "dynamic-programming"]
readingTime: 7
series:
  name: "Reinforcement Learning: An Introduction"
  part: 2
  total: 17
book:
  title: "Reinforcement Learning: An Introduction"
  subtitle: "Second Edition"
  author: "Richard S. Sutton and Andrew G. Barto"
  cover: "/images/books/rl-sutton-barto-generated.svg"
  status: "reading"
---

Moving into Chapter 4, where the rubber meets the road. Dynamic Programming is where we start seeing actual algorithms that can solve MDPs when we have perfect knowledge of the environment dynamics.

## The Core Insight

Dynamic Programming leverages the recursive structure of the Bellman equations. If we know the value of all successor states, we can compute the value of any state. This bootstrapping approach is fundamental to most RL algorithms.

## Policy Evaluation

The iterative policy evaluation algorithm is beautifully simple:

For each state s, repeatedly apply:
v_{k+1}(s) = Σ_a π(a|s) Σ_{s',r} p(s',r|s,a)[r + γv_k(s')]

**Key insight**: This is just the Bellman equation for v_π turned into an update rule. We're essentially solving a system of linear equations iteratively.

## Policy Improvement

Once we can evaluate a policy, we can improve it greedily:
π'(s) = argmax_a Σ_{s',r} p(s',r|s,a)[r + γv_π(s')]

**Policy Improvement Theorem**: This greedy improvement is guaranteed to produce a policy that's at least as good as the original, and strictly better unless the original was already optimal.

## Policy Iteration

Combining evaluation and improvement gives us policy iteration:
1. Initialize policy π_0
2. Repeat:
   - Policy Evaluation: compute v_{π_i}
   - Policy Improvement: π_{i+1} = greedy(v_{π_i})
3. Until π_{i+1} = π_i

## Value Iteration

Sometimes we don't need to fully evaluate each policy. Value iteration combines improvement and evaluation:

v_{k+1}(s) = max_a Σ_{s',r} p(s',r|s,a)[r + γv_k(s')]

This is just the Bellman optimality equation turned into an update rule.

## What's Clicking

The connection between these algorithms and the mathematical foundations from Chapter 3 is becoming clear. Every algorithm is essentially a different way of leveraging the Bellman equations.

## Implementation Notes

Working through the gridworld examples in code helps solidify the concepts. The iterative nature of these algorithms makes them perfect for seeing convergence in action.

```python
# Pseudocode for policy evaluation
def policy_evaluation(policy, env, gamma=0.9, threshold=1e-6):
    V = np.zeros(env.num_states)
    while True:
        delta = 0
        for s in range(env.num_states):
            v = V[s]
            V[s] = sum(policy[s][a] * sum(env.P[s][a][s_prime] * 
                      (r + gamma * V[s_prime]) 
                      for s_prime, r in env.transitions(s, a))
                      for a in range(env.num_actions))
            delta = max(delta, abs(v - V[s]))
        if delta < threshold:
            break
    return V
```

## Current Questions

- How does the computational complexity compare between policy iteration and value iteration?
- When would you choose one algorithm over another in practice?
- How do these exact methods connect to the approximate methods coming later?

## Looking Ahead

Chapter 4 sets up the foundation for everything that follows. The key insight that optimal policies can be found through iterative improvement will echo through temporal difference learning, Q-learning, and beyond.

The perfect knowledge assumption won't hold in most real scenarios, but the algorithmic patterns established here are fundamental.

---

*Progress: Chapter 4 of 17 - From mathematical foundations to actual algorithms...*