export interface DocItem {
  title: string
  href: string
  items?: DocItem[]
}

export const docsNav: DocItem[] = [
  {
    title: "Introduction",
    href: "/docs",
  },
  {
    title: "Object-Oriented Python Book",
    href: "/docs/object-oriented-python",
    items: [
      {
        title: "Introduction to OOP in Python",
        href: "/docs/object-oriented-python",
      },
      {
        title: "Classes and Objects",
        href: "/docs/object-oriented-python/classes-and-objects",
      },
      {
        title: "Attributes and Methods",
        href: "/docs/object-oriented-python/attributes-and-methods",
      },
      {
        title: "Inheritance and Polymorphism",
        href: "/docs/object-oriented-python/inheritance-and-polymorphism",
      },
      {
        title: "Encapsulation and Abstraction",
        href: "/docs/object-oriented-python/encapsulation-and-abstraction",
      },
      {
        title: "Magic Methods and Dunder Protocols",
        href: "/docs/object-oriented-python/magic-methods",
      },
    ],
  },
]

export interface DocHeading {
  id: string
  title: string
  level: 2 | 3
}

export interface DocContent {
  title: string
  description?: string
  content: string
  lastUpdated?: string
  prevLink?: { title: string; href: string }
  nextLink?: { title: string; href: string }
  nextSteps?: { title: string; href: string; description: string }[]
  codeBlocks?: { language: string; code: string }[]
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export function extractHeadings(content: string): DocHeading[] {
  const headings: DocHeading[] = []
  const lines = content.trim().split("\n")
  for (const line of lines) {
    if (line.startsWith("## ")) {
      const title = line.slice(3).trim()
      headings.push({ id: slugify(title), title, level: 2 })
    } else if (line.startsWith("### ")) {
      const title = line.slice(4).trim()
      headings.push({ id: slugify(title), title, level: 3 })
    }
  }
  return headings
}

export interface BreadcrumbItem {
  title: string
  href: string
}

export function getBreadcrumb(pathname: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ title: "Home", href: "/" }]
  if (!pathname || pathname === "/docs") {
    items.push({ title: "Introduction", href: "/docs" })
    return items
  }

  const fullPath = pathname.startsWith("/") ? pathname : `/${pathname}`
  const doc = docsContent[fullPath]
  const segment = fullPath.split("/").pop() ?? ""
  const fallbackTitle = segment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
  const title = doc?.title ?? (fallbackTitle || "Page")
  items.push({ title, href: fullPath })
  return items
}

