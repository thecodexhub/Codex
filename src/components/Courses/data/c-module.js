export const cModule = {
  module: {
    module_id: "P1",
    chapters: [
      // Chapter 1
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

      // Chapter 02

      {
        chapter_id: "P1-C2",
        chapter_name: "Unit 2 : Fundamentals of ‘C’ Programming and Conditional Algorithmic Constructs  ",
        chapter_description: "",
        icon: "BookOpen",
        subtopics: [
          {
            topic_id: "P1-C2-T1",
            topic_name: "Introduction to ‘C’ Programming:",
            show_compiler: true,
            isCompleted: false,
            theory: [
              {
                type: "heading",
                content: "Definition – What is C Programming?",
              },
              {
                type: "paragraph",
                content:
                  "C is a general-purpose programming language developed in the 1970s by Dennis Ritchie at Bell Labs. It’s called the 'mother of all modern languages' because most popular languages (like C++, Java, Python, etc.) are influenced by C.\n\nIn simple words: C is like the foundation of a building – once you understand it, learning other languages becomes much easier.",
              },

              {
                type: "heading",
                content: "Why Do We Need These Concepts?",
              },
              {
                type: "bulletpoints",
                content: [
                  "Name things → (Identifiers)",
                  "Decide what kind of data we’re working with → (Data Types)",
                  "Store information that can change → (Variables)",
                  "Store fixed information that never changes → (Constants)",
                  "Talk to the computer/user → (Input/Output)",
                ],
              },
              {
                type: "paragraph",
                content:
                  "💡 Example: Imagine running a small canteen billing system.\n- You need names (identifiers) for items.\n- You must know if an item price is a whole number or decimal (data type).\n- You’ll need to store customer’s ordered quantity (variable).\n- GST tax percentage is fixed (constant).\n- Finally, you must show the bill on screen (output) and ask the customer to enter quantity (input).",
              },

              {
                type: "heading",
                content: "Identifiers",
              },
              {
                type: "paragraph",
                content:
                  "Definition: Names we give to different parts of a program (variables, constants, functions, etc.).",
              },
              {
                type: "bulletpoints",
                content: [
                  "Must start with a letter or underscore (_).",
                  "Can contain letters, digits, and underscores.",
                  "Cannot use spaces or special characters.",
                  "Cannot be a C keyword (e.g., int, float).",
                ],
              },
              {
                type: "example_code",
                content: "int age;\nfloat student_marks;",
              },

              {
                type: "heading",
                content: "Data Types",
              },
              {
                type: "paragraph",
                content: "Data types tell the computer what kind of data we are storing.",
              },
              {
                type: "bulletpoints",
                content: [
                  "int → Whole numbers → Example: 10, -5",
                  "float → Decimal numbers → Example: 3.14, -2.5",
                  "char → Single character → Example: 'A', 'z'",
                  "double → Large decimal numbers (higher precision) → Example: 22.5678",
                ],
              },
              {
                type: "example_code",
                content:
                  "int rollNumber = 25;\nfloat price = 10.5;\nchar grade = 'A';",
              },

              {
                type: "heading",
                content: "Variables",
              },
              {
                type: "paragraph",
                content:
                  "Definition: A variable is a named storage that can hold data which may change during program execution. Think of it as a container with a label.",
              },
              {
                type: "example_code",
                content: "int age = 18;\nage = 19;   // value updated",
              },
              {
                type: "paragraph",
                content:
                  "💡 Real-life analogy: A water bottle is a variable → you can refill/change the water inside. The label on the bottle is the identifier.",
              },

              {
                type: "heading",
                content: "Constants",
              },
              {
                type: "paragraph",
                content:
                  "Definition: A constant is a value that cannot be changed once assigned. In C, use const keyword.",
              },
              {
                type: "example_code",
                content: "const float PI = 3.14159;",
              },
              {
                type: "paragraph",
                content:
                  "💡 Real-life analogy: Your date of birth is a constant → it never changes. But your current age is a variable → it changes every year.",
              },

              {
                type: "heading",
                content: "Input and Output in C",
              },
              {
                type: "bulletpoints",
                content: [
                  "Input → Taking data from the user. (Use scanf())",
                  "Output → Displaying data on screen. (Use printf())",
                ],
              },
              {
                type: "example_code",
                content:
                  "#include <stdio.h>\n\nint main() {\n    int age;\n    printf(\"Enter your age: \");   // Output\n    scanf(\"%d\", &age);           // Input\n    printf(\"You entered: %d\", age);\n    return 0;\n}",
              },
              {
                type: "paragraph",
                content:
                  "💡 Real-life analogy:\n- Input: Asking a customer → “How many samosas do you want?”\n- Output: Showing the bill → “Your total is ₹30.”",
              },

              {
                type: "heading",
                content: "Mini Practice Ideas",
              },
              {
                type: "bulletpoints",
                content: [
                  "Write a program to store your name’s first letter (char), age (int), and height (float), then print them.",
                  "Define a constant PI = 3.14159 and calculate the area of a circle given radius.",
                  "Take two integers from the user and display their sum.",
                ],
              },
            ],
          },
          {
            topic_id: "P1-C2-T2",
            topic_name: "Operators in C",
            show_compiler: true,
            isCompleted: false,
            theory: [
              {
                type: "heading",
                content: "Definition – What are Operators in C?",
              },
              {
                type: "paragraph",
                content:
                  "Operators are symbols that tell the computer to perform specific operations on data (operands).\nThey are like tools in a toolbox – each operator does a specific job (add, compare, check conditions, etc.).\n\n👉 Example: +, -, *, / are arithmetic operators.",
              },

              {
                type: "heading",
                content: "Why Do We Need Operators?",
              },
              {
                type: "bulletpoints",
                content: [
                  "Do calculations (like total bill, average marks).",
                  "Compare values (who scored more in exams?).",
                  "Decide conditions (is age > 18? Then allow voting).",
                  "Work with data at the binary level (bitwise operations – used in compression, encryption, etc.).",
                ],
              },
              {
                type: "paragraph",
                content:
                  "💡 Just like in math, we use symbols (+ or >). In C, operators allow us to communicate actions to the computer.",
              },

              {
                type: "heading",
                content: "Arithmetic Operators",
              },
              {
                type: "bulletpoints",
                content: [
                  "+ → Addition → Example: a + b",
                  "- → Subtraction → Example: a - b",
                  "* → Multiplication → Example: a * b",
                  "/ → Division (integer division if both operands are int) → Example: a / b",
                  "% → Modulus (remainder) → Example: a % b",
                ],
              },
              {
                type: "example_code",
                content: "int a = 10, b = 3;\nprintf(\"%d\", a % b);  // Output: 1",
              },
              {
                type: "paragraph",
                content:
                  "💡 Analogy: Think of two friends sharing 10 chocolates among 3 people.\n- Each gets 3 chocolates → Division (/).\n- 1 chocolate left → Modulus (%).",
              },

              {
                type: "heading",
                content: "Relational Operators",
              },
              {
                type: "bulletpoints",
                content: [
                  "== → Equal to",
                  "!= → Not equal to",
                  "> → Greater than",
                  "< → Less than",
                  ">= → Greater or equal",
                  "<= → Less or equal",
                ],
              },
              {
                type: "example_code",
                content: "if (a > b) {\n    printf(\"a is greater\");\n}",
              },
              {
                type: "paragraph",
                content:
                  "💡 Analogy: Comparing exam marks → \"Is Riya’s score greater than Raj’s?\" True/False answers help us decide outcomes.",
              },

              {
                type: "heading",
                content: "Logical Operators",
              },
              {
                type: "bulletpoints",
                content: [
                  "&& → Logical AND → true if both are true",
                  "|| → Logical OR → true if at least one is true",
                  "! → Logical NOT → reverses truth",
                ],
              },
              {
                type: "example_code",
                content:
                  "if (age > 18 && marks > 40) {\n    printf(\"Eligible for college admission\");\n}",
              },
              {
                type: "paragraph",
                content:
                  "💡 Analogy:\n- AND: For admission → Must have age > 18 AND marks > 40.\n- OR: Buy ice cream → If you have cash OR Paytm, you can buy.\n- NOT: \"Not raining\" means → It’s clear weather.",
              },

              {
                type: "heading",
                content: "Bitwise Operators",
              },
              {
                type: "bulletpoints",
                content: [
                  "& → Bitwise AND",
                  "| → Bitwise OR",
                  "^ → Bitwise XOR (different bits = 1)",
                  "~ → Bitwise NOT (invert bits)",
                  "<< → Left shift (multiply by 2)",
                  ">> → Right shift (divide by 2)",
                ],
              },
              {
                type: "example_code",
                content: "int a = 6, b = 3;\nprintf(\"%d\", a & b);  // Output: 2",
              },
              {
                type: "paragraph",
                content:
                  "💡 Analogy:\n- Bitwise AND (&) → Like checking two switches: light will turn ON only if both switches are ON.\n- Left shift (<<) → Like doubling numbers quickly (multiply by 2).\n- Right shift (>>) → Like halving numbers (divide by 2).",
              },

              {
                type: "heading",
                content: "Mini Practice Ideas",
              },
              {
                type: "bulletpoints",
                content: [
                  "Write a program to take two numbers from the user and print their sum, difference, product, and remainder.",
                  "Write a program to check if a number is greater than 100 AND even.",
                  "Use bitwise operators to find whether two numbers share common bits (& operation).",
                  "Write a program using logical OR (||) to check if a student passed in math OR science.",
                ],
              },
            ],
          },
          {
            topic_id: "P1-C2-T3",
            topic_name: "Expressions in C",
            show_compiler: true,
            isCompleted: false,
            theory: [
              {
                type: "heading",
                content: "Definition – What are Expressions in C?",
              },
              {
                type: "paragraph",
                content:
                  "An expression in C is a combination of operands (values/variables) and operators that produces a result.\n\nSimply put: data + operators = expression.",
              },
              {
                type: "example_code",
                content: "a + b * 5\n\n// Here:\n// a and b → operands\n// +, * → operators\n// Whole thing → expression",
              },

              {
                type: "heading",
                content: "Why Do We Need Expressions?",
              },
              {
                type: "bulletpoints",
                content: [
                  "Calculate results (marks percentage → (obtained / total) * 100).",
                  "Check conditions (eligibility → (age >= 18 && marks > 40)).",
                  "Update values (salary = salary + bonus).",
                ],
              },
              {
                type: "paragraph",
                content:
                  "💡 Think of expressions as mathematical formulas for computers.",
              },

              {
                type: "heading",
                content: "Syntax of Expressions",
              },
              {
                type: "paragraph",
                content: "General form: operand operator operand",
              },
              {
                type: "example_code",
                content:
                  "int x = 10 + 5;     // Arithmetic expression\nint result = a > b;  // Relational expression\nif (age >= 18 && age <= 60) { ... } // Logical expression",
              },

              {
                type: "heading",
                content: "Precedence & Associativity",
              },
              {
                type: "paragraph",
                content:
                  "When an expression has multiple operators, C follows rules to decide which operator to apply first.",
              },
              {
                type: "bulletpoints",
                content: [
                  "() → Parentheses",
                  "*, /, % → Multiplication/Division/Modulus",
                  "+, - → Addition/Subtraction",
                  "Relational operators (<, >, <=, >=)",
                  "Equality operators (==, !=)",
                  "Logical AND (&&)",
                  "Logical OR (||)",
                  "Assignment (=, +=, -=)",
                ],
              },
              {
                type: "paragraph",
                content:
                  "🔁 Associativity tells us which direction to evaluate when two operators have the same precedence.\n- Most operators → Left to Right.\n- Assignment (=) → Right to Left.",
              },
              {
                type: "example_code",
                content:
                  "int x = 10 + 5 * 2;  // Multiplication happens first\n// x = 10 + 10 → x = 20\n\nint y = 10 - 5 - 2;  // Left to right\n// (10 - 5) - 2 = 3",
              },

              {
                type: "heading",
                content: "Type Conversions in C",
              },
              {
                type: "paragraph",
                content:
                  "When you use different data types in an expression, C sometimes converts one type into another.",
              },
              {
                type: "heading",
                content: "Implicit Conversion (Type Promotion)",
              },
              {
                type: "paragraph",
                content:
                  "Done automatically by C. Smaller type → converted to bigger type to avoid data loss.",
              },
              {
                type: "example_code",
                content:
                  "int x = 5;\nfloat y = 2.5;\nfloat result = x + y;  // int x is converted to float automatically",
              },
              {
                type: "heading",
                content: "Explicit Conversion (Type Casting)",
              },
              {
                type: "paragraph",
                content: "Done manually by the programmer using (datatype) expression.",
              },
              {
                type: "example_code",
                content:
                  "int a = 5, b = 2;\nfloat result = (float) a / b;  // Output: 2.5 instead of 2",
              },

              {
                type: "heading",
                content: "Real-Life Analogies",
              },
              {
                type: "bulletpoints",
                content: [
                  "Expressions → Like cooking recipes: ingredients (operands) + actions (operators) = dish (result).",
                  "Precedence → Just like exam marking rules: 'Maths marks count first, then English marks.'",
                  "Associativity → Like reading direction: left-to-right in English, right-to-left in Arabic.",
                  "Type Conversion → Pouring water into a bigger glass (int → float) vs. forcing it into a smaller bottle (float → int, some water spills).",
                ],
              },

              {
                type: "heading",
                content: "Mini Practice Ideas",
              },
              {
                type: "bulletpoints",
                content: [
                  "Write an expression to calculate the area of a triangle: (base * height) / 2.",
                  "Evaluate this in C: int result = 10 + 20 * 3; → Predict before running.",
                  "Take two integers, divide them, and print result as float (use type casting).",
                  "Write an expression to check if a number is between 1 and 100 using relational + logical operators.",
                ],
              },
            ],
          },
          {
            topic_id: "P1-C2-T4",
            topic_name: "Conditional Statements in C",
            show_compiler: true,
            isCompleted: false,
            theory: [
              {
                type: "heading",
                content: "Definition – What are Conditional Constructs?"
              },
              {
                type: "paragraph",
                content:
                  "Conditional constructs are decision-making tools in C. They allow the program to choose different paths depending on whether a condition is true or false. In simple words: If this happens → do this, else → do something else."
              },

              {
                type: "heading",
                content: "Why Do We Need Them?"
              },
              {
                type: "bulletpoints",
                content: [
                  "Without conditionals, programs would run in a straight line doing the same thing every time.",
                  "They let programs make decisions (e.g., If marks ≥ 40 → student passes).",
                  "Used for input validation and branching (e.g., ATM PIN check, eligibility checks).",
                  "They add intelligence and interactivity to programs."
                ]
              },

              {
                type: "heading",
                content: "if statement"
              },
              {
                type: "paragraph",
                content:
                  "Checks a condition. If the condition is true → executes the block; if false → does nothing."
              },
              {
                type: "example_code",
                content:
                  "if (condition) {\n    // code runs only if condition is true\n}\n\n// Example:\nif (marks >= 40) {\n    printf(\"You passed the exam!\\n\");\n}"
              },

              {
                type: "heading",
                content: "if-else statement"
              },
              {
                type: "paragraph",
                content:
                  "Executes one block if the condition is true, another block if the condition is false (two-way decision)."
              },
              {
                type: "example_code",
                content:
                  "if (condition) {\n    // runs if true\n} else {\n    // runs if false\n}\n\n// Example:\nif (marks >= 40) {\n    printf(\"You passed!\\n\");\n} else {\n    printf(\"You failed!\\n\");\n}"
              },

              {
                type: "heading",
                content: "nested if-else statement"
              },
              {
                type: "paragraph",
                content:
                  "An if-else inside another if-else. Used for multiple levels of decision (decision within decision)."
              },
              {
                type: "example_code",
                content:
                  "if (condition1) {\n    if (condition2) {\n        // code if both true\n    } else {\n        // code if condition1 true but condition2 false\n    }\n} else {\n    // code if condition1 false\n}\n\n// Example:\nif (marks >= 40) {\n    if (marks >= 75) {\n        printf(\"Passed with Distinction!\\n\");\n    } else {\n        printf(\"Passed!\\n\");\n    }\n} else {\n    printf(\"Failed!\\n\");\n}"
              },

              {
                type: "heading",
                content: "cascaded if-else (if-else-if ladder)"
              },
              {
                type: "paragraph",
                content:
                  "Used when there are multiple conditions to check one after another. Checks conditions in order until one is true; otherwise runs the final else."
              },
              {
                type: "example_code",
                content:
                  "if (condition1) {\n    // runs if condition1 true\n} else if (condition2) {\n    // runs if condition2 true\n} else if (condition3) {\n    // runs if condition3 true\n} else {\n    // runs if none true\n}\n\n// Example:\nif (marks >= 90) {\n    printf(\"Grade A\\n\");\n} else if (marks >= 75) {\n    printf(\"Grade B\\n\");\n} else if (marks >= 40) {\n    printf(\"Grade C\\n\");\n} else {\n    printf(\"Fail\\n\");\n}"
              },

              {
                type: "heading",
                content: "Real-life Example Flow"
              },
              {
                type: "paragraph",
                content:
                  "ATM example: If PIN is correct → proceed. Else → show 'Invalid PIN'. Then if balance ≥ requested amount → allow withdrawal. Else → show 'Insufficient Balance'. This combines if-else and nested checks."
              },

              {
                type: "heading",
                content: "Mini Practice Ideas"
              },
              {
                type: "bulletpoints",
                content: [
                  "Check if a number is positive, negative, or zero (use if-else-if ladder).",
                  "Check if a number is even or odd (if-else).",
                  "Check student result: failed, pass, distinction (nested if-else or cascaded ladder).",
                  "Write a program to check voting eligibility (age >= 18) and print appropriate message."
                ]
              },

              {
                type: "heading",
                content: "Quick Summary"
              },
              {
                type: "bulletpoints",
                content: [
                  "if = single decision (one-way).",
                  "if-else = two-way decision.",
                  "nested if-else = decision inside decision (multiple levels).",
                  "cascaded if-else = multiple conditions checked in sequence (if-else-if ladder)."
                ]
              }
            ]
          },
          {
            topic_id: "P1-C2-T5",
            topic_name: "The switch Statement in C",
            show_compiler: true,
            isCompleted: false,
            theory: [
              {
                type: "heading",
                content: "Definition – What is a switch statement?"
              },
              {
                type: "paragraph",
                content:
                  "The switch statement in C is a decision-making construct used when you have multiple possible values for a single variable or expression. Instead of writing a long chain of if-else-if, you can use switch for cleaner and easier-to-read code."
              },
              {
                type: "paragraph",
                content: "👉 In short: switch is like a menu card – you select one item, and it directly takes you to that choice."
              },

              {
                type: "heading",
                content: "Why Do We Need It?"
              },
              {
                type: "bulletpoints",
                content: [
                  "When we need to compare the same variable with many possible values, if-else-if becomes messy.",
                  "switch makes the code organized and efficient.",
                  "Best used in menu-driven programs, calculators, ATM systems, restaurant menus, and handling modes/settings like fan speed."
                ]
              },

              {
                type: "heading",
                content: "Syntax of switch"
              },
              {
                type: "example_code",
                content:
                  "switch (expression) {\n    case value1:\n        // code if expression == value1\n        break;\n\n    case value2:\n        // code if expression == value2\n        break;\n\n    ...\n    default:\n        // code if no case matches\n}"
              },
              {
                type: "bulletpoints",
                content: [
                  "The expression must be an integer or character type (not float/double).",
                  "case values must be constant and unique.",
                  "break stops execution after a case is matched. If missing, execution will 'fall through' to the next case.",
                  "default is optional – it runs if no case matches."
                ]
              },

              {
                type: "heading",
                content: "Example Program"
              },
              {
                type: "example_code",
                content:
                  "#include <stdio.h>\n\nint main() {\n    int choice;\n    printf(\"Enter a number (1-3): \");\n    scanf(\"%d\", &choice);\n\n    switch (choice) {\n        case 1:\n            printf(\"You selected: Tea\");\n            break;\n        case 2:\n            printf(\"You selected: Coffee\");\n            break;\n        case 3:\n            printf(\"You selected: Juice\");\n            break;\n        default:\n            printf(\"Invalid choice\");\n    }\n    return 0;\n}"
              },
              {
                type: "paragraph",
                content: "👉 If user enters 2, output will be: You selected: Coffee"
              },

              {
                type: "heading",
                content: "Real-life Analogy"
              },
              {
                type: "paragraph",
                content:
                  "Imagine you go to a restaurant and the waiter gives you a menu card:\n1 → Tea\n2 → Coffee\n3 → Juice\n\nYou choose a number → waiter serves that specific item.\nIf you choose something not on the menu → waiter says 'Invalid choice.'\n👉 That’s exactly how switch works in C."
              },

              {
                type: "heading",
                content: "Mini Practice Ideas"
              },
              {
                type: "bulletpoints",
                content: [
                  "Day of the Week: Input a number (1-7) and print the corresponding weekday.",
                  "Simple Calculator: Input two numbers and a choice (+, -, *, /) → perform operation using switch.",
                  "Traffic Light System: Input color (R, G, Y) and print action (Stop, Go, Wait).",
                  "Student Grade: Input grade character (A, B, C, F) and print message using switch."
                ]
              },

              {
                type: "heading",
                content: "Quick Summary"
              },
              {
                type: "bulletpoints",
                content: [
                  "if-else → good for range-based or logical conditions.",
                  "switch → best for multiple fixed choices on a single variable."
                ]
              }
            ]
          },


        ],
      },

      //chapter 03

      {
        chapter_id: "P1-C3",
        chapter_name: "Unit 3 : Introduction to Programming Languages ",
        chapter_description: "",
        icon: "BookOpen",
        subtopics: [
          {
            topic_id: "P1-C3-T1",
            topic_name: "Iterative Algorithm Constructs in C",
            show_compiler: true,
            isCompleted: false,
            theory: [
              {
                type: "heading",
                content: "Definition – What are Iterative Constructs?"
              },
              {
                type: "paragraph",
                content:
                  "Iterative algorithm constructs are ways to repeat a set of instructions multiple times in a program. In simple words: Instead of writing the same code again and again, we tell the computer to loop through the code until a condition is met."
              },
              {
                type: "paragraph",
                content:
                  "👉 Example: Printing numbers from 1 to 100. Without loops → you’d have to write 100 printf statements! With loops → just a few lines."
              },

              {
                type: "heading",
                content: "Why is it Needed?"
              },
              {
                type: "bulletpoints",
                content: [
                  "Saves time (no need to repeat code manually).",
                  "Reduces errors (since logic is written once and repeated).",
                  "Makes programs shorter, cleaner, and flexible.",
                  "Many real-world tasks are repetitive (counting, checking, processing data)."
                ]
              },

              {
                type: "heading",
                content: "Construction of Loops"
              },
              {
                type: "bulletpoints",
                content: [
                  "Initialization (starting point): Set a variable to start the loop. Example: int i = 1; (start counting from 1).",
                  "Condition (when to stop): The loop will run as long as the condition is true. Example: i <= 10; (keep looping until i reaches 10).",
                  "Updation (move to next step): After each loop cycle, update the variable. Example: i++ (increase i by 1 each time)."
                ]
              },
              {
                type: "paragraph",
                content:
                  "👉 If you forget any of these, the loop may not work correctly (e.g., forgetting update → infinite loop)."
              },

              {
                type: "heading",
                content: "Types of Loops in C"
              },
              {
                type: "bulletpoints",
                content: [
                  "while loop → Checks the condition before executing the code.",
                  "do-while loop → Executes the code at least once, then checks the condition.",
                  "for loop → Compact form where initialization, condition, and update are written in one line."
                ]
              },
              {
                type: "example_code",
                content:
                  "while(condition) {\n    // code to repeat\n}\n\n\ndo {\n    // code to repeat\n} while(condition);\n\n\nfor(initialization; condition; update) {\n    // code to repeat\n}"
              },

              {
                type: "heading",
                content: "Explanation with Example"
              },
              {
                type: "example_code",
                content:
                  "#include <stdio.h>\n\nint main() {\n    for(int i = 1; i <= 5; i++) {\n        printf(\"%d\\n\", i);\n    }\n    return 0;\n}"
              },
              {
                type: "paragraph",
                content:
                  "How it works:\n- Start with i = 1.\n- Check condition → i <= 5 (true).\n- Print i.\n- Increase i by 1 (i++).\n- Repeat until condition becomes false."
              },
              {
                type: "output",
                content: "1\n2\n3\n4\n5"
              },

              {
                type: "heading",
                content: "Real-Life Analogy"
              },
              {
                type: "paragraph",
                content:
                  "Think of loops like brushing your teeth every morning.\n\nInitialization → You wake up (starting point).\nCondition → You brush daily as long as you are alive.\nUpdate → Next day comes, and you repeat.\n\nInstead of saying \"I brush on Monday, I brush on Tuesday, I brush on Wednesday…\", you just say: 👉 \"I brush every day.\" That’s exactly what a loop does."
              },

              {
                type: "heading",
                content: "Mini Practice Ideas"
              },
              {
                type: "bulletpoints",
                content: [
                  "Write a program to print numbers from 1 to 10 using a loop.",
                  "Write a program to print the multiplication table of 5 using a loop.",
                  "Write a program that asks the user for a number and prints whether it is positive or negative until the user enters 0 (hint: use while).",
                  "Write a program that calculates the sum of first 100 natural numbers using a loop."
                ]
              }
            ]
          },
          {
            topic_id: "P1-C3-T2",
            topic_name: "Loops in C Programming",
            show_compiler: true,
            isCompleted: false,
            theory: [
              {
                type: "heading",
                content: "Definition – What are Loops?"
              },
              {
                type: "paragraph",
                content:
                  "A loop is a way to tell the computer: 👉 'Repeat this set of instructions again and again until a certain condition is met.' Instead of writing the same code multiple times, we put it inside a loop and let the computer handle the repetition."
              },

              {
                type: "heading",
                content: "Why are Loops Needed?"
              },
              {
                type: "bulletpoints",
                content: [
                  "Saves time → less code to write.",
                  "Reduces mistakes → you don’t have to copy-paste.",
                  "Makes programs flexible → change one condition, and all repetitions adjust automatically.",
                  "Many real-life tasks are repetitive → counting, checking attendance, going through items in a list."
                ]
              },

              {
                type: "heading",
                content: "Types of Loops in C"
              },
              {
                type: "bulletpoints",
                content: [
                  "for loop → Best when you know in advance how many times you want to repeat something.",
                  "while loop → Best when you don’t know beforehand how many times it will run, but it depends on a condition.",
                  "do-while loop → Similar to while, but the code runs at least once (because the condition is checked at the end)."
                ]
              },
              {
                type: "example_code",
                content:
                  "for(initialization; condition; update) {\n    // code to repeat\n}\n\nwhile(condition) {\n    // code to repeat\n}\n\ndo {\n    // code to repeat\n} while(condition);"
              },

              {
                type: "heading",
                content: "Explanation with Example"
              },
              {
                type: "example_code",
                content:
                  "#include <stdio.h>\nint main() {\n    for(int i = 1; i <= 5; i++) {\n        printf(\"%d\\n\", i);\n    }\n    return 0;\n}"
              },
              {
                type: "example_code",
                content:
                  "#include <stdio.h>\nint main() {\n    int i = 1;\n    while(i <= 5) {\n        printf(\"%d\\n\", i);\n        i++;\n    }\n    return 0;\n}"
              },
              {
                type: "example_code",
                content:
                  "#include <stdio.h>\nint main() {\n    int i = 1;\n    do {\n        printf(\"%d\\n\", i);\n        i++;\n    } while(i <= 5);\n    return 0;\n}"
              },
              {
                type: "output",
                content: "1\n2\n3\n4\n5"
              },

              {
                type: "heading",
                content: "Real-Life Analogy"
              },
              {
                type: "paragraph",
                content:
                  "Think of brushing your teeth:\n\nfor loop → You say: 'I’ll brush my teeth every day for 30 days.' (You already know the exact number of times).\n\nwhile loop → You say: 'I’ll keep brushing daily until my toothpaste finishes.' (You don’t know how many days exactly).\n\ndo-while loop → You say: 'I’ll brush at least once today, and then continue brushing daily until toothpaste finishes.' (At least one time guaranteed)."
              },

              {
                type: "heading",
                content: "Mini Practice Ideas"
              },
              {
                type: "bulletpoints",
                content: [
                  "Write a program using a for loop to print the multiplication table of 7.",
                  "Write a program using a while loop to keep asking the user for a number until they enter 0.",
                  "Write a program using a do-while loop that asks the user to enter their password and keeps asking until they enter the correct one.",
                  "Write a program that calculates the sum of numbers from 1 to 100 using a for loop."
                ]
              }
            ]
          },
          {
            topic_id: "P1-C3-T3",
            topic_name: "Nested Loops, break, and continue in C",
            show_compiler: true,
            isCompleted: false,
            theory: [
              {
                type: "heading",
                content: "Definition"
              },
              {
                type: "paragraph",
                content: "a) Nested Loops → A nested loop is a loop inside another loop. The inner loop runs completely for every single iteration of the outer loop. Used when you need to repeat tasks in a matrix or multi-level structure."
              },
              {
                type: "paragraph",
                content: "b) break statement → break is used to exit a loop immediately, even if the loop condition is still true."
              },
              {
                type: "paragraph",
                content: "c) continue statement → continue is used to skip the rest of the current iteration and move to the next iteration of the loop."
              },

              {
                type: "heading",
                content: "Why are they needed?"
              },
              {
                type: "bulletpoints",
                content: [
                  "Nested Loops → Useful for tables, patterns, and multi-dimensional structures. Example: Printing a multiplication table for numbers 1–5.",
                  "break and continue → Control the flow of loops to avoid unnecessary iterations, making code more efficient and logical."
                ]
              },
              {
                type: "paragraph",
                content: "💡 Analogy: break → Like leaving a queue immediately when your friend calls you. continue → Like skipping a turn in a game and going to the next player."
              },

              {
                type: "heading",
                content: "Syntax"
              },
              {
                type: "example_code",
                content: "a) Nested Loop\nfor(initialization; condition; update) {\n    for(initialization; condition; update) {\n        // inner loop code\n    }\n}"
              },
              {
                type: "example_code",
                content: "b) break\nfor(int i=1; i<=10; i++) {\n    if(i == 5) {\n        break; // exit loop when i=5\n    }\n    printf(\"%d\\\\n\", i);\n}"
              },
              {
                type: "example_code",
                content: "c) continue\nfor(int i=1; i<=10; i++) {\n    if(i % 2 == 0) {\n        continue; // skip even numbers\n    }\n    printf(\"%d\\\\n\", i);\n}"
              },

              {
                type: "heading",
                content: "Explanation with Example"
              },
              {
                type: "example_code",
                content: "a) Nested Loops – Print a 3x3 matrix of *\n#include <stdio.h>\nint main() {\n    for(int i=1; i<=3; i++) {\n        for(int j=1; j<=3; j++) {\n            printf(\"* \");\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}"
              },
              {
                type: "output",
                content: "* * * \n* * * \n* * *"
              },
              {
                type: "example_code",
                content: "b) break Example – Stop when number is 5\n#include <stdio.h>\nint main() {\n    for(int i=1; i<=10; i++) {\n        if(i == 5) {\n            break;\n        }\n        printf(\"%d\\\\n\", i);\n    }\n    return 0;\n}"
              },
              {
                type: "output",
                content: "1\n2\n3\n4"
              },
              {
                type: "example_code",
                content: "c) continue Example – Skip even numbers\n#include <stdio.h>\nint main() {\n    for(int i=1; i<=10; i++) {\n        if(i % 2 == 0) {\n            continue;\n        }\n        printf(\"%d\\\\n\", i);\n    }\n    return 0;\n}"
              },
              {
                type: "output",
                content: "1\n3\n5\n7\n9"
              },

              {
                type: "heading",
                content: "Real-Life Analogy"
              },
              {
                type: "paragraph",
                content: "Nested Loops → Like a theater seating chart: Outer loop → rows, Inner loop → seats in each row.\nbreak → Leaving a queue immediately when your order is ready.\ncontinue → Skipping a specific step in a routine, e.g., skipping brushing teeth for a day and moving to the next day."
              },

              {
                type: "heading",
                content: "Mini Practice Ideas"
              },
              {
                type: "bulletpoints",
                content: [
                  "Use nested loops to print a 5x5 number pattern like:\n1 1 1 1 1\n2 2 2 2 2\n3 3 3 3 3\n4 4 4 4 4\n5 5 5 5 5",
                  "Write a program using break to stop taking numbers from the user if a negative number is entered.",
                  "Write a program using continue to print all numbers from 1 to 20 except multiples of 3.",
                  "Nested loops: Print a right-angled triangle of *:\n*\n* *\n* * *\n* * * *\n* * * * *"
                ]
              }
            ]
          },
          {
  topic_id: "P1-C3-T4",
  topic_name: "Arrays in C Programming",
  show_compiler: true,
  isCompleted: false,
  theory: [
    {
      type: "heading",
      content: "Definition – What is an Array?"
    },
    {
      type: "paragraph",
      content: "An array is a collection of similar data items stored at consecutive memory locations. All elements in an array are of the same data type (e.g., all integers, all floats, etc.). Each element can be accessed using an index (like a seat number in a row)."
    },
    {
      type: "paragraph",
      content: "👉 In short: An array is like a list of values under one common name."
    },

    {
      type: "heading",
      content: "Why are Arrays Needed?"
    },
    {
      type: "paragraph",
      content: "Imagine you want to store the marks of 50 students."
    },
    {
      type: "bulletpoints",
      content: [
        "Without arrays → You’d need 50 variables: mark1, mark2, mark3… mark50. (Messy and hard to manage!)",
        "With arrays → Just one variable name (e.g., marks[50]) can hold all 50 values."
      ]
    },
    {
      type: "paragraph",
      content: "✅ Arrays make the program: Shorter, Easier to read, Easier to manage and process data."
    },

    {
      type: "heading",
      content: "Syntax of Arrays in C"
    },
    {
      type: "example_code",
      content: "data_type array_name[size];\n\n// Example:\nint marks[5];   // can store 5 integers"
    },
    {
      type: "bulletpoints",
      content: [
        "data_type → type of elements (int, float, char, etc.)",
        "array_name → name of the array",
        "size → number of elements it can store"
      ]
    },

    {
      type: "heading",
      content: "Explanation with Example"
    },
    {
      type: "example_code",
      content: "Example 1: Storing and printing marks\n#include <stdio.h>\nint main() {\n    int marks[5] = {85, 90, 78, 92, 88};\n\n    for(int i=0; i<5; i++) {\n        printf(\"Marks of student %d = %d\\\\n\", i+1, marks[i]);\n    }\n    return 0;\n}"
    },
    {
      type: "output",
      content: "Marks of student 1 = 85\nMarks of student 2 = 90\nMarks of student 3 = 78\nMarks of student 4 = 92\nMarks of student 5 = 88"
    },
    {
      type: "example_code",
      content: "Example 2: Taking input from user\n#include <stdio.h>\nint main() {\n    int numbers[3];\n\n    printf(\"Enter 3 numbers: \");\n    for(int i=0; i<3; i++) {\n        scanf(\"%d\", &numbers[i]);\n    }\n\n    printf(\"You entered: \");\n    for(int i=0; i<3; i++) {\n        printf(\"%d \", numbers[i]);\n    }\n    return 0;\n}"
    },

    {
      type: "heading",
      content: "Real-Life Analogy"
    },
    {
      type: "paragraph",
      content: "Think of an array like lockers in a hostel:\n- All lockers are arranged side by side (consecutive memory).\n- Each locker stores only one type of item (like all books, or all clothes).\n- Each locker has a number (index).\n- To access an item, you don’t need to search randomly — you just use the locker number."
    },
    {
      type: "paragraph",
      content: "👉 Example: marks[2] is like saying “Open locker number 2 and check the item inside.”"
    },

    {
      type: "heading",
      content: "Mini Practice Ideas"
    },
    {
      type: "bulletpoints",
      content: [
        "Create an array of 10 integers and print their values in reverse order.",
        "Take 5 numbers from the user and find their sum using an array.",
        "Store 7 days of the week in a char array and print them.",
        "Write a program to find the largest number in an array of 10 integers."
      ]
    }
  ]
},
{
  topic_id: "P1-C3-T5",
  topic_name: "Arrays in C: One-Dimensional & Multi-Dimensional",
  show_compiler: true,
  isCompleted: false,
  theory: [
    {
      type: "heading",
      content: "Definition"
    },
    {
      type: "subheading",
      content: "One-Dimensional Array (1D Array)"
    },
    {
      type: "paragraph",
      content: "A linear list of elements of the same type. All elements are stored in a single row in memory and accessed using one index."
    },
    {
      type: "paragraph",
      content: "👉 Example: Marks of 5 students → marks[5]"
    },
    {
      type: "subheading",
      content: "Multi-Dimensional Array (2D, 3D, etc.)"
    },
    {
      type: "paragraph",
      content: "An array of arrays (like a table or matrix). The most common is a 2D array where elements are stored in rows and columns, accessed using two indexes: row and column."
    },
    {
      type: "paragraph",
      content: "👉 Example: A 3×3 matrix → matrix[3][3]"
    },

    {
      type: "heading",
      content: "Why are they Needed?"
    },
    {
      type: "bulletpoints",
      content: [
        "1D Arrays: For storing linear data like marks, roll numbers, salaries.",
        "2D Arrays: For tabular data like student marks in multiple subjects, matrices, chessboards.",
        "3D Arrays: For higher-dimensional data like 3D graphics, cube representation."
      ]
    },
    {
      type: "paragraph",
      content: "✅ They make handling large, structured data organized and simple."
    },

    {
      type: "heading",
      content: "Syntax"
    },
    {
      type: "example_code",
      content: "// 1D Array\nint marks[5];   // stores 5 integers\n\n// 2D Array\nint matrix[3][3];   // 3 rows × 3 columns"
    },

    {
      type: "heading",
      content: "Explanation with Example"
    },
    {
      type: "example_code",
      content: "Example 1: One-Dimensional Array\n#include <stdio.h>\nint main() {\n    int marks[5] = {85, 90, 78, 92, 88};\n\n    for(int i=0; i<5; i++) {\n        printf(\"Student %d = %d\\\\n\", i+1, marks[i]);\n    }\n    return 0;\n}"
    },
    {
      type: "output",
      content: "Student 1 = 85\nStudent 2 = 90\nStudent 3 = 78\nStudent 4 = 92\nStudent 5 = 88"
    },
    {
      type: "example_code",
      content: "Example 2: Two-Dimensional Array\n#include <stdio.h>\nint main() {\n    int matrix[2][3] = {\n        {1, 2, 3},\n        {4, 5, 6}\n    };\n\n    for(int i=0; i<2; i++) {\n        for(int j=0; j<3; j++) {\n            printf(\"%d \", matrix[i][j]);\n        }\n        printf(\"\\\\n\");\n    }\n    return 0;\n}"
    },
    {
      type: "output",
      content: "1 2 3\n4 5 6"
    },
    {
      type: "example_code",
      content: "Example 3: User Input in 2D Array\n#include <stdio.h>\nint main() {\n    int marks[2][3];  // 2 students, 3 subjects\n\n    printf(\"Enter marks for 2 students (3 subjects each):\\\\n\");\n    for(int i=0; i<2; i++) {\n        for(int j=0; j<3; j++) {\n            scanf(\"%d\", &marks[i][j]);\n        }\n    }\n\n    printf(\"Marks Table:\\\\n\");\n    for(int i=0; i<2; i++) {\n        for(int j=0; j<3; j++) {\n            printf(\"%d \", marks[i][j]);\n        }\n        printf(\"\\\\n\");\n    }\n    return 0;\n}"
    },

    {
      type: "heading",
      content: "Real-Life Analogy"
    },
    {
      type: "bulletpoints",
      content: [
        "1D Array: Like a row of lockers in a school corridor – each locker (index) stores one student’s book.",
        "2D Array: Like a classroom seating chart – rows and columns (roll numbers arranged in a table).",
        "3D Array: Like a Rubik’s cube – multiple layers of rows and columns."
      ]
    },

    {
      type: "heading",
      content: "Mini Practice Ideas"
    },
    {
      type: "bulletpoints",
      content: [
        "Store 10 integers in an array and print the largest number.",
        "Reverse the elements of an array.",
        "Print a 3×3 multiplication table using a 2D array.",
        "Write a program to add two 2×2 matrices.",
        "Take marks of 3 students in 3 subjects (2D array), and print each student’s total marks."
      ]
    }
  ]
},

        ],
      },



    ],
  },
}
