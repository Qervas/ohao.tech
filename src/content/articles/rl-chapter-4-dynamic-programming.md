---
title: "RL Chapter 4: Dynamic Programming"
description: "Exploring policy evaluation, policy improvement, and value iteration in reinforcement learning"
publishedAt: 2025-01-25
type: "reading"
status: "published"
tags: ["reinforcement-learning", "dynamic-programming", "ai", "algorithms"]
readingTime: 8
session:
  slug: "reinforcement-learning-sutton-barto"
  part: 4
  title: "Chapter 4: Dynamic Programming"
book:
  title: "Reinforcement Learning: An Introduction"
  subtitle: "Second Edition"
  author: "Richard S. Sutton and Andrew G. Barto"
  cover: "/images/books/rl-sutton-barto-generated.svg"
  status: "reading"
---

*Part 4 of my [Reinforcement Learning journey](/sessions/reinforcement-learning-sutton-barto)*

Moving from the mathematical foundations of MDPs to actual algorithms for solving them. Chapter 4 introduces dynamic programming - the first class of methods for computing optimal policies when we have perfect knowledge of the environment.

## The Core Insight

Dynamic programming (DP) provides the theoretical foundation for most RL algorithms. Even though we rarely have perfect environment models in practice, understanding DP is crucial because:

1. It gives us the ideal that other methods approximate
2. Many RL algorithms can be viewed as attempts to achieve the same effect as DP without requiring a complete model

## Policy Evaluation (The Prediction Problem)

The first piece of the puzzle: given a policy π, how do we compute the state-value function v_π(s)?

The iterative policy evaluation algorithm is beautifully simple:
- Start with arbitrary values V₀(s) for all states
- Apply the Bellman equation as an update rule:
  V_{k+1}(s) = Σ_a π(a|s) Σ_{s',r} p(s',r|s,a)[r + γV_k(s')]
- Repeat until convergence

What clicked for me: this is just turning the Bellman equation from a system of linear equations into an iterative algorithm. The contraction mapping theorem guarantees convergence.

## Policy Improvement

Given v_π, how do we find a better policy? 

The policy improvement theorem gives us the answer: if Q_π(s,a) > v_π(s) for some action a in state s, then taking action a in state s (and following π elsewhere) gives us a better policy.

This leads to the greedy policy improvement:
π'(s) = argmax_a Σ_{s',r} p(s',r|s,a)[r + γv_π(s')]

The beautiful part: if π' = π (no change), then we've found an optimal policy!

## Policy Iteration

Combine evaluation and improvement:
1. Start with arbitrary policy π₀
2. Policy Evaluation: compute v_π
3. Policy Improvement: compute π' = greedy(v_π)
4. If π' = π, stop. Otherwise, set π = π' and go to step 2

The algorithm is guaranteed to converge to an optimal policy in finite time (for finite MDPs).

## Value Iteration

The elegant shortcut: instead of waiting for policy evaluation to converge completely, we can do just one sweep:

V_{k+1}(s) = max_a Σ_{s',r} p(s',r|s,a)[r + γV_k(s')]

This combines policy evaluation and improvement into a single update. Theoretically beautiful and often more practical.

## Implementation Insights

I implemented both algorithms on the gridworld examples from the book. Some observations:

**Convergence Behavior**:
- Policy iteration: dramatic policy changes early, then stabilizes
- Value iteration: smooth convergence of values, policy emerges gradually

**Computational Considerations**:
- In-place updates vs. two-array approach
- The order of state updates can affect convergence speed
- Stopping criteria matter more than I initially thought

## The Computational Complexity Reality

DP requires O(|S|²|A|) operations per iteration. For the gridworld problems, this is trivial. For Go (10¹⁷⁰ states), it's impossible.

This is why we need the rest of the book - methods that work when we can't enumerate all states or don't know the environment model.

## Connection to Future Chapters

What's becoming clear is that most RL algorithms are trying to approximate what DP does exactly:
- Monte Carlo methods: estimate returns instead of using exact expectations
- Temporal-difference learning: bootstrap like DP but learn from samples
- Function approximation: handle large state spaces DP can't

## Programming Notes

```python
def policy_evaluation(policy, env, gamma=0.9, tolerance=1e-6):
    V = np.zeros(env.nS)
    while True:
        delta = 0
        for s in range(env.nS):
            v = 0
            for a, action_prob in enumerate(policy[s]):
                for prob, next_state, reward, done in env.P[s][a]:
                    v += action_prob * prob * (reward + gamma * V[next_state])
            delta = max(delta, abs(v - V[s]))
            V[s] = v
        if delta < tolerance:
            break
    return V
```

The code makes the mathematics concrete. Seeing the nested loops helped me understand why the algorithm works and why computational complexity matters.

## What's Next

Chapter 5 promises Monte Carlo methods - the first step toward learning from experience rather than perfect models. The theoretical foundations from DP should make the approximations in MC methods more meaningful.

---

*Progress: Chapter 4 of 17 - From theory to algorithms, the path forward becomes clearer*