export const docsContent: Record<string, DocContent> = {
  "/docs": {
    title: "Object-Oriented Python Book",
    description: "A practical guide to mastering OOP in Python.",
    content: `
## Welcome

This site is a small book about **Object-Oriented Programming (OOP) in Python**.
You can read it from start to finish, or jump into the chapter that matches what you are learning right now.

## How to use this book

The chapters are organized to build on each other:

- Start with the **big picture** of why OOP matters.
- Learn how to define **classes and objects**.
- Add data and behavior with **attributes and methods**.
- Share code with **inheritance and polymorphism**.
- Hide complexity using **encapsulation and abstraction**.
- Make your types feel like built-ins using **magic methods**.

Use the sidebar to navigate between chapters, or follow the "Next" links at the bottom of each page.

## Chapters

- [Introduction to OOP in Python](/docs/object-oriented-python)
- [Classes and Objects](/docs/object-oriented-python/classes-and-objects)
- [Attributes and Methods](/docs/object-oriented-python/attributes-and-methods)
- [Inheritance and Polymorphism](/docs/object-oriented-python/inheritance-and-polymorphism)
- [Encapsulation and Abstraction](/docs/object-oriented-python/encapsulation-and-abstraction)
- [Magic Methods and Dunder Protocols](/docs/object-oriented-python/magic-methods)
    `,
  },
  "/docs/object-oriented-python": {
    title: "Introduction to OOP in Python",
    description: "Learn the core ideas of Object-Oriented Programming using Python.",
    lastUpdated: "Feb 10, 2026",
    content: `
## Why Object-Oriented Python?

Python is a multi-paradigm language. You can write simple scripts, functional-style code, or fully object-oriented systems.
Object-Oriented Programming (OOP) becomes important when your code grows beyond a few functions and you need structure, reuse, and clear responsibilities.

In this book, we'll walk through OOP concepts *using Python first*, with plenty of small, focused examples.

## What you'll learn

- How to model real-world concepts as Python classes
- The difference between **class** and **instance** attributes
- How **methods** work and how \`self\` is passed
- How to share behavior with **inheritance** and **polymorphism**
- How to hide internal details with **encapsulation** and **abstraction**
- How to use **magic methods** to make your objects feel like built-in types

## Who is this for?

You should be comfortable with:

- Basic Python syntax (variables, loops, functions)
- Working with built-in types like \`list\`, \`dict\`, and \`str\`

If you're new to Python, that's okay—just be ready to pause and experiment in a REPL as you read.

## Next steps

- Start with [Classes and Objects](/docs/object-oriented-python/classes-and-objects) to see how to define your own types.
    `,
    nextSteps: [
      {
        title: "Classes and Objects",
        href: "/docs/object-oriented-python/classes-and-objects",
        description: "Define your own types and create instances in Python.",
      },
    ],
  },
  "/docs/object-oriented-python/classes-and-objects": {
    title: "Classes and Objects",
    lastUpdated: "Feb 10, 2026",
    prevLink: {
      title: "Introduction to OOP in Python",
      href: "/docs/object-oriented-python",
    },
    nextLink: {
      title: "Attributes and Methods",
      href: "/docs/object-oriented-python/attributes-and-methods",
    },
    content: `
## From data to objects

Without classes, you might represent a book as a \`dict\`:

\`\`\`python
book = {
    "title": "Python OOP",
    "author": "You",
    "pages": 250,
}
\`\`\`

This works for small scripts, but as your program grows it becomes hard to see what data belongs together and which functions are allowed to touch it.

## Defining a class

In Python, a **class** is a blueprint for creating **objects** (instances):

\`\`\`python
class Book:
    def __init__(self, title: str, author: str, pages: int) -> None:
        self.title = title
        self.author = author
        self.pages = pages
\`\`\`

Here:

- \`Book\` is the class.
- \`__init__\` is the *initializer* that runs when you create a new instance.
- \`self\` is the instance being created; you store data on it as attributes.

## Creating instances

\`\`\`python
python_oop = Book("Python OOP", "You", 250)
clean_arch = Book("Clean Architecture", "Robert C. Martin", 300)

print(python_oop.title)
print(clean_arch.author)
\`\`\`

Each call to \`Book(...)\` creates a new object with its own state.
    `,
  },
  "/docs/object-oriented-python/attributes-and-methods": {
    title: "Attributes and Methods",
    lastUpdated: "Feb 10, 2026",
    prevLink: {
      title: "Classes and Objects",
      href: "/docs/object-oriented-python/classes-and-objects",
    },
    nextLink: {
      title: "Inheritance and Polymorphism",
      href: "/docs/object-oriented-python/inheritance-and-polymorphism",
    },
    content: `
## Attributes: data on your objects

An **attribute** is just a name bound to a value on an object:

\`\`\`python
class BankAccount:
    def __init__(self, owner: str, balance: float = 0.0) -> None:
        self.owner = owner
        self.balance = balance
\`\`\`

- \`owner\` and \`balance\` are **instance attributes**—each account has its own values.

## Methods: behavior on your objects

Methods are functions defined inside a class:

\`\`\`python
class BankAccount:
    def __init__(self, owner: str, balance: float = 0.0) -> None:
        self.owner = owner
        self.balance = balance

    def deposit(self, amount: float) -> None:
        self.balance += amount

    def withdraw(self, amount: float) -> None:
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount
\`\`\`

Methods always take \`self\` as the first parameter (by convention), which is the instance the method is called on.
    `,
  },
  "/docs/object-oriented-python/inheritance-and-polymorphism": {
    title: "Inheritance and Polymorphism",
    lastUpdated: "Feb 10, 2026",
    prevLink: {
      title: "Attributes and Methods",
      href: "/docs/object-oriented-python/attributes-and-methods",
    },
    nextLink: {
      title: "Encapsulation and Abstraction",
      href: "/docs/object-oriented-python/encapsulation-and-abstraction",
    },
    content: `
## Reusing behavior with inheritance

Inheritance lets you define a class that *extends* another class:

\`\`\`python
class Animal:
    def speak(self) -> str:
        return "..."

class Dog(Animal):
    def speak(self) -> str:
        return "Woof!"
\`\`\`

## Polymorphism in action

Polymorphism means "many forms": code that works with the base type also works with any subclass:

\`\`\`python
def talk(animal: Animal) -> None:
    print(animal.speak())

talk(Animal())
talk(Dog())
\`\`\`

Here \`talk\` doesn't care *which* concrete animal it receives, only that it has a \`speak\` method.
    `,
  },
  "/docs/object-oriented-python/encapsulation-and-abstraction": {
    title: "Encapsulation and Abstraction",
    lastUpdated: "Feb 10, 2026",
    prevLink: {
      title: "Inheritance and Polymorphism",
      href: "/docs/object-oriented-python/inheritance-and-polymorphism",
    },
    nextLink: {
      title: "Magic Methods and Dunder Protocols",
      href: "/docs/object-oriented-python/magic-methods",
    },
    content: `
## Encapsulation: bundling data with behavior

Encapsulation means keeping the data and the operations that work on that data in one place—the class.

In Python we use naming conventions rather than strict access modifiers:

- A single leading underscore (like \`_balance\`) means "internal use".
- A double leading underscore triggers name-mangling for stronger privacy (\`__balance\`).
    `,
  },
  "/docs/object-oriented-python/magic-methods": {
    title: "Magic Methods and Dunder Protocols",
    lastUpdated: "Feb 10, 2026",
    prevLink: {
      title: "Encapsulation and Abstraction",
      href: "/docs/object-oriented-python/encapsulation-and-abstraction",
    },
    content: `
## What are magic methods?

Magic methods (also called *dunder* methods) are hooks that let your objects integrate with Python's syntax and built-in functions.

Examples:

- \`__str__\` and \`__repr__\` for string representations
- \`__len__\` for the \`len(obj)\` built-in
- \`__iter__\` and \`__next__\` for iteration

## A simple value object

\`\`\`python
class Coordinate:
    def __init__(self, x: float, y: float) -> None:
        self.x = x
        self.y = y

    def __repr__(self) -> str:
        return f"Coordinate(x={self.x}, y={self.y})"

    def __add__(self, other: "Coordinate") -> "Coordinate":
        return Coordinate(self.x + other.x, self.y + other.y)
\`\`\`

Now \`Coordinate\` behaves more like a built-in numeric type when you print or add it.
    `,
  },
}
