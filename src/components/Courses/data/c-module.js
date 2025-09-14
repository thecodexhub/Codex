export const cModule = {
  module: {
    module_id: "P1",
    chapters: [
      // C1 from user-provided schema (now with paragraph, image, and video)
      {
        chapter_id: "P1-C1",
        chapter_name: "Unit 1 : Introduction to Programming Languages ",
        chapter_description: "",
        icon: "BookOpen",
        subtopics: [
          {
            topic_id: "P1-C1-T1",
            topic_name: "Computational Thinking (CT)",
            show_compiler: false,
            isCompleted: false,
            theory: [
              {
                type: "heading",
                content: "Definition – What is Computational Thinking (CT)?",
              },
              {
                type: "paragraph",
                content:
                  "Computational Thinking (CT) is a way of solving problems step by step just like a computer would. It doesn’t mean you are programming right away; instead, you are thinking in a structured way so that your ideas can later be turned into a program (like in C).",
              },
              {
                type: "bulletpoints",
                content: [
                  "In short: CT = Breaking down a problem into small steps → Writing them clearly → Solving them logically.",
                ],
              },

              {
                type: "heading",
                content: "Why is CT Needed?",
              },
              {
                type: "bulletpoints",
                content: [
                  "Computers don’t think like humans.",
                  'Humans understand natural language (“make tea”), but a computer needs clear instructions step by step (“boil water → add tea leaves → add sugar → pour milk → stir”).',
                  "CT helps us: \n 1. Organize thoughts clearly. \n 2. Write correct code without confusion. \n 3. Solve big problems by dividing them into smaller, easier problems.",
                ],
              },

              {
                type: "heading",
                content: "Main Parts of CT",
              },
              {
                type: "bulletpoints",
                content: [
                  "Decomposition – Breaking a big problem into small parts.\nExample: Making tea → (1) Boil water, (2) Add tea leaves, (3) Add sugar, (4) Pour milk, (5) Stir.",
                  "Pattern Recognition – Finding similarities in problems.\nExample: Making tea, coffee, or soup all start with “boil water.”",
                  "Abstraction – Ignoring unnecessary details and focusing only on what matters.\nExample: While making tea, you don’t need to know the shape of the kettle, only that it can boil water.",
                  "Algorithms – Writing step-by-step instructions.\nExample:\nStep 1: Take 1 cup water\nStep 2: Boil for 5 mins\nStep 3: Add tea leaves\nStep 4: Add sugar and milk\nStep 5: Stir and serve",
                ],
              },

              {
                type: "heading",
                content: "CT and Logical Thinking",
              },
              {
                type: "paragraph",
                content:
                  "Logical Thinking means making decisions based on conditions. In C programming, we use if-else, loops, and functions to represent logical thinking.",
              },
              {
                type: "example_code",
                content:
                  'if(raining) {\n    printf("Take umbrella");\n} else {\n    printf("Wear sunglasses");\n}',
              },

              {
                type: "heading",
                content: "CT and Problem-Solving Strategies",
              },
              {
                type: "bulletpoints",
                content: [
                  "Understand the problem clearly (What do I want to achieve?).",
                  "Break it down into steps (Decomposition).",
                  "Look for patterns (Have I solved something similar before?).",
                  "Write step-by-step logic (Algorithm).",
                  "Translate logic into C code.",
                ],
              },

              {
                type: "heading",
                content: "CT Example in C",
              },
              {
                type: "paragraph",
                content:
                  "Problem: Find the largest of two numbers.\n\nStep 1: CT Breakdown\nInput: Two numbers.\nProcess: Compare them.\nOutput: Print the larger number.\n\nStep 2: Algorithm\n1. Read number A.\n2. Read number B.\n3. If A > B → Print A.\n4. Otherwise → Print B.",
              },
              {
                type: "example_code",
                content:
                  '#include <stdio.h>\n\nint main() {\n    int A, B;\n    printf("Enter two numbers: ");\n    scanf("%d %d", &A, &B);\n\n    if(A > B) {\n        printf("Largest number = %d", A);\n    } else {\n        printf("Largest number = %d", B);\n    }\n\n    return 0;\n}',
              },

              {
                type: "heading",
                content: "Real-Life Analogy",
              },
              {
                type: "paragraph",
                content:
                  "Think of CT like planning a road trip:\n\n- Decomposition: Decide route, fuel, snacks, music, stops.\n- Pattern Recognition: Every trip needs route + fuel.\n- Abstraction: You don’t care about how petrol is refined, just that the car can run on it.\n- Algorithm: Step-by-step plan: Start car → Set GPS → Drive → Stop at hotel → Reach destination.",
              },
            ],
          },
          {
            topic_id: "P1-C1-T2",
            topic_name: "Program planning tools",
            show_compiler: false,
            isCompleted: false,
            theory: [
              {
                type: "heading",
                content: "Definition – What are Program Planning Tools?",
              },
              {
                type: "paragraph",
                content:
                  "Before writing a C program, we need to plan how it will work. Program Planning Tools are methods that help us think, organize, and design our program before coding.",
              },
              {
                type: "bulletpoints",
                content: [
                  "The three main tools are:\n- Algorithm\n- Flowchart\n- Pseudocode",
                  "Additionally, we follow a method called Top-Down Structured Programming to organize our code properly.",
                ],
              },

              {
                type: "heading",
                content: "Why are Program Planning Tools Needed?",
              },
              {
                type: "bulletpoints",
                content: [
                  "Writing a program directly without planning is like building a house without a blueprint.",
                  "Planning ensures:\n1. Fewer errors.\n2. Easier debugging.\n3. Clearer understanding.\n4. Faster development.",
                ],
              },

              {
                type: "heading",
                content: "Algorithms",
              },
              {
                type: "paragraph",
                content:
                  "An algorithm is a step-by-step set of instructions to solve a problem. No coding yet, just plain steps in human language.",
              },
              {
                type: "example_code",
                content:
                  "Start\nRead two numbers A and B\nIf A > B → Print A\nElse → Print B\nStop",
              },

              {
                type: "heading",
                content: "Flowcharts",
              },
              {
                type: "paragraph",
                content:
                  "A flowchart is a diagram that shows the steps of an algorithm using symbols.",
              },
              {
                type: "bulletpoints",
                content: [
                  "Oval → Start/Stop",
                  "Parallelogram → Input/Output",
                  "Rectangle → Process/Calculation",
                  "Diamond → Decision (Yes/No)",
                ],
              },
              {
                type: "example_code",
                content:
                  "[Start]\n   ↓\n[Input A,B]\n   ↓\n[A > B?] → Yes → [Print A] → [Stop]\n             ↓\n            No\n             ↓\n         [Print B]\n             ↓\n           [Stop]",
              },

              {
                type: "heading",
                content: "Pseudocode",
              },
              {
                type: "paragraph",
                content:
                  "Pseudocode is a plain English version of code, which looks like programming but isn’t strict about syntax. It helps bridge the gap between algorithm and real C code.",
              },
              {
                type: "example_code",
                content:
                  "Begin\n   Read A, B\n   If A > B then\n      Print \"A is largest\"\n   Else\n      Print \"B is largest\"\nEnd",
              },

              {
                type: "heading",
                content: "Top-Down Structured Programming",
              },
              {
                type: "paragraph",
                content:
                  "Top-Down Structured Programming means breaking a big program into smaller, manageable parts (functions/modules). You start from the main problem and keep dividing into sub-problems until each part is easy to code.",
              },
              {
                type: "example_code",
                content:
                  "Problem: Calculate the average of 5 marks.\n\nMain task: Find average.\nSubtasks:\n1. Input 5 marks.\n2. Add them.\n3. Divide by 5.\n4. Print average.\n\nFunctions in C:\ngetMarks();\ncalculateSum();\ncalculateAverage();\nprintResult();",
              },

              {
                type: "heading",
                content: "Real-Life Analogy",
              },
              {
                type: "paragraph",
                content:
                  "Imagine planning a birthday party 🎉:\n\n- Algorithm: Make a step-by-step to-do list (book hall, invite friends, order cake, decorate, party).\n- Flowchart: Draw a diagram with arrows showing what happens first, next, and decision points (e.g., if cake is delivered → decorate, else → call bakery).\n- Pseudocode:\nBegin\n   Invite guests\n   If cake delivered then\n      Decorate\n   Else\n      Call bakery\n   Enjoy party\nEnd\n\n- Top-Down Approach: Divide into smaller tasks: Invitation team, Food team, Decoration team.",
              },
            ],
          },
          {
            topic_id: "P1-C1-T3",
            topic_name: "Types of Program Errors",
            show_compiler: true,
            isCompleted: false,
            theory: [
              {
                type: "heading",
                content: "Definition – What are Program Errors?",
              },
              {
                type: "paragraph",
                content:
                  "A program error (also called a bug) is a mistake in the program that prevents it from running correctly or giving the correct result. Errors are very common for beginners, and even expert programmers make them. The goal is to find and fix errors so that the program works properly. (Fixing errors = Debugging).",
              },

              {
                type: "heading",
                content: "Why Do We Need to Study Errors?",
              },
              {
                type: "bulletpoints",
                content: [
                  "To understand why our program is not working.",
                  "To save time while writing/debugging code.",
                  "To improve problem-solving and debugging skills.",
                  "Knowing error types helps us quickly guess whether the issue is in syntax, logic, or runtime.",
                ],
              },

              {
                type: "heading",
                content: "Syntax Errors",
              },
              {
                type: "paragraph",
                content:
                  "Definition: Mistakes in the grammar of the programming language. Just like English has grammar rules, C also has rules (e.g., every statement ends with ;). If you break these rules, the compiler will show an error. The program won’t even run until you fix it.",
              },
              {
                type: "example_code",
                content:
                  "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\") // ❌ Missing semicolon\n    return 0;\n}",
              },
              {
                type: "output",
                content: "Compiler will show: expected ‘;’ before ‘return’",
              },
              {
                type: "paragraph",
                content:
                  "Real-life analogy: It’s like writing a sentence without punctuation: 'I am eating lets go'. A teacher won’t accept it.",
              },

              {
                type: "heading",
                content: "Logical Errors",
              },
              {
                type: "paragraph",
                content:
                  "Definition: The program runs but gives the wrong output because the logic (thinking) is wrong. The compiler cannot detect this — only the programmer can.",
              },
              {
                type: "example_code",
                content:
                  "#include <stdio.h>\n\nint main() {\n    int a = 5, b = 3;\n    printf(\"Sum = %d\", a - b); // ❌ Used minus instead of plus\n    return 0;\n}",
              },
              {
                type: "output",
                content: "Sum = 2 (but we wanted 8)",
              },
              {
                type: "paragraph",
                content:
                  "Real-life analogy: You know how to cook, but instead of adding sugar to tea, you added salt. The process was correct, but the logic was wrong.",
              },

              {
                type: "heading",
                content: "Runtime Errors",
              },
              {
                type: "paragraph",
                content:
                  "Definition: Errors that happen while the program is running, not at compile time. Usually caused by illegal operations like dividing by zero, accessing invalid memory, etc. The program compiles successfully but crashes while running.",
              },
              {
                type: "example_code",
                content:
                  "#include <stdio.h>\n\nint main() {\n    int a = 10, b = 0;\n    printf(\"Result = %d\", a / b); // ❌ Division by zero\n    return 0;\n}",
              },
              {
                type: "output",
                content: "Compiler won’t complain, but at runtime → Program crashes.",
              },
              {
                type: "paragraph",
                content:
                  "Real-life analogy: It’s like planning a perfect trip, but your car breaks down while driving. The plan was correct, but a problem happened at runtime.",
              },

              {
                type: "heading",
                content: "Debugging",
              },
              {
                type: "paragraph",
                content:
                  "Definition: The process of finding and fixing errors in a program. Tools like compiler error messages, debuggers, and even adding printf statements help in debugging.",
              },
              {
                type: "example_code",
                content:
                  "#include <stdio.h>\n\nint main() {\n    int a = 5, b = 0;\n    printf(\"Before division\\n\"); // Debugging using print\n    printf(\"Result = %d\", a / b); // Problem occurs here\n    return 0;\n}",
              },
              {
                type: "output",
                content: "The extra printf helps us trace where the program is failing.",
              },
              {
                type: "paragraph",
                content:
                  "Real-life analogy: It’s like a mechanic checking step by step which part of the car is broken before repairing it.",
              },

              {
                type: "heading",
                content: "Summary Table",
              },
              {
                type: "bulletpoints",
                content: [
                  "Syntax Error → At compile time → Example: Missing semicolon → Real-life analogy: Bad grammar in English",
                  "Logical Error → At runtime (wrong output) → Example: Using + instead of * → Real-life analogy: Adding salt instead of sugar",
                  "Runtime Error → During execution → Example: Division by zero → Real-life analogy: Car breakdown while driving",
                  "Debugging → Fixing errors → Example: Using printf to trace → Real-life analogy: Mechanic finding issue",
                ],
              },

              {
                type: "heading",
                content: "Mini Practice Ideas",
              },
              {
                type: "bulletpoints",
                content: [
                  "Write a program to add 2 numbers but intentionally forget a semicolon → Observe the syntax error.",
                  "Write a program to calculate the area of a rectangle but use + instead of * → Logical error.",
                  "Write a program to divide a number by zero → Observe the runtime error.",
                  "Use printf statements before and after calculations to practice debugging.",
                ],
              },
              
            ],
          },

        ],
      },
    ],
  },
}
