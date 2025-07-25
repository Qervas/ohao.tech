---
title: "C++ Templates: Understanding Parameter Packs"
description: "Deep dive into C++ template parameter packs with practical examples and use cases"
publishedAt: 2024-01-22
type: "article"
status: "published"
tags: ["cpp", "templates", "metaprogramming", "advanced-cpp"]
readingTime: 6
coverImage:
  src: "/images/blogs/cpp_templates_1.png"
  alt: "C++ template parameter packs visualization"
series:
  name: "C++ Template Mastery"
  part: 1
---

Parameter packs are one of the most powerful features in modern C++ templates, enabling elegant variadic template programming. Let's explore how they work with practical examples.

## Basic Parameter Pack Usage

```cpp
template<typename... Ts>
constexpr auto get_type_sizes(){
    return std::array<std::size_t, sizeof...(Ts)>{sizeof(Ts)...};
}

auto sizes = get_type_sizes<short, int, long, long long>();
```

### What's the `sizeof` going on here?

- `sizeof…(Ts)` evaluates how many arguments are in the parameter pack, 4 in this case.
- `sizeof(Ts)...` expands into a comma-separated sequence as `sizeof(short), sizeof(int), sizeof(long), sizeof(long long)`, creating a number sequence.

## Multiple Parameter Packs

```cpp
template <typename... Ts, typename... Us>
constexpr auto multipacks(Ts... args1, Us... args2)
{
    std::cout << sizeof...(args1) << ',' << sizeof...(args2) << '\n';
}

multipacks<int>(1, 2, 3, 4, 5, 6);// 1,5
multipacks<int, int, int>(1, 2, 3, 4, 5, 6);// 3,3
multipacks<int, int, int, int>(1, 2, 3, 4, 5, 6);// 4,2
multipacks<int, int, int, int, int, int>(1, 2, 3, 4, 5, 6); // 6,0
```

**Key insight**: A parameter pack can be followed by other parameters including more parameter packs. The first group of function parameters match template parameters one by one as `Ts... args1`, while the remaining parameters become `Us... args2`.

## Advanced Example: Function Pair Template

```cpp
#include<iostream>
#include<functional>

template<typename, typename>
struct func_pair;

template<typename R1, typename... A1, typename R2, typename... A2>
struct func_pair<R1(A1...), R2(A2...)>{
    std::function<R1(A1...)> f;
    std::function<R2(A2...)> g;
};

bool twice_as(int a, int b){
    return a >= b*2;
}

double sum_and_div(int a, int b, double c){
    return (a + b) / c;
}

int main(){
    func_pair<bool(int, int), double(int, int, double)> funcs{twice_as, sum_and_div};
    funcs.f(42, 12);
    funcs.g(42, 12, 10.0);
    return 0;
}
```

This creates a class template that represents a pair of function pointers with different signatures, demonstrating how parameter packs can be used in template specialization to handle function types elegantly.

## Why Parameter Packs Matter

Parameter packs enable:
- **Type-safe variadic functions** without the risks of C-style varargs
- **Compile-time computation** with full type information
- **Perfect forwarding** in generic code
- **Template metaprogramming** techniques for advanced library design

Understanding parameter packs is essential for modern C++ development, especially when working with libraries like the standard library's `std::tuple`, `std::variant`, or when building generic utility functions.

---

**Reference**: [Template Metaprogramming with C++](https://www.amazon.com/Template-Metaprogramming-everything-templates-metaprogramming-ebook/dp/B09ZHZFTKV) by Marius Bancila - Learn everything about C++ templates and unlock the power of template metaprogramming